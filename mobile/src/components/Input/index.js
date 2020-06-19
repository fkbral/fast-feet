import React from 'react';

import { Container, TextInput } from './styles';

function Input({ name, placeholder, ...rest }) {
  return (
    <Container>
      <TextInput placeholder={placeholder} {...rest} />
    </Container>
  );
}

export default Input;
