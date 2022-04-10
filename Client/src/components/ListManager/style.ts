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
export const LineUser = styled.div`
  display: flex;
  width: 100%;
  min-height: 30px;
  border-bottom: 1px #ddd solid;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto;
    flex: 1;
    padding: 0 8px;
  }
  div {
    margin: auto;
    display: flex;
    flex: 1;
    padding: 0 8px;
    justify-content: space-around;
  }
  select {
    width: 100%;
  }
`;
