import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
    Mic, Video, Star, CheckCircle2, Upload, Play, Award,
    BookOpen, Users, Headphones, MessageSquare, Clock,
    ChevronRight, Target, TrendingUp, AlertCircle, X, PlusCircle,
    Calendar, Volume2, Search, Zap, ShieldCheck
} from 'lucide-react';

// --- Sub-Components ---

const LabDashboard = ({ data, onJoin }) => (
    <div className="animate-fade-in">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div className="glass-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}>
                    <Target size={80} color="var(--primary)" />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Score</p>
                <h2 style={{ fontSize: '32px', color: 'var(--primary)', margin: '8px 0' }}>{data.score}/100</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={14} color="var(--success)" />
                    <span style={{ fontSize: '12px', color: 'var(--success)' }}>+4% from last week</span>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Proficiency Level</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                    <Award size={24} color="var(--warning)" />
                    <h2 style={{ fontSize: '24px' }}>{data.level}</h2>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>Top 15% of your batch</p>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Daily Streak</p>
                <h2 style={{ fontSize: '32px', color: '#ff4d4d', margin: '8px 0' }}>🔥 {data.streak} Days</h2>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '12px' }}>
                    <div style={{ width: '70%', height: '100%', background: '#ff4d4d', borderRadius: '2px' }}></div>
                </div>
            </div>
        </div>

        <h3 style={{ fontSize: '18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={20} color="var(--primary)" /> Active Activity Rooms
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {[
                { id: 'speak', title: 'Peer Speaking Lab', desc: 'Real-time 1:1 or 1:2 discussion rooms.', icon: Mic, color: 'var(--primary)', label: 'Join Now' },
                { id: 'gd', title: 'Global GD Room', desc: 'AI-moderated group discussions on live topics.', icon: Users, color: '#8b5cf6', label: '8 Active' },
                { id: 'listen', title: 'Listening Drill', desc: 'Interactive audio comprehension & peer testing.', icon: Headphones, color: '#10b981', label: 'Start Lab' },
                { id: 'interview', title: 'Mock Interview Lab', desc: 'Simulated technical & HR stress tests.', icon: MessageSquare, color: '#f59e0b', label: 'Enter Room' }
            ].map(room => (
                <div key={room.id} className="glass-card hover-glow" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${room.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <room.icon size={24} color={room.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{room.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>{room.desc}</p>
                        <button className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }} onClick={() => onJoin(room.id)}>
                            {room.label} <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Upcoming Scheduled Sessions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.upcomingSessions.map(session => (
                        <div key={session.id} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--surface-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span className="badge" style={{ fontSize: '10px' }}>{session.type}</span>
                                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{session.topic}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {session.time}</span>
                                    {session.mentor && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> {session.mentor}</span>}
                                </div>
                            </div>
                            <button className="btn btn-primary" style={{ fontSize: '12px' }}>Prepare</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '18px' }}>Recent Feedback</h3>
                    <MessageSquare size={18} color="var(--primary)" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {data.feedback.map((f, i) => (
                        <div key={i} style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ fontSize: '13px', fontWeight: '700' }}>{f.mentor}</span>
                                <span className="badge" style={{ fontSize: '10px', color: 'var(--primary)' }}>{f.score}/10</span>
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{f.comment}</p>
                            <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>{f.date}</p>
                        </div>
                    ))}
                </div>
                <button className="btn btn-outline" style={{ width: '100%', marginTop: '20px', fontSize: '12px' }}>View Full History</button>
            </div>
        </div>
    </div>
);

const VocabularyLab = ({ word, streak, onComplete }) => {
    const [recording, setRecording] = useState(false);
    const [sentence, setSentence] = useState('');
    const [step, setStep] = useState(1); // 1: Learn, 2: Apply, 3: Success

    const handleRecord = () => {
        setRecording(true);
        setTimeout(() => {
            setRecording(false);
            setStep(3);
        }, 3000);
    };

    if (step === 3) {
        return (
            <div className="animate-scale-in glass-card" style={{ padding: '48px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <CheckCircle2 size={48} color="var(--success)" />
                </div>
                <h2 style={{ fontSize: '28px', marginBottom: '12px' }}>Activity Completed!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Your usage of <b>"{word.word}"</b> has been sent for mentor evaluation. Streak maintained!</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <button className="btn btn-primary" onClick={() => onComplete()}>Next Word</button>
                    <button className="btn btn-outline" onClick={() => onComplete()}>Back to Dash</button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
            <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <span className="badge" style={{ marginBottom: '8px' }}>System Assigned • Daily Word</span>
                        <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--primary)' }}>{word.word}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                            <p style={{ fontSize: '16px', color: 'var(--text-muted)' }}>/{word.pronunciation}/</p>
                            <button className="btn btn-outline" style={{ padding: '4px', borderRadius: '50%' }}><Volume2 size={14} /></button>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '24px' }}>🔥 {streak}</p>
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>STREAK</p>
                    </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '12px', textTransform: 'uppercase' }}>Meaning</h4>
                    <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{word.meaning}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                    <div>
                        <h4 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Synonyms</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {word.synonyms.map(s => <span key={s} className="badge">{s}</span>)}
                        </div>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Antonyms</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {word.antonyms.map(a => <span key={a} className="badge" style={{ borderColor: 'var(--danger)', color: 'var(--danger)' }}>{a}</span>)}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '16px', border: '1px solid var(--surface-border)' }}>
                    <h4 style={{ fontSize: '12px', color: 'var(--primary)', marginBottom: '8px' }}>Context Example</h4>
                    <p style={{ italic: 'true', fontSize: '15px' }}>"{word.example}"</p>
                </div>
            </div>

            <div className="glass-card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Interactive Task</h3>
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600' }}>1. Use the word in a customized sentence:</label>
                    <textarea
                        value={sentence}
                        onChange={(e) => setSentence(e.target.value)}
                        placeholder="Type your sentence here..."
                        rows="4"
                    ></textarea>
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600' }}>2. Speak the sentence (Real-time Evaluation):</label>
                    <button
                        className="btn btn-primary"
                        disabled={!sentence}
                        style={{ width: '100%', height: '56px', background: recording ? 'var(--danger)' : 'var(--primary)' }}
                        onClick={handleRecord}
                    >
                        {recording ? 'Recording... (System is Analyzing)' : <><Mic size={20} /> Start Voice Recording</>}
                    </button>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                        Your pronunciation and grammar will be checked by AI & Mentor.
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '16px', background: 'rgba(255,161,22,0.05)', border: '1px dashed var(--warning)' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <AlertCircle size={18} color="var(--warning)" />
                        <p style={{ fontSize: '12px', color: 'var(--warning)' }}>
                            <b>Tip:</b> Try to maintain a clear tone. Natural pauses are expected, but avoid rapid speaking for better accuracy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SpeakingLab = ({ onBack }) => {
    const [view, setView] = useState('lobby'); // lobby, room
    const [timer, setTimer] = useState(300); // 5 mins
    const [prepTimer, setPrepTimer] = useState(120); // 2 mins
    const [roomPhase, setRoomPhase] = useState('prep'); // prep, discuss, rating

    useEffect(() => {
        let interval;
        if (view === 'room') {
            interval = setInterval(() => {
                if (roomPhase === 'prep') {
                    setPrepTimer(t => t > 0 ? t - 1 : (setRoomPhase('discuss'), 0));
                } else if (roomPhase === 'discuss') {
                    setTimer(t => t > 0 ? t - 1 : (setRoomPhase('rating'), 0));
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [view, roomPhase]);

    const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    if (view === 'room') {
        return (
            <div className="animate-fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div className="badge" style={{ background: 'var(--danger)', color: 'white' }}>LIVE SESSION</div>
                        <h2 style={{ fontSize: '20px' }}>Topic: <span style={{ color: 'var(--primary)' }}>Impact of Remote Work on Mental Health</span></h2>
                    </div>
                    <div className="glass-card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Clock size={18} color="var(--primary)" />
                        <span style={{ fontSize: '18px', fontWeight: '700', fontFamily: 'monospace' }}>
                            {roomPhase === 'prep' ? `Preparing: ${formatTime(prepTimer)}` : formatTime(timer)}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) 1fr', gap: '24px' }}>
                    <div className="glass-card" style={{ padding: '32px', height: '500px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                            <div className="glass-card" style={{ background: '#1c1c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>ME</div>
                                    <p style={{ fontWeight: '600' }}>You (Candidate)</p>
                                </div>
                                <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                                    <button className="btn btn-outline" style={{ padding: '8px' }}><Mic size={14} /></button>
                                    <button className="btn btn-outline" style={{ padding: '8px' }}><Video size={14} /></button>
                                </div>
                            </div>
                            <div className="glass-card" style={{ background: '#1c1c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#444', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>RH</div>
                                    <p style={{ fontWeight: '600' }}>Rohan (Peer)</p>
                                </div>
                                <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                                    <div className="badge" style={{ background: 'var(--success)', color: 'white' }}>Speaking...</div>
                                </div>
                            </div>
                        </div>
                        {roomPhase === 'prep' && (
                            <div className="glass-card animate-pulsate" style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.1)', border: '1px dashed var(--primary)' }}>
                                <h4 style={{ marginBottom: '10px' }}>Preparation Points:</h4>
                                <ul style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                                    <li>Point 1: Flexibility vs Isolation.</li>
                                    <li>Point 2: Blur between home and work life.</li>
                                    <li>Point 3: Corporate responsibility for mental wellness.</li>
                                </ul>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: 'auto' }}>
                            <button className="btn btn-primary" style={{ padding: '12px 32px' }} onClick={() => setView('lobby')}>Leave Session</button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Session Chat / Notes</h3>
                        <div style={{ flex: 1, marginBottom: '20px', overflowY: 'auto', fontSize: '13px' }}>
                            <p style={{ marginBottom: '8px' }}><b style={{ color: 'var(--primary)' }}>System:</b> Session started. Use polite interjections.</p>
                            <p style={{ marginBottom: '8px' }}><b>Rohan:</b> I think flexible hours are a big plus.</p>
                        </div>
                        <input type="text" placeholder="Type here..." />
                    </div>
                </div>

                {roomPhase === 'discuss' && (
                    <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
                        <div className="glass-card" style={{ padding: '12px 24px', background: 'var(--primary)', color: 'white', display: 'flex', gap: '20px' }}>
                            <button className="btn" style={{ color: 'white' }}><Mic size={18} /> Mute</button>
                            <button className="btn" style={{ color: 'white' }}><Video size={18} /> Camera</button>
                            <button className="btn" style={{ color: 'white' }}><PlusCircle size={18} /> React</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: '32px' }}>
                <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Back to Dashboard
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
                <div className="glass-card" style={{ padding: '32px' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Peer Speaking Lab</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Connect with fellow students to practice real-time discussions. Topics are assigned by the system to maintain spontaneity.</p>

                    <div style={{ display: 'grid', gap: '20px' }}>
                        <div className="glass-card hover-glow" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--primary)' }}>
                            <div>
                                <h4 style={{ fontSize: '18px' }}>Active Room: Tech Trends</h4>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hosted by: Sneha | 2/3 Participants</p>
                            </div>
                            <button className="btn btn-primary" onClick={() => setView('room')}>Join Room</button>
                        </div>
                        <div className="glass-card hover-glow" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ fontSize: '18px' }}>Active Room: Global Economy</h4>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hosted by: Vikram | 1/3 Participants</p>
                            </div>
                            <button className="btn btn-outline" onClick={() => setView('room')}>Join Room</button>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', borderTop: '1px solid var(--surface-border)', paddingTop: '32px', textAlign: 'center' }}>
                        <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>Can't find a topic you like?</p>
                        <button className="btn btn-primary"><PlusCircle size={18} /> Create Speaking Room</button>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Your Stats (Last 5 Sessions)</h3>
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {[
                            { label: 'Fluency', val: '8.2/10' },
                            { label: 'Grammar', val: '7.5/10' },
                            { label: 'Clarity', val: '8.8/10' },
                            { label: 'Content', val: '7.0/10' }
                        ].map(s => (
                            <div key={s.label}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                                    <span>{s.label}</span>
                                    <span>{s.val}</span>
                                </div>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                                    <div style={{ width: `${parseFloat(s.val) * 10}%`, height: '100%', background: 'var(--primary)', borderRadius: '2px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <h4 style={{ fontSize: '14px', marginBottom: '16px' }}>Top Peer Rated Keywords</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {['Confident', 'Clear Voice', 'Polite', 'Good Logic', 'Listener'].map(k => (
                                <span key={k} className="badge" style={{ background: 'rgba(255,161,22,0.1)', color: 'var(--warning)' }}>{k}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

const CommunicationModule = () => {
    const { communicationData, vocabularyWords } = useApp();
    const [view, setView] = useState('dashboard'); // dashboard, vocab, speaking, listening, gd, interview

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Communication Lab</h1>
                    <p style={{ color: 'var(--text-muted)' }}>The interactive environment for professional soft skills.</p>
                </div>
                <div className="glass-card" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div>
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textAlign: 'right' }}>SECURE LAB ID</p>
                        <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary)', fontFamily: 'monospace' }}>COM-2026-X84</p>
                    </div>
                    <ShieldCheck size={28} color="var(--success)" />
                </div>
            </div>

            {view === 'dashboard' && (
                <>
                    <div className="glass-card" style={{ padding: '24px', marginBottom: '40px', background: 'rgba(99, 102, 241, 0.05)', border: '1px dashed var(--primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Zap size={24} color="white" />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '16px' }}>Daily Vocabulary Assigned</h4>
                                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Complete to maintain your streak.</p>
                                </div>
                            </div>
                            <button className="btn btn-primary" onClick={() => setView('vocab')}>Start Activity</button>
                        </div>
                    </div>
                    <LabDashboard data={communicationData} onJoin={(id) => setView(id)} />
                </>
            )}

            {view === 'vocab' && (
                <div className="animate-fade-in">
                    <button onClick={() => setView('dashboard')} className="btn btn-outline" style={{ marginBottom: '32px' }}>
                        <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} /> Back to Dashboard
                    </button>
                    <VocabularyLab
                        word={vocabularyWords[0]}
                        streak={communicationData.streak}
                        onComplete={() => setView('dashboard')}
                    />
                </div>
            )}

            {view === 'speak' && <SpeakingLab onBack={() => setView('dashboard')} />}

            {(view === 'gd' || view === 'interview' || view === 'listen') && (
                <div className="glass-card animate-fade-in" style={{ padding: '64px', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,161,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <zap size={48} color="var(--warning)" />
                    </div>
                    <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Interactive {view.toUpperCase()} Room</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 40px' }}>
                        This interactive lab environment requires real-time peer matching. If no peers are available, the system will pair you with a Mentor or an AI Practice Bot.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <button className="btn btn-primary" onClick={() => alert('Searching for available peers...')}>Find Peers</button>
                        <button className="btn btn-outline" onClick={() => setView('dashboard')}>Return to Dashboard</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommunicationModule;
