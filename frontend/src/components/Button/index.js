import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd, MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';

import history from '~/services/history';

import { Container, Link } from './styles';

export default function Button({ children, icon, ...rest }) {
  return (
    <Container {...rest}>
      {icon ? <MdCheck /> : <MdAdd />}
      <span>{children}</span>
    </Container>
  );
}

export function BackButton({ children }) {
  return (
    <Container back onClick={() => history.goBack()}>
      <MdKeyboardArrowLeft />
      <span>{children}</span>
    </Container>
  );
}

export function LinkAsButton({ children, to, ...rest }) {
  return (
    <Link to={to}>
      <Container {...rest}>
        <MdAdd />
        <span>{children}</span>
      </Container>
    </Link>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  icon: PropTypes.string,
};

BackButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};

LinkAsButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  to: PropTypes.string.isRequired,
};

Button.defaultProps = {
  icon: null,
};
