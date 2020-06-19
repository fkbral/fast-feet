import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function EditContainer({ children }) {
  return <Container>{children}</Container>;
}

EditContainer.propTypes = {
  children: PropTypes.element.isRequired,
};
