import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Select({ name, label, ...rest }) {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map((option) => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <AsyncSelect
        cacheOptions
        classNamePrefix="react-select"
        defaultValue={defaultValue}
        ref={selectRef}
        {...rest}
      />
    </Container>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Select;
