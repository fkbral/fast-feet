import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';

import api from '~/services/api';

import { LinkAsButton } from '~/components/Button';
import Search from '~/components/Search';
import Table, {
  Avatar,
  AvatarPlaceHolder,
  Edit,
  Status,
} from '~/components/Table';
import Modal from '~/components/Modal';

import { Container, DeliverymanProfile } from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const modalRef = useRef();
  const [currentDelivery, setCurrentDelivery] = useState();

  useEffect(() => {
    async function fetchDeliveries() {
      const response = await api.get('/deliveries');

      if (response) {
        setDeliveries(response.data);
      }
    }
    fetchDeliveries();
  }, []);

  const handleSearch = useCallback(async ({ product }) => {
    const params = { product };
    const response = await api.get(`deliveries`, { params });

    if (response) {
      setDeliveries(response.data);
    }
  }, []);

  const afterDelete = useCallback(
    (id) => {
      setDeliveries(deliveries.filter((delivery) => delivery.id !== id));
    },
    [deliveries, setDeliveries]
  );

  return (
    <Container>
      <Modal ref={modalRef} data={currentDelivery}>
        <strong>Informações da encomenda</strong>
        {currentDelivery ? (
          <>
            <p>
              {currentDelivery.recipient.addresses[0].street},{' '}
              {currentDelivery.recipient.addresses[0].number}
            </p>
            <p>
              {currentDelivery.recipient.addresses[0].city} -{' '}
              {currentDelivery.recipient.addresses[0].state}
            </p>
            <p>{currentDelivery.recipient.addresses[0].zipcode}</p>
          </>
        ) : (
          ''
        )}
        <hr />
        <strong>Datas</strong>
        <br />
        <strong>Retirada:</strong>{' '}
        {currentDelivery && currentDelivery.start_date ? (
          currentDelivery.start_date_formatted
        ) : (
          <span>Pendente</span>
        )}
        <br />
        <strong>Entrega:</strong>{' '}
        {currentDelivery && currentDelivery.end_date ? (
          currentDelivery.end_date_formatted
        ) : (
          <span>Pendente</span>
        )}
        <hr />
        <strong>Assinatura do destinatário</strong>
        {currentDelivery && currentDelivery.signature_id ? (
          <img
            src={currentDelivery.signature.url}
            alt="assinatura do destinatário"
          />
        ) : (
          <p>
            A assinatura do destinatário estará disponível somente após a
            conclusão da entrega
          </p>
        )}
      </Modal>
      <h1>Gerenciando encomendas</h1>
      <div>
        <Form onSubmit={handleSearch}>
          <Search name="product" text="encomendas" />
        </Form>
        <LinkAsButton to="deliveries/create">CADASTRAR</LinkAsButton>
      </div>
      <Table>
        <>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destinatário</th>
              <th>Entregador</th>
              <th>Produto</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Status</th>
              <th>Açōes</th>
            </tr>
          </thead>
          <tbody>
            {deliveries
              ? deliveries.map((delivery) => {
                  const names = delivery.deliveryman
                    ? delivery.deliveryman.name.split(' ')
                    : ['', ''];
                  const initials =
                    names && names[0] && names[1]
                      ? names[0][0] + names[1][0]
                      : '';
                  return (
                    <tr key={delivery.id}>
                      <td>#{delivery.id}</td>
                      <td>{delivery.recipient && delivery.recipient.name}</td>
                      <td>
                        <DeliverymanProfile>
                          {delivery.deliveryman &&
                          delivery.deliveryman.avatar ? (
                            <Avatar src={delivery.deliveryman.avatar.url} />
                          ) : (
                            <AvatarPlaceHolder>
                              <span>{initials}</span>
                            </AvatarPlaceHolder>
                          )}

                          <span>
                            {delivery.deliveryman && delivery.deliveryman.name}
                          </span>
                        </DeliverymanProfile>
                      </td>
                      <td>{delivery.product}</td>
                      <td>
                        {delivery.recipient &&
                          delivery.recipient.addresses[0].city}
                      </td>
                      <td>
                        {delivery.recipient &&
                          delivery.recipient.addresses[0].state}
                      </td>
                      <td>
                        <Status type={delivery.status}>
                          <div />
                          <span>{delivery.status}</span>
                        </Status>
                      </td>
                      <td>
                        <Edit
                          afterDelete={() => afterDelete(delivery.id)}
                          beforeModalOpen={() => setCurrentDelivery(delivery)}
                          modalRef={modalRef}
                          resource={`/deliveries/${delivery.id}`}
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
