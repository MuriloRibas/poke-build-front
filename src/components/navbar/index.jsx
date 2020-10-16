import React from 'react'
import styled from 'styled-components';
import { CgPokemon } from 'react-icons/cg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Container = styled.nav`
    height: 65px;
    display: flex;
    align-items: center;
    padding: 0px 25px;
    background-color: whitesmoke;
    color: white;
    z-index: 2;
    & > * {
        z-index: 999;
    }
    & > :not(:first-child) {
        margin-left: 20px;
    }
`;

export const Navbar = ({ redirect }) => {

    return (
        <Container>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CgPokemon size="2em"/>
            </Link>
            <Link to="/">
                <span>Home</span>
            </Link>
            <Link to="/start">
                <span>Começar</span>
            </Link>
        </Container>
    )
}
