import styled from 'styled-components';

export const Container = styled.div`
  input {
    min-width: 140px;
  }
`;

export const InputGroup1 = styled.div`
  width: 100%;
  display: flex;
  div:first-child {
    flex: 1;
    width: 100%;
  }
  div + div {
    margin-left: 16px;
  }
`;

export const InputGroup2 = styled.div`
  width: 100%;
  display: flex;
  div {
    flex: 1;
  }
  div + div {
    margin-left: 16px;
  }
`;
