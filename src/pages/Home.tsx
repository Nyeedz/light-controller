import { IonContent, IonPage } from '@ionic/react';
import styled from 'styled-components';
import { Card, StyledCard } from '../components/Card/Card';
import { tvOutline, beerOutline } from 'ionicons/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Storage } from '@capacitor/storage';
import { IonButton, IonAlert } from '@ionic/react';
export interface IDevice {
  address: string;
  id: string;
  model: string;
  place: string;
}

const Home: React.FC = () => {
  const [devices, setDevices] = useState([]);
  const [alert, openAlert] = useState(false);
  const [ip, setIp] = useState('');

  const getIp = async () => {
    const { value } = await Storage.get({ key: 'ip' });

    return value;
  };

  const setIpLocalStorage = async (ip: string) => {
    await Storage.set({
      key: 'ip',
      value: ip
    });
    setIp(ip);
  };

  useEffect(() => {
    getIp().then(ipLocal => {
      axios.get(`http://${ipLocal}/discover`).then(res => {
        setDevices(res.data.devices);
      });
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
                      : 'linear-gradient(90deg, rgba(250, 219, 121, 1) 0%, rgba(224, 172, 8, 1) 100%)'
                }}
                {...device}
              />
            );
          })}
          <PageConfig>Configurar Ip</PageConfig>
          <IonButton onClick={() => openAlert(true)} expand='block'>
            Configurar Ip
          </IonButton>
          <IonAlert
            isOpen={alert}
            onDidDismiss={() => openAlert(false)}
            cssClass='my-custom-class'
            header={'Prompt!'}
            inputs={[
              {
                name: 'ip',
                value: `${ip}`,
                type: 'url',
                placeholder: 'Entre com o ip do servidor'
              }
            ]}
            buttons={[
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: e => {
                  console.log('Confirm Cancel', e);
                }
              },
              {
                text: 'Ok',
                handler: inputValue => {
                  setIpLocalStorage(inputValue.ip);
                }
              }
            ]}
          />
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

const PageConfig = styled.button`
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
