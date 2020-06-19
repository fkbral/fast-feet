import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Menu, Profile, NavLink } from './styles';

import logo from '../../assets/fastfeet-logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
    history.push('/');
  }

  return (
    <Container>
      <Menu>
        <img src={logo} alt="Fast Feet" />
        <div />
        <ul>
          <NavLink to="/deliveries">Encomendas</NavLink>
          <NavLink to="/deliverymen">Entregadores</NavLink>
          <NavLink to="/recipients">Destinatários</NavLink>
          <NavLink to="/problems">Problemas</NavLink>
        </ul>
      </Menu>
      <Profile>
        <p>{user.name}</p>
        <button type="button" onClick={handleLogout}>
          sair do sistema
        </button>
      </Profile>
    </Container>
  );
}
