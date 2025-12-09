import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Database,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/results', icon: BookOpen, label: 'Results' },
];

const RESOURCE_ITEMS = [
  { icon: Database, label: 'Datasets', href: '#' },
  { icon: Code2, label: 'API Docs', href: '#' },
  { icon: HelpCircle, label: 'Help', href: '#' },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen glass-card border-r border-border/50 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
          <div className="p-2 rounded-xl bg-primary/10 animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="font-bold text-lg gradient-text">AI IDE</h1>
              <p className="text-xs text-muted-foreground">for Students</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-secondary border border-border/50 hover:bg-primary/10 hover:border-primary/30"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {!isCollapsed && (
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </p>
        )}
        
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "sidebar-item",
                isActive && "active",
                isCollapsed && "justify-center px-3"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              {!isCollapsed && (
                <span className={cn(isActive && "text-foreground font-medium")}>
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}

        {/* Resources Section */}
        {!isCollapsed && (
          <>
            <div className="pt-4">
              <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Resources
              </p>
            </div>
            {RESOURCE_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="sidebar-item"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </>
        )}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border/50">
          <div className="p-4 rounded-xl bg-hero-gradient border border-primary/20">
            <p className="text-sm font-medium text-foreground mb-1">
              Powered by AI
            </p>
            <p className="text-xs text-muted-foreground">
              Using transformer models for intelligent learning
            </p>
          </div>
        </div>
      )}
    </motion.aside>
  );
}
