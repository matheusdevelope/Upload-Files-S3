import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
  border-right: 1px #ddd solid;
`;

export const Header = styled.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`;
export const Form = styled.div`
  label {
    display: flex;
    flex-direction: column;
  }
`;

export const Button = styled.button``;
