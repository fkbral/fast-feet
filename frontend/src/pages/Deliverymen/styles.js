import styled from 'styled-components';

export const Container = styled.div`
  td:last-child,
  th:last-child {
    width: 70px;
  }

  td:nth-child(4),
  th:nth-child(4),
  td:nth-child(3),
  th:nth-child(3) {
    width: 220px;
  }

  td:nth-child(3),
  th:nth-child(3) {
    flex: 1;
  }
`;
