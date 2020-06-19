import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';
import Button from '~/components/Button';

import { Container, Content, ProblemInput } from './styles';

export default function ReportProblem() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [description, setDescription] = useState('');

  // Vizinha disse que nao ve o destinatario ha mais de dois meses

  const handleSubmit = useCallback(async () => {
    if (description.length > 0) {
      const response = await api.post(`delivery/${id}/problems`, {
        description,
      });
      if (response) {
        navigation.goBack();
      }
    }
  }, [description, id, navigation]);

  return (
    <Container>
      <Background />
      <Content>
        <ProblemInput
          autoCorrect={false}
          onChangeText={setDescription}
          placeholder="Informe aqui o problema que aconteceu na entrega"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <Button onPress={handleSubmit} color="#7D40E7">
          Enviar
        </Button>
      </Content>
    </Container>
  );
}
