# Restaurant Menu App

A full-stack restaurant menu application built with Angular frontends and .NET backend.

## Github

https://github.com/RobertAlexBarbu/RestaurantMenuApp

## Project Structure

```
RestaurantMenuApp/
├── WebApp/              # Angular SPA (Single Page Application)
├── WebAppSSR/           # Angular SSR (Server-Side Rendered) Application
├── WebAPI/              # .NET Backend API
│   └── WebAPI/          # Main .NET project (entry point)
└── README.md
```

## Prerequisites

Before running this application, make sure you have the following installed:

### Required Software

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Angular CLI** - Install with: `npm install -g @angular/cli`
- **.NET SDK** (v8.0 or higher) - [Download here](https://dotnet.microsoft.com/download)
- **Git** - [Download here](https://git-scm.com/)

### Database

- **PostgreSQL** or **Neon Database** account for production
- **Local database** for development (PostgreSQL/SQL Server)

### External Services

- **OpenAI API** account and API key
- **Firebase** project with service account

## Configuration & Secrets

This project requires two secret configuration files that are not included in the repository for security reasons.

### 1. Create `appsettings.json`

Create the file at `./WebAPI/WebAPI/appsettings.json` with the following structure:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ApiKeys": {
    "OpenAI": "YOUR_OPENAI_API_KEY"
  },
  "ConnectionStrings": {
    "NeonConnection": "YOUR_NEON_DB_CONNECTION_STRING",
    "LocalConnection": "YOUR_LOCAL_CONNECTION_STRING"
  }
}
```

**How to get these values:**

- **OpenAI API Key**: Sign up at [OpenAI Platform](https://platform.openai.com/), go to API Keys section
- **Neon Connection**: Create a database at [Neon](https://neon.tech/) and copy the connection string
- **Local Connection**: Use your local PostgreSQL/SQL Server connection string

### 2. Create `firebase.json` (Backend)

Create the file at `./WebAPI/WebAPI/firebase.json`

This should be your **Firebase Service Account Key** file. To get this file:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → **Project Settings**
4. Navigate to the **Service Accounts** tab
5. Click **Generate New Private Key**
6. Click **Generate Key** to download the JSON file
7. Rename the downloaded file to `firebase.json` and place it in `./WebAPI/WebAPI/`

### 3. Create Firebase Config Files (Frontend)

Both frontend applications need Firebase configuration files:

#### For Angular SPA (`WebApp`)

Create the file at `./WebApp/src/app/core/firebase/firebase.config.js`:

```javascript
// Firebase configuration for WebApp
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

#### For Angular SSR (`WebAppSSR`)

Create the file at `./WebAppSSR/src/app/core/firebase/firebase.config.js`:

```javascript
// Firebase configuration for WebAppSSR
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};
```

**How to get Firebase Web Config:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → **Project Settings**
4. Scroll down to the **Your apps** section
5. If you don't have a web app, click **Add app** → **Web** and follow the setup
6. Copy the `firebaseConfig` object values into your config files

> **Important**: These are different from the service account file - these are for frontend web authentication and are safe to include in client-side code.

## How to Run

### 1. Backend (.NET API)

```bash
# Navigate to the backend project
cd ./WebAPI/WebAPI

# Restore NuGet packages
dotnet restore

# Run the API
dotnet run
```

### 2. Frontend - Angular SPA

```bash
# Navigate to the SPA project
cd ./WebApp

# Install dependencies
npm install

# Start the development server
ng serve
```

The SPA will be available at `http://localhost:4200`

### 3. Frontend - Angular SSR

```bash
# Navigate to the SSR project
cd ./WebAppSSR

# Install dependencies
npm install

# Build and serve the SSR app
npm run serve:ssr:WebAppSSR
```

The SSR app will be available at `http://localhost:4300`
