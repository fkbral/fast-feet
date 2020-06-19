import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  ${(props) =>
    props.visible
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;

export const Content = styled.div`
  width: 450px;
  min-height: 120px;
  border-radius: 4px;
  background-color: #fff;
  padding: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  hr {
    background-color: #eee;
    height: 1px;
    border: none;
    margin: 12px 0;
  }
  strong {
    font-size: 14px;
  }
  br + strong {
    font-size: 16px;
  }
  img {
    display: block;
    margin-top: 23px;
    height: 36px;
  }
`;
