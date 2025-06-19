# Multi-App React Setup with Iframe Integration

This project demonstrates a React multi-app setup with two separate applications:

1. `region-login-app`: A login page with region selection (US/EU) that redirects to region-specific URLs
2. `website`: A React app that embeds the region-login-app in an iframe

Both apps coexist in a single GitHub repository without sharing code.

## Project Structure

```
iframe-login-page-tests/
├── package.json             # Root package.json for running both apps
├── region-login-app/        # Login app with region selection
│   ├── package.json
│   └── src/
│       ├── components/
│       │   └── LoginPage.js # Login form with region dropdown
│       ├── App.js           # Main component
│       ├── config.js        # Configuration with region URLs
│       └── RegionContext.js # Context for region management
│
└── website/                 # Website app that embeds the login app
    ├── package.json
    └── src/
        ├── components/
        │   ├── Header.js    # Website header component
        │   └── LoginFrame.js # Component with iframe embedding
        ├── App.js           # Main component
        └── config.js        # Configuration with login app URL
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone this repository:
```
git clone <repository-url>
cd iframe-login-page-tests
```

2. Install dependencies for both apps and the root project:
```
npm install
cd region-login-app && npm install
cd ../website && npm install
cd ..
```

## Running the Apps

You can run both apps simultaneously using the root package.json scripts:

```
npm start
```

This will start:
- `region-login-app` on http://localhost:3000
- `website` app on http://localhost:3001

You can also run each app individually:

```
# Run just the login app
npm run start:login

# Run just the website
npm run start:website
```

## How It Works

1. The `region-login-app` provides a login interface with a region dropdown (US/EU)
2. When a user changes the region, the app communicates with its parent frame (if embedded) and then redirects
3. The `website` app embeds the login app in an iframe and listens for messages from it
4. The communication between the apps happens through the `window.postMessage` API

## Deployment

For production deployment:

1. Build each app separately:
```
cd region-login-app && npm run build
cd ../website && npm run build
```

2. Deploy the built apps to their respective hosting environments

3. Update the `website/src/config.js` file to point to the deployed URL of the region-login-app

## Notes

- In a real-world scenario, you would deploy these apps to separate domains/subdomains
- Cross-Origin Resource Sharing (CORS) might need to be configured for proper iframe communication
- Consider adding authentication mechanisms for secure communication between the apps
