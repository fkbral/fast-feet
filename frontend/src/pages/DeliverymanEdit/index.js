import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Button, { BackButton } from '~/components/Button';
import Input from '~/components/Input';

import EditContainer from '~/components/EditContainer';
import AvatarInput from '~/components/AvatarInput';

export default function DeliverymanEdit() {
  const params = useParams();
  const { id } = params;

  const [deliveryman, setDeliveryman] = useState();
  const formRef = useRef(null);

  useEffect(() => {
    async function fetchDeliveryman() {
      if (!id) return;

      const response = await api.get(`deliverymen/${id}`);

      if (response) {
        setDeliveryman(response.data);
      }
    }
    fetchDeliveryman();
  }, []);

  const handleSubmit = useCallback(
    async (data) => {
      const response = id
        ? await api.put(`deliverymen/${id}`, data)
        : await api.post(`deliverymen`, data);

      if (response) {
        const message = id
          ? 'Entregador atualizado com sucesso'
          : 'Entregador criado com sucesso';
        toast.success(message);
        history.goBack();
      }
    },
    [id]
  );

  const handleSave = useCallback(() => {
    if (formRef.current) formRef.current.submitForm();
  }, [formRef]);

  return (
    <div>
      <h1>
        Cadastro de entregadores
        <span>
          <BackButton>VOLTAR</BackButton>
          <Button icon="save" onClick={handleSave}>
            SALVAR
          </Button>
        </span>
      </h1>
      <EditContainer>
        {(deliveryman || !id) && (
          <Form initialData={deliveryman} ref={formRef} onSubmit={handleSubmit}>
            <AvatarInput name="avatar_id" />
            <Input label="Nome" name="name" placeholder="nome completo" />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="exemplo@email.com"
            />
          </Form>
        )}
      </EditContainer>
    </div>
  );
}
