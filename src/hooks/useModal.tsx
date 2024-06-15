import React, { FC } from 'react';
import ReactDOM from 'react-dom/client';
import IModal from '../interfaces/IModal';
import { Provider } from 'react-redux';
import { store } from '../index';

interface IModalOptions {
  component: FC<IModal>;
  props?: any;
}

export type ModalCallback = (...args: any[]) => void;

interface IModalCallbacks {
  ok?: ModalCallback;
  cancel?: ModalCallback;
  dismiss?: ModalCallback;
}

const useModal = (options: IModalOptions, callbacks?: IModalCallbacks) => {
  const modal = ReactDOM.createRoot(
    document.querySelector('#modal') as HTMLElement
  );

  const dismiss = function (...args: any[]) {
    modal.unmount();
    if (typeof callbacks?.dismiss === 'function') {
      callbacks?.dismiss(...args);
    }
  };

  const ok = function (...args: any[]) {
    modal.unmount();
    if (typeof callbacks?.ok === 'function') {
      callbacks?.ok(...args);
    }
  };

  const cancel = function (...args: any[]) {
    modal.unmount();
    if (typeof callbacks?.cancel === 'function') {
      callbacks?.cancel(...args);
    }
  };
  //eslint-disable-next-line
  const modalComponent = React.createElement(options.component, {
    cancel,
    ok,
    dismiss,
    ...options.props,
  });

  modal.render(<Provider store={store}>{modalComponent}</Provider>);
};

export default useModal;
