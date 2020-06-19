import styled from 'styled-components';

import { NavLink as NavRouterDom } from 'react-router-dom';

export const Container = styled.header`
  width: 100%;
  height: 64px;
  padding: 0 30px;
  border-bottom: 1px solid #dddddd;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Menu = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 26px;
    width: auto;
  }
  div {
    height: 32px;
    margin: 0 30px;
    border-right: 1px solid #ddd;
  }
  ul {
    list-style: none;
    display: flex;
  }
`;

export const NavLink = styled(NavRouterDom)`
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  color: #999;
  & + & {
    margin-left: 21px;
  }
  &.active {
    color: #444;
  }
`;

export const Profile = styled.div`
  p:first-child {
    font-weight: 700;
  }
  p {
    font-size: 14px;
  }
  p + button {
    margin-top: 5px;
    color: #de3b3b;
    background: transparent;
    font-size: 14px;
  }
`;
