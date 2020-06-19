import React, { useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/web';

import api from '~/services/api';

import { LinkAsButton } from '~/components/Button';
import Search from '~/components/Search';
import Table, { Edit } from '~/components/Table';

import { Container } from './styles';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function fetchDeliveries() {
      const response = await api.get('/recipients');

      if (response) {
        setRecipients(response.data);
      }
    }
    fetchDeliveries();
  }, []);

  const handleSearch = useCallback(
    async ({ name }) => {
      const params = { name };
      const response = await api.get(`recipients`, { params });

      if (response) {
        setRecipients(response.data);
      }
    },
    [setRecipients]
  );

  const afterDelete = useCallback(
    (id) => {
      setRecipients(recipients.filter((recipient) => recipient.id !== id));
    },
    [recipients, setRecipients]
  );

  return (
    <Container>
      <h1>Página de destinatários</h1>
      <div>
        <Form onSubmit={handleSearch}>
          <Search name="name" text="destinatários" />
        </Form>
        <LinkAsButton to="recipients/create">CADASTRAR</LinkAsButton>
      </div>
      <Table>
        <>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Açōes</th>
            </tr>
          </thead>
          <tbody>
            {recipients
              ? recipients.map((recipient) => {
                  return (
                    <tr key={recipient.id}>
                      <td>#{recipient.id}</td>
                      <td>{recipient.name}</td>
                      <td>{`${recipient.addresses[0].street},
                     ${recipient.addresses[0].number},
                      ${recipient.addresses[0].city} -
                       ${recipient.addresses[0].state}`}</td>
                      <td>
                        <Edit
                          afterDelete={() => afterDelete(recipient.id)}
                          resource={`/recipients/${recipient.id}`}
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
