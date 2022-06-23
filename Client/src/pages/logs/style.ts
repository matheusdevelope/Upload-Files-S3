import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  width:100%
  align-items: center;
  justify-content: space-between;
  button {
    font-size:16px;
    height: 30px;
  }
  .logs_div{
    height: 85vh;
      word-wrap: break-word;
      overflow-y: auto;
  }
  .footer{
    width:100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding:10px;

  p{
    font-size: 14px;
    margin:0 30px;
  }
 

  label {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
  }
  input {
    font-size: 16px;
    width: 150px;
    height: 22px;
  }
  button {
    width: 150px;
    height: 22px;
  }
  }
  


`;
