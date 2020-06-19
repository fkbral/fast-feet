import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  padding: 0 25px;
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 22px;
`;

export const Profile = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProfilePictureEmpty = styled.View`
  width: 68px;
  height: 68px;
  margin-right: 12px;
  border-radius: 34px;
  background-color: #f4effc;
  align-items: center;
  justify-content: center;
`;

export const ProfilePicture = styled.Image`
  width: 68px;
  height: 68px;
  margin-right: 12px;
  border-radius: 34px;
  background-color: #f4effc;
`;

export const PicturePlaceHolder = styled.Text`
  font-size: 32px;
  color: #a28fd0;
`;

export const Filter = styled.Text`
  font-size: 12px;
  font-weight: 700;
  margin-left: ${props => (props.delivered ? '15px' : '0px')};

  ${props =>
    props.active
      ? css`
          color: #7d40e7;
          text-decoration: underline;
        `
      : css`
          color: #999999;
        `}
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
`;

export const Text = styled.Text`
  font-size: 12px;
`;

export const Small = styled.Text`
  position: absolute;
  top: 16px;
  left: -20px;
  font-size: 8px;
  color: #999999;
  width: 50px;
  text-align: center;
`;

export const SmallDetails = styled.Text`
  font-size: 8px;
  color: #999999;
`;

export const Strong = styled.Text`
  font-weight: 700;
  font-size: 12px;
`;

export const HorizontalView = styled.View`
  flex-direction: row;
  justify-content: ${props => (props.alignEnd ? 'flex-end' : 'flex-start')};
`;

export const HorizontalViewSpaced = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: ${props => (props.center ? 'center' : 'flex-start')};
`;

export const LogOut = styled(Icon).attrs({
  name: 'exit-to-app',
  size: 24,
  color: '#E74040',
})``;

export const TruckIcon = styled(Icon).attrs({
  name: 'truck',
  size: 22,
  color: '#7D40E7',
})``;

export const DeliveryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 10px 0 130px;
`;

export const Delivery = styled.View`
  margin-bottom: 29px;
  border-color: #0000001a;
  border-width: 1px;
  border-radius: 4px;
`;

export const DeliveryName = styled.Text`
  margin-left: 10px;
  color: #7d40e7;
  font-size: 14px;
  font-weight: 700;
`;

export const DeliveryStatus = styled.View`
  padding: 14px;
`;

export const DetailsButton = styled.TouchableOpacity`
  justify-content: center;
`;

export const DetailsText = styled.Text`
  color: #7d40e7;
  font-size: 12px;
  font-weight: 700;
`;

export const Timeline = styled.View`
  margin: 24px 42px;
  position: relative;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: #7d40e7;
  position: absolute;
  top: 4px;
  left: 0;
`;

export const Point = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  border-width: 1px;
  border-color: #7d40e7;
  background-color: ${props => (props.active ? '#7d40e7' : '#fff')};
`;

export const Status = styled.Text;

export const DeliveryDetails = styled.View`
  height: 64px;
  padding: 14px;
  background-color: #f8f9fd;
  flex-direction: row;
  justify-content: space-between;
`;
