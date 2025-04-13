import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
  return (
    <div className="bg-light py-5">
      <Container>
        {/* Header */}
        <Row className="text-center">
          <Col>
            <h1 className="mb-4">Welcome to Juz Amma Website</h1>
            <p className="lead mb-4">Explore and find any Juz 30 Surah in both Arabic and Indonesian translations.</p>
          </Col>
        </Row>

        {/* Card for Surah List */}
        <Row className="justify-content-center">
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Explore Surah</Card.Title>
                <Card.Text>
                  Browse through the list of Surahs from Juz 30, and view their details including Arabic text and translation.
                </Card.Text>
                <Link to="/surah-list">
                  <Button variant="primary" className="w-100">View Surah List</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* About Section */}
        <Row className="mt-5 text-center">
          <Col>
            <h2>About Juz Amma</h2>
            <p className="lead">
              Juz Amma is the 30th and final section of the Quran, containing shorter Surahs that are often memorized by young children. 
              These Surahs are recited in daily prayers and hold a special place in the hearts of Muslims around the world.
            </p>
            <p>
              This website allows you to explore each Surah in Juz 30 with the Arabic text along with its Indonesian translation. 
              It is designed to make it easier for users to study and understand the meaning behind each verse.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
