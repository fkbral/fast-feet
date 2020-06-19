import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import Button, { BackButton } from '~/components/Button';
import Input from '~/components/Input';
import Select from '~/components/Select';
import EditContainer from '~/components/EditContainer';

import { SelectGroup } from './styles';

export default function DeliveryEdit() {
  const params = useParams();
  const { id } = params;

  const formRef = useRef(null);
  const [defaultDeliveryman, setDefaultDeliveryman] = useState();
  const [defaultRecipient, setDefaultRecipient] = useState();
  const [delivery, setDelivery] = useState();

  useEffect(() => {
    async function fetchDelivery() {
      if (!id) return;

      const response = await api.get(`deliveries/${id}`);

      if (response) {
        setDelivery(response.data);
        const { deliveryman, recipient } = response.data;
        setDefaultDeliveryman({
          value: deliveryman.id,
          label: deliveryman.name,
        });
        setDefaultRecipient({
          value: recipient.id,
          label: recipient.name,
        });
      }
    }
    fetchDelivery();
  }, [id]);

  const handleSubmit = useCallback(
    async (data) => {
      const response = id
        ? await api.put(`deliveries/${id}`, data)
        : await api.post(`deliveries`, data);

      if (response) {
        const message = id
          ? 'Encomenda atualizada com sucesso'
          : 'Encomenda criada com sucesso';
        toast.success(message);
        if (!id) {
          history.goBack();
        }
      }
    },
    [id]
  );

  const handleSave = useCallback(() => {
    if (formRef.current) formRef.current.submitForm();
  }, [formRef]);

  function getOptions(response) {
    const results = [];
    response.data.map((resource) =>
      results.push({ value: resource.id, label: resource.name })
    );
    return results;
  }

  async function loadDeliverymen(name) {
    const response = await api.get(`deliverymen`, { params: { name } });
    return getOptions(response);
  }

  async function loadRecipient(name) {
    const response = await api.get(`recipients`, { params: { name } });
    return getOptions(response);
  }

  return (
    <div>
      <h1>
        Cadastro de encomendas
        <span>
          <BackButton>VOLTAR</BackButton>
          <Button icon="save" onClick={handleSave}>
            SALVAR
          </Button>
        </span>
      </h1>
      <EditContainer>
        <Form initialData={delivery} ref={formRef} onSubmit={handleSubmit}>
          <SelectGroup>
            {(defaultDeliveryman || !id) && (
              <Select
                label="Entregador"
                name="deliveryman_id"
                placeholder="José Rocha"
                defaultOptions
                loadOptions={loadDeliverymen}
                defaultValue={defaultDeliveryman}
              />
            )}
            {(defaultRecipient || !id) && (
              <Select
                label="Destinatário"
                name="recipient_id"
                placeholder="Li Yun"
                defaultOptions
                loadOptions={loadRecipient}
                defaultValue={defaultRecipient}
              />
            )}
          </SelectGroup>
          <Input label="Nome do produto" name="product" placeholder="Tênis" />
        </Form>
      </EditContainer>
    </div>
  );
}
