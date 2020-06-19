import React, { useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import Background from '~/components/Background';

import {
  Container,
  Content,
  Details,
  Label,
  Value,
  Actions,
  Action,
  Icon,
  Type,
  Dates,
  Date,
  Section,
  SectionTitle,
  Separator,
} from './styles';

export default function DeliveryDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const delivery = route.params.delivery;

  const handleReportProblem = useCallback(() => {
    navigation.navigate('ReportProblem', { id: delivery.id });
  }, [delivery.id, navigation]);

  const handleCheckProblems = useCallback(() => {
    navigation.navigate('ListProblems', {
      id: delivery.id,
      product: delivery.product,
    });
  }, [delivery.id, delivery.product, navigation]);

  const handleConfirmDelivery = useCallback(() => {
    navigation.navigate('ConfirmDelivery', { id: delivery.id });
  }, [delivery.id, navigation]);

  return (
    <Container>
      <Background />
      <Content>
        <Details>
          <Section>
            <Icon name="truck" color="#7D40E7" />
            <SectionTitle>Informações da entrega</SectionTitle>
          </Section>
          <Label>DESTINATÁRIO</Label>
          <Value>{delivery.recipient.name}</Value>
          <Label>ENDEREÇO DE ENTREGA</Label>
          <Value>
            {delivery.recipient.addresses[0].street},{' '}
            {delivery.recipient.addresses[0].number},{' '}
            {delivery.recipient.addresses[0].city} -{' '}
            {delivery.recipient.addresses[0].state},{' '}
            {delivery.recipient.addresses[0].zipcode}
          </Value>
          <Label>PRODUTO</Label>
          <Value>{delivery.product}</Value>
        </Details>
        <Details>
          <Section>
            <Icon name="calendar-today" color="#7D40E7" />
            <SectionTitle>Situação da entrega</SectionTitle>
          </Section>
          <Label>STATUS</Label>
          <Value>{delivery.status}</Value>
          <Dates>
            <Date>
              <Label>DATA DE RETIRADA</Label>
              <Value>
                {delivery.start_date_formatted
                  ? delivery.start_date_formatted
                  : '--/--/--'}
              </Value>
            </Date>
            <Date>
              <Label>DATA DE ENTREGA</Label>
              <Value>
                {delivery.end_date_formatted
                  ? delivery.end_date_formatted
                  : '--/--/--'}
              </Value>
            </Date>
          </Dates>
        </Details>
        <Actions>
          <Action onPress={handleReportProblem}>
            <Icon name="close-circle-outline" color="#E74040" />
            <Type>Informar{'\n'}Problema</Type>
          </Action>
          <Separator />
          <Action onPress={handleCheckProblems}>
            <Icon name="information-outline" color="#E7BA40" />
            <Type>Visualizar{'\n'}Problemas</Type>
          </Action>
          <Separator />
          <Action onPress={handleConfirmDelivery}>
            <Icon name="check-circle-outline" color="#7D40E7" />
            <Type>Confirmar{'\n'}Entrega</Type>
          </Action>
        </Actions>
      </Content>
    </Container>
  );
}
