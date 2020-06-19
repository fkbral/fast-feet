import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  Content,
  Product,
  ProblemList,
  Problem,
  ProblemName,
  ProblemDate,
} from './styles';

export default function ListProblems() {
  const route = useRoute();
  const { product, id } = route.params;
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function getProblems() {
      if (id) {
        const response = await api.get(`delivery/${id}/problems`);
        if (response) {
          setProblems(response.data);
        }
      }
    }
    getProblems();
  }, [id]);

  return (
    <Container>
      <Background />
      <Content>
        <Product>{product}</Product>
        <ProblemList
          data={problems}
          keyExtractor={problem => problem.id.toString()}
          renderItem={({ item }) => (
            <Problem>
              <ProblemName>{item.description}</ProblemName>
              <ProblemDate>{item.date}</ProblemDate>
            </Problem>
          )}
        />
      </Content>
    </Container>
  );
}
