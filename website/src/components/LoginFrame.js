
import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import config from '../config';

const LoginFrame = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    // Add event listener for messages from the iframe
    const handleMessage = (event) => {
      // Make sure the message is from our iframe
      if (event.origin !== new URL(config.regionLoginAppUrl).origin) return;

      // Handle any messages from the iframe
      console.log('Message received from iframe:', event.data);

      // You can handle specific message types here, for example:
      if (event.data.type === 'REGION_CHANGE') {
        console.log(`Region changed to: ${event.data.region}`);
        // Handle region change in the parent app if needed
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
        </Card.Header>
        <Card.Body>
          {iframeError && (
            <Alert variant="danger">
              Could not load the login page. Please ensure the region-login-app is running.
            </Alert>
          )}

          <div className="iframe-container">
            <iframe
              ref={iframeRef}
              src={config.regionLoginAppUrl}
              title="Region Login"
              width="100%"
              height="500px"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{ border: 'none' }}
            />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginFrame;
