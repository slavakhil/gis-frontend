import React, { useEffect } from 'react';
import './Modal.scss';

function Modal({ active, setActive, children }) {
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      // Возврат к норме при размонтировании
      document.body.style.overflow = 'auto';
    };
  }, [active]);

  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        setActive();
        document.body.style.overflow = 'auto';
      }}
    >
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
