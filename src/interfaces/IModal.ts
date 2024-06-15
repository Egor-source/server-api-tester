import { ModalCallback } from '../hooks/useModal';

interface IModal {
  ok: ModalCallback;
  cancel: ModalCallback;
  dismiss: ModalCallback;

  [key: string]: any;
}

export default IModal;
