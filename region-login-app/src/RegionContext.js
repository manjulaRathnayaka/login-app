import React, { createContext, useState, useContext } from 'react';
import config from './config';

// Create the region context
const RegionContext = createContext();

// Provider component
export const RegionProvider = ({ children }) => {
  const [currentRegion, setCurrentRegion] = useState('US');

  const changeRegion = (region) => {
    setCurrentRegion(region);
  };

  const redirectToRegion = (region) => {
    const regionDetails = config.regions[region];

    // Detect if running in an iframe
    const isInIframe = window.self !== window.top;

    // If in iframe, send message to parent window first
    if (isInIframe) {
      try {
        window.parent.postMessage({
          type: 'REGION_CHANGE',
          region: region,
          url: regionDetails.url
        }, '*');
        console.log(`Sent region change message to parent: ${region}`);
      } catch (error) {
        console.error('Error sending message to parent window:', error);
      }
    }

    // After a short delay, redirect to the region URL
    setTimeout(() => {
      window.location.href = regionDetails.url;
    }, 300);
  };

  // Value to be provided to consumers of this context
  const value = {
    currentRegion,
    changeRegion,
    redirectToRegion,
    regions: config.regions
  };

  return (
    <RegionContext.Provider value={value}>
      {children}
    </RegionContext.Provider>
  );
};

// Custom hook to use the region context
export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};

export default RegionContext;
