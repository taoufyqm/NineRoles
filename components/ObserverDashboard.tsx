import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppContext } from '../hooks/useAppContext';
import { ROLES } from '../constants';
import ProjectSelector from './ProjectSelector';

const ObserverDashboard: React.FC = () => {
  const { projects, timeSpent } = useAppContext();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const cardBg = 'bg-gray-800 border-gray-700';
  const textColor = '#d1d5db';
  const gridColor = '#4b5563';

  const taskData = useMemo(() => {
    if (!projects || !selectedProjectId) return [];
    const project = projects.find(p => p.id === selectedProjectId);
    if (!project) return [];

    let completed = 0;
    let pending = 0;
    project.tasks.forEach(t => {
        if (t.status === 'completed') completed++;
        else if (t.status === 'pending' || t.status === 'in-progress') pending++;
    });
    return [
        { name: 'Completed Tasks', value: completed, fill: '#4ade80' },
        { name: 'Pending Tasks', value: pending, fill: '#f87171' },
    ];
  }, [projects, selectedProjectId]);

  const timeData = useMemo(() => {
    if (!selectedProjectId || !timeSpent[selectedProjectId]) return [];
    const projectTimes = timeSpent[selectedProjectId];
    return ROLES.map(role => {
        const timeInMinutes = (projectTimes[role.id] || 0) / (1000 * 60);
        return {
            name: role.name.replace('The ', ''),
            time: parseFloat(timeInMinutes.toFixed(1)),
        };
    }).filter(item => item.time > 0);
  }, [timeSpent, selectedProjectId]);


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Observer Dashboard</h1>
      
      <div className={`p-6 rounded-lg border ${cardBg}`}>
        <ProjectSelector selectedProjectId={selectedProjectId} onProjectChange={setSelectedProjectId} />
      </div>

      {!selectedProjectId ? (
        <div className={`p-10 rounded-lg border ${cardBg} text-center`}>
          <p className="text-gray-400">Please select a project to view its statistics.</p>
        </div>
      ) : (
        <>
          <div className={`p-6 rounded-lg border ${cardBg}`}>
            <h2 className="text-xl font-bold mb-4">Actual Time Spent Per Role (Minutes)</h2>
            {timeData.length > 0 ? (
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={timeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor}/>
                        <XAxis dataKey="name" stroke={textColor} />
                        <YAxis stroke={textColor}/>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1f2937', border: `1px solid ${gridColor}` }}
                            labelStyle={{ color: textColor }}
                        />
                        <Legend wrapperStyle={{ color: textColor }}/>
                        <Bar dataKey="time" name="Minutes Worked">
                            {timeData.map((entry, index) => {
                                const role = ROLES.find(r => r.name.includes(entry.name));
                                const colorMapping: { [key: string]: string } = {
                                    'text-yellow-400': '#facc15',
                                    'text-blue-400': '#60a5fa',
                                    'text-sky-400': '#38bdf8',
                                    'text-orange-400': '#fb923c',
                                    'text-red-400': '#f87171',
                                    'text-purple-400': '#c084fc',
                                    'text-green-400': '#4ade80',
                                    'text-amber-400': '#f59e0b',
                                };
                                return <Cell key={`cell-${index}`} fill={role ? colorMapping[role.color] : '#8884d8'} />;
                            })}
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                 <p className="text-gray-400 text-center py-10">No time has been tracked for this project yet.</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg border ${cardBg}`}>
              <h2 className="text-xl font-bold mb-4">Task Status</h2>
              {taskData.some(d => d.value > 0) ? (
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                    <PieChart>
                        <Pie data={taskData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {taskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: `1px solid ${gridColor}` }}/>
                        <Legend wrapperStyle={{ color: textColor }}/>
                    </PieChart>
                    </ResponsiveContainer>
                </div>
              ) : (
                 <p className="text-gray-400 text-center py-10">No tasks found for this project.</p>
              )}
            </div>

            <div className={`p-6 rounded-lg border ${cardBg}`}>
              <h2 className="text-xl font-bold mb-4">Achievements & Awards</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🏆</span>
                  <div>
                    <h3 className="font-semibold">7-Day Streak</h3>
                    <p className="text-sm text-gray-400">Completed at least one task every day for a week.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">✍️</span>
                  <div>
                    <h3 className="font-semibold">Prolific Writer</h3>
                    <p className="text-sm text-gray-400">Wrote 5 scripts in one week.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🎯</span>
                  <div>
                    <h3 className="font-semibold">Focus Master</h3>
                    <p className="text-sm text-gray-400">Completed a 90-minute work session without interruption.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ObserverDashboard;