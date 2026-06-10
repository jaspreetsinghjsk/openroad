-- Run against the OpenRoad application database as the Microsoft Entra SQL administrator.
-- Replace <web-app-name> with the Azure Linux Web App name from the Terraform output.
-- This grants the App Service system-assigned managed identity database access without passwords.

CREATE USER [<web-app-name>] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [<web-app-name>];
ALTER ROLE db_datawriter ADD MEMBER [<web-app-name>];
ALTER ROLE db_ddladmin ADD MEMBER [<web-app-name>];
