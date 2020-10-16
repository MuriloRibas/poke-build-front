import styled, { css } from 'styled-components';

export const Pokemon = styled.div`
    position: relative;
    height: 80px;
    width: 80px;
    font-size: 14px;
    text-align: center;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 5px 5px 5px 0px;
    transition: background-color 0.5s;
    &:hover {
        ${props => props.add_animation &&
            css`
                cursor: pointer;
                background-color: whitesmoke;
                &:before {
                    position: absolute;
                    content: "+";
                    top:0;
                    left: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    font-size: 24px;
                    text-shadow: 1px 1px black;
                    color: forestgreen;
                }
            `
        }

        ${props => props.remove_animation &&
            css`
                cursor: pointer;
                background-color: whitesmoke;
                &:before {
                    position: absolute;
                    content: "-";
                    top:0;
                    left: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    font-size: 24px;
                    text-shadow: 1px 1px black;
                    color: tomato;
                }
            `
        }
    }
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${props => props.image });
        background-size: cover;
    }
`
