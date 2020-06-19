import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import { useSelector } from 'react-redux';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Logo } from './styles';

import logoImg from '../../assets/fastfeet-logo.png';

export default function Sign() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = useCallback(
    data => {
      dispatch(signInRequest(id));
    },
    [dispatch, id],
  );

  return (
    <Container>
      <Logo source={logoImg} />
      <Input
        name="id"
        placeholder="Informe seu ID de cadastro"
        onChangeText={e => setId(e)}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
      />
      <Button onPress={handleSubmit} color="#82BF18" loading={loading}>
        Entrar no sistema
      </Button>
    </Container>
  );
}
