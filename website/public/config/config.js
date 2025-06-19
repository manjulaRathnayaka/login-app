window.RUNTIME_CONFIG = {
  // Region-specific login app URLs
  regions: {
    US: {
      url: 'https://3e45f65f-fe86-4af7-8b5b-e598b0f261ea.e1-us-east-azure.preview-dv.choreoapps.dev/',
      name: 'United States'
    },
    EU: {
      url: 'https://98ffb678-b705-486e-9d13-9b43b046b242.e1-eu-central-cdp.dv.choreoapps.dev/',
      name: 'Europe'
    }
  },
  // Default region to use if geo-detection fails
  defaultRegion: 'US',
  // Flag to enable/disable geo-based region detection
  enableGeoDetection: true
};
