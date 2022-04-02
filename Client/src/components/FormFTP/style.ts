import styled from "styled-components";

export const Container = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
`;

export const Header = styled.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`;
export const Form = styled.div`
  padding: 4px;
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
  .port {
    margin-left: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 90px;
    input {
      margin-left: 4px;
    }
  }
  .Div2 {
    display: flex;
    flex-direction: column;
    label {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    input {
      margin: auto 4px;
      width: fit-content;
      max-width: 50px;
    }
  }
`;

export const Button = styled.button`
  margin: 4px 8px;
`;
