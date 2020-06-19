import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #7d40e7;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginBox = styled.div`
  width: 100%;
  height: 450px;
  max-width: 360px;
  padding: 30px;
  border-radius: 4px;
  background-color: #fff;

  img {
    width: auto;
    height: 45px;
    margin: 30px auto 45px;
    display: block;
  }
`;

export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  height: 45px;
  width: 100%;
  border-radius: 4px;
  margin-top: 15px;
  background-color: #7d40e7;
  color: #fff;
  font-weight: 700;
`;
