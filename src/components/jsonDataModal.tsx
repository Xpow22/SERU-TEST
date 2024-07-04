import { Modal, Button } from 'antd';
import React from 'react';

interface JsonDataModalProps {
  visible: boolean;
  data: any; // Adjust this type as per your actual data structure
  onCancel: () => void;
}

const JsonDataModal: React.FC<JsonDataModalProps> = ({ visible, data, onCancel }) => {
  return (
    <Modal
      title="Data JSON dari Local Storage"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Tutup
        </Button>,
      ]}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Modal>
  );
};

export default JsonDataModal;
