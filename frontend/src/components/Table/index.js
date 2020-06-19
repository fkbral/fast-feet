import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { MdVisibility, MdEdit, MdDeleteForever } from 'react-icons/md';
import api from '~/services/api';

import {
  Action,
  Actions,
  ActionButton,
  ActionLink,
  Avatar,
  AvatarPlaceHolder,
  Container,
  Status,
} from './styles';

export default function Table({ children }) {
  return <Container>{children}</Container>;
}

function Edit({ afterDelete, beforeModalOpen, modalRef, resource, problem }) {
  const [visible, setVisible] = useState(false);

  function handleModal() {
    if (modalRef) {
      beforeModalOpen();
      modalRef.current.handleOpen();
      setVisible(!visible);
    }
  }

  async function handleDelete() {
    setVisible(!visible);
    // eslint-disable-next-line no-undef
    const { confirm } = window;
    const message = !problem
      ? 'Tem certeza que deseja deletar o registro permanentemente?'
      : 'Tem certeza que deseja cancelar a entrega?';
    const result = confirm(message);
    if (result) {
      try {
        const response = await api.delete(`${resource}`);
        if (response) {
          afterDelete();
          toast.success(
            !problem
              ? 'Registro deletado com sucesso!'
              : 'Encomenda cancelada com sucesso'
          );
        }
      } catch (error) {
        toast.error('Ocorreu um erro, por tente novamente mais tarde');
      }
    }
  }

  function closeMenu() {
    setVisible(false);

    document.removeEventListener('click', closeMenu);
  }

  function handleActionMenu(e) {
    e.preventDefault();

    if (visible) return;

    setVisible(true);

    document.addEventListener('click', closeMenu);
  }

  return (
    <>
      <ActionButton onClick={(e) => handleActionMenu(e)} />
      <Actions visible={visible} resource={resource} modalRef={modalRef}>
        <Action hide={!modalRef} onClick={handleModal}>
          <MdVisibility />
          <span>Visualizar</span>
        </Action>
        <Action hide={!!problem}>
          <ActionLink to={`${resource}/edit`}>
            <MdEdit />
            <span>Editar</span>
          </ActionLink>
        </Action>
        <Action onClick={handleDelete}>
          <MdDeleteForever />
          <span>{!problem ? 'Excluir' : 'Cancelar Encomenda'}</span>
        </Action>
      </Actions>
    </>
  );
}

Table.propTypes = {
  children: PropTypes.element.isRequired,
};

Edit.propTypes = {
  afterDelete: PropTypes.func,
  modalRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape()]),
  beforeModalOpen: PropTypes.func,
  resource: PropTypes.string.isRequired,
  problem: PropTypes.bool,
};

Edit.defaultProps = {
  afterDelete: null,
  modalRef: null,
  beforeModalOpen: null,
  problem: false,
};

export { Avatar, AvatarPlaceHolder, Edit, Status };
