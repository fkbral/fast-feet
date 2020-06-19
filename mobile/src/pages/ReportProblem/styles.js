import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: true,
  behavior: 'padding',
})`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.View`
  padding: 28px 25px 0;
`;

export const ProblemInput = styled.TextInput.attrs({
  multiline: true,
  placeholderTextColor: '#999999',
})`
  height: 300px;
  margin: 0 0 20px;
  padding: 20px 20px 236px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 3px #0000001a;
  elevation: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;
