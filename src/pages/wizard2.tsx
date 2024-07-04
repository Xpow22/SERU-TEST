import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Row, Col, Typography, Card, Upload, message, Image } from 'antd';
import { LeftOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';

const { Title, Text } = Typography;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const isImage = (file: FileType) => {
    const validTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/svg+xml',
        'image/bmp',
        'image/webp',
    ];
    return validTypes.includes(file.type);
};

export default function WizardStep2() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [selfie, setSelfie] = useState<string | null>(null);
    const [ktp, setKtp] = useState<string | null>(null);
    const [freePhoto, setFreePhoto] = useState<string | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [photoRequired, setPhotoRequired] = useState(false);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formData') || '{}');
        if (storedData && storedData.step2) {
            setSelfie(storedData.step2.selfie || null);
            setKtp(storedData.step2.ktp || null);
            setFreePhoto(storedData.step2.freePhoto || null);
            form.setFieldsValue({
                selfie: storedData.step2.selfie || null,
                ktp: storedData.step2.ktp || null,
                freePhoto: storedData.step2.freePhoto || null,
            });
        }
    }, [form]);

    const handleUpload = (info: any, setter: (value: string | null) => void) => {
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as FileType)
                .then((url) => {
                    setter(url);
                    message.success(`${info.file.name} file uploaded successfully.`);
                })
                .catch(() => {
                    message.error(`${info.file.name} file upload failed.`);
                });
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const validateFileType = (file: FileType) => {
        if (!isImage(file)) {
            message.error('You can only upload image files (jpg, jpeg, png, svg, bmp, WebP)!');
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const onNext = async () => {
        try {
            await form.validateFields();
            const storedData = JSON.parse(localStorage.getItem('formData') || '{}');
            const data = { selfie, ktp, freePhoto };
            const updatedData = { ...storedData, step2: { ...data } };
            localStorage.setItem('formData', JSON.stringify(updatedData));
            setPhotoRequired(false);
            router.push('/wizard3');
            message.success('Data Berhasil Disimpan!')
        } catch (error) {
            setPhotoRequired(true);
            message.error('Data Gagal Disimpan!')
        }
    };

    const handleBack = () => {
        router.push('/wizard1');
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Button type="link" icon={<LeftOutlined />} onClick={handleBack} />
                <Text className="text-sky-700 text-xl font-semibold" style={{ margin: 0 }}>Registrasi Klaim</Text>
            </div>

            <Card className='mb-5'>
                <div className='flex flex-row items-center justify-center'>
                    <img src="./card.webp" alt="" style={{ height: '25%', width: '25%', marginRight: '10px' }} />
                    <div className="text-xl font-bold text-sky-700">Foto SIM & STNK</div>
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
                onFinish={onNext}
                initialValues={{ selfie, ktp, freePhoto }} // Inisialisasi nilai dari localStorage
            >
                <div>
                    <Title level={5} style={{ paddingBottom: "10px", marginTop: "5px" }}>Foto SIM</Title>
                    <Form.Item
                        name="selfie"
                        rules={[{ required: true, message: 'Silakan unggah foto SIM!' }]}
                    >
                        <Upload
                            listType="picture-card"
                            showUploadList={{ showRemoveIcon: true }}
                            beforeUpload={validateFileType}
                            onChange={(info) => handleUpload(info, setSelfie)}
                            onPreview={handlePreview}
                        >
                            {selfie ? (
                                <Image src={selfie} alt="Foto SIM" />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div className="ant-upload-text">Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Text type="secondary">* Data pada SIM harus terlihat jelas</Text>
                </div>

                <div>
                    <Title level={5} style={{ paddingBottom: "10px", marginTop: "5px" }}>Foto STNK</Title>
                    <Form.Item
                        name="ktp"
                        rules={[{ required: true, message: 'Silakan unggah foto STNK!' }]}
                    >
                        <Upload
                            listType="picture-card"
                            showUploadList={{ showRemoveIcon: true }}
                            beforeUpload={validateFileType}
                            onChange={(info) => handleUpload(info, setKtp)}
                            onPreview={handlePreview}
                        >
                            {ktp ? (
                                <Image src={ktp} alt="Foto STNK" />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div className="ant-upload-text">Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Text type="secondary">* Data pada STNK harus terlihat jelas</Text>
                </div>

                <div>
                    <Title level={5} style={{ paddingBottom: "10px", marginTop: "5px" }}>Foto KTP Tertanggung</Title>
                    <Form.Item
                        name="freePhoto"
                        rules={[{ required: true, message: 'Silakan unggah foto KTP Tertanggung!' }]}
                    >
                        <Upload
                            listType="picture-card"
                            showUploadList={{ showRemoveIcon: true }}
                            beforeUpload={validateFileType}
                            onChange={(info) => handleUpload(info, setFreePhoto)}
                            onPreview={handlePreview}
                        >
                            {freePhoto ? (
                                <Image
                                    src={freePhoto}
                                    alt="Foto KTP Tertanggung"
                                />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div className="ant-upload-text">Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Text type="secondary">* Data pada KTP Tertanggung harus terlihat jelas</Text>
                </div>
                <Button type="primary" htmlType="submit">
                    Next
                </Button>
            </Form>

            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </div>
    );
}
