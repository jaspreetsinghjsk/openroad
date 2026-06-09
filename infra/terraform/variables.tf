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
  description = "Additional app settings for the web app."
  type        = map(string)
  default     = {}
  sensitive   = true
}

variable "create_postgres" {
  description = "Whether to create Azure Database for PostgreSQL Flexible Server for app metadata."
  type        = bool
  default     = false
}

variable "postgres_sku_name" {
  description = "PostgreSQL Flexible Server SKU."
  type        = string
  default     = "B_Standard_B1ms"
}

variable "postgres_storage_mb" {
  description = "PostgreSQL storage in MB."
  type        = number
  default     = 32768
}

variable "postgres_version" {
  description = "PostgreSQL major version."
  type        = string
  default     = "16"
}

variable "postgres_admin_username" {
  description = "PostgreSQL administrator username."
  type        = string
  default     = "openroad_admin"
}

variable "postgres_database_name" {
  description = "Application database name."
  type        = string
  default     = "openroad"
}
