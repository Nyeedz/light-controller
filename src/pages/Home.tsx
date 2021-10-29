import { IonContent, IonPage } from '@ionic/react';
import styled from 'styled-components';
import { Card, FabExamples, StyledCard } from '../components/Card/Card';
import { tvOutline, beerOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  return (
    <IonPage id='home-page'>
      <IonContent fullscreen>
        <StyledContent>
          <PageTitle>Meu apartamento</PageTitle>
          <PageArea>Ambientes</PageArea>
          <Card
            icon={tvOutline}
            title='Sala'
            theme={{
              textColor: '#000',
              backgroundColor: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgb(162 160 160) 100%)'
            }}
          />
          <Card
            icon={beerOutline}
            title='Bar'
            theme={{
              textColor: '#fff',
              backgroundColor: 'linear-gradient(90deg, rgba(250, 219, 121, 1) 0%, rgba(224, 172, 8, 1) 100%)'
            }}
          />
          <PageConfig>Configurações</PageConfig>
          <FabExamples></FabExamples>
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
