import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Input from '~/components/Input';
import Button, { BackButton } from '~/components/Button';

import EditContainer from '~/components/EditContainer';

import { Container, InputGroup1, InputGroup2 } from './styles';

export default function RecipientForm() {
  const params = useParams();
  const [recipient, setRecipient] = useState();
  const formRef = useRef(null);

  useEffect(() => {
    async function fetchRecipient() {
      const { id } = params;

      const response = await api.get(`recipients/${id}`);

      if (response) {
        const address = response.data.addresses[0];
        setRecipient({ ...response.data, ...address });
      }
    }
    fetchRecipient();
  }, [params]);

  const handleSubmit = useCallback(
    async (data) => {
      const { id } = params;

      const response = id
        ? await api.put(`recipients/${id}`, data)
        : await api.post(`recipients`, data);

      if (response) {
        const message = id
          ? 'Destinatário atualizado com sucesso'
          : 'Destinatário criado com sucesso';
        toast.success(message);
        if (!id) {
          history.goBack();
        }
      }
    },
    [params]
  );

  const handleSave = useCallback(() => {
    if (formRef.current) formRef.current.submitForm();
  }, [formRef]);

  return (
    <Container>
      <h1>
        Edição de destinatário
        <span>
          <BackButton>VOLTAR</BackButton>
          <Button icon="save" onClick={handleSave}>
            SALVAR
          </Button>
        </span>
      </h1>
      <EditContainer>
        <Form initialData={recipient} ref={formRef} onSubmit={handleSubmit}>
          <Input label="Nome" name="name" placeholder="nome completo" />
          <InputGroup1>
            <Input label="Rua" name="street" placeholder="Rua" />
            <Input label="Número" name="number" placeholder="Número da rua" />
            <Input
              label="Complemento"
              name="complement"
              placeholder="Complemento do endereço"
            />
          </InputGroup1>
          <InputGroup2>
            <Input label="Cidade" name="city" placeholder="Cidade" />
            <Input label="Estado" name="state" placeholder="Estado" />
            <Input label="CEP" name="zipcode" placeholder="CEP" />
          </InputGroup2>
        </Form>
      </EditContainer>
    </Container>
  );
}
