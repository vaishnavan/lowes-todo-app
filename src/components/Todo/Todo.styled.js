/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const StyledOuterFlow = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 15px;
  height: 60vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;
