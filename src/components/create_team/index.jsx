import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import { TeamPortrait } from '../team_portrait/index';
import { BsSearch } from 'react-icons/bs'
import { Pokemon } from '../common/pokemon';
import { DataContext } from '../../App';
import { BtnPrimary } from '../common/buttons';

const Container = styled.div`
    position: relative;
    & > :last-child {
        position: absolute;
        right: 0;
        margin: 50px 0px;
    }
`;

const Input = styled.input`
    border:none;
`

const Label = styled.label`
    border: 1.5px solid gray;
    border-radius: 10px;
    padding: 15px;
    margin: 0px 16.5px;
    display: flex;
    align-items: center;
`

export const ManageTeam = ({ trainer_name, trainer_image, submit, isEditing = false, dataToUpdate = [], add = () =>{}, remove = () =>{}, searchPokemon = () =>{},  }) => {
    const { data, addToTeam, removeToTeam, requestSearchPokemon } = useContext(DataContext)

    const [search, setSearch] = useState('')

    useEffect(() => {
        if (search.length > 0 && !data.data.some(e => e.name === search)) {
            requestSearchPokemon(search)
        }
    }, [search])

    return (
        <Container>
            <TeamPortrait
                pokemons={dataToUpdate.length > 0 ? dataToUpdate : data.team}
                trainer_name={trainer_name}
                trainer_image={trainer_image}
                onClickPokemon={(name) => dataToUpdate.length > 0 ? remove(name) : removeToTeam(name)}
                isEditing
            />

            <Label>
                <BsSearch style={{ marginRight: '15px' }}/>                
                <Input 
                    type="text" 
                    value={search}
                    name="search"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Exemplo: pikachu"
                />
            </Label>

            <div>
                {
                    data.data
                        .filter(el => el.name === search)
                        .map((el2, i) => (
                            <Pokemon 
                                image={el2.front_sprite}
                                onClick={(e) => 
                                    dataToUpdate.length > 0 ? add(el2.name, el2.type, el2.front_sprite) 
                                    : addToTeam(el2.name, el2.type, el2.front_sprite)}
                                add_animation
                                key={i}
                            >
                                {el2.name}
                            </Pokemon>
                        ))
                }
            </div>

            <BtnPrimary onClick={submit}>Pronto</BtnPrimary>
        </Container>
    )
}
