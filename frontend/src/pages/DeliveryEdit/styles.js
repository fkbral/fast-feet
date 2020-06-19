import styled from 'styled-components';

export const SelectGroup = styled.div`
  display: flex;
  > div {
    max-width: 50%;
    flex: 1;
  }
  > div + div {
    margin-left: 30px;
  }
`;
