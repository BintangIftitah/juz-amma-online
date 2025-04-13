import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/juz/30/quran-uthmani');
        const data = await response.json();

        const surahNames = data.data.ayahs.map((ayah) => {
          const number = ayah.surah.number;
          const arabicName = ayah.surah.name;
          const latinName = ayah.surah.englishName;
          const translation = ayah.surah.englishNameTranslation;
          return {
            number,
            arabicName,
            latinName,
            translation,
          };
        });

        const uniqueSurahs = Array.from(new Set(surahNames.map((surah) => surah.number)))
          .map((number) => {
            return surahNames.find((surah) => surah.number === number);
          });

        setSurahs(uniqueSurahs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Daftar Surah di Juz 30</h1>
      <ListGroup>
        {surahs.map((surah) => (
          <ListGroupItem key={surah.number}>
            <Card>
              <Card.Body>
                <Card.Title>{surah.arabicName} ({surah.latinName})</Card.Title>
                <Card.Text>{surah.translation}</Card.Text>
                <Link to={`/surah/${surah.number}`} className="btn btn-primary">
                  Detail
                </Link>
              </Card.Body>
            </Card>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default SurahList;
