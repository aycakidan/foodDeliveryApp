import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CustomNavbar from './Navbar';

function Settings() {
  return (
    <div>
      <Container className="mt-sm-3">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <CustomNavbar/>
            <h3>Settings Pageeeeeeeee</h3>
            {/* Buraya settings sayfasının içeriğini ekleyebilirsiniz */}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Settings;
