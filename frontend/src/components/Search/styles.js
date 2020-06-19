import styled from 'styled-components';
import { MdSearch as IconMd } from 'react-icons/md';

export const Container = styled.span`
  width: 238px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0 16px 0 16px;
  background-color: #fff;
  display: inline-flex;
  align-items: center;

  input {
    border: none;
    margin-left: 8px;
    font-size: 14px;
    flex: 1;
  }
`;

export const Icon = styled(IconMd).attrs({
  size: 22,
})``;
