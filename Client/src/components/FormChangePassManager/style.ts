import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 8px;
  form {
    margin: 16px;
  }
  label {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    font-size: 16px;
  }
  input {
    font-size: 18px;
    margin: 4px 0;
  }
  button {
    margin-top: 10px;
    width: 100%;
    height: 30px;
  }
`;
