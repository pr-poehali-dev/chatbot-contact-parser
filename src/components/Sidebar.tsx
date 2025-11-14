import Icon from '@/components/ui/icon';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
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
  );
};

export default Sidebar;
