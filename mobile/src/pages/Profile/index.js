import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Field,
  Label,
  LogoutButton,
  LogoutText,
  ProfilePicture,
  ProfilePictureEmpty,
  PictureContainer,
  PicturePlaceHolder,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.profile);

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <Container>
      <PictureContainer>
        {user.avatar ? (
          <ProfilePicture source={{ uri: user.avatar.url }} />
        ) : (
          <ProfilePicture>
            <PicturePlaceHolder>{user.initials}</PicturePlaceHolder>
          </ProfilePicture>
        )}
      </PictureContainer>
      <Label>Nome completo</Label>
      <Field>{user.name}</Field>
      <Label>Email</Label>
      <Field>{user.email}</Field>
      <Label>Data de cadastro</Label>
      <Field>{user.joined_at}</Field>
      <LogoutButton onPress={handleLogout}>
        <LogoutText>Logout</LogoutText>
      </LogoutButton>
    </Container>
  );
}
