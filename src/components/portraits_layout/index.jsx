import React from 'react'
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    max-width: 100%;
    padding: 15px;
`;


export const PortraitsLayout = (props) => {
    return (
        <Container>
            { props.children }
        </Container>
    )
}
