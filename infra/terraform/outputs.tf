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

output "postgres_fqdn" {
  description = "PostgreSQL Flexible Server FQDN when create_postgres is true."
  value       = var.create_postgres ? azurerm_postgresql_flexible_server.metadata[0].fqdn : null
}

output "postgres_admin_password" {
  description = "Generated PostgreSQL admin password when create_postgres is true."
  value       = var.create_postgres ? random_password.postgres_admin[0].result : null
  sensitive   = true
}
