import React from "react";
import { Card, Col, Row } from 'antd';
import { BiColor } from "react-icons/bi";
const { Meta } = Card;

const Home = () => {
  return (
    <div>
    <div>




      </div>
    <div>
     
      <div style={{ marginBottom: '20px', width:"100%",display:"flex",justifyContent:'center' }} >
      <iframe
  width="70%"
  height="315"
  display="flex"
  alignItems="center"
  
  src="https://www.youtube.com/embed/8g18jFHCLXk"
  title="YouTube video player"
  frameborder="3"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>

      </div>
      <Row gutter={16} >
      <div style={{display:"flex",justifyContent:'center',alignItems:'center',width:'100%',overflowY:"hidden"}}>
        <Col span={6} >
          
          <Card
            hoverable
            style={{ width: 240}}
            cover={<img alt="example" src="/img/dune2.jpeg" style={{ width: '100%', height: '100%' }}/>}
          >
            <Meta title="Dune-Part2" description="Dans la deuxième partie de DUNE (2023), suivez Paul Atreides alors qu'il prend la tête des Fremens dans leur lutte contre l'empire oppressif, révélant des secrets anciens et affrontant son propre destin.

" />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="/img/Dun1.jpeg" style={{ width: '100%', height: '100%' }}/>}
          >
            <Meta title="Dune-Part1" description="Plongez dans un univers futuriste où les enjeux politiques se déroulent sur la planète désertique d'Arrakis, dans la première partie de DUNE (2021)." />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="/img/dune_2021.jpg" style={{ width: '100%', height: '100%' }}/>}
          >
            <Meta title="Europe Street beat" description="DUNE est une épopée cinématographique réalisée en deux parties respectivement en 2021 et 2023, adaptant le roman classique de Frank Herbert dans un univers où l'humanité " />
          </Card>
        </Col>
        
        </div>
      </Row>
    </div>
    </div>
  );
};

export default Home;
