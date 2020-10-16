import React from 'react'
import styled from 'styled-components';
import avatarTrainer from '../../assets/trainer-avatar.png'

export const Container = styled.div`
    width: 475px;
    min-height: 100px;
    margin: 15px;
    padding: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: whitesmoke;
`;

export const Image = styled.img`
    width: 80px;
    height: 80px;
    background-color: white;
`;

export const Name = styled.span`
    font-size: 16px;
    font-weight: bold;
    
`;

export const TrainerPortrait = ({ name, image }) => {
    return (
        <Container>
            <Image 
                src={image || avatarTrainer} 
                alt={name}
            />
            <Name>
                { name }
            </Name>
        </Container>
    )
}
