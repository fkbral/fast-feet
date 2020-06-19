import React from 'react';

import { ActivityIndicator } from 'react-native';
import { Container, Text } from './styles';

export default function Button({ children, color, loading, ...rest }) {
  return (
    <Container style={{ backgroundColor: color }} loading={loading} {...rest}>
      {loading ? (
        <ActivityIndicator size={24} color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}
