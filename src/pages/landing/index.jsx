import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { DataContext } from '../../App';

import { Header } from '../../components/header';
import { TeamPortrait } from '../../components/team_portrait/index';
import { PortraitsLayout } from '../../components/portraits_layout';
import { TrainerPortrait } from '../../components/trainer_portrait';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const ContainerRadios = styled.div` 
    width: 300px;
    display: flex;
    margin: 15px 0px 0px 122px;

`;

const Input = styled.input`
    border: none;

`

const Label = styled.label`
    padding: 5px;
    background-color: gray;
    border: 1px solid gray;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    transition: opacity 0.25s;
    & > * {
        color: white;
    }
    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`

export const Landing = () => {
    const [contentType, setContentType] = useState('teams')
    const data = useContext(DataContext)
    const { teams, trainers } = data.data
    const { requestAllData } = data
    const [loading, setLoading] = useState(false);

    const history = useHistory()

    const requestDelete = (type, id) => 
        Axios.delete(process.env.REACT_APP_API_URL + '/' + type + '/' + id)
            .then(res => {
                console.log(res)  
                setLoading(false)
                requestAllData()
            })
            .catch(err => setLoading(false))

    const handleContentType = (e) => setContentType(e.target.value)

    const findTrainer = (team, trainers) => {
        const result = trainers.filter(el => el.id === team.relationships.trainer.data.id)
        return result[0].attributes
    }

    return (
        <>
            <Header/>

            <ContainerRadios>
                <Label htmlFor="content-type-teams">
                    <Input 
                        id="content-type-teams" 
                        type="radio" 
                        name="content" 
                        value="teams" 
                        checked={contentType === 'teams'}
                        onChange={handleContentType}
                    />
                    <span>Equipes</span>
                </Label>
                <Label htmlFor="content-type-trainers">
                    <Input 
                        id="content-type-trainers" 
                        type="radio" 
                        name="content" 
                        value="trainers" 
                        checked={contentType === 'trainers'}
                        onChange={handleContentType}
                    />
                    <span>Treinadores</span>
                </Label>
            </ContainerRadios>

            {contentType === 'teams' && 
                <PortraitsLayout>
                    {!loading && teams.data && teams.data.length > 0 && teams.data.map((el, i) =>
                        <TeamPortrait
                            key={i}
                            trainer_name={findTrainer(el, teams.included).name}
                            trainer_image={findTrainer(el, teams.included).image}
                            pokemons={el.attributes.pokemons}
                        >
                            <AiOutlineEdit
                            
                                onClick={() =>  {
                                    const trainer = findTrainer(el, teams.included)
                                    history.push('/team/' + el.id, { 
                                        data_team: el, 
                                        data_pokemons: el.attributes.pokemons, 
                                        data_trainer: trainer }
                                    )}
                                } 
                                size="1em"
                                style={{ cursor: 'pointer', position: 'absolute', top: '0', right: '0', margin: '15px 35px 0px 0px' }}
                            />
                            <AiOutlineDelete 
                                onClick={() => {
                                    requestDelete('teams', el.id)
                                }}
                                size="1em"
                                style={{ cursor: 'pointer', position: 'absolute', top: '0', right: '0', margin: '15px 15px 0px 0px' }}
                            />
                        </TeamPortrait>

                    )}
                </PortraitsLayout>
            }

            {contentType === 'trainers' && 
                <PortraitsLayout>
                    {!loading && trainers.data && trainers.data.length > 0 && trainers.data.map((el, i) =>
                        <TrainerPortrait
                            key={i}
                            name={el.attributes.name}
                            image={el.attributes.image}
                        />
                    )}
                </PortraitsLayout>
            }
        </>
    )
}
