import styled from 'styled-components';

export const Container = styled.div.attrs({ type: 'text' })`
  label {
    display: block;
    margin-bottom: 9px;
    font-weight: 700;
    color: #444;
  }
  input {
    height: 45px;
    width: 100%;
    padding: 12px 15px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    font-size: 16px;
  }
  span.error {
    color: #e74040;
  }
`;
