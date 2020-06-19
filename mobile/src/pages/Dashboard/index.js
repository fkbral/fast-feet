import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';

import { SafeAreaView, View } from 'react-native';
import {
  Container,
  Delivery,
  DeliveryList,
  DeliveryDetails,
  DetailsButton,
  DetailsText,
  DeliveryName,
  DeliveryStatus,
  Filter,
  Header,
  HorizontalView,
  HorizontalViewSpaced,
  Line,
  LogOut,
  PicturePlaceHolder,
  Profile,
  ProfilePicture,
  ProfilePictureEmpty,
  Point,
  Small,
  SmallDetails,
  Strong,
  Text,
  Timeline,
  Title,
  TruckIcon,
} from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);
  const [deliveries, setDeliveries] = useState([]);
  const [finishedDeliveries, setFinishedDeliveries] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [filterDelivered, setFilterDelivered] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function getDeliveries() {
      try {
        const response = await api.get(`deliverymen/${user.id}/deliveries`);

        if (response) {
          setDeliveries(response.data);
          setFinishedDeliveries(
            response.data.filter(delivery => delivery.status === 'Entregue'),
          );
          setPendingDeliveries(
            response.data.filter(delivery => delivery.status !== 'Entregue'),
          );
        }
        setRefreshing(false);
      } catch (error) {
        setRefreshing(false);
      }
    }
    if (deliveries.length === 0) {
      getDeliveries();
    }
  }, [deliveries, finishedDeliveries, user]);

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  const handleDetails = useCallback(
    ({ delivery }) => {
      navigation.navigate('DeliveryDetails', { delivery });
    },
    [navigation],
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setDeliveries([]);
  }, []);

  return (
    <Container>
      <SafeAreaView>
        <Header>
          <Profile>
            {user && user.avatar ? (
              <ProfilePicture
                source={{
                  uri: `http://192.168.1.119:3333/files/${user.avatar.path}`,
                }}
              />
            ) : (
              <ProfilePictureEmpty>
                <PicturePlaceHolder>{user && user.initials}</PicturePlaceHolder>
              </ProfilePictureEmpty>
            )}

            <View>
              <Text>Bem vindo de volta,</Text>
              <Title>{user && user.name}</Title>
            </View>
          </Profile>

          <LogOut onPress={handleLogout} />
        </Header>

        <HorizontalViewSpaced center>
          <Title>Entregas</Title>
          <HorizontalView alignEnd>
            <Filter
              active={!filterDelivered}
              onPress={() => setFilterDelivered(false)}
            >
              Pendentes
            </Filter>
            <Filter
              active={filterDelivered}
              onPress={() => setFilterDelivered(true)}
              delivered
            >
              Entregues
            </Filter>
          </HorizontalView>
        </HorizontalViewSpaced>

        <DeliveryList
          data={!filterDelivered ? pendingDeliveries : finishedDeliveries}
          keyExtractor={delivery => delivery.id.toString()}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <Delivery>
              <DeliveryStatus>
                <View>
                  <HorizontalView>
                    <TruckIcon />
                    <DeliveryName>{item.product}</DeliveryName>
                  </HorizontalView>
                  <Timeline>
                    <Line />
                    <HorizontalViewSpaced>
                      <View>
                        <Point active />
                        <Small>Aguardando Retirada</Small>
                      </View>
                      <View>
                        <Point
                          active={
                            item.status === 'Retirada' ||
                            item.status === 'Entregue'
                              ? true
                              : false
                          }
                        />
                        <Small>Retirada</Small>
                      </View>
                      <View>
                        <Point
                          active={item.status === 'Entregue' ? true : false}
                        />
                        <Small>Entregue</Small>
                      </View>
                    </HorizontalViewSpaced>
                  </Timeline>
                </View>
              </DeliveryStatus>
              <DeliveryDetails>
                <View>
                  <SmallDetails>Data</SmallDetails>
                  <Strong>{item.created_at_formatted}</Strong>
                </View>
                <View>
                  <SmallDetails>Cidade</SmallDetails>
                  <Strong>{item.recipient.addresses[0].city}</Strong>
                </View>
                <DetailsButton
                  onPress={() => handleDetails({ delivery: item })}
                >
                  <DetailsText>Ver detalhes</DetailsText>
                </DetailsButton>
              </DeliveryDetails>
            </Delivery>
          )}
        />
      </SafeAreaView>
    </Container>
  );
}
