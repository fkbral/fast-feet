import styled from 'styled-components';

export const Container = styled.div`
  td:first-child,
  th:first-child,
  td:last-child,
  th:last-child {
    width: 70px;
  }
  td:nth-child(2),
  th:nth-child(2) {
    width: 240px;
  }
  td:nth-child(3),
  th:nth-child(3) {
    width: 420px;
    flex: 1;
  }
`;
