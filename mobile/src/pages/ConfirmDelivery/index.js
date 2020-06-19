import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Alert, Platform } from 'react-native';

import api from '~/services/api';

import axios from 'axios';

import Background from '~/components/Background';
import Button from '~/components/Button';

import {
  Container,
  Content,
  PhotoPreview,
  Shutter,
  Icon,
  NativeCamera,
} from './styles';

export default function ConfirmDelivery() {
  const cameraRef = useRef(null);
  const route = useRoute();
  const navigation = useNavigation();
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [picture, setPicture] = useState({});
  const [loading, setLoading] = useState(false);
  const delivery_id = route.params.id;
  const deliveryman_id = useSelector(state => state.user.profile.id);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  const checkPermissions = useCallback(() => {
    const type =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    check(type)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            request(type).then(r => {
              if (r === 'granted') {
                setCameraAllowed(true);
              }
            });
            break;
          case RESULTS.GRANTED:
            setCameraAllowed(true);
            break;
          case RESULTS.BLOCKED:
            break;
        }
      })
      .catch(error => {});
  }, []);

  const handlePictureTaken = useCallback(async () => {
    if (cameraRef) {
      const options = {
        fixOrientation: true,
      };
      const pic = await cameraRef.current.takePictureAsync(options);
      if (pic) {
        const arrName = pic.uri.split('/');
        const arrType = pic.uri.split('.');
        const name = arrName[arrName.length - 1];
        const type = 'image/' + arrType[arrType.length - 1];

        const uri = pic.uri;

        setPicture({
          uri: uri,
          name: name,
          type: type,
        });
      }
    }
  }, [cameraRef]);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append('file', {
        uri: picture.uri,
        type: picture.type,
        name: picture.name,
      });

      const upload = await api.post('files', data);

      if (upload) {
        const { id } = upload.data;

        const response = api.post(`/delivery/${delivery_id}/confirm-delivery`, {
          signature_id: id,
          deliveryman_id,
        });

        if (response) {
          setLoading(false);
          Alert.alert('Entrega concluída com sucesso!');
          navigation.goBack();
        }
      }
    } catch (error) {
      setLoading(false);
    }
  }, [
    delivery_id,
    deliveryman_id,
    navigation,
    picture.name,
    picture.type,
    picture.uri,
  ]);

  return (
    <Container>
      <Background />
      <Content>
        <PhotoPreview>
          {cameraAllowed ? (
            <NativeCamera
              ref={cameraRef}
              onPictureTaken={() => cameraRef.current.pausePreview()}
            />
          ) : null}
          <Shutter onPress={handlePictureTaken}>
            <Icon />
          </Shutter>
        </PhotoPreview>
        <Button onPress={handleSubmit} color="#7D40E7" loading={loading}>
          Enviar
        </Button>
      </Content>
    </Container>
  );
}
