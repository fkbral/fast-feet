import styled from 'styled-components';

export const Container = styled.div.attrs()`
  label {
    display: block;
    margin-bottom: 9px;
    font-weight: 700;
    color: #444;
  }
  .react-select-container {
    border: 1px solid #dddddd;
  }
  .react-select__indicator-separator {
    width: 0;
  }
  .react-select__placeholder {
    color: #999;
  }
  .react-select__indicator > svg {
    color: #ddd;
  }
  .react-select__value-container {
    height: 45px;
    width: 100%;
    padding: 12px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;
