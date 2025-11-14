import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
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

const funnelData = [
  { stage: 'Контакт', count: 1245, color: '#8B5CF6' },
  { stage: 'Диалог', count: 892, color: '#D946EF' },
  { stage: 'Интерес', count: 534, color: '#0EA5E9' },
  { stage: 'Покупка', count: 187, color: '#10B981' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [botName, setBotName] = useState('AI Продавец');
  const [botPrompt, setBotPrompt] = useState('Ты — опытный продавец. Твоя задача узнать потребности клиента и предложить решение.');
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex">
        <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border sticky top-0">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Sales Bot
              </h1>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'dashboard', icon: 'LayoutDashboard', label: 'Дашборд' },
                { id: 'parsing', icon: 'Download', label: 'Парсинг' },
                { id: 'bots', icon: 'Bot', label: 'Боты' },
                { id: 'contacts', icon: 'Users', label: 'Контакты' },
                { id: 'funnel', icon: 'Filter', label: 'Воронка' },
                { id: 'analytics', icon: 'BarChart3', label: 'Аналитика' },
                { id: 'integrations', icon: 'Plug', label: 'Интеграции' },
                { id: 'settings', icon: 'Settings', label: 'Настройки' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-lg'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
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
          )}

          {activeTab === 'parsing' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">Парсинг контактов</h2>
                <p className="text-muted-foreground">Автоматический сбор аудитории из мессенджеров</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  { platform: 'Telegram', icon: 'Send', count: 542, color: 'from-blue-500 to-blue-400' },
                  { platform: 'WhatsApp', icon: 'MessageCircle', count: 389, color: 'from-green-500 to-green-400' },
                  { platform: 'VK', icon: 'Share2', count: 314, color: 'from-primary to-secondary' },
                ].map((platform, idx) => (
                  <Card key={idx} className="bg-card/50 backdrop-blur border-border/50 hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-4`}>
                        <Icon name={platform.icon} size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{platform.count}</h3>
                      <p className="text-muted-foreground mb-4">{platform.platform}</p>
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="Play" size={16} className="mr-2" />
                        Запустить парсинг
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>История парсинга</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { source: 'Telegram группа "Бизнес"', contacts: 127, time: '2 часа назад', status: 'completed' },
                      { source: 'WhatsApp чаты', contacts: 89, time: '5 часов назад', status: 'completed' },
                      { source: 'VK сообщества', contacts: 234, time: 'Вчера', status: 'completed' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Icon name="CheckCircle2" size={20} className="text-green-500" />
                          <div>
                            <div className="font-medium">{item.source}</div>
                            <div className="text-sm text-muted-foreground">{item.time}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-green-500/30 text-green-400">
                          +{item.contacts} контактов
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'bots' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Управление ботами</h2>
                  <p className="text-muted-foreground">Настройка AI-ассистентов для продаж</p>
                </div>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать бота
                </Button>
              </div>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Настройка бота</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">Название бота</Label>
                    <Input
                      id="bot-name"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      placeholder="Введите название"
                      className="bg-muted/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bot-prompt">Системный промпт</Label>
                    <Textarea
                      id="bot-prompt"
                      value={botPrompt}
                      onChange={(e) => setBotPrompt(e.target.value)}
                      placeholder="Опишите поведение бота"
                      rows={6}
                      className="bg-muted/30"
                    />
                    <p className="text-xs text-muted-foreground">
                      Определите, как бот должен общаться с клиентами и какие задачи решать
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Автоматические ответы</div>
                        <div className="text-sm text-muted-foreground">Отвечать на сообщения автоматически</div>
                      </div>
                      <Switch checked={isActive} onCheckedChange={setIsActive} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Уведомления</div>
                        <div className="text-sm text-muted-foreground">Получать уведомления о новых диалогах</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить настройки
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="TestTube" size={16} className="mr-2" />
                      Тестировать
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'AI Продавец', status: 'active', messages: 234, conversion: 18.5 },
                  { name: 'Поддержка 24/7', status: 'active', messages: 567, conversion: 12.3 },
                  { name: 'Квалификация лидов', status: 'paused', messages: 89, conversion: 24.1 },
                  { name: 'Ретаргетинг', status: 'active', messages: 145, conversion: 9.8 },
                ].map((bot, idx) => (
                  <Card key={idx} className="bg-card/50 backdrop-blur border-border/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Icon name="Bot" size={24} className="text-white" />
                          </div>
                          <div>
                            <div className="font-bold">{bot.name}</div>
                            <div className="text-sm text-muted-foreground">{bot.messages} сообщений</div>
                          </div>
                        </div>
                        <Badge variant={bot.status === 'active' ? 'default' : 'secondary'}>
                          {bot.status === 'active' ? 'Активен' : 'Пауза'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Конверсия</span>
                        <span className="font-bold text-green-400">{bot.conversion}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'funnel' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">Воронка продаж</h2>
                <p className="text-muted-foreground">Путь клиента от контакта до покупки</p>
              </div>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Конверсионная воронка</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {funnelData.map((stage, idx) => {
                      const percentage = ((stage.count / funnelData[0].count) * 100).toFixed(1);
                      const dropOff = idx > 0 ? ((funnelData[idx - 1].count - stage.count) / funnelData[idx - 1].count * 100).toFixed(1) : 0;
                      
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: stage.color }}
                              />
                              <span className="font-medium">{stage.stage}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              {idx > 0 && (
                                <span className="text-sm text-red-400">-{dropOff}%</span>
                              )}
                              <span className="font-bold">{stage.count}</span>
                              <Badge variant="outline" style={{ borderColor: stage.color, color: stage.color }}>
                                {percentage}%
                              </Badge>
                            </div>
                          </div>
                          <div className="relative h-12 bg-muted/30 rounded-lg overflow-hidden">
                            <div
                              className="h-full rounded-lg transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                background: `linear-gradient(to right, ${stage.color}, ${stage.color}90)`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Анализ этапов</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={funnelData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
                      <XAxis dataKey="stage" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                      />
                      <Bar dataKey="count" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">Аналитика</h2>
                <p className="text-muted-foreground">Детальная статистика эффективности</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[
                  { metric: 'Средний чек', value: '₽12,450', trend: '+8.3%', positive: true },
                  { metric: 'Время до покупки', value: '2.3 дня', trend: '-12%', positive: true },
                  { metric: 'Отказы', value: '23%', trend: '-5%', positive: true },
                ].map((stat, idx) => (
                  <Card key={idx} className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">{stat.metric}</div>
                      <div className="text-2xl font-bold mb-2">{stat.value}</div>
                      <Badge variant={stat.positive ? 'default' : 'destructive'} className="bg-green-500/10 text-green-400 border-green-500/20">
                        {stat.trend}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Эффективность по дням недели</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
                      <XAxis dataKey="name" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="converted"
                        stroke="#D946EF"
                        strokeWidth={3}
                        dot={{ fill: '#D946EF', r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Контакты</h2>
                  <p className="text-muted-foreground">База собранных лидов</p>
                </div>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Добавить контакт
                </Button>
              </div>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {[
                      { name: 'Алексей Иванов', source: 'Telegram', status: 'Диалог', messages: 12 },
                      { name: 'Мария Петрова', source: 'WhatsApp', status: 'Интерес', messages: 7 },
                      { name: 'Дмитрий Сидоров', source: 'VK', status: 'Покупка', messages: 23 },
                      { name: 'Елена Козлова', source: 'Telegram', status: 'Контакт', messages: 3 },
                      { name: 'Игорь Новиков', source: 'WhatsApp', status: 'Диалог', messages: 15 },
                    ].map((contact, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold">
                            {contact.name[0]}
                          </div>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">{contact.source} • {contact.messages} сообщений</div>
                          </div>
                        </div>
                        <Badge variant="outline">{contact.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">Интеграции</h2>
                <p className="text-muted-foreground">Подключение мессенджеров и сервисов</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Telegram API', icon: 'Send', connected: true, color: 'from-blue-500 to-blue-400' },
                  { name: 'WhatsApp Business', icon: 'MessageCircle', connected: true, color: 'from-green-500 to-green-400' },
                  { name: 'VK API', icon: 'Share2', connected: false, color: 'from-primary to-secondary' },
                  { name: 'OpenAI GPT-4', icon: 'Brain', connected: true, color: 'from-purple-500 to-pink-500' },
                  { name: 'Stripe', icon: 'CreditCard', connected: false, color: 'from-indigo-500 to-blue-500' },
                  { name: 'Google Analytics', icon: 'BarChart', connected: false, color: 'from-orange-500 to-yellow-500' },
                ].map((integration, idx) => (
                  <Card key={idx} className="bg-card/50 backdrop-blur border-border/50 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center`}>
                          <Icon name={integration.icon} size={24} className="text-white" />
                        </div>
                        <Badge variant={integration.connected ? 'default' : 'outline'}>
                          {integration.connected ? 'Подключено' : 'Не подключено'}
                        </Badge>
                      </div>
                      <div className="font-bold mb-2">{integration.name}</div>
                      <Button
                        variant={integration.connected ? 'outline' : 'default'}
                        className={!integration.connected ? 'w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90' : 'w-full'}
                      >
                        {integration.connected ? 'Настроить' : 'Подключить'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">Настройки</h2>
                <p className="text-muted-foreground">Общие параметры платформы</p>
              </div>

              <Card className="bg-card/50 backdrop-blur border-border/50">
                <CardHeader>
                  <CardTitle>Уведомления</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Email уведомления', description: 'Получать отчеты на почту' },
                    { label: 'Push уведомления', description: 'Уведомления в браузере' },
                    { label: 'Telegram бот', description: 'Отчеты в Telegram' },
                  ].map((setting, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{setting.label}</div>
                        <div className="text-sm text-muted-foreground">{setting.description}</div>
                      </div>
                      <Switch defaultChecked={idx < 2} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
