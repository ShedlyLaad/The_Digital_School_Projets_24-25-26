import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import './styles/Modal.css';

const EditModal = ({ visible, onCancel, onSubmit, record, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (record) {
      const formValues = { ...record };
      delete formValues._id;
      delete formValues.key;
      delete formValues.fileId;
      form.setFieldsValue(formValues);
    }
  }, [record, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Modifier l'enregistrement"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} className="cancel-button">
          Annuler
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
          className="submit-button"
        >
          Enregistrer
        </Button>
      ]}
      className="edit-modal"
      maskClosable={false}
      centered
    >
      <Form form={form} layout="vertical" className="edit-form">
        {record && 
          Object.entries(record)
            .filter(([key]) => !['_id', 'key', 'fileId'].includes(key))
            .map(([key, value]) => (
              <Form.Item
                key={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                rules={[{ required: true, message: `Ce champ est requis` }]}
              >
                <Input className="edit-input" />
              </Form.Item>
            ))
        }
      </Form>
    </Modal>
  );
};

export default EditModal;