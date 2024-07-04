import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Typography, Card, Upload, message, Input } from 'antd';
import { LeftOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { FormData } from "@/types/types";
import Router from 'next/router';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface WizardStep3Props {
  data: FormData;
}

const WizardStep3: React.FC<WizardStep3Props> = ({ data }) => {
  const [photos, setPhotos] = useState<{ url: string; description: string; name: string; size: string; }[]>([]);

  useEffect(() => {
    const storedPhotos = JSON.parse(localStorage.getItem('photos') || '[]');
    setPhotos(storedPhotos);
  }, []);

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        const newPhoto = {
          url,
          description: '',
          name: info.file.name,
          size: (info.file.size / 1024 / 1024).toFixed(2) + ' mb'
        };
        const updatedPhotos = [...photos, newPhoto];
        setPhotos(updatedPhotos);
        localStorage.setItem('photos', JSON.stringify(updatedPhotos));
        message.success(`${info.file.name} file uploaded successfully.`);
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const getBase64 = (file: Blob, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result as string);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedPhotos = photos.map((photo, i) => i === index ? { ...photo, description: value } : photo);
    setPhotos(updatedPhotos);
    localStorage.setItem('photos', JSON.stringify(updatedPhotos));
  };

  const handleRemove = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    localStorage.setItem('photos', JSON.stringify(updatedPhotos));
  };

  const handleSubmit = () => {
    console.log({ ...data, photos });
  };

  const handleBack = () => {
    Router.push('/wizard2'); // Redirect to '/wizard2' route when clicking the button
  }; 

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={handleBack} />
        <Title level={4} style={{ margin: 0 }}>Registrasi Klaim</Title>
      </div>

      <Card style={{ marginBottom: '20px' }}>
        <Row>
          <Col span={12}><Text>No. Polisi:</Text></Col>
          <Col span={12}><Text>B 1234 EFG</Text></Col>
        </Row>
        <Row>
          <Col span={12}><Text>Nama Tertanggung:</Text></Col>
          <Col span={12}><Text>Fajar Pribadi</Text></Col>
        </Row>
        <Row>
          <Col span={12}><Text>No. Polis:</Text></Col>
          <Col span={12}><Text>VCL2020101</Text></Col>
        </Row>
      </Card>

      {photos.map((photo, index) => (
        <Card key={index} style={{ marginBottom: '20px' }}>
          <Row>
            <Col span={18}>
              <img src={photo.url} alt={`Foto Kerusakan ${index + 1}`} style={{ width: '100%' }} />
            </Col>
            <Col span={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button type="link" icon={<DeleteOutlined />} onClick={() => handleRemove(index)} />
            </Col>
          </Row>
          <Text>{photo.name}</Text>
          <Text type="secondary">{photo.size}</Text>
          <TextArea
            placeholder="Deskripsi Kerusakan"
            value={photo.description}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
          />
        </Card>
      ))}

      <Upload
        listType="picture-card"
        showUploadList={false}
        beforeUpload={() => false}
        onChange={handleUpload}
      >
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Tambah Foto</div>
      </Upload>

      <Button type="primary" onClick={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>Simpan</Button>
    </div>
  );
};

export default WizardStep3;
