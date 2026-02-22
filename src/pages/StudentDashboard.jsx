import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';
import {
    LayoutDashboard, Code, BookOpen, MessageSquare,
    BarChart3, Trophy, LogOut, User, Bell, ChevronRight,
    Upload, CheckCircle2, Award, Zap, Map as MapIcon,
    Target
} from 'lucide-react';
import CodingModule from './CodingModule';
import AptitudeModule from './AptitudeModule';
import CommunicationModule from './CommunicationModule';
import Analytics from './Analytics';
import Roadmap from './Roadmap';
import Leaderboard from '../components/Leaderboard';

const SidebarLink = ({ to, icon: IconComponent, label, active }) => (
    <Link
        to={to}
        className={`btn ${active ? 'btn-primary' : ''}`}
        style={{
            width: '100%',
            justifyContent: 'flex-start',
            background: active ? 'var(--primary)' : 'transparent',
            color: active ? 'white' : 'var(--text-muted)',
            padding: '12px 16px',
            marginBottom: '8px'
        }}
    >
        <IconComponent size={20} />
        <span>{label}</span>
    </Link>
);

const LiveTicker = () => {
    const feeds = [
        "Arjun S. just completed 'Array Mastery' with 98% accuracy!",
        "Weekly Coding Contest starts in 4 hours. 250+ students joined!",
        "Sneha R. reached a Readiness Index of 85! Goal achieved.",
        "New Aptitude Topic: 'Probability' has been assigned for this week.",
        "Live Group Discussion starting in Room 2 in 12 minutes."
    ];

    return (
        <div style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            padding: '8px 24px',
            borderRadius: '100px',
            overflow: 'hidden',
            width: '100%',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        }}>
            <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: '800', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>Live Feed</span>
            <div className="marquee" style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', fontSize: '12px', color: 'var(--text-muted)' }}>
                {feeds.map((f, i) => <span key={i}>{f}</span>)}
            </div>
        </div>
    );
};

