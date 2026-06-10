variable "project_name" {
  description = "Project name used in Azure resource names."
  type        = string
  default     = "openroad"
}

variable "environment" {
  description = "Deployment environment name."
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Azure region for all resources."
  type        = string
  default     = "australiaeast"
}

variable "resource_group_name" {
  description = "Optional resource group name. Defaults to <project>-<environment>-rg."
  type        = string
  default     = null
}

variable "tags" {
  description = "Tags applied to supported resources."
  type        = map(string)
  default     = {}
}

variable "storage_replication_type" {
  description = "Replication type for the video storage account."
  type        = string
  default     = "LRS"
}

variable "video_container_name" {
  description = "Blob container name for uploaded training videos."
  type        = string
  default     = "videos"
}

variable "app_service_sku" {
  description = "Linux App Service Plan SKU. Use a larger SKU for production."
  type        = string
  default     = "B1"
}

variable "node_version" {
  description = "Node runtime version for Azure App Service."
  type        = string
  default     = "20-lts"
}

variable "app_settings" {
  description = "Additional non-secret app settings for the web app. Do not put passwords, keys, or connection strings with credentials here."
  type        = map(string)
  default     = {}
}

variable "create_sql_database" {
  description = "Whether to create Azure SQL Database for app metadata."
  type        = bool
  default     = true
}

variable "sql_database_name" {
  description = "Azure SQL database name for application metadata."
  type        = string
  default     = "openroad"
}

variable "sql_database_sku_name" {
  description = "Azure SQL Database SKU. Basic is suitable only for development."
  type        = string
  default     = "Basic"
}

variable "sql_database_max_size_gb" {
  description = "Azure SQL Database maximum size in GB."
  type        = number
  default     = 2
}

variable "sql_administrator_login_username" {
  description = "Microsoft Entra administrator display name for Azure SQL. Defaults to the principal running Terraform."
  type        = string
  default     = null
}

variable "sql_administrator_object_id" {
  description = "Microsoft Entra object ID for the Azure SQL administrator. Defaults to the principal running Terraform."
  type        = string
  default     = null
}

variable "sql_allow_azure_services" {
  description = "Whether to allow Azure services to reach the Azure SQL Server public endpoint. Keep true for minimal App Service connectivity; replace with private networking for production."
  type        = bool
  default     = true
}
