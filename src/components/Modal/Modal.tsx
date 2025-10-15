import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;   
};

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const node = document.getElementById('modal-window');
  if (!node) return null;

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}                 {}
      </div>
    </div>,
    node
  );
}

  