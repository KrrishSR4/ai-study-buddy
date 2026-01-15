import { useState, useCallback, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Home } from "@/pages/Home";
import { Results } from "@/pages/Results";
import NotFound from "./pages/NotFound";
import type { LearningMaterial } from "@/types/learning";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [generatedMaterial, setGeneratedMaterial] = useState<LearningMaterial | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMaterialGenerated = useCallback((material: LearningMaterial, topic: string) => {
    setGeneratedMaterial(material);
    setCurrentTopic(topic);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen w-full">
            <Sidebar
              isCollapsed={sidebarCollapsed}
              onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
            
            <main
              className="flex-1 transition-all duration-300"
              style={{ marginLeft: isMobile ? 0 : (sidebarCollapsed ? 72 : 256) }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<Home onMaterialGenerated={handleMaterialGenerated} />}
                />
                <Route
                  path="/results"
                  element={<Results material={generatedMaterial} topic={currentTopic} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
