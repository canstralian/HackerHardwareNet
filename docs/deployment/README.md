# Deployment Guide

This guide provides instructions for deploying the Pentest Hardware Hub application to various environments.

## Deployment Options

### Option 1: Deploying to Replit

The application is already configured for deployment on Replit. To deploy:

1. Fork the repository to your Replit account
2. Use the Replit deployment tools in the web interface
3. Click the "Deploy" button to deploy your application

### Option 2: Deploying to a VPS

To deploy the application to a Virtual Private Server:

1. Set up a server with Node.js 20.x or higher
2. Clone the repository to your server
3. Install project dependencies
4. Build the application
5. Start the server
6. Configure a reverse proxy (Nginx/Apache) to route traffic to your application

### Option 3: Deploying with Docker

The application can also be containerized using Docker:

1. Build the Docker image:
   docker build -t pentest-hardware-hub .

2. Run the container:
   docker run -p 80:5173 pentest-hardware-hub

## Environment Configuration

Make sure to set the following environment variables for production:

- NODE_ENV=production
- PORT=80 (or your preferred port)

## CI/CD Setup

The repository includes GitHub Actions workflows for continuous integration and deployment:

1. The CI workflow (.github/workflows/ci.yml) runs tests on push and pull requests
2. The deployment workflow (.github/workflows/deploy.yml) handles automatic deployment

## Troubleshooting

Common deployment issues:

1. Missing environment variables causing application failures
2. Incorrect Node.js version
3. Permission issues when binding to ports below 1024

For more detailed instructions, refer to the documentation for your specific hosting platform.
