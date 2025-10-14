import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import NoteForm from '../NoteForm/NoteForm';
interface ModalProps {
  onClose: () => void;
}
export default function Modal({ onClose }: ModalProps) {
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.getElementById('modal-window') as HTMLDivElement,
  );
}
  