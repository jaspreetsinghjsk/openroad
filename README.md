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
- Optional PostgreSQL Flexible Server for course/user metadata

For production video delivery, add Azure Media Services alternatives or a transcode pipeline plus Azure Front Door/CDN in front of Blob Storage. This starter keeps infra minimal and parameterized.
