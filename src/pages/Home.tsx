import { IonContent, IonPage } from '@ionic/react';
import styled from 'styled-components';
import { Card, StyledCard } from '../components/Card/Card';
import { tvOutline, beerOutline } from 'ionicons/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
export const endpoint = 'http://localhost:3000';
export interface IDevice {
  address: string;
  id: string;
  model: string;
  place: string;
}

const Home: React.FC = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // axios.get('http://localhost:3000/status?ip=192.168.18.21').then((res) => {
    axios.get(`${endpoint}/discover`).then((res) => {
      setDevices(res.data.devices);
    });
  }, []);

  return (
    <IonPage id='home-page'>
      <IonContent fullscreen>
        <StyledContent>
          <PageTitle>Meu apartamento</PageTitle>
          <PageArea>Ambiente{devices.length > 1 ? 's' : ''}</PageArea>
          {devices.map((device: IDevice) => {
            return (
              <Card
                key={device.address}
                icon={device.place === 'sala' ? tvOutline : beerOutline}
                title={device.place}
                theme={{
                  textColor: device.place === 'sala' ? '#000' : '#fff',
                  backgroundColor:
                    device.place === 'sala'
                      ? 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgb(162 160 160) 100%)'
                      : 'linear-gradient(90deg, rgba(250, 219, 121, 1) 0%, rgba(224, 172, 8, 1) 100%)',
                }}
                {...device}
              />
            );
          })}
          <PageConfig>Configurações</PageConfig>
        </StyledContent>
      </IonContent>
    </IonPage>
  );
};

const PageTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 64px;
`;

const PageArea = styled.p`
  font-size: 14px;
  margin-bottom: 12px;
`;

const PageConfig = styled.p`
  font-size: 14px;
  margin-bottom: 12px;
  margin-top: 50px;
`;

const StyledContent = styled.div`
  padding: 16px;

  ${StyledCard} + ${StyledCard} {
    margin-top: 16px;
  }
`;

export default Home;
