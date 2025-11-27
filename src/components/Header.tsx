import React from 'react';
import { useStore } from '@/store/useStore';
import { Bell, Search, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const { user } = useStore();

  return (
    <header className="h-16 border-b border-ultimate-border bg-ultimate-dark/80 backdrop-blur sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Menu className="md:hidden text-ultimate-dim" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-ultimate-dim bg-clip-text text-transparent">
          YEOLPUMTA <span className="text-ultimate-accent text-xs align-top">ULTIMATE</span>
        </h1>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-2.5 text-ultimate-dim group-focus-within:text-ultimate-accent transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search tasks (Ctrl+K)" 
            className="w-full bg-black/20 border border-ultimate-border rounded-full py-2 pl-10 pr-4 text-sm text-white focus:border-ultimate-accent focus:ring-1 focus:ring-ultimate-accent outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-ultimate-dim hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-ultimate-accent rounded-full"></span>
        </button>
        
        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-ultimate-border">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-white">{user.name}</div>
              <div className="text-xs text-ultimate-gold">Lv. 12 • {user.xp} XP</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ultimate-accent to-purple-600 border border-white/20"></div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;