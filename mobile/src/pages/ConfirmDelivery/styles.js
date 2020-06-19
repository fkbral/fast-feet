import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #fff;
`;

export const PhotoPreview = styled.View`
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #ddd;
  flex-grow: 1;
  flex-basis: 90%;
`;

export const Shutter = styled.TouchableOpacity`
  width: 62px;
  height: 62px;
  border-radius: 32px;
  background-color: #0000004d;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-31px, 0);
  bottom: 22px;
`;

export const Icon = styled(IconMC).attrs({
  size: 36,
  name: 'camera',
  color: '#fff',
})``;

export const NativeCamera = styled(RNCamera).attrs({
  captureAudio: false,
})`
  flex: 1;
`;

export const Content = styled.View`
  padding: 28px 25px 0;
`;
