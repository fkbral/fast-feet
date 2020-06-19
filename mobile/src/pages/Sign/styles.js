import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  padding: 0 25px;
  background-color: #7d40e7;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  height: 48px;
  margin-bottom: 38px;
`;
