import styled from 'styled-components';

export const BtnPrimary = styled.button`
  border: none;
  font-weight: bold;
  color: white;
  background-color: #3B4CCA;
  border-radius: 15px;
  transition: opacity 0.25s;
padding: 10px;
box-shadow: 0px 0px 15px 0px black;
  &:hover {
      cursor: pointer;
      opacity: 0.7;
  }
`;