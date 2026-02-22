import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar, Cell,
    ComposedChart, Area
} from 'recharts';
import {
    TrendingUp, Award, Target, Brain,
    ChevronRight, AlertTriangle, CheckCircle2,
    Calendar, MapPin, Briefcase, GraduationCap, Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const MilestoneTimeline = () => {
    const milestones = [
        { date: 'Oct 2025', title: 'Foundation Phase', status: 'completed', icon: GraduationCap },
        { date: 'Dec 2025', title: 'Technical Mastery', status: 'completed', icon: Brain },
        { date: 'Feb 2026', title: 'Mock Drill Series', status: 'current', icon: Target },
        { date: 'Apr 2026', title: 'Resume Freeze', status: 'upcoming', icon: Briefcase },
        { date: 'Jun 2026', title: 'Day 0 Drives', status: 'upcoming', icon: Award }
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '20px 0', marginBottom: '40px' }}>
            <div style={{ position: 'absolute', top: '40px', left: '0', right: '0', height: '2px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }}></div>
            {milestones.map((m, i) => {
                const Icon = m.icon;
                return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: m.status === 'completed' ? 'var(--success)' : m.status === 'current' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: m.status === 'current' ? '2px solid white' : 'none',
                            boxShadow: m.status === 'current' ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none'
                        }}>
                            <Icon size={18} color={m.status === 'upcoming' ? 'var(--text-muted)' : 'white'} />
                        </div>
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700' }}>{m.date}</p>
                        <p style={{ fontSize: '11px', fontWeight: '600', textAlign: 'center' }}>{m.title}</p>
                    </div>
                );
            })}
        </div>
    );
};

const Analytics = () => {
    const contextData = useApp();
    const { readinessIndex = 0, communicationData = {}, aptitudeStats = {}, codingStats = {} } = contextData || {};

    if (!contextData) return <div style={{ padding: '40px', color: 'var(--danger)' }}>CONTEXT MISSING - AppProvider might be broken!</div>;

    const progressData = [
        { name: 'Week 1', score: 45, readiness: 40 },
        { name: 'Week 2', score: 52, readiness: 48 },
        { name: 'Week 3', score: 48, readiness: 50 },
        { name: 'Week 4', score: 61, readiness: 58 },
        { name: 'Week 5', score: 58, readiness: 62 },
        { name: 'Week 6', score: 72, readiness: 68 },
    ];

    const topicPerformance = [
        { name: 'Coding', score: codingStats?.score || 0, color: '#6366f1' },
        { name: 'Aptitude', score: aptitudeStats?.accuracy || 0, color: '#f59e0b' },
        { name: 'Comms', score: communicationData?.score || 0, color: '#10b981' },
    ];

    return (
        <div className="animate-fade-in">
            <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Placement <span className="gradient-text">Intelligence</span></h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Personalized analysis and readiness projections.</p>

            <MilestoneTimeline />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '56px', fontWeight: '800' }} className="gradient-text">{readinessIndex}</h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>Holistic Readiness Index</p>
                </div>

                <div className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target size={18} color="var(--primary)" /> Top Weak Areas
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {(aptitudeStats?.weakTopics || ['Profit & Loss', 'Time & Distance']).map(topic => (
                            <div key={topic} style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px' }}>{topic}</span>
                                <AlertTriangle size={14} color="var(--danger)" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ padding: '10px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '10px', display: 'inline-block', marginBottom: '16px' }}>
                        <Award size={24} color="var(--secondary)" />
                    </div>
                    <p style={{ fontSize: '32px', fontWeight: '800', marginBottom: '4px' }}>#12</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>GLOBAL CAMPUS RANK</p>
                    <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--success)', fontWeight: '600' }}>
                        Solved {codingStats?.solvedProblems || 0} / {codingStats?.totalProblems || 100} Problems
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginBottom: '24px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Readiness Velocity</h3>
                    <div style={{ height: '300px', width: '100%', minHeight: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={progressData}>
                                <defs>
                                    <linearGradient id="colorReadiness" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} axisLine={false} tickLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={12} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="readiness" stroke="#6366f1" fillOpacity={1} fill="url(#colorReadiness)" strokeWidth={3} />
                                <Line type="monotone" dataKey="score" stroke="#ec4899" strokeDasharray="5 5" dot={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Module Proficiency</h3>
                    <div style={{ height: '300px', width: '100%', minHeight: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topicPerformance} layout="vertical" margin={{ left: 20 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={12} width={80} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '12px' }}
                                />
                                <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={32}>
                                    {topicPerformance.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'space-between', fontSize: '13px' }}>
                            Compare with Peer Average <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(99, 102, 241, 0.2)', background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.05), transparent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}>
                        <Zap size={24} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '16px', marginBottom: '4px', fontWeight: '700' }}>Recommended Action</h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Your <b>Profit & Loss</b> accuracy is pulling down your score. Spend 15 mins on interactive formulas today.</p>
                    </div>
                    <button className="btn btn-primary">Start Review</button>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
