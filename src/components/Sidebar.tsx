import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/results', icon: BookOpen, label: 'Results' },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-card/80 backdrop-blur-xl border border-border/50"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar - Desktop */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-screen glass-card border-r border-border/50 z-40 hidden md:flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
            <div className="p-2 rounded-xl bg-primary/10 animate-glow-pulse">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="font-bold text-lg gradient-text">LearnRAG</h1>
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
        </nav>
      </motion.aside>

      {/* Mobile Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 h-screen w-72 glass-card border-r border-border/50 z-50 md:hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-lg gradient-text">LearnRAG</h1>
              <p className="text-xs text-muted-foreground">for Students</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </p>
          
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.to;
            
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "sidebar-item",
                  isActive && "active"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                <span className={cn(isActive && "text-foreground font-medium")}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
}
