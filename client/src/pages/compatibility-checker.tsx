import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar';
import { PENTEST_HARDWARE, PENTEST_TASKS, PentestHardware, PentestTask } from '@/lib/constants';
import { COLORS } from '@/lib/constants';

const CompatibilityChecker = () => {
  const [selectedHardware, setSelectedHardware] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [compatibilityResults, setCompatibilityResults] = useState<{
    hardware: PentestHardware;
    rating: number;
    notes: string;
  }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [viewMode, setViewMode] = useState<'task' | 'hardware'>('task');

  useEffect(() => {
    if (selectedTask) {
      const task = PENTEST_TASKS.find(t => t.id === selectedTask);
      if (task) {
        const results = PENTEST_HARDWARE.map(hardware => {
          const compatibility = task.compatibilityNotes[hardware.id];
          return {
            hardware,
            rating: compatibility?.rating || 0,
            notes: compatibility?.notes || 'No compatibility data available'
          };
        }).sort((a, b) => b.rating - a.rating);
        
        setCompatibilityResults(results);
        setShowResults(true);
      }
    } else if (selectedHardware.length > 0 && viewMode === 'hardware') {
      const results = selectedHardware.map(hardwareId => {
        const hardware = PENTEST_HARDWARE.find(h => h.id === hardwareId);
        if (!hardware) return null;
        
        // Find best tasks for this hardware
        const taskCompatibility = PENTEST_TASKS.map(task => {
          const compatibility = task.compatibilityNotes[hardwareId];
          return {
            task,
            rating: compatibility?.rating || 0,
            notes: compatibility?.notes || 'No compatibility data available'
          };
        }).sort((a, b) => b.rating - a.rating);
        
        // Return the hardware with its best tasks
        return {
          hardware,
          bestTasks: taskCompatibility.slice(0, 3), // Top 3 tasks
          worstTasks: taskCompatibility.slice(-3).reverse() // Bottom 3 tasks
        };
      }).filter(Boolean);
      
      setCompatibilityResults(results as any);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [selectedTask, selectedHardware, viewMode]);

  const handleHardwareToggle = (hardwareId: string) => {
    setSelectedHardware(prev => 
      prev.includes(hardwareId) 
        ? prev.filter(id => id !== hardwareId) 
        : [...prev, hardwareId]
    );
  };

  const handleTaskSelect = (taskId: string) => {
    setSelectedTask(taskId === selectedTask ? null : taskId);
  };

  const handleModeChange = (mode: 'task' | 'hardware') => {
    setViewMode(mode);
    setSelectedTask(null);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-[#00FF00]';
    if (rating >= 5) return 'text-[#FFD700]';
    if (rating >= 3) return 'text-amber-500';
    return 'text-red-500';
  };

  const getRatingClass = (rating: number) => {
    if (rating >= 8) return 'bg-[#00FF00]/20 border-[#00FF00]/40';
    if (rating >= 5) return 'bg-[#FFD700]/20 border-[#FFD700]/40';
    if (rating >= 3) return 'bg-amber-500/20 border-amber-500/40';
    return 'bg-red-500/20 border-red-500/40';
  };

  const renderRatingBadge = (rating: number) => {
    return (
      <div className={`inline-flex items-center font-mono ${getRatingColor(rating)}`}>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <span 
              key={star} 
              className={`text-sm ${star <= rating ? getRatingColor(rating) : 'text-gray-600'}`}
            >
              {star <= rating ? '█' : '░'}
            </span>
          ))}
          <span className="ml-2">{rating}/10</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-12">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-mono font-bold mb-2">
              <span className="text-[#00FF00]">#</span> Hardware Compatibility Checker
            </h1>
            <p className="text-gray-300 mb-6">
              Find the optimal hardware for your pentesting tasks or discover what security assessments 
              are best suited for your existing hardware.
            </p>
            
            {/* Mode Selection Tabs */}
            <div className="flex border-b border-[#00FF00]/20 mb-6">
              <button
                className={`px-4 py-2 font-medium ${viewMode === 'task' ? 'text-[#00FF00] border-b-2 border-[#00FF00]' : 'text-gray-400 hover:text-white'}`}
                onClick={() => handleModeChange('task')}
              >
                <i className="fas fa-tasks mr-2"></i>
                Select Task First
              </button>
              <button
                className={`px-4 py-2 font-medium ${viewMode === 'hardware' ? 'text-[#00FF00] border-b-2 border-[#00FF00]' : 'text-gray-400 hover:text-white'}`}
                onClick={() => handleModeChange('hardware')}
              >
                <i className="fas fa-microchip mr-2"></i>
                Select Hardware First
              </button>
            </div>
            
            {viewMode === 'task' ? (
              // Task-Based Mode
              <div>
                <h2 className="text-xl font-semibold mb-4">Step 1: Select a Pentesting Task</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {PENTEST_TASKS.map(task => (
                    <div 
                      key={task.id}
                      className={`cursor-pointer p-4 rounded-lg transition-all border ${selectedTask === task.id
                        ? 'border-[#00FF00] bg-[#00FF00]/10'
                        : 'border-gray-700 hover:border-[#00FF00]/50 bg-[#1A1A1A]'
                      }`}
                      onClick={() => handleTaskSelect(task.id)}
                    >
                      <div className="flex items-center mb-2">
                        <i className={`fas ${task.icon} text-[#00FF00] mr-2`}></i>
                        <h3 className="font-bold">{task.name}</h3>
                      </div>
                      <p className="text-sm text-gray-300">{task.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Hardware-Based Mode
              <div>
                <h2 className="text-xl font-semibold mb-4">Step 1: Select Your Hardware</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {PENTEST_HARDWARE.map(hardware => (
                    <div 
                      key={hardware.id}
                      className={`cursor-pointer p-4 rounded-lg transition-all border ${selectedHardware.includes(hardware.id)
                        ? 'border-[#00FF00] bg-[#00FF00]/10'
                        : 'border-gray-700 hover:border-[#00FF00]/50 bg-[#1A1A1A]'
                      }`}
                      onClick={() => handleHardwareToggle(hardware.id)}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-12 h-12 rounded bg-black overflow-hidden mr-3">
                          <img src={hardware.image} alt={hardware.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold">{hardware.name}</h3>
                          <p className="text-xs text-gray-400">{hardware.price}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mt-2">{hardware.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Results Section */}
            {showResults && viewMode === 'task' && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Hardware Compatibility Results for{" "}
                  <span className="text-[#00FF00]">
                    {PENTEST_TASKS.find(t => t.id === selectedTask)?.name}
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {compatibilityResults.map(result => (
                    <div 
                      key={result.hardware.id}
                      className={`border rounded-lg p-4 ${getRatingClass(result.rating)}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded bg-black overflow-hidden mr-3">
                            <img src={result.hardware.image} alt={result.hardware.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-bold">{result.hardware.name}</h3>
                            <p className="text-xs text-gray-300">{result.hardware.price}</p>
                          </div>
                        </div>
                        <div>
                          {renderRatingBadge(result.rating)}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm">{result.notes}</p>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Key Features</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                          {result.hardware.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <i className="fas fa-check text-xs text-[#00FF00] mt-1 mr-2"></i>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {/* Performance Indicators */}
                        {Object.entries(result.hardware.performance).map(([key, value]) => {
                          if (value === 0) return null; // Skip ratings with 0
                          const label = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                          return (
                            <div key={key} className="bg-black/30 px-2 py-1 rounded text-xs">
                              <span className="capitalize">{label}:</span>{" "}
                              <span className={getRatingColor(value)}>{value}/10</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Required Accessories */}
                <div className="mt-8 bg-[#1A1A1A] border border-[#00FF00]/20 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    <i className="fas fa-plug mr-2 text-[#00FF00]"></i>
                    Required Accessories
                  </h3>
                  <ul className="list-disc pl-6 text-gray-300">
                    {PENTEST_TASKS.find(t => t.id === selectedTask)?.requiredAccessories?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {showResults && viewMode === 'hardware' && selectedHardware.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Best Use Cases for Selected Hardware
                </h2>
                
                {compatibilityResults.map((result: any) => (
                  <div 
                    key={result.hardware.id}
                    className="mb-8 border border-[#00FF00]/20 rounded-lg p-6 bg-[#1A1A1A]"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 rounded bg-black overflow-hidden mr-4">
                        <img src={result.hardware.image} alt={result.hardware.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{result.hardware.name}</h3>
                        <p className="text-gray-300">{result.hardware.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      {/* Best Tasks */}
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-[#00FF00]">
                          <i className="fas fa-thumbs-up mr-2"></i>
                          Recommended Tasks
                        </h4>
                        <div className="space-y-4">
                          {result.bestTasks.map((taskResult: any) => (
                            <div key={taskResult.task.id} className="border border-[#00FF00]/20 rounded p-3 bg-[#00FF00]/5">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <i className={`fas ${taskResult.task.icon} text-[#00FF00] mr-2`}></i>
                                  <h5 className="font-semibold">{taskResult.task.name}</h5>
                                </div>
                                {renderRatingBadge(taskResult.rating)}
                              </div>
                              <p className="text-sm text-gray-300">{taskResult.notes}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Worst Tasks */}
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-red-500">
                          <i className="fas fa-thumbs-down mr-2"></i>
                          Not Recommended
                        </h4>
                        <div className="space-y-4">
                          {result.worstTasks.map((taskResult: any) => (
                            <div key={taskResult.task.id} className="border border-red-500/20 rounded p-3 bg-red-500/5">
                              <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                  <i className={`fas ${taskResult.task.icon} text-red-500 mr-2`}></i>
                                  <h5 className="font-semibold">{taskResult.task.name}</h5>
                                </div>
                                {renderRatingBadge(taskResult.rating)}
                              </div>
                              <p className="text-sm text-gray-300">{taskResult.notes}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hardware Specs */}
                    <div className="mt-6 border-t border-[#00FF00]/10 pt-4">
                      <h4 className="text-md font-semibold mb-3">
                        <i className="fas fa-microchip mr-2 text-[#00FF00]"></i>
                        Hardware Specifications
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {result.hardware.features.map((feature: string, index: number) => (
                          <div key={index} className="text-sm bg-black/30 rounded p-2">
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {Object.entries(result.hardware.performance).map(([key, value]) => {
                          const performanceValue = value as number;
                          if (performanceValue === 0) return null;
                          const label = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                          return (
                            <div key={key} className="bg-black/30 px-2 py-1 rounded text-xs">
                              <span className="capitalize">{label}:</span>{" "}
                              <span className={getRatingColor(performanceValue)}>{performanceValue}/10</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompatibilityChecker;