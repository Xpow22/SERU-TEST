import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Typography, Card, Upload, message } from 'antd';
import { ArrowLeftOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { NextStepFunction } from '@/types/types';
import Router from 'next/router';

const { Title, Text } = Typography;

interface WizardStep2Props {
  nextStep: NextStepFunction;
}

const WizardStep2: React.FC<WizardStep2Props> = ({ nextStep }) => {
  const [selfie, setSelfie] = useState<string | null>(null);
  const [ktp, setKtp] = useState<string | null>(null);
  const [freePhoto, setFreePhoto] = useState<string | null>(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData') || '{}');
    if (storedData) {
      setSelfie(storedData.selfie);
      setKtp(storedData.ktp);
      setFreePhoto(storedData.freePhoto);
    }
  }, []);

  const handleUpload = (info: UploadChangeParam, setter: (value: string | null) => void) => {
    if (info.file.status === 'done') {
      // Get the base64 URL of the uploaded image
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setter(url);
        message.success(`${info.file.name} file uploaded successfully.`);
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const getBase64 = (file: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result as string);
  };

  const onNext = () => {
    const data = { selfie, ktp, freePhoto };
    localStorage.setItem('formData', JSON.stringify(data));
    nextStep(data);
  };

  const handleBack = () => {
    Router.push('/wizard1'); 
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

      <div>
        <Title level={5}>Foto SIM</Title>
        <Upload
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={(info) => handleUpload(info, setSelfie)}
        >
          {selfie ? <img src={selfie} alt="Selfie" style={{ width: '100%' }} /> : <PlusOutlined />}
        </Upload>
        <Text type="secondary">* Data pada SIM harus terlihat jelas</Text>
      </div>

      <div>
        <Title level={5}>Foto STNK</Title>
        <Upload
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={(info) => handleUpload(info, setKtp)}
        >
          {ktp ? <img src={ktp} alt="KTP" style={{ width: '100%' }} /> : <PlusOutlined />}
        </Upload>
        <Text type="secondary">* Data pada STNK harus terlihat jelas</Text>
      </div>

      <div>
        <Title level={5}>Foto KTP Tertanggung</Title>
        <Upload
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={(info) => handleUpload(info, setFreePhoto)}
        >
          {freePhoto ? <img src={freePhoto} alt="Free Photo" style={{ width: '100%' }} /> : <PlusOutlined />}
        </Upload>
        <Text type="secondary">* Data pada KTP Tertanggung harus terlihat jelas</Text>
      </div>

      <Button type="primary" onClick={onNext}>Next</Button>
    </div>
  );
};

export default WizardStep2;
