import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import Input from '../../components/Input';

import { Container, LoginBox, SubmitButton } from './styles';

import logo from '../../assets/fastfeet-logo@2x.png';

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um email válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      dispatch(signInRequest(email, password));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <Container>
      <LoginBox>
        <img src={logo} alt="Fast Feet" />
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Input
            label="SEU E-MAIL"
            name="email"
            type="email"
            placeholder="exemplo@email.com"
          />
          <Input
            label="SUA SENHA"
            name="password"
            type="password"
            placeholder="*************"
          />
          <SubmitButton>
            {loading ? 'Carregando...' : 'Entrar no sistema'}
          </SubmitButton>
        </Form>
      </LoginBox>
    </Container>
  );
}
