output "resource_group_name" {
  description = "Resource group name."
  value       = azurerm_resource_group.main.name
}

output "web_app_name" {
  description = "Azure Linux Web App name."
  value       = azurerm_linux_web_app.web.name
}

output "web_app_url" {
  description = "Default Azure Web App URL."
  value       = "https://${azurerm_linux_web_app.web.default_hostname}"
}

output "video_storage_account_name" {
  description = "Storage account used for private course videos."
  value       = azurerm_storage_account.videos.name
}

output "video_container_name" {
  description = "Blob container used for course videos."
  value       = azurerm_storage_container.videos.name
}

output "sql_server_fqdn" {
  description = "Azure SQL Server FQDN when create_sql_database is true."
  value       = var.create_sql_database ? azurerm_mssql_server.metadata[0].fully_qualified_domain_name : null
}

output "sql_database_name" {
  description = "Azure SQL Database name when create_sql_database is true."
  value       = var.create_sql_database ? azurerm_mssql_database.app[0].name : null
}

output "web_app_managed_identity_principal_id" {
  description = "System-assigned managed identity principal ID for granting database permissions."
  value       = azurerm_linux_web_app.web.identity[0].principal_id
}
