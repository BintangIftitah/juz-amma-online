import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const BISMILLAH_ARABIC = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
const BISMILLAH_LENGTH = BISMILLAH_ARABIC.length;

function SurahDetail() {
  const { id } = useParams();
  const [arabicData, setArabicData] = useState(null);
  const [translationData, setTranslationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurahDetail = async () => {
      try {
        const arabicResponse = await fetch(`https://api.alquran.cloud/v1/surah/${id}/quran-uthmani`);
        const arabicJson = await arabicResponse.json();

        const translationResponse = await fetch(`https://api.alquran.cloud/v1/surah/${id}/id.indonesian`);
        const translationJson = await translationResponse.json();

        if (arabicResponse.ok && translationResponse.ok) {
          setArabicData(arabicJson.data);
          setTranslationData(translationJson.data);
        } else {
          throw new Error("Gagal mengambil data surah atau terjemahan.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="mt-4">
      <h1>{arabicData.englishName} ({arabicData.name})</h1>
      <p>Revelation Type: {arabicData.revelationType}</p>
      <p>Number of Ayahs: {arabicData.numberOfAyahs}</p>

      <Row>
        <Col md={8}>
          <div>
            {arabicData.ayahs.map((ayah, index) => {
              const isFirstAyah = index === 0;
              const containsBismillah = ayah.text.startsWith(BISMILLAH_ARABIC);

              const arabicText = isFirstAyah && containsBismillah
                ? ayah.text.substring(BISMILLAH_LENGTH).trim()
                : ayah.text;

              const translation = translationData?.ayahs[index]?.text;

              return (
                <div key={ayah.number} style={{ marginBottom: '20px' }}>
                  {isFirstAyah && containsBismillah && (
                    <div style={{ margin: '20px 0', textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>
                      {BISMILLAH_ARABIC}
                    </div>
                  )}
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Text style={{ fontSize: '24px' }}>
                        <strong>Ayah {ayah.numberInSurah}:</strong> {arabicText}
                      </Card.Text>
                      <Card.Text style={{ fontStyle: 'italic' }}>
                        ({ayah.numberInSurah}) {translation}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SurahDetail;
