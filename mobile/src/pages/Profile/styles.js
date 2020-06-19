import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 25px;
  flex: 1;
  background-color: #fff;
`;

export const PictureContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ProfilePictureEmpty = styled.View`
  width: 136px;
  height: 136px;
  margin: 68px 0 40px;
  border-radius: 68px;
  background-color: #f4effc;
  align-items: center;
  justify-content: center;
`;

export const ProfilePicture = styled.Image`
  margin: 68px 0 40px;
  width: 136px;
  height: 136px;
  border-radius: 68px;
  background-color: #f4effc;
`;

export const PicturePlaceHolder = styled.Text`
  font-size: 60px;
  color: #a28fd0;
`;

export const Label = styled.Text`
  font-size: 12px;
`;

export const Field = styled.Text`
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: 700;
`;

export const LogoutButton = styled.TouchableOpacity`
  height: 40px;
  width: 100%;
  margin-top: 15px;
  border-radius: 4px;
  background-color: #e74040;
  justify-content: center;
  align-items: center;
`;

export const LogoutText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;
