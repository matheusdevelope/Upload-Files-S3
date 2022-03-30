import styled from "styled-components";

export const Container = styled.div`
  margin: 5px 0;
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
  div {
    display: flex;
  }
  input {
    width: 100%;
  }
  label {
    display: flex;
    flex-direction: column;
  }
  .Div2 {
    display: flex;
    flex-direction: column;
    label {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    input {
      width: 30%;
    }
  }
`;

export const Button = styled.button``;
