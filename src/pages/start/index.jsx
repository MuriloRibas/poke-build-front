import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import CreateTrainer from '../../components/create_trainer';
import { ManageTeam } from '../../components/create_team/index';
import { IoMdArrowBack } from 'react-icons/io'
import Axios from 'axios';
import { DataContext } from '../../App';

const Container = styled.div` 
    display: flex;
    width: 100%;
    height: 90vh;
    justify-content: center;
    align-items: center;
`;


export const Start = () => {
    const { data, addToTeam, removeToTeam, requestSearchPokemon } = useContext(DataContext)

    const [step, setStep] = useState(1)
    const [inputs, setInputs] = useState(localStorage.getItem('trainer') || {
        name: '',
        age: 18,
        gender: 'Male',
        image: ''
    })

    const handleSubmitNewTrainer = (e) => {
        e.preventDefault();
        const { name, age, gender, image } = inputs
        Axios.post(process.env.REACT_APP_API_URL + '/trainers', {
            name,
            age,
            gender,
            image
        })
            .then(res => {
                setLocalstorageJsonData('trainer', { ...res.data.data.attributes, id: res.data.data.id })    
                setStep(2)
            })
            .catch(err => console.log('Erro!: ', err))
       
    }

    const handleNewTeam = (e) => {
        Axios.post(process.env.REACT_APP_API_URL + '/teams', {
            trainer_id: JSON.parse(localStorage.getItem('trainer')).id,
            pokemons: data.team
        })
            .then(res => alert('Equipe criada com sucesso!'))
            .catch(err => console.log('erro>>: ', err))
    
    }

    const setLocalstorageJsonData = (key, val) => localStorage.setItem(key, JSON.stringify(val))

    useEffect(() => {
        if (step > 1) {
            localStorage.setItem('step', step)
        }
    }, [step])

    useEffect(() => {
        if (localStorage.getItem('step')) {
            setStep(parseInt(localStorage.getItem('step')))
        }

        if (localStorage.getItem('trainer')) {
            setInputs(JSON.parse(localStorage.getItem('trainer')))
        }
    }, [])

    return (
        <Container>
            {step === 1 &&
                <CreateTrainer 
                    name={inputs.name}
                    age={inputs.age}
                    gender={inputs.gender}
                    image={inputs.image}
                    change={e => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                    submit={handleSubmitNewTrainer}
                />
            }

            {step === 2 &&
                <>
                    <IoMdArrowBack 
                        style={{ position: 'absolute', bottom: '0', left: '0', margin: '40px', cursor: 'pointer' }}
                        size="2em"
                        onClick={() => setStep(1)}
                    />

                    <ManageTeam
                        trainer_name={inputs.name}
                        trainer_image={inputs.image}
                        submit={handleNewTeam}
                    />
                    

                </>
            }
        </Container>
    )
}
