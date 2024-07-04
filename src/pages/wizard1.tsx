import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Select, Button, Row, Col, Typography, Card, DatePicker, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getProvinces, getCitiesByProvince, getDistrictsByCity, getSubdistrictsByDistrict } from '@/service/api';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

export default function WizardStep1() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [subdistricts, setSubdistricts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchProvinces();
        const storedData = JSON.parse(localStorage.getItem('formData') || '{}');
        if (storedData.step1) {
            const initialValues = {
                name: storedData.step1.name || '',
                relationship: storedData.step1.relationship || '',
                'Waktu Kejadian': storedData.step1['Waktu Kejadian'] ? moment(storedData.step1['Waktu Kejadian']) : null,
                Penyebab: storedData.step1.Penyebab || '',
                province: storedData.step1.province || undefined,
                city: storedData.step1.city || undefined,
                district: storedData.step1.district || undefined,
                subdistrict: storedData.step1.subdistrict || undefined,
            };
            form.setFieldsValue(initialValues);

            if (storedData.step1.province) {
                fetchCities(storedData.step1.province).then(() => {
                    if (storedData.step1.city) {
                        fetchDistricts(storedData.step1.city).then(() => {
                            if (storedData.step1.district) {
                                fetchSubdistricts(storedData.step1.district);
                            }
                        });
                    }
                });
            }
        }
    }, []);

    const fetchProvinces = async () => {
        try {
            const data = await getProvinces();
            setProvinces(data);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const fetchCities = async (provinceId: number) => {
        try {
            const data = await getCitiesByProvince(provinceId);
            setCities(data);
        } catch (error) {
            console.error(`Error fetching cities for province ${provinceId}:`, error);
        }
    };

    const fetchDistricts = async (regencyId: number) => {
        try {
            const data = await getDistrictsByCity(regencyId);
            setDistricts(data);
        } catch (error) {
            console.error(`Error fetching districts for city ${regencyId}:`, error);
        }
    };

    const fetchSubdistricts = async (districtId: number) => {
        try {
            const data = await getSubdistrictsByDistrict(districtId);
            setSubdistricts(data);
        } catch (error) {
            console.error(`Error fetching subdistricts for district ${districtId}:`, error);
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        const updatedData = {
            ...JSON.parse(localStorage.getItem('formData') || '{}'),
            step1: { ...values },
        };
        localStorage.setItem('formData', JSON.stringify(updatedData));
        message.success('Data berhasil tersimpan');
        setLoading(false);
        router.push('/wizard2');
    };


    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Button type="link" icon={<LeftOutlined />} disabled />
                <Text className="text-sky-800 text-xl font-semibold" style={{ margin: 0 }}>Registrasi Klaim</Text>
            </div>

            <Card className='mb-5'>
                <div className='flex flex-row items-center justify-center'>
                    <img src="./form.png" alt="" style={{ height: '25%', width: '25%', marginRight: '10px' }} />
                    <div className="text-xl font-bold text-sky-700">Formulir Klaim</div>
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

            <Card style={{ marginBottom: '20px' }}>
                <Form form={form} layout="vertical" >
                    <Form.Item name="name" label="Nama Pengemudi" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="relationship" label="Hubungan Keluarga" rules={[{ required: true }]}>
                        <Select placeholder="Pilih Hubungan Keluarga">
                            <Option value="Ayah">Ayah</Option>
                            <Option value="Ibu">Ibu</Option>
                            <Option value="Anak">Anak</Option>
                            <Option value="Saudara">Saudara</Option>
                            <Option value="Suami">Suami</Option>
                            <Option value="Istri">Istri</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="Waktu Kejadian" label="Tanggal dan Waktu Kejadian">
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item name="Penyebab" label="Isi Penyebab" rules={[{ required: true }]}>
                        <TextArea />
                    </Form.Item>
                </Form>
            </Card>

            <Text className="text-green-800 text-xl font-semibold" style={{ margin: 0 }}>Tempat Kejadian</Text>
            <Card style={{ marginBottom: '20px' }}>
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="province" label="Province" rules={[{ required: true }]}>
                        <Select showSearch onChange={fetchCities}>
                            {provinces.map((prov: any) => (
                                <Option key={prov.id} value={prov.id}>{prov.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="city" label="City" rules={[{ required: true }]}>
                        <Select showSearch onChange={fetchDistricts}>
                            {cities.map((city: any) => (
                                <Option key={city.id} value={city.id}>{city.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="district" label="District" rules={[{ required: true }]}>
                        <Select showSearch onChange={fetchSubdistricts}>
                            {districts.map((district: any) => (
                                <Option key={district.id} value={district.id}>{district.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="subdistrict" label="Subdistrict" rules={[{ required: true }]}>
                        <Select showSearch>
                            {subdistricts.map((subdistrict: any) => (
                                <Option key={subdistrict.id} value={subdistrict.id}>{subdistrict.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>Next</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
