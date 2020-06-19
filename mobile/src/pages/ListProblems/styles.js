import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.View`
  padding: 0px 25px 0;
`;

export const Product = styled.Text`
  margin: 26px 0 12px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const ProblemList = styled.FlatList``;

export const Problem = styled.TouchableOpacity`
  margin-bottom: 16px;
  padding: 17px 19px;
  border-radius: 4px;
  box-shadow: 0 0 3px #0000001a;
  elevation: 1;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProblemName = styled.Text`
  color: #999999;
  font-size: 16px;
  max-width: 80%;
`;

export const ProblemDate = styled.Text`
  color: #c1c1c1;
  font-size: 12px;
`;
