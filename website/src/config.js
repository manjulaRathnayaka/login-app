
// Default configuration (used in development or if external config is not available)
const defaultConfig = {
  regionLoginAppUrl: 'http://localhost:3000', // URL to the region-login-app
  // You can add other configuration options for the website app here
};

// Get runtime configuration from window object if available (set by the mounted config.js)
const getRuntimeConfig = () => {
  if (window.RUNTIME_CONFIG) {
    console.log('Using runtime configuration from mounted config.js');
    return window.RUNTIME_CONFIG;
  }
  console.log('Using default configuration');
  return defaultConfig;
};

const config = getRuntimeConfig();

export default config;
