locals {
  resource_group_name = coalesce(var.resource_group_name, "${var.project_name}-${var.environment}-rg")
  compact_name        = lower(replace("${var.project_name}${var.environment}", "-", ""))
  common_tags = merge(
    {
      project     = var.project_name
      environment = var.environment
      managed_by  = "terraform"
    },
    var.tags
  )
}

resource "random_string" "suffix" {
  length  = 6
  lower   = true
  numeric = true
  special = false
  upper   = false
}

resource "random_password" "postgres_admin" {
  count   = var.create_postgres ? 1 : 0
  length  = 24
  special = true
}

resource "azurerm_resource_group" "main" {
  name     = local.resource_group_name
  location = var.location
  tags     = local.common_tags
}

resource "azurerm_storage_account" "videos" {
  name                            = substr("${local.compact_name}${random_string.suffix.result}", 0, 24)
  resource_group_name             = azurerm_resource_group.main.name
  location                        = azurerm_resource_group.main.location
  account_tier                    = "Standard"
  account_replication_type        = var.storage_replication_type
  account_kind                    = "StorageV2"
  allow_nested_items_to_be_public = false
  min_tls_version                 = "TLS1_2"
  tags                            = local.common_tags
}

resource "azurerm_storage_container" "videos" {
  name                  = var.video_container_name
  storage_account_id    = azurerm_storage_account.videos.id
  container_access_type = "private"
}

resource "azurerm_service_plan" "web" {
  name                = "${var.project_name}-${var.environment}-asp"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku
  tags                = local.common_tags
}

resource "azurerm_application_insights" "web" {
  name                = "${var.project_name}-${var.environment}-appi"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  application_type    = "web"
  tags                = local.common_tags
}

resource "azurerm_linux_web_app" "web" {
  name                = "${var.project_name}-${var.environment}-app-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  service_plan_id     = azurerm_service_plan.web.id
  https_only          = true
  tags                = local.common_tags

  identity {
    type = "SystemAssigned"
  }

  site_config {
    always_on        = var.app_service_sku == "F1" ? false : true
    app_command_line = "node server.js"

    application_stack {
      node_version = var.node_version
    }
  }

  app_settings = merge(
    {
      NODE_ENV                                   = "production"
      SCM_DO_BUILD_DURING_DEPLOYMENT             = "true"
      AZURE_STORAGE_ACCOUNT_NAME                 = azurerm_storage_account.videos.name
      AZURE_STORAGE_VIDEO_CONTAINER              = azurerm_storage_container.videos.name
      APPLICATIONINSIGHTS_CONNECTION_STRING      = azurerm_application_insights.web.connection_string
      ApplicationInsightsAgent_EXTENSION_VERSION = "~3"
      DATABASE_HOST                              = var.create_postgres ? azurerm_postgresql_flexible_server.metadata[0].fqdn : ""
      DATABASE_NAME                              = var.create_postgres ? azurerm_postgresql_flexible_server_database.app[0].name : ""
      DATABASE_USER                              = var.create_postgres ? var.postgres_admin_username : ""
    },
    var.app_settings
  )
}

resource "azurerm_role_assignment" "web_storage_blob_contributor" {
  scope                = azurerm_storage_account.videos.id
  role_definition_name = "Storage Blob Data Contributor"
  principal_id         = azurerm_linux_web_app.web.identity[0].principal_id
}

resource "azurerm_postgresql_flexible_server" "metadata" {
  count                  = var.create_postgres ? 1 : 0
  name                   = "${var.project_name}-${var.environment}-pg-${random_string.suffix.result}"
  resource_group_name    = azurerm_resource_group.main.name
  location               = azurerm_resource_group.main.location
  version                = var.postgres_version
  administrator_login    = var.postgres_admin_username
  administrator_password = random_password.postgres_admin[0].result
  storage_mb             = var.postgres_storage_mb
  sku_name               = var.postgres_sku_name
  tags                   = local.common_tags
}

resource "azurerm_postgresql_flexible_server_database" "app" {
  count     = var.create_postgres ? 1 : 0
  name      = var.postgres_database_name
  server_id = azurerm_postgresql_flexible_server.metadata[0].id
  charset   = "UTF8"
  collation = "en_US.utf8"
}
