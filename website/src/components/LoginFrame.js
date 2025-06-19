
import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Alert, Spinner } from 'react-bootstrap';
import config from '../config';
import GeoService from '../services/GeoService';

const LoginFrame = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginAppUrl, setLoginAppUrl] = useState('');
  const [detectedRegion, setDetectedRegion] = useState('');
  const iframeRef = useRef(null);

  // Detect user's region and set the appropriate login app URL
  useEffect(() => {
    const detectRegion = async () => {
      try {
        setLoading(true);
        const regionCode = await GeoService.detectUserRegion() || config.defaultRegion;
        const url = config.regions[regionCode].url;
        
        setDetectedRegion(regionCode);
        setLoginAppUrl(url);
        console.log(`Detected region: ${regionCode}, URL: ${url}`);
      } catch (error) {
        console.error('Error setting region-based URL:', error);
        // Fall back to default region
        const defaultUrl = config.regions[config.defaultRegion].url;
        setLoginAppUrl(defaultUrl);
        setDetectedRegion(config.defaultRegion);
      } finally {
        setLoading(false);
      }
    };

    detectRegion();
  }, []);

  useEffect(() => {
    // Add event listener for messages from the iframe
    const handleMessage = (event) => {
      // Try to extract the origin from the login app URL
      try {
        // Since we're using multiple possible origins, check if the event origin matches any of them
        const isValidOrigin = Object.values(config.regions).some(region => {
          const regionUrl = new URL(region.url);
          return event.origin === regionUrl.origin;
        });

        if (!isValidOrigin) {
          console.warn('Message received from unknown origin:', event.origin);
          return;
        }
        
        // Handle any messages from the iframe
        console.log('Message received from iframe:', event.data);
        
        // You can handle specific message types here, for example:
        if (event.data.type === 'REGION_CHANGE') {
          console.log(`Region changed to: ${event.data.region}`);
          // Handle region change in the parent app if needed
        }
      } catch (error) {
        console.error('Error processing message from iframe:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(false);
  };

  return (
    <Container className="mt-5">
      <Card className="login-frame-card">
        <Card.Header className="text-center">
          <h2>Login</h2>
          {detectedRegion && (
            <div className="text-muted small">
              <span>Detected region: {config.regions[detectedRegion].name}</span>
            </div>
          )}
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-3">Detecting your region...</p>
            </div>
          ) : iframeError ? (
            <Alert variant="danger">
              Could not load the login page. Please ensure the login application for your region is running.
            </Alert>
          ) : (
            <div className="iframe-container">
              {loginAppUrl && (
                <iframe
                  ref={iframeRef}
                  src={loginAppUrl}
                  title="Region Login"
                  width="100%"
                  height="500px"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  style={{ border: 'none' }}
                />
              )}
            </div>
          )}
        </Card.Body>
        <Card.Footer className="text-center text-muted">
          <small>© {new Date().getFullYear()} Website Application with Region-Based Login</small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default LoginFrame;
