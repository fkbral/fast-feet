import React, { useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/web';

import api from '~/services/api';

import { LinkAsButton } from '~/components/Button';
import Search from '~/components/Search';
import Table, { Avatar, AvatarPlaceHolder, Edit } from '~/components/Table';

import { Container } from './styles';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);

  useEffect(() => {
    async function fetchDeliveries() {
      const response = await api.get('/deliverymen');

      if (response) {
        setDeliverymen(response.data);
      }
    }
    fetchDeliveries();
  }, []);

  const handleSearch = useCallback(async ({ name }) => {
    const params = { name };
    const response = await api.get(`deliverymen`, { params });

    if (response) {
      setDeliverymen(response.data);
    }
  }, []);

  const afterDelete = useCallback(
    (id) => {
      setDeliverymen(
        deliverymen.filter((deliveryman) => deliveryman.id !== id)
      );
    },
    [deliverymen, setDeliverymen]
  );

  return (
    <Container>
      <h1>Gerenciando Entregadores</h1>
      <div>
        <Form onSubmit={handleSearch}>
          <Search name="name" text="entregadores" />
        </Form>
        <LinkAsButton to="deliverymen/create">CADASTRAR</LinkAsButton>
      </div>
      <Table>
        <>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Açōes</th>
            </tr>
          </thead>
          <tbody>
            {deliverymen
              ? deliverymen.map((deliveryman) => {
                  const names = deliveryman.name.split(' ');
                  const initials =
                    names && names[0] && names[1]
                      ? names[0][0] + names[1][0]
                      : '';

                  return (
                    <tr key={deliveryman.id}>
                      <td>#{deliveryman.id}</td>
                      <td>
                        {deliveryman.avatar ? (
                          <Avatar src={deliveryman.avatar.url} />
                        ) : (
                          <AvatarPlaceHolder>
                            <span>{initials}</span>
                          </AvatarPlaceHolder>
                        )}
                      </td>
                      <td>{deliveryman.name}</td>
                      <td>{deliveryman.email}</td>
                      <td>
                        <Edit
                          afterDelete={() => afterDelete(deliveryman.id)}
                          resource={`/deliverymen/${deliveryman.id}`}
                        />
                      </td>
                    </tr>
                  );
                })
              : ''}
          </tbody>
        </>
      </Table>
    </Container>
  );
}
