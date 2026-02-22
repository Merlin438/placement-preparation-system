import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';
import {
    Users, PlusCircle, CheckSquare, MessageSquare,
    BarChart3, Trophy, LogOut, Search, Filter,
    MoreVertical, ArrowUpRight, TrendingUp, X,
    Save, AlertCircle, BrainCircuit, Target,
    Calendar, Send, UserCheck, Activity, TrendingDown,
    ChevronRight, BookOpen
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';

const StaffDashboard = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();
    const {
        readinessIndex,
        aptitudeTopics,
        leaderboard,
        liveRooms,
        mentorBookings
    } = useApp();

    const isTeacher = user?.role === 'teacher';
    const isMentor = user?.role === 'mentor';

    const [activeTab, setActiveTab] = useState('students');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAptitudeModal, setShowAptitudeModal] = useState(false);
    const [newTest, setNewTest] = useState({ title: '', topic: 'Arrays', type: 'Weekly', duration: '60' });
    const [doubtInput, setDoubtInput] = useState('');

    const performanceData = [
        { name: 'Mon', score: 65 },
        { name: 'Tue', score: 68 },
        { name: 'Wed', score: 72 },
        { name: 'Thu', score: 70 },
        { name: 'Fri', score: 75 },
        { name: 'Sat', score: 78 },
        { name: 'Sun', score: 82 },
    ];

    const studentComparison = [
        { category: 'Vocab', avg: 70, student: 85 },
        { category: 'Fluency', avg: 65, student: 60 },
        { category: 'Listening', avg: 75, student: 78 },
        { category: 'Confidence', avg: 60, student: 72 },
    ];

    const students = useMemo(() => {
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const studentUsers = allUsers
            .filter(u => u.role === 'student')
            .map(u => ({
                id: u.email,
                name: u.username,
                email: u.email,
                progress: u.points ? Math.min(100, Math.floor(u.points / 50)) : 10,
                readiness: u.username === 'Ethan Hunt' ? readinessIndex : (u.id % 2 === 0 ? 72 : 65),
                coding: u.points || 0,
                comms: 4.2,
                lastActive: 'Just now'
            }));

        if (studentUsers.length === 0) {
            return [
                { id: 1, name: 'Alice Smith', email: 'alice@uni.edu', progress: 85, readiness: 82, coding: 2450, comms: 4.5, lastActive: '2 mins ago' },
                { id: 2, name: 'Bob Johnson', email: 'bob@uni.edu', progress: 62, readiness: 58, coding: 2320, comms: 3.8, lastActive: '1 hour ago' },
                { id: 3, name: 'Ethan Hunt', email: 'ethan@agent.com', progress: 45, readiness: readinessIndex, coding: 1850, comms: 4.2, lastActive: 'Online' },
            ];
        }
        return studentUsers;
    }, [readinessIndex]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCreateTest = (e) => {
        e.preventDefault();
        alert(`Assessment "${newTest.title}" created successfully!`);
        setShowCreateModal(false);
    };

    const sidebarItems = [
        { id: 'students', label: isMentor ? 'My Students' : 'Students', icon: Users, show: true },
        { id: 'assessments', label: 'Create Test', icon: PlusCircle, show: isTeacher },
        { id: 'evaluations', label: 'Evaluations', icon: CheckSquare, show: isTeacher },
        { id: 'aptitude', label: 'Aptitude Mgmt', icon: BrainCircuit, show: isTeacher },
        { id: 'sessions', label: '1:1 Sessions', icon: Calendar, show: isMentor },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, show: isMentor },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, show: true },
        { id: 'doubts', label: 'Doubts', icon: MessageSquare, show: true }
    ].filter(item => item.show);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
            {/* Sidebar */}
            <div style={{ width: '280px', borderRight: '1px solid var(--surface-border)', padding: '32px 24px', display: 'flex', flexDirection: 'column' }} className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                    <div style={{ width: '40px', height: '40px', background: isTeacher ? 'var(--secondary)' : 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                        {isTeacher ? <Target size={24} /> : <UserCheck size={24} />}
                    </div>
                    <div>
                        <span style={{ fontSize: '18px', fontWeight: '800', display: 'block' }}>StaffPortal</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user?.role?.toUpperCase()} MODE</span>
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sidebarItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setSelectedStudent(null);
                            }}
                            className={`btn ${activeTab === item.id ? 'btn-primary' : 'btn-outline'}`}
                            style={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                background: activeTab === item.id ? 'var(--primary)' : 'transparent',
                                color: activeTab === item.id ? 'white' : 'var(--text-muted)',
                                border: activeTab === item.id ? 'none' : '1px solid transparent'
                            }}
                        >
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ borderTop: '1px solid var(--surface-border)', paddingTop: '24px' }}>
                    <div style={{ padding: '0 12px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                            {user?.username?.[0]}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <p style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.username}</p>
                            <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{user?.role}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>
                            {activeTab === 'students' && (selectedStudent ? `Evaluating: ${selectedStudent.name}` : 'Student Management')}
                            {activeTab === 'assessments' && 'Assessment Infrastructure'}
                            {activeTab === 'evaluations' && 'Pending Progress Audits'}
                            {activeTab === 'aptitude' && 'Aptitude Question Bank'}
                            {activeTab === 'sessions' && 'Live 1:1 Sessions'}
                            {activeTab === 'analytics' && 'Global Performance Insights'}
                            {activeTab === 'leaderboard' && 'Campus Leaderboard'}
                            {activeTab === 'doubts' && 'Student Query Resolution'}
                        </h1>
                        <p style={{ color: 'var(--text-muted)' }}>{isTeacher ? 'Manage curriculum and assessments' : 'Mentor and evaluate student performance'}</p>
                    </div>

                    <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', gap: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>AVG READINESS</p>
                            <p style={{ fontWeight: '700' }}>72.8%</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ACTIVE</p>
                            <p style={{ fontWeight: '700', color: 'var(--success)' }}>{students.length}</p>
                        </div>
                    </div>
                </header>

                {activeTab === 'students' && !selectedStudent && (
                    <div className="glass-card animate-fade-in" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '18px' }}>Batch A-2026 Students</h3>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input type="text" placeholder="Search student..." style={{ paddingLeft: '36px', height: '36px', width: '220px', fontSize: '12px' }} />
                                </div>
                                <button className="btn btn-outline" style={{ height: '36px', fontSize: '12px' }}>
                                    <Filter size={14} /> Filter
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                            {students.map(s => (
                                <div
                                    key={s.id}
                                    className="glass-card hover-glow"
                                    style={{ padding: '20px', cursor: 'pointer', border: '1px solid var(--surface-border)' }}
                                    onClick={() => setSelectedStudent(s)}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: 'var(--primary)' }}>
                                                {s.name[0]}
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '15px' }}>{s.name}</h4>
                                                <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.email}</p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: '16px', fontWeight: '700', color: s.readiness > 70 ? 'var(--success)' : 'white' }}>{s.readiness}%</p>
                                            <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>READINESS</p>
                                        </div>
                                    </div>
                                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginBottom: '12px' }}>
                                        <div style={{ width: `${s.readiness}%`, height: '100%', background: s.readiness > 70 ? 'var(--success)' : 'var(--primary)', borderRadius: '3px' }}></div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Coding: <b>{s.coding} pts</b></span>
                                        <span style={{ color: 'var(--primary)', fontWeight: '600' }}>View Profile <ChevronRight size={12} /></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'students' && selectedStudent && (
                    <div className="animate-scale-in">
                        <button
                            className="btn btn-outline"
                            style={{ marginBottom: '24px', fontSize: '12px' }}
                            onClick={() => setSelectedStudent(null)}
                        >
                            Back to Student List
                        </button>

                        <div className="glass-card" style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '800', color: 'white' }}>
                                        {selectedStudent.name[0]}
                                    </div>
                                    <div>
                                        <h2 style={{ fontSize: '24px' }}>{selectedStudent.name}</h2>
                                        <p style={{ color: 'var(--text-muted)' }}>Student Readiness Audit • Batch A-2026</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button className="btn btn-outline" onClick={() => alert('Task assigned!')}><Activity size={16} /> Assign Drill</button>
                                    <button className="btn btn-primary" onClick={() => alert('Generating PDF report...')}>Download Dossier</button>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
                                <div>
                                    <h3 style={{ fontSize: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <TrendingUp size={18} color="var(--primary)" /> Performance Velocity
                                    </h3>
                                    <div style={{ height: '240px', width: '100%' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={performanceData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} axisLine={false} tickLine={false} />
                                                <YAxis stroke="var(--text-muted)" fontSize={12} axisLine={false} tickLine={false} />
                                                <Tooltip
                                                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '12px' }}
                                                />
                                                <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)', r: 4 }} activeDot={{ r: 6 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div style={{ marginTop: '32px' }}>
                                        <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Recent Submissions</h3>
                                        <div style={{ display: 'grid', gap: '12px' }}>
                                            {[
                                                { type: 'Coding', name: 'Reverse Linked List', status: 'Graded', date: '2h ago' },
                                                { type: 'Speaking', name: 'Mock HR Interview', status: 'Pending Review', date: 'Today' },
                                            ].map((sub, i) => (
                                                <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                        <div className="badge" style={{ background: sub.type === 'Coding' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(236, 72, 153, 0.1)', color: sub.type === 'Coding' ? 'var(--primary)' : 'var(--secondary)' }}>{sub.type}</div>
                                                        <span style={{ fontWeight: '600', fontSize: '14px' }}>{sub.name}</span>
                                                    </div>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <p style={{ fontSize: '12px', color: sub.status === 'Graded' ? 'var(--success)' : 'var(--warning)' }}>{sub.status}</p>
                                                        <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{sub.date}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Module Proficiency Audit</h3>
                                    <div style={{ height: '200px', width: '100%', marginBottom: '32px' }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={studentComparison}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                                <XAxis dataKey="category" stroke="var(--text-muted)" fontSize={10} axisLine={false} tickLine={false} />
                                                <YAxis hide />
                                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                                <Bar dataKey="avg" fill="rgba(255, 255, 255, 0.05)" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="student" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="glass-card" style={{ padding: '24px', background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed var(--primary)' }}>
                                        <h4 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <AlertCircle size={16} /> Insight Engine
                                        </h4>
                                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                            Student is performing <b>24% better</b> than batch average in <b>Aptitude</b> but lags in <b>Live Fluency</b>.
                                        </p>
                                        <button className="btn btn-outline" style={{ marginTop: '16px', width: '100%', fontSize: '12px' }}>Send Focus Recommendations</button>
                                    </div>

                                    {isTeacher && (
                                        <div style={{ marginTop: '32px' }}>
                                            <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Academic Override</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                                <select style={{ height: '40px' }}>
                                                    <option>Manual Pass</option>
                                                    <option>Request Retest</option>
                                                </select>
                                                <button className="btn btn-primary">Apply Action</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'assessments' && (
                    <div className="animate-fade-in">
                        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', marginBottom: '32px' }}>
                            <PlusCircle size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
                            <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Assessment Builder</h2>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 32px' }}>
                                Construct technical assessments, mock interviews, or aptitude drills for global deployment.
                            </p>
                            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                                Create New Test
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Active Assignments</h3>
                                {['Weekly DSA Drill', 'Aptitude Speed Test'].map(title => (
                                    <div key={title} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--surface-border)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ fontSize: '15px' }}>{title}</h4>
                                            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ends in 2 days • 84% Completed</p>
                                        </div>
                                        <button className="btn btn-outline" style={{ fontSize: '11px' }}>Monitor</button>
                                    </div>
                                ))}
                            </div>
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Current Focus</h3>
                                <div style={{ padding: '16px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid var(--primary)' }}>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>ACTIVE TOPIC</p>
                                    <h4 style={{ fontSize: '18px', color: 'var(--primary)', marginBottom: '12px' }}>Data Structures (Arrays)</h4>
                                    <button className="btn btn-primary" style={{ width: '100%', fontSize: '12px' }}>Update Focus Topic</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'aptitude' && (
                    <div className="animate-fade-in">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <h4 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>BANK HEALTH</h4>
                                <div style={{ display: 'flex', gap: '32px' }}>
                                    <div><p style={{ fontSize: '24px', fontWeight: '800' }}>1,542</p><p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>TOTAL Qs</p></div>
                                    <div><p style={{ fontSize: '24px', fontWeight: '800' }}>82%</p><p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>AVG ACCURACY</p></div>
                                </div>
                            </div>
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <h4 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>QUICK ACTIONS</h4>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowAptitudeModal(true)}>Add Question</button>
                                    <button className="btn btn-outline" style={{ flex: 1 }}>Bulk Upload</button>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Topic Analytics</h3>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {aptitudeTopics.slice(0, 4).map(t => (
                                    <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: '600' }}>{t.name}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                                                <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                                                    <div style={{ height: '100%', background: 'var(--primary)', width: '75%', borderRadius: '2px' }}></div>
                                                </div>
                                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>75% Mastered</span>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline" style={{ fontSize: '11px' }}>Edit Pool</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'sessions' && (
                    <div className="glass-card animate-fade-in" style={{ padding: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '20px' }}>Assigned Mentorship sessions</h2>
                            <button className="btn btn-primary">Schedule New Slot</button>
                        </div>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {mentorBookings.map(session => (
                                <div key={session.id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--surface-border)' }}>
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Calendar color="white" size={24} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '16px', fontWeight: '700' }}>1:1 Speaking Prep • {session.id === 1 ? 'Aravind S.' : 'Mehul K.'}</h4>
                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{session.date} at {session.time}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <span className={`badge ${session.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>{session.status}</span>
                                        <button className="btn btn-outline" onClick={() => alert('Entering secure room...')}>Launch Meeting</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'leaderboard' && (
                    <div className="animate-fade-in glass-card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h3 style={{ fontSize: '20px' }}>Performance Stack (Batch A)</h3>
                            <button className="btn btn-outline" style={{ fontSize: '12px' }}>Recalculate Indices</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {students.sort((a, b) => b.readiness - a.readiness).map((s, idx) => (
                                <div key={idx} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                                    <div style={{ width: '32px', height: '32px', background: idx < 3 ? 'var(--warning)' : 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: idx < 3 ? 'black' : 'white', fontSize: '14px' }}>
                                        #{idx + 1}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: '600' }}>{s.name}</p>
                                        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Readiness Index: <b>{s.readiness}%</b> • Coding: {s.coding} pts</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {[1, 2, 3].map(i => <div key={i} style={{ width: '16px', height: '16px', background: idx < 5 ? 'var(--success)' : 'rgba(255,255,255,0.1)', borderRadius: '3px', opacity: 0.5 }}></div>)}
                                    </div>
                                    <button className="btn btn-outline" style={{ fontSize: '11px' }} onClick={() => setSelectedStudent(s)}>Audit</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'doubts' && (
                    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 2fr', gap: '24px', height: 'calc(100vh - 200px)' }}>
                        <div className="glass-card" style={{ padding: '20px', overflowY: 'auto' }}>
                            <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Recent Queries</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {['Arjun S.', 'Sneha R.', 'Mehul K.', 'Alice S.'].map((name, i) => (
                                    <div key={i} style={{ padding: '12px', background: i === 0 ? 'rgba(99, 102, 241, 0.1)' : 'transparent', borderRadius: '10px', cursor: 'pointer', border: i === 0 ? '1px solid var(--primary)' : '1px solid transparent' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <p style={{ fontSize: '14px', fontWeight: '700' }}>{name}</p>
                                            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>10:45 AM</span>
                                        </div>
                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Question about Placement Etiquette...</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>A</div>
                                <div>
                                    <h4 style={{ fontSize: '16px' }}>Arjun Singh</h4>
                                    <p style={{ fontSize: '11px', color: 'var(--success)' }}>Online • Batch A</p>
                                </div>
                            </div>
                            <div style={{ flex: 1, marginBottom: '24px', overflowY: 'auto', padding: '0 8px' }}>
                                <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                                    <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)', borderRadius: '0 16px 16px 16px', display: 'inline-block', maxWidth: '85%' }}>
                                        <p style={{ fontSize: '14px', lineHeight: '1.5' }}>Sir, I'm confused about how to handle multiple interjections during a Group Discussion. Should I stop or continue?</p>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '24px', textAlign: 'right' }}>
                                    <div style={{ padding: '14px 18px', background: 'var(--primary)', color: 'white', borderRadius: '16px 16px 0 16px', display: 'inline-block', maxWidth: '85%', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)' }}>
                                        <p style={{ fontSize: '14px', lineHeight: '1.5' }}>Great question. You should briefly pause, acknowledge the interjection, and then politely regain the floor by summarizing your point. Communication is about control.</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <input
                                    type="text"
                                    placeholder="Provide clarification..."
                                    value={doubtInput}
                                    onChange={(e) => setDoubtInput(e.target.value)}
                                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)' }}
                                />
                                <button className="btn btn-primary" onClick={() => setDoubtInput('')} style={{ padding: '0 24px' }}>
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Assessment Modals - Reusing from TeacherDashboard */}
            {showCreateModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-card animate-scale-in" style={{ width: '450px', padding: '32px', position: 'relative' }}>
                        <button onClick={() => setShowCreateModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                            <X size={20} />
                        </button>
                        <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Test Configuration</h2>
                        <form onSubmit={handleCreateTest}>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>ASSESSMENT TITLE</label>
                                <input
                                    type="text"
                                    value={newTest.title}
                                    onChange={e => setNewTest({ ...newTest, title: e.target.value })}
                                    placeholder="e.g. Weekly Arrays Test"
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>DURATION (MINS)</label>
                                    <select value={newTest.duration} onChange={e => setNewTest({ ...newTest, duration: e.target.value })}>
                                        <option value="30">30</option>
                                        <option value="60">60</option>
                                        <option value="90">90</option>
                                        <option value="120">120</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>FOCUS TOPIC</label>
                                    <select value={newTest.topic} onChange={e => setNewTest({ ...newTest, topic: e.target.value })}>
                                        <option>Arrays</option>
                                        <option>Strings</option>
                                        <option>DP</option>
                                        <option>Graphs</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '48px' }}>
                                <Save size={18} /> Initialize Assessment
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {showAptitudeModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-card animate-scale-in" style={{ width: '500px', padding: '32px', position: 'relative' }}>
                        <button onClick={() => setShowAptitudeModal(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                            <X size={20} />
                        </button>
                        <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>New Aptitude Entry</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Question Saved!'); setShowAptitudeModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>TOPIC</label>
                                <select required>
                                    {aptitudeTopics.map(t => <option key={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>QUESTION PROMPT</label>
                                <textarea placeholder="Enter the question text..." rows="3" required style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--surface-border)', color: 'white' }}></textarea>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                                <input placeholder="Option A" required />
                                <input placeholder="Option B" required />
                                <input placeholder="Option C" required />
                                <input placeholder="Option D" required />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '48px' }}>
                                <PlusCircle size={18} /> Add to Global Bank
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffDashboard;
