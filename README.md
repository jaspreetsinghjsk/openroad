# OpenRoad

OpenRoad is a starter video training platform with two user paths:

- Trainers upload and manage course video content.
- Trainees browse courses and watch lessons.

The app is scaffolded with Next.js, TypeScript, and CSS modules via the App Router. Infrastructure lives separately under `infra/terraform` and targets Azure.

## Why Next.js

Next.js is a good fit here because it supports fast course browsing pages, server-side API routes for upload authorization, secure role-aware page rendering, and Azure App Service deployment using a standalone build. It also leaves room to add adaptive streaming workflows later without replacing the frontend.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Testing-mode authentication

OpenRoad currently uses lightweight cookie-based authentication for local testing:

- Visit `/auth`.
- Register or log in with any email address.
- The user is treated as a trainer and can publish courses from `/trainer`.
- Uploaded videos are saved under `public/uploads`.
- Published course metadata is saved under `.local-data/courses.json`.

This is intentionally not production authentication. Replace it with Azure Entra ID, Auth.js, or another identity provider before exposing the app publicly.

## Azure infrastructure

Terraform files are in `infra/terraform`.

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

The default infrastructure creates:

- Resource group
- Azure Storage Account and private Blob container for course videos
- Linux App Service Plan
- Linux Web App configured for the Next.js standalone server
- Application Insights
- Azure SQL Database for course/user metadata

The web app uses its system-assigned managed identity for Azure Storage. It is also configured with a secretless Azure SQL connection string using `Authentication=Active Directory Managed Identity`.

After Terraform creates Azure SQL, run the SQL in `infra/terraform/sql-managed-identity-grants.sql` as the Microsoft Entra SQL administrator. That creates a contained database user for the App Service managed identity and grants it database access without passwords.

For production video delivery, add Azure Media Services alternatives or a transcode pipeline plus Azure Front Door/CDN in front of Blob Storage. This starter keeps infra minimal and parameterized.
