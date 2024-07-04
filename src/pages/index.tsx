import { useRouter } from 'next/router';
import { Button, Typography } from 'antd';

const { Title } = Typography;

export default function Home() {
  const router = useRouter();

  const startWizard = () => {
    router.push('/wizard1');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} className="text-sky-700 text-3xl">Welcome to the Wizard</Title>
      <Button type="primary" onClick={startWizard}>Start Wizard</Button>
    </div>
  );
}
