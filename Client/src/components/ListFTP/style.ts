import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Header = styled.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`;

export const Tittles = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px #000 solid;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    border-right: #ddd 1px solid;
    padding: 0 8px;
  }
`;
export const LineFTP = styled.div`
  /* display: flex; */
  width: 100%;
  min-height: 30px;
  border-bottom: 1px #ddd solid;
  padding: 4px;
  p,
  input,
  label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto 0;
    flex: 1;
    text-align: start;
    input {
      margin: 0 4px;
    }
  }
  div {
    margin: auto;
    display: flex;
    flex: 1;
  }
  button {
    margin: auto 4px;
    width: 50px;
  }

  .user,
  .pass,
  .port,
  .order {
    margin: auto 4px;
    max-width: 50px;
  }
`;
