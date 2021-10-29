import { IonFab, IonFabButton, IonFabList, IonIcon, IonToggle } from '@ionic/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { share, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';

interface CardTheme {
  backgroundColor?: string;
  textColor?: string;
  active?: boolean;
}

export interface ICardProps {
  icon: string;
  title: string;
  theme: CardTheme;
}

export const Card: React.FC<ICardProps> = ({ icon, title, theme }) => {
  const [active, setActive] = useState(false);

  return (
    <StyledCard active={active} backgroundColor={theme.backgroundColor} textColor={theme.textColor}>
      <IonIcon size='large' icon={icon}></IonIcon>
      <CardInformations active={active} textColor={theme.textColor} backgroundColor={theme.backgroundColor}>
        <h1>{title}</h1>
        <span>{active ? 'Ligado' : 'Desligado'}</span>
      </CardInformations>
      <IonToggle mode='ios' onClick={() => setActive(!active)}></IonToggle>
    </StyledCard>
  );
};

export const FabExamples: React.FC = () => {
  return (
    <IonFab vertical='center' horizontal='center' slot='fixed'>
      <IonFabButton>
        <IonIcon icon={share} />
      </IonFabButton>
      <IonFabList side='top'>
        <IonFabButton>
          <IonIcon icon={logoVimeo} />
        </IonFabButton>
      </IonFabList>
      <IonFabList side='bottom'>
        <IonFabButton>
          <IonIcon icon={logoFacebook} />
        </IonFabButton>
      </IonFabList>
      <IonFabList side='start'>
        <IonFabButton>
          <IonIcon icon={logoInstagram} />
        </IonFabButton>
      </IonFabList>
      <IonFabList side='end'>
        <IonFabButton>
          <IonIcon icon={logoTwitter} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};

export const StyledCard = styled.div<CardTheme>`
  height: 96px;
  width: 100%;
  border-radius: 8px;
  padding: 32px;
  background: var(--ion-card-background);
  display: flex;
  align-items: center;
  gap: 32px;
  box-shadow: 0 10px 20px rgba(10, 10, 10, 0.19), 0 6px 6px rgba(10, 10, 10, 0.23);
  position: relative;
  overflow: hidden;

  ion-icon {
    color: ${props => (props.active ? props.textColor : 'rgba(255, 255, 255, .2)')};
    z-index: 2;
  }

  ion-toggle {
    --background-checked: rgba(0, 0, 0, 0.1);
    --handle-spacing: 3px;
    --background: rgba(255, 255, 255, 0.3);
    width: 56px;
    --handle-width: 26px;
    z-index: 2;
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${props => props.backgroundColor};
    top: 0;
    left: 0;
    transform: ${props => (props.active ? 'translateX(0%);' : 'translateX(-100%)')};
    transition: transform 0.2s ease-in-out;
    z-index: 1;
  }
`;

const CardInformations = styled.div<CardTheme>`
  color: ${props => (props.active ? props.textColor : 'rgba(255, 255, 255, .2)')};
  flex: 1;
  z-index: 2;

  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }

  span {
    margin: 0;
    font-size: 14px;
    font-weight: 300;
    opacity: 0.7;
  }
`;
