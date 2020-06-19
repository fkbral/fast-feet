import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { MdMoreHoriz as IconMd } from 'react-icons/md';

export const Container = styled.table`
  width: 100%;

  thead {
    tr {
      margin: 22px auto 14px;
      position: relative;
    }
    th {
      width: 140px;
      text-align: left;
      color: #444;
    }
  }

  tbody {
    tr {
      background-color: #fff;
      height: 57px;
    }
    td:not(:last-child) {
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    td {
      width: 140px;
      position: relative;
    }
  }

  tr {
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 25px;
  }
  tr + tr {
    margin-top: 21px;
  }
`;

export const Status = styled.span`
  height: 25px;
  padding: 0 6px;
  border-radius: 12px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  div {
    height: 10px;
    width: 10px;
    margin: 0 6px 0 0;
    border-radius: 5px;
  }
  span {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
  }

  ${(props) => {
    switch (props.type) {
      case 'Cancelado':
        return css`
          background-color: #fab0b0;
          div {
            background-color: #de3b3b;
          }
          span {
            color: #de3b3b;
          }
        `;
      case 'Pendente':
        return css`
          background-color: #f0f0df;
          div {
            background-color: #c1bc35;
          }
          span {
            color: #c1bc35;
          }
        `;
      case 'Retirada':
        return css`
          background-color: #bad2ff;
          div {
            background-color: #4d85ee;
          }
          span {
            color: #4d85ee;
          }
        `;
      case 'Entregue':
        return css`
          background-color: #dff0df;

          div {
            background-color: #2ca42b;
          }
          span {
            color: #2ca42b;
          }
        `;
      default:
        return css``;
    }
  }}
`;

export const AvatarPlaceHolder = styled.span`
  height: 35px;
  width: 35px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: #f4effc;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  span {
    color: #a28fd0;
    display: block;
  }
`;

export const Avatar = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: #f4effc;
  object-fit: cover;
  display: block;
`;

export const ActionButton = styled(IconMd).attrs({
  color: '#C6C6C6',
  size: 22,
})`
  margin-left: 12px;
  cursor: pointer;
`;

export const Actions = styled.div`
  min-width: 150px;
  padding: 15px 10px;
  border-radius: 4px;
  background-color: #fff;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  filter: drop-shadow(0px 0px 2px #00000026);
  pointer-events: none;

  position: absolute;
  left: calc(50% - 12px);
  top: 30px;
  transform: translate(-50%, 0);
  z-index: 2;

  display: flex;
  flex-direction: column;

  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      pointer-events: all;
    `}

  &::before {
    content: '';
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 20px solid #fff;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  div {
    width: 100%;
    text-decoration: none;
    white-space: nowrap;
    svg {
      color: #8e5be8;
    }
  }
  div:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
  div + div {
    svg {
      color: #4d85ee;
    }
  }

  div + div + div {
    svg {
      color: #de3b3b;
    }
  }
`;

export const Action = styled.div`
  height: 40px;
  background-color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    margin-left: 5px;
    color: #999;
  }
  ${(props) =>
    props.hide
      ? css`
          pointer-events: none;
          display: none;
        `
      : ''}
`;

export const ActionLink = styled(Link)`
  width: 100%;
  height: 100%;
  text-decoration: none;
  display: flex;
  align-items: center;
`;
