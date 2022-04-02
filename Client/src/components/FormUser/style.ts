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
  padding: 0 4px;
  label {
    display: flex;
    flex-direction: column;
  }
  .allow_access {
    flex-direction: row;
    align-items: center;
    input {
      margin: auto 4px;
    }
  }

  .label_expiration_files {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0;
    input {
      margin: auto 0;
      max-width: 40px;
    }
  }
`;

export const Button = styled.button`
  height: 30px;
  margin: 8px;
`;
