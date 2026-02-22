import React from 'react';
import {
    CheckCircle2, Circle, Play, Lock,
    Code, BookOpen, MessageSquare, Zap, Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const RoadmapStep = ({ item, isLast }) => {
    const isActive = item.status === 'current';
    const isCompleted = item.status === 'completed';

    const getIcon = () => {
        switch (item.type) {
            case 'coding': return <Code size={18} />;
            case 'aptitude': return <BookOpen size={18} />;
            case 'comms': return <MessageSquare size={18} />;
            default: return <Zap size={18} />;
        }
    };

    return (
        <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
            {!isLast && (
                <div style={{
                    position: 'absolute',
                    left: '19px',
                    top: '40px',
                    bottom: '-20px',
                    width: '2px',
                    background: isCompleted ? 'var(--success)' : 'rgba(255,255,255,0.05)',
                    zIndex: 0
                }}></div>
            )}

            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: isCompleted ? 'var(--success)' : isActive ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                border: isActive ? '4px solid rgba(99, 102, 241, 0.2)' : 'none',
                boxShadow: isActive ? '0 0 20px rgba(99, 102, 241, 0.4)' : 'none'
            }}>
                {isCompleted ? <CheckCircle2 color="white" size={20} /> : isActive ? <Play color="white" size={20} fill="white" /> : <Lock color="var(--text-muted)" size={16} />}
            </div>

            <div className={`glass-card ${isActive ? 'active-step' : ''}`} style={{
                flex: 1,
                padding: '20px',
                marginBottom: '40px',
                border: isActive ? '1px solid var(--primary)' : '1px solid var(--surface-border)',
                background: isActive ? 'rgba(99, 102, 241, 0.05)' : 'var(--glass)',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s ease'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: 'rgba(255,255,255,0.05)',
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                {getIcon()} {item.type}
                            </span>
                            {isActive && <span style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: '700' }}>RECOMMENDED FOR TODAY</span>}
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700' }}>{item.title}</h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
                            {isCompleted ? 'You have successfully completed this module with high accuracy.' :
                                isActive ? 'Focus on this now to improve your holistic readiness index.' :
                                    'This will unlock once you reach Level 5 in current modules.'}
                        </p>
                    </div>
                </div>
                {isActive && (
                    <button className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }}>
                        Start Now <Zap size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

const Roadmap = () => {
    const { roadmapData, readinessIndex } = useApp();

    return (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>Your Adaptive <span className="gradient-text">Career Path</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>This roadmap dynamically adjusts based on your performance in technical and communication modules.</p>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '24px' }}>
                    <div className="glass-card" style={{ padding: '12px 24px', textAlign: 'center' }}>
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Level</p>
                        <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)' }}>Expert</p>
                    </div>
                    <div className="glass-card" style={{ padding: '12px 24px', textAlign: 'center' }}>
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Readiness Score</p>
                        <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--success)' }}>{readinessIndex}%</p>
                    </div>
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                {roadmapData?.map((item, index) => (
                    <RoadmapStep
                        key={item.id}
                        item={item}
                        isLast={index === (roadmapData?.length - 1)}
                    />
                ))}
            </div>

            <div className="glass-card" style={{ padding: '32px', textAlign: 'center', border: '1px dashed var(--primary)' }}>
                <Target size={32} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '18px' }}>The Final Frontier: Technical Interview Rounds</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>Keep improving your Readiness Index to unlock personalized mock interviews with senior industry mentors.</p>
            </div>
        </div>
    );
};

export default Roadmap;
