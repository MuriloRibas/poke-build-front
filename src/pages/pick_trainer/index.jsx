import React, { useState, useEffect } from 'react'
import { PortraitsLayout } from '../../components/portraits_layout'
import { useContext } from 'react/cjs/react.development'
import { DataContext } from '../../routes/index';
import styled from 'styled-components';
import { IoMdArrowBack } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';

const Container = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const PickTrainer = () => {
    const [step, setStep] = useState(1) 
    const [search, setSearch] = useState('') 
    const [trainer, setTrainer] = useState({})
    const data = useContext(DataContext)

    const handleTrainerClick = (name, image, id) => {
        setTrainer({ name, image, id })
        setStep(2)
    } 

    const handleNewTeam = (e) => {
        Axios.post('http://localhost:3000/api/v1/teams', {
            trainer_id: JSON.parse(localStorage.getItem('trainer')).id,
            pokemons: data.team
        })
            .then(res => alert('Equipe criada com sucesso!'))
            .catch(err => console.log('erro>>: ', err))
    
    }
    
    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <Container>
            { step === 1 &&
                <>
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
                    <PortraitsLayout>
                        { data.trainers &&  data.trainers.data.map((el, i) =>
                            <TrainerPortrait
                                name={el.attributes.name}
                                image={el.attributes.image}
                                onClick={() => handleTrainerClick(el.attributes.name, el.attributes.image, el.id)}
                            />
                        )}
                    </PortraitsLayout>
                </>
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
