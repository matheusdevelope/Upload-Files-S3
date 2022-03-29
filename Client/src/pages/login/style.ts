import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  form {
    margin: auto;
  }
  label {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
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
