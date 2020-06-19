import styled from 'styled-components';
import { darken } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled.button`
  height: 36px;
  padding: 0 16px;
  background-color: ${(props) => (props.back ? '#cccccc' : '#7d40e7')};
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  margin-right: ${(props) => (props.back ? '16px' : '0px')};

  span {
    margin-left: 7px;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
  }

  svg {
    font-size: 22px;
    color: #fff;
  }

  &:hover {
    background-color: ${(props) =>
      props.back ? darken(0.15, '#cccccc') : darken(0.15, '#7d40e7')};
  }
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
`;
