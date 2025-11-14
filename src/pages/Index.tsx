import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import DashboardTab from '@/components/DashboardTab';
import TabsContent from '@/components/TabsContent';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [botName, setBotName] = useState('AI Продавец');
  const [botPrompt, setBotPrompt] = useState('Ты — опытный продавец. Твоя задача узнать потребности клиента и предложить решение.');
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && <DashboardTab />}
          
          <TabsContent
            activeTab={activeTab}
            botName={botName}
            setBotName={setBotName}
            botPrompt={botPrompt}
            setBotPrompt={setBotPrompt}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </main>
      </div>
    </div>
  );
};

export default Index;
