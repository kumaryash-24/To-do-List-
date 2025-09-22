
import React, { useMemo, useState } from 'react';
import { Task } from '../../types';
import { BarChart, Bar, Line, ComposedChart, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Sector, Legend } from 'recharts';

const StatCard: React.FC<{ label: string; value: number | string; className: string }> = ({ label, value, className }) => (
  <div className={`p-4 rounded-xl flex-1 ${className}`}>
    <p className="text-sm text-white/80">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const getWeeklyTrendData = (tasks: Task[]) => {
  const data: { name: string, created: number, completed: number }[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    
    const createdOnDay = tasks.filter(task => {
        const createdAt = new Date(task.createdAt);
        return createdAt.getFullYear() === day.getFullYear() &&
               createdAt.getMonth() === day.getMonth() &&
               createdAt.getDate() === day.getDate();
    }).length;

    const completedOnDay = tasks.filter(task => {
      if (task.completed && task.completedAt) {
        const completedDate = new Date(task.completedAt);
        return completedDate.getFullYear() === day.getFullYear() &&
               completedDate.getMonth() === day.getMonth() &&
               completedDate.getDate() === day.getDate();
      }
      return false;
    }).length;

    data.push({
      name: day.toLocaleDateString('en-US', { weekday: 'short' }),
      created: createdOnDay,
      completed: completedOnDay,
    });
  }
  return data;
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#d1d5db" className="text-sm">
        {`${payload.value} Tasks (${(percent * 100).toFixed(0)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 4}
        outerRadius={outerRadius + 8}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e1e1e]/90 p-3 rounded-lg border border-white/20 shadow-lg">
        <p className="text-gray-300 font-semibold">{label}</p>
         {payload.map((p: any) => (
             <p key={p.dataKey} style={{ color: p.color || p.fill }}>
                {`${p.name}: ${p.value}`}
            </p>
        ))}
      </div>
    );
  }
  return null;
};


const Charts: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const stats = useMemo(() => {
        const completed = tasks.filter(task => task.completed).length;
        const total = tasks.length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { total, completed, pending, completionRate };
    }, [tasks]);

    const weeklyTrendData = useMemo(() => getWeeklyTrendData(tasks), [tasks]);
    
    const busiestDay = useMemo(() => {
        if (!weeklyTrendData.some(d => d.completed > 0)) {
            return { name: "N/A", completed: 0 };
        }
        return weeklyTrendData.reduce((prev, current) => (prev.completed >= current.completed) ? prev : current);
    }, [weeklyTrendData]);

    const pieData = useMemo(() => [
        { name: 'Completed', value: stats.completed },
        { name: 'Pending', value: stats.pending },
    ], [stats]);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const COLORS = ['#8b5cf6', '#4b5563'];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Tasks" value={stats.total} className="bg-blue-500/30" />
                <StatCard label="Pending" value={stats.pending} className="bg-yellow-500/30" />
                <StatCard label="Completed" value={stats.completed} className="bg-green-500/30" />
                <StatCard label="Completion Rate" value={`${stats.completionRate}%`} className="bg-purple-500/30" />
            </div>
            
            {tasks.length > 0 && (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                        <div className="lg:col-span-2 bg-[#2e2e2e]/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-neumorphic-dark border border-white/10">
                            <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Task Overview</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={90}
                                        fill="#8884d8"
                                        dataKey="value"
                                        onMouseEnter={onPieEnter}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="focus:outline-none" />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="lg:col-span-3 bg-[#2e2e2e]/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-neumorphic-dark border border-white/10">
                            <div className="text-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-300">Weekly Activity</h3>
                                <p className="text-sm text-gray-400">
                                    Busiest Day: <span className="font-bold text-purple-400">{busiestDay.name}</span> ({busiestDay.completed} tasks)
                                </p>
                            </div>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={weeklyTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} width={30}/>
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} />
                                    <Bar dataKey="completed" name="Completed" fill="url(#colorUv)" radius={[4, 4, 0, 0]} >
                                    </Bar>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-[#2e2e2e]/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-neumorphic-dark border border-white/10">
                        <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Task Creation vs. Completion</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <ComposedChart data={weeklyTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} width={30}/>
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} />
                                <Legend wrapperStyle={{fontSize: "14px", paddingTop: "20px"}} />
                                <defs>
                                    <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                    </linearGradient>
                                </defs>
                                <Bar dataKey="completed" name="Completed" barSize={20} fill="url(#colorTrend)" radius={[4, 4, 0, 0]} />
                                <Line type="monotone" dataKey="created" name="Created" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Charts;
