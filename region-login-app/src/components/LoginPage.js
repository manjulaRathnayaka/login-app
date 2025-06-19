import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useRegion } from '../RegionContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [isInIframe, setIsInIframe] = useState(false);

  // Use the region context
  const { currentRegion, changeRegion, redirectToRegion, regions } = useRegion();

  // Check if running in an iframe
  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    changeRegion(newRegion);

    // Simply redirect immediately when region changes
    redirectToRegion(newRegion);
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    // Form validation
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // In a real app, you would authenticate the user here
    // For this example, we'll just redirect based on the selected region
    try {
      // Simulate authentication logic
      console.log(`Logging in with: ${email} in region: ${currentRegion}`);

      // Redirect to the appropriate region
      redirectToRegion(currentRegion);
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center">
              <h3>Login</h3>
              {isInIframe && (
                <small className="d-block mt-1">Running in embedded mode</small>
              )}
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formRegion">
                  <Form.Label>Region</Form.Label>
                  <Form.Select
                    value={currentRegion}
                    onChange={handleRegionChange}
                    aria-label="Select region"
                  >
                    {Object.keys(regions).map(key => (
                      <option key={key} value={key}>
                        {regions[key].name} ({key})
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Select your region to connect to the appropriate service.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password (minimum 6 characters).
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center text-muted">
              <small>
                © {new Date().getFullYear()} Region Login App |
                Current Region: {regions[currentRegion].name} |
                {isInIframe ? ' Embedded Mode' : ' Standalone Mode'}
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
