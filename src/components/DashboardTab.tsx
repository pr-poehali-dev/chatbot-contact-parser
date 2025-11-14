import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const conversionData = [
  { name: 'Пн', contacts: 45, converted: 12 },
  { name: 'Вт', contacts: 67, converted: 19 },
  { name: 'Ср', contacts: 52, converted: 23 },
  { name: 'Чт', contacts: 89, converted: 31 },
  { name: 'Пт', contacts: 73, converted: 28 },
  { name: 'Сб', contacts: 41, converted: 15 },
  { name: 'Вс', contacts: 38, converted: 11 },
];

const DashboardTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Дашборд</h2>
        <p className="text-muted-foreground">Общая статистика по вашим кампаниям</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Всего контактов', value: '1,245', change: '+12%', icon: 'Users', color: 'from-primary to-primary/70' },
          { label: 'Активных ботов', value: '8', change: '+2', icon: 'Bot', color: 'from-secondary to-secondary/70' },
          { label: 'Конверсия', value: '15.2%', change: '+3.1%', icon: 'TrendingUp', color: 'from-accent to-accent/70' },
          { label: 'Выручка', value: '₽187k', change: '+23%', icon: 'DollarSign', color: 'from-green-500 to-green-400' },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-card/50 backdrop-blur border-border/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon name={stat.icon} size={24} className="text-white" />
                </div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={20} />
              Динамика конверсий
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={conversionData}>
                <defs>
                  <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorConverted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="contacts" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorContacts)" />
                <Area type="monotone" dataKey="converted" stroke="#0EA5E9" fillOpacity={1} fill="url(#colorConverted)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Activity" size={20} />
              Активные кампании
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Telegram VIP клиенты', status: 'active', progress: 67, contacts: 234 },
              { name: 'WhatsApp новички', status: 'active', progress: 45, contacts: 189 },
              { name: 'VK ретаргетинг', status: 'paused', progress: 23, contacts: 78 },
            ].map((campaign, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${campaign.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="font-medium">{campaign.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{campaign.contacts} контактов</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardTab;
