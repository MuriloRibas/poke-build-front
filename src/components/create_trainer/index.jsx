import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';

const Form = styled.form`
    position: relative;
    padding: 15px;
    width: 400px;
    background-color: white;
    margin-left: 400px;
    border: 1px solid gray;
    border-left: none;
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 400px;
        height: 100%;
        background: url(${require('../../assets/trainer.png')});
        background-size: cover;
        border: 1px solid gray;
        border-right: none;

    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.direction || 'column'};
    margin: ${props => props.margin || '10px 0px'};
`

const InputText = styled.input`

`

const InputSubmit = styled.input`
    border: none;
    font-weight: bold;
    color: white;
    background-color: #3B4CCA;
    border-radius: 15px;
    transition: opacity 0.25s;
    padding: 10px;
    box-shadow: 0px 0px 15px 0px black;
    position: absolute;
    right: 2%;
    bottom: 2%;
  &:hover {
      cursor: pointer;
      opacity: 0.7;
  }
`

const Label = styled.label`

`

const CreateTrainer = ({ name, age, gender, image, change, submit }) => {

    const history = useHistory()

    return (
        <Form onSubmit={submit}>
                
            <h1>Crie seu treinador</h1>
            <p>Antes de montar sua equipe, crie um treinador pokemon.</p>

            <InputContainer>
                <Label htmlFor="name">Nome:</Label>
                <InputText 
                    id="name" 
                    type="text" 
                    placeholder="Nome" 
                    name="name" 
                    value={name} 
                    onChange={change} 
                    required
                />
            </InputContainer>

            <InputContainer>
                <Label htmlFor="age">Idade:</Label>
                <input 
                    id="age" 
                    name="age" 
                    type="number" 
                    value={age}
                    placeholder="Idade" 
                    onChange={change} 
                    required
                />
            </InputContainer>


            <InputContainer>
                <Label htmlFor="image">Link de sua imagem:</Label>
                <input 
                    type="text" 
                    id="image" 
                    name="image" 
                    value={image}
                    onChange={change}
                />
            </InputContainer>

            <InputContainer>
                <InputContainer direction="row" margin="5px 0px">
                    <input 
                        id="gender-male" 
                        type="radio" 
                        name="gender" 
                        value="Male" 
                        checked={gender === 'Male'}
                        onChange={change}
                    />
                    <Label htmlFor="gender-male">Masculino</Label>
                </InputContainer>
                <InputContainer direction="row" margin="5px 0px">
                    <input 
                        id="gender-female" 
                        type="radio" 
                        name="gender" 
                        value="Female" 
                        checked={gender === 'Female'}
                        onChange={change}
                    />
                    <Label htmlFor="gender-female">Feminino</Label>
                </InputContainer>
            </InputContainer>
            
            <InputSubmit type="submit" value="Continuar"/>
            {/* <button onClick={() => history.push('/pick_trainer') }>Escolher um treinador</button> */}

        </Form>
    )
}

export default CreateTrainer
