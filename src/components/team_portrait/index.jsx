import React from 'react'
import styled from 'styled-components';
import { Pokemon } from '../common/pokemon';
import trainerAvatar from '../../assets/trainer-avatar.png'
import { AiOutlineDelete } from 'react-icons/ai'

const Container = styled.div`
    min-height: 150px;
    max-width: 550px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    margin: 15px;
    z-index: 99999;
    position: relative;
`;

const TrainerContainer = styled.div`
    display: flex;
    align-items: center;
`

const TrainerImage = styled.img`
    width: 50px;
    height: 50px;
`

const TrainerInfos = styled.span`
    color: gray;
    margin-left: 5px;
`

const PokemonsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    @media (min-width: 530px) {
        flex-flow: row nowrap;
    }
`

export const TeamPortrait = ({ trainer_image, trainer_name, pokemons, onClickComp = () => {}, onClickPokemon = () => {}, isEditing = false, children }) => {


    return (
        <Container onClick={onClickComp}>

            <TrainerContainer>
                <TrainerImage src={trainer_image || trainerAvatar}/>
                <TrainerInfos>{trainer_name}</TrainerInfos>
            </TrainerContainer>
            <PokemonsContainer>

                {pokemons !== undefined && pokemons.length > 0 && pokemons.map((el, i) => (
                    <>
                        <Pokemon 
                            image={el.front_sprite}
                            remove_animation={isEditing}
                            onClick={() => onClickPokemon(el.name) }
                            key={i}
                        >
                            { el.name }
                        </Pokemon>
                    </>
                ))}

                {pokemons !== undefined && pokemons.length < 6 && 
                    [...Array(6 - pokemons.length)].map((el, i) => 
                        <Pokemon/>
                    )
                }

            </PokemonsContainer>
            { children }
        </Container>
    )
}
