import { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, Typography, Card } from 'antd';
import { FormData, NextStepFunction } from '@/types/types';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const provinces = ["Provinsi A", "Provinsi B"];
const cities = ["Kota A", "Kota B"];
const districts = ["Kecamatan A", "Kecamatan B"];
const subdistricts = ["Kelurahan A", "Kelurahan B"];

interface WizardStep1Props {
    nextStep: NextStepFunction;
}

export default function WizardStep1({ nextStep }: WizardStep1Props) {
    const [form] = Form.useForm();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formData') || '{}');
        form.setFieldsValue(storedData);
    }, [form]);

    const onFinish = (values: any) => {
        const updatedData = { ...JSON.parse(localStorage.getItem('formData') || '{}'), ...values };
        localStorage.setItem('formData', JSON.stringify(updatedData));
        nextStep(updatedData);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => console.log('Back')} />
                <Text className="text-sky-700 text-xl font-semibold" style={{ margin: 0 }}>Registrasi Klaim</Text>
            </div>

            <Card className='mb-5'>
                <div className='flex flex-row'>
                    <img src="./form.png" alt="" height="100" width="100" />
                    <div>Formulir Klaim</div>
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
                <Row>
                    <Col span={12}><Text className="text-sky-800 font-semibold">Periode:</Text></Col>
                    <Col span={12}><Text className='text-gray-500'>1 Juli 2020 - 30 Juni 2021</Text></Col>
                </Row>
                <Row>
                    <Col span={12}><Text className="text-sky-800 font-semibold">Nilai Pertanggungan:</Text></Col>
                    <Col span={12}><Text className='text-gray-500'>Rp 120.000.000</Text></Col>
                </Row>
                <Row>
                    <Col span={12}><Text className="text-sky-800 font-semibold">Buatan/Merk:</Text></Col>
                    <Col span={12}><Text className='text-gray-500'>Japan/Honda</Text></Col>
                </Row>
                <Row>
                    <Col span={12}><Text className="text-sky-800 font-semibold">Tahun Pembuatan:</Text></Col>
                    <Col span={12}><Text className='text-gray-500'> 2019</Text></Col>
                </Row>
                <Row>
                    <Col span={12}><Text className="text-sky-800 font-semibold">No. Mesin:</Text></Col>
                    <Col span={12}><Text className='text-gray-500'>NHS123000</Text></Col>
                </Row>
                <Row>
                    <Col span={12}><Text className="text-sky-800 font-semibold">No. Rangka:</Text></Col>
                    <Col span={12}><Text className='text-gray-500'>MCN24000</Text></Col>
                </Row>
            </Card>

            <Card>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="biodata" label="Biodata" rules={[{ required: true }]}>
                        <TextArea />
                    </Form.Item>
                    <Form.Item name="province" label="Province" rules={[{ required: true }]}>
                        <Select showSearch>
                            {provinces.map((prov) => (
                                <Option key={prov} value={prov}>{prov}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="city" label="City" rules={[{ required: true }]}>
                        <Select showSearch>
                            {cities.map((city) => (
                                <Option key={city} value={city}>{city}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="district" label="District" rules={[{ required: true }]}>
                        <Select showSearch>
                            {districts.map((district) => (
                                <Option key={district} value={district}>{district}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="subdistrict" label="Subdistrict" rules={[{ required: true }]}>
                        <Select showSearch>
                            {subdistricts.map((subdistrict) => (
                                <Option key={subdistrict} value={subdistrict}>{subdistrict}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Next</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
