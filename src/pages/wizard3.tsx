import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col, Typography, Card, Upload, Modal, Image, message } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function WizardStep3() {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [photos, setPhotos] = useState([1]);
    const [jsonVisible, setJsonVisible] = useState(false);
    const [completeData, setCompleteData] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formData') || '{}') as { step3?: Record<string, { thumbUrl?: string }> };
        setFormData(storedData);

        if (storedData && storedData.step3) {
            const fields: Record<string, any> = {};
            const photosArray: number[] = [];

            Object.keys(storedData.step3).forEach((key, index) => {
                if (key.startsWith('damagePhoto')) {
                    fields[key] = [storedData.step3![key]];
                    photosArray.push(index + 1);
                }
            });

            setPhotos(photosArray.length > 0 ? photosArray : [1]);
            form.setFieldsValue(fields);
        }
    }, [form]);

    const onFinish = async (values: any) => {
        const storedData = JSON.parse(localStorage.getItem('formData') || '{}') as {
            step3?: Record<string, { thumbUrl?: string }>
        };

        const newData = { ...storedData, step3: { ...storedData.step3 } };

        photos.forEach((photo, index) => {
            const photoField = `damagePhoto${index + 1}`;
            if (values[photoField] && values[photoField].length > 0) {
                newData.step3![photoField] = {
                    thumbUrl: values[photoField][0].thumbUrl,
                };
            }
        });

        localStorage.setItem('formData', JSON.stringify(newData));
        setCompleteData(newData);
        setJsonVisible(true);
        message.success('Data Berhasil Disimpan!')
    };

    const handleBack = () => {
        router.push('/wizard2');
    };

    const handleAddPhoto = () => {
        setPhotos([...photos, photos.length + 1]);
    };

    const handleCancel = () => {
        setJsonVisible(false);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Button type="link" icon={<LeftOutlined />} onClick={handleBack} />
                <Text className="text-sky-700 text-xl font-semibold" style={{ margin: 0 }}>Registrasi Klaim</Text>
            </div>

            <Card className='mb-5'>
                <div className='flex flex-row items-center justify-center'>
                    <img src="./car.webp" alt="" style={{ height: '25%', width: '25%', marginRight: '10px' }} />
                    <div className="text-xl font-bold text-sky-700">Klaim Kerusakan Kendaraan</div>
                </div>
            </Card>

            <Card style={{ marginBottom: '20px' }}>
                <Row>
                    <Col span={12}><Text className="text-sky-800 font-semibold">No. Polisi:</Text></Col>
                    <Col span={12}><Text className='text-gray-500'>B 1234 EFG</Text></Col>
                </Row>
                <Row>
                    <Col span={12}><Text className="text-sky-800 font-semibold">Nama Tertanggung:</Text></Col>
                    <Col span={12}><Text className='text-gray-500'>Fajar Pribadi</Text></Col>
                </Row>
                <Row>
                    <Col span={12}><Text className="text-sky-800 font-semibold">No. Polis:</Text></Col>
                    <Col span={12}><Text className='text-gray-500'>VCL2020101</Text></Col>
                </Row>
            </Card>

            <Form
                form={form}
                onFinish={onFinish}
                initialValues={formData}
            >
                {photos.map((photo, index) => (
                    <div key={index}>
                        <Title level={5}>Foto Kerusakan {index + 1}</Title>
                        <Form.Item
                            name={`damagePhoto${index + 1}`}
                            rules={[{ required: true, message: `Silakan unggah Foto Kerusakan ${index + 1}` }]}
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) {
                                    return e;
                                }
                                return e && e.fileList;
                            }}
                        >
                            <Upload
                                listType="picture-card"
                                showUploadList={{ showRemoveIcon: true }}
                                beforeUpload={() => false}
                            >
                                <div>
                                    <PlusOutlined />
                                    <div className="ant-upload-text">Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </div>
                ))}
                <Button type="dashed" onClick={handleAddPhoto} style={{ width: '100%', marginBottom: '20px' }}>
                    Tambah Foto Kerusakan
                </Button>
                <Button type="primary" htmlType="submit">
                    Simpan
                </Button>
            </Form>

            <Modal
                title="Data JSON"
                visible={jsonVisible}
                onCancel={handleCancel}
            >
                <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                    <pre>{JSON.stringify(completeData, null, 2)}</pre>
                </div>
            </Modal>
        </div>
    );
}
