import React, { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../index';
import IModal from '../interfaces/IModal';

interface IModalOptions<T extends IModal> {
  component: FC<T>;
  props?: any;
}

export type ModalCallback = (...args: any[]) => void;

interface IModalCallbacks {
  ok?: ModalCallback;
  cancel?: ModalCallback;
  dismiss?: ModalCallback;
}

function useModal<T extends IModal>(
  options: IModalOptions<T>,
  callbacks?: IModalCallbacks
) {
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
}

export default useModal;
