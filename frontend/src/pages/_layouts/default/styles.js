import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  h1 {
    margin: 34px 0;
    font-size: 24px;
    color: #444;
    + div {
      display: flex;
      justify-content: space-between;
    }
  }
`;
