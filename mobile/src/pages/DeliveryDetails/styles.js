import styled from 'styled-components/native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.View`
  padding: 28px 25px 0;
`;

export const Details = styled.View`
  margin: 0 0 10px;
  padding: 14px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 3px #0000001a;
  elevation: 1;
`;

export const Section = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const SectionTitle = styled.Text`
  margin-left: 8px;
  color: #7d40e7;
  font-size: 14px;
  font-weight: 700;
`;

export const Label = styled.Text`
  color: #999999;
  font-weight: 700;
`;
export const Value = styled.Text`
  margin: 5px 0 15px;
  color: #666666;
`;

export const Dates = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Date = styled.View``;

export const Icon = styled(IconMC).attrs({
  size: 24,
})``;

export const Actions = styled.View`
  border-radius: 4px;
  box-shadow: 0 0 3px #0000001a;
  elevation: 1;
  background-color: #f8f9fd;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Action = styled.TouchableOpacity`
  padding: 15px 26px;
  justify-content: center;
  align-items: center;
`;

export const Separator = styled.View`
  width: 1px;
  background-color: #0000001a;
`;

export const Type = styled.Text`
  color: #999999;
  text-align: center;
  font-size: 12px;
`;
