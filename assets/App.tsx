import { useState } from 'react';
import { Header } from './components/Header';
import { TrainList } from './components/TrainList';
import { TrackVisualization } from './components/TrackVisualization';
import { AIDecisionPanel } from './components/AIDecisionPanel';
import { QuickAccessKPIs } from './components/QuickAccessKPIs';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#F7F9FB] to-[#E8F4F8] flex flex-col overflow-hidden">
      {/* Header */}
      <Header onToggleSidebar={toggleMobileSidebar} />
      
      {/* Quick Access KPIs */}
      <QuickAccessKPIs />
      
      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4 pt-0 min-h-0">
        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
        
        {/* Left Sidebar - Train List */}
        <div className={`
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          ${isSidebarCollapsed ? 'lg:w-16' : 'lg:w-80'} 
          fixed lg:relative 
          inset-y-0 left-0 
          w-80 
          z-50 
          transition-all duration-300 ease-in-out
          lg:z-auto
        `}>
          <TrainList isCollapsed={isSidebarCollapsed} />
        </div>
        
        {/* Sidebar Toggle Button for Desktop */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-[#FF6B00] text-white p-2 rounded-full shadow-lg hover:bg-[#E55A00] transition-colors duration-200"
          style={{ left: isSidebarCollapsed ? '72px' : '336px' }}
        >
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Center - Track Visualization */}
        <div className={`
          flex-1 
          ${isSidebarCollapsed ? 'lg:ml-4' : 'lg:ml-0'} 
          transition-all duration-300 ease-in-out
          min-w-0
        `}>
          <TrackVisualization />
        </div>
        
        {/* Right Sidebar - AI Decisions & KPIs */}
        <div className={`
          hidden lg:block
          ${isSidebarCollapsed ? 'w-80' : 'w-80'} 
          transition-all duration-300 ease-in-out
        `}>
          <AIDecisionPanel isCollapsed={false} />
        </div>
        
        {/* Mobile Bottom Panel for AI Decisions */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-48 bg-white border-t-2 border-[#FF6B00] z-30 overflow-auto shadow-2xl rounded-t-xl">
          <AIDecisionPanel isCollapsed={true} />
        </div>
        
        {/* Mobile spacer to prevent content overlap */}
        <div className="lg:hidden h-48 w-full"></div>
      </div>
    </div>
  );
}