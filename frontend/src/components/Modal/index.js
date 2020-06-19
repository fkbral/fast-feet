/* eslint-disable react/prop-types */
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import { Container, Content } from './styles';

function Modal(props, ref) {
  const { children } = props;
  const [visible, setVisible] = useState(false);
  const handleClose = useCallback((e) => {
    if (e.target.getAttribute('data-close') === 'true') {
      setVisible(false);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    handleOpen() {
      setVisible(true);
    },
  }));

  return (
    <Container data-close onClick={handleClose} visible={visible} ref={ref}>
      <Content>{children}</Content>
    </Container>
  );
}

// Modal.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default forwardRef(Modal);