const StudentOverview = () => {
    const { user } = useUser();
    const { readinessIndex, roadmapData } = useApp();
    const navigate = useNavigate();

    const nextGoal = roadmapData.find(item => item.status === 'current');

    const badgeColor = user.points > 2000 ? '#fbbf24' : user.points > 1000 ? '#94a3b8' : '#cd7f32';
    const badgeName = user.points > 2000 ? 'Gold' : user.points > 1000 ? 'Silver' : 'Bronze';

    return (
        <div className="animate-fade-in">
            <LiveTicker />
            <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Welcome back, <span className="gradient-text">{user.username}</span>! 👋</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your placement prep today.</p>
                </div>
                <div className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: `${badgeColor}22`, borderRadius: '50%' }}>
                        <Award size={20} color={badgeColor} />
                    </div>
                    <div>
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Badge Rank</p>
                        <p style={{ fontSize: '14px', fontWeight: '700', color: badgeColor }}>{badgeName} Tier</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ padding: '8px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px' }}>
                            <Target size={24} color="var(--success)" />
                        </div>
                    </div>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Readiness Score</h3>
                    <p style={{ fontSize: '24px', fontWeight: '700' }}>{readinessIndex}%</p>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${readinessIndex}%`, background: 'var(--success)' }}></div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ padding: '8px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px' }}>
                            <Trophy size={24} color="var(--secondary)" />
                        </div>
                    </div>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Leaderboard Rank</h3>
                    <p style={{ fontSize: '24px', fontWeight: '700' }}>#12</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Top 15% of students</p>
                </div>

                <div className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px' }}>
                            <Zap size={24} color="var(--accent)" />
                        </div>
                    </div>
                    <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total Points</h3>
                    <p style={{ fontSize: '24px', fontWeight: '700' }}>{user.points || 0}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>{user.badges?.length || 0} Badges earned</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-card" style={{ padding: '24px', border: '1px solid var(--primary)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), transparent)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px' }}>Adaptive Learning Roadmap</h3>
                            <Link to="/student/roadmap" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>VIEW ALL MILESTONES</Link>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '16px',
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
                            }}>
                                <Zap color="white" size={32} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Sprint Goal</p>
                                <h4 style={{ fontSize: '20px', fontWeight: '700', margin: '4px 0' }}>{nextGoal?.title || 'Placement Preparation'}</h4>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Focusing on your {nextGoal?.type} skills today to reach the next readiness peak.</p>
                            </div>
                            <button className="btn btn-primary" onClick={() => navigate('/student/roadmap')}>Resume Path</button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Recent Activity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {(user.activity && user.activity.length > 0 ? user.activity : [
                                { id: 1, title: 'Completed "Merge Intervals" (Arrays)', time: '2 hours ago', points: 10 },
                                { id: 2, title: 'Weekly Assessment Finished', time: '1 day ago', points: 50 },
                                { id: 3, title: 'Vocabulary Goal Reached', time: '2 days ago', points: 5 }
                            ]).map(act => (
                                <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CheckCircle2 size={20} color="var(--primary)" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '14px', fontWeight: '500' }}>{act.title}</p>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{act.time}</p>
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--success)' }}>+{act.points} pts</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Profile Strength</h3>
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <svg width="120" height="120" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--primary)" strokeWidth="8"
                                        strokeDasharray={`${(user.profileStrength || 40) * 3.39} 339`}
                                        transform="rotate(-90 60 60)" />
                                </svg>
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <p style={{ fontSize: '24px', fontWeight: '700' }}>{user.profileStrength || 40}%</p>
                                </div>
                            </div>
                        </div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckCircle2 size={14} color="var(--success)" /> Email Verified
                            </li>
                            <li style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckCircle2 size={14} color="var(--success)" /> Basic Info Complete
                            </li>
                            <li style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '1.5px solid currentColor' }}></div> Upload 5 Certificates
                            </li>
                        </ul>
                    </div>

                    <div className="glass-card" style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Upcoming Tests</h3>
                        <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                            <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '4px' }}>Tomorrow, 10:00 AM</p>
                            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Weekly Coding Assessment</p>
                            <button className="btn btn-primary" style={{ width: '100%', fontSize: '12px', height: '36px' }}>Set Reminder</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StudentDashboard = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div style={{ width: '280px', borderRight: '1px solid var(--surface-border)', padding: '32px 24px', display: 'flex', flexDirection: 'column' }} className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
                    <span style={{ fontSize: '20px', fontWeight: '700' }}>PlacementPrep</span>
                </div>

                <div style={{ flex: 1 }}>
                    <SidebarLink to="/student" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/student'} />
                    <SidebarLink to="/student/roadmap" icon={MapIcon} label="Learning Path" active={location.pathname.includes('/roadmap')} />
                    <SidebarLink to="/student/leaderboard" icon={Trophy} label="Leaderboard" active={location.pathname.includes('/leaderboard')} />
                    <SidebarLink to="/student/coding" icon={Code} label="Coding Module" active={location.pathname.includes('/coding')} />
                    <SidebarLink to="/student/aptitude" icon={BookOpen} label="Aptitude" active={location.pathname.includes('/aptitude')} />
                    <SidebarLink to="/student/communication" icon={MessageSquare} label="Communication" active={location.pathname.includes('/communication')} />
                    <SidebarLink to="/student/analytics" icon={BarChart3} label="Analytics" active={location.pathname.includes('/analytics')} />
                </div>

                <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '24px' }}>
                    <button onClick={handleLogout} className="btn" style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--danger)' }}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto', maxHeight: '100vh' }}>
                <header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
                    <button className="btn" style={{ padding: '8px', color: 'var(--text-muted)' }}><Bell size={20} /></button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '14px', fontWeight: '600' }}>{user.username}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Student</p>
                        </div>
                        <div style={{ width: '40px', height: '40px', background: 'var(--glass)', borderRadius: '50%', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={20} />
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<StudentOverview />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/coding" element={<CodingModule />} />
                    <Route path="/aptitude" element={<AptitudeModule />} />
                    <Route path="/communication" element={<CommunicationModule />} />
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
            </div>
        </div>
    );
};

export default StudentDashboard;
