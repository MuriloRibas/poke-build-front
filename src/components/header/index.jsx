import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BtnPrimary } from '../common/buttons';

const Container = styled.div`
position: relative;
    width: 100vw;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: gray;
    z-index: 2;

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url(${require('../../assets/background.png')});
        filter: grayscale(5);
        background-size: contain;
        background-repeat: no-repeat;
    }
    & :nth-child(2) {
        position: absolute;
        bottom: 0;
        margin-bottom: 40px;
    }
`;

const Title = styled.h1` 
    color: white;
    font-size: 26px;
    font-weight: bold;
`;

export const Header = () => {
    return (
        <Container>
            <Title>Crie sua equipe</Title>
            <Link to="/start">
                <BtnPrimary>Começar</BtnPrimary>
            </Link>
        </Container>
    )
}
