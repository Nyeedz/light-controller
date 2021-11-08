import { IonIcon, IonToggle } from '@ionic/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { endpoint, IDevice } from '../../pages/Home';
import axios from 'axios';

interface CardTheme {
  backgroundColor?: string;
  textColor?: string;
  active?: boolean;
}

export interface ICardProps extends IDevice {
  icon: string;
  title: string;
  theme: CardTheme;
}

export const Card: React.FC<ICardProps> = ({ icon, title, theme, address, id, model, place }) => {
  const [active, setActive] = useState(false);

  const togglePower = (on: boolean) => {
    axios.get(`${endpoint}/status?ip=${address}&on=${on}`).then(() => {})
  };

  return (
    <StyledCard active={active} backgroundColor={theme.backgroundColor} textColor={theme.textColor}>
      <IonIcon size='large' icon={icon}></IonIcon>
      <CardInformations active={active} textColor={theme.textColor} backgroundColor={theme.backgroundColor}>
        <h1>{title}</h1>
        <span>{active ? 'Ligado' : 'Desligado'}</span>
      </CardInformations>
      <IonToggle
        mode='ios'
        onClick={() => {
          setActive(!active);
          togglePower(!active);
        }}
      ></IonToggle>
    </StyledCard>
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
    color: ${(props) => (props.active ? props.textColor : 'rgba(255, 255, 255, .2)')};
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
    background: ${(props) => props.backgroundColor};
    top: 0;
    left: 0;
    transform: ${(props) => (props.active ? 'translateX(0%);' : 'translateX(-100%)')};
    transition: transform 0.2s ease-in-out;
    z-index: 1;
  }
`;

const CardInformations = styled.div<CardTheme>`
  color: ${(props) => (props.active ? props.textColor : 'rgba(255, 255, 255, .2)')};
  flex: 1;
  z-index: 2;

  h1 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    text-transform: capitalize;
  }

  span {
    margin: 0;
    font-size: 14px;
    font-weight: 300;
    opacity: 0.7;
  }
`;
