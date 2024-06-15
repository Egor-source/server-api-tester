import React, { FC, ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import { ModalCallback } from '../../hooks/useModal';

interface IModalItem {
  children: ReactNode;
}

export const ModalTemplateHeader = ({ children }: IModalItem) => (
  <Modal.Title id="contained-modal-title-vcenter">{children}</Modal.Title>
);

export const ModalTemplateBody = ({ children }: IModalItem) => <>{children}</>;
export const ModalTemplateFooter = ({ children }: IModalItem) => (
  <>{children}</>
);

interface IModalTemplate {
  children: ReactNode;
  dismiss?: ModalCallback;
}

const ModalTemplate: FC<IModalTemplate> = ({ children, dismiss }: any) => {
  let header;
  let body;
  let footer;
  React.Children.forEach(children, (child) => {
    if (child.type === ModalTemplateHeader) {
      header = child;
    } else if (child.type === ModalTemplateBody) {
      body = child;
    } else if (child.type === ModalTemplateFooter) {
      footer = child;
    }
  });

  return (
    <Modal
      size="sm"
      onHide={dismiss}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show
    >
      <Modal.Header closeButton>{header}</Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};

export default ModalTemplate;
