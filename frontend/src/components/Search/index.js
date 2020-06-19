import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { PropTypes } from 'prop-types';

import { Container, Icon } from './styles';

export default function Search({ name, type, text, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <Icon />
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        placeholder={`Buscar por ${text}`}
      />
      {error && <span className="error">{error}</span>}
    </Container>
  );
}

Search.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Search.defaultProps = {
  type: 'text',
};
