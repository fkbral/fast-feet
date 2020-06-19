import styled from 'styled-components';

export const Container = styled.div`
  td:first-child,
  th:first-child,
  td:last-child,
  th:last-child {
    width: 70px;
  }
  td:nth-child(2),
  th:nth-child(2),
  td:nth-child(3),
  th:nth-child(3) {
    width: 220px;
  }
  td + td,
  th + th {
    width: 140px;
  }
  td:nth-child(7),
  th:nth-child(7) {
    flex: 1;
  }
`;

export const DeliverymanProfile = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 5px;
  }
  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
