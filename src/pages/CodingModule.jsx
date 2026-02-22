import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
    Code2, ChevronRight, Clock, Star,
    Calendar, Award, BrainCircuit, Search,
    ExternalLink, BookOpen, Layers, Zap,
    ChevronLeft
} from 'lucide-react';
import CodeEditor from '../components/CodeEditor';

const TopicCard = ({ topic }) => (
    <div className="glass-card animate-fade-in" style={{ padding: '20px', cursor: 'pointer', transition: 'all 0.2s ease', border: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code2 size={20} color="var(--primary)" />
            </div>
            <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{topic.solved}/{topic.problems} Solved</p>
                <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '4px' }}>
                    <div style={{ width: `${(topic.solved / (topic.problems || 1)) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: '2px' }}></div>
                </div>
            </div>
        </div>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{topic.name}</h3>
        <button className="btn" style={{ fontSize: '12px', padding: '6px 0', color: 'var(--primary)' }}>
            Explore Topic <ChevronRight size={14} />
        </button>
    </div>
);

const PlatformCard = ({ name, url, icon: Icon, color }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card"
        style={{
            padding: '20px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--surface-border)',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
        <div style={{ width: '32px', height: '32px', background: `${color}22`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={18} color={color} />
        </div>
        <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '14px', color: 'var(--text)', margin: 0 }}>{name}</h4>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Practice on {name}</p>
        </div>
        <ExternalLink size={14} color="var(--text-muted)" />
    </a>
);

const AssessmentCard = ({ type, title, duration, questions, difficulty, color, onStart }) => (
    <div className="glass-card animate-fade-in" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: `radial-gradient(circle at top right, ${color}33, transparent)`, zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: color }}>
                <Calendar size={18} />
                <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>{type}</span>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{title}</h3>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <Clock size={14} /> {duration}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <BrainCircuit size={14} /> {questions} Qs
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <Star size={14} /> {difficulty}
                </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: color }} onClick={onStart}>
                Start Assessment
            </button>
        </div>
    </div>
);

const CodingModule = () => {
    const { codingTopics } = useApp();
    const [activeTab, setActiveTab] = useState('practice');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedProblem, setSelectedProblem] = useState(null);

    const startProblem = (title, difficulty = 'Medium', isAssessment = false) => {
        setSelectedProblem({
            title,
            difficulty,
            isAssessment,
            timeLimit: isAssessment ? 3600 : null,
            description: "Sample problem description for demonstration. Implement a solution that meets the required time complexity.",
            starterCode: "function solution(n) {\n  // Implementation here\n  return 0;\n}"
        });
    };

    if (selectedProblem) {
        return <CodeEditor problem={selectedProblem} onBack={() => setSelectedProblem(null)} />;
    }

    if (selectedTopic && activeTab === 'practice') {
        return (
            <div className="animate-fade-in">
                <button
                    onClick={() => setSelectedTopic(null)}
                    className="btn btn-outline"
                    style={{ marginBottom: '24px', padding: '8px 16px' }}
                >
                    <ChevronLeft size={18} /> Back to Topics
                </button>

                <div className="glass-card" style={{ padding: '32px', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                        <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px' }}>
                            <BookOpen size={24} color="var(--primary)" />
                        </div>
                        <h1 style={{ fontSize: '32px' }}>{selectedTopic.name}</h1>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>
                            Concept Explanation
                        </h3>
                        <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '1.7', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                            {selectedTopic.explanation}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '40px' }}>
                        <div>
                            <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>
                                <Layers size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Key Subtopics
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {selectedTopic.subtopics.map(sub => (
                                    <div key={sub} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--surface-border)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                                        {sub}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>
                                <Zap size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Difficulty Levels
                            </h3>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--success)', color: 'var(--success)' }} onClick={() => startProblem(`${selectedTopic.name} - Easy`, 'Easy')}>
                                    Easy
                                </button>
                                <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--warning)', color: 'var(--warning)' }} onClick={() => startProblem(`${selectedTopic.name} - Medium`, 'Medium')}>
                                    Medium
                                </button>
                                <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={() => startProblem(`${selectedTopic.name} - Hard`, 'Hard')}>
                                    Hard
                                </button>
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>
                                *Choose a level to start the internal assessment engine.
                            </p>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--surface-border)', pt: '32px', marginTop: '32px' }}>
                        <h3 style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>
                            Platform Selection Section
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                            Practice on your favorite platform. We'll redirect you to the specific **{selectedTopic.name}** problem set.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <PlatformCard name="LeetCode" url={selectedTopic.links.leetcode} icon={Code2} color="#ffa116" />
                            <PlatformCard name="CodeChef" url={selectedTopic.links.codechef} icon={Zap} color="#5b4638" />
                            <PlatformCard name="Codeforces" url={selectedTopic.links.codeforces} icon={Layers} color="#3182ce" />
                            <PlatformCard name="HackerRank" url={selectedTopic.links.hackerrank} icon={Star} color="#2ec866" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Coding Module</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Master Data Structures & Algorithms with structured practice.</p>
                </div>
                <div className="glass-card" style={{ display: 'flex', padding: '4px', gap: '4px' }}>
                    <button
                        onClick={() => setActiveTab('practice')}
                        className={`btn ${activeTab === 'practice' ? 'btn-primary' : ''}`}
                        style={{ fontSize: '14px', background: activeTab === 'practice' ? 'var(--primary)' : 'transparent', color: activeTab === 'practice' ? 'white' : 'var(--text-muted)' }}
                    >
                        Practice
                    </button>
                    <button
                        onClick={() => setActiveTab('assessments')}
                        className={`btn ${activeTab === 'assessments' ? 'btn-primary' : ''}`}
                        style={{ fontSize: '14px', background: activeTab === 'assessments' ? 'var(--primary)' : 'transparent', color: activeTab === 'assessments' ? 'white' : 'var(--text-muted)' }}
                    >
                        Assessments
                    </button>
                </div>
            </div>

            {activeTab === 'practice' ? (
                <>
                    <div style={{ marginBottom: '32px', position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                        <input
                            type="text"
                            placeholder="Search topics or specific algorithms..."
                            style={{ paddingLeft: '48px', height: '48px' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                        {codingTopics.map(topic => (
                            <div key={topic.id} onClick={() => setSelectedTopic(topic)}>
                                <TopicCard topic={topic} />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                        <AssessmentCard
                            type="Weekly"
                            title="Arrays & Strings Pro"
                            duration="60 mins"
                            questions="5"
                            difficulty="Easy-Medium"
                            color="#6366f1"
                            onStart={() => startProblem('Weekly Assessment', 'Easy', true)}
                        />
                        <AssessmentCard
                            type="Monthly"
                            title="DSA Foundations Mock"
                            duration="90 mins"
                            questions="3"
                            difficulty="Medium"
                            color="#ec4899"
                            onStart={() => startProblem('Monthly Assessment', 'Medium', true)}
                        />
                        <AssessmentCard
                            type="Semester"
                            title="Core Performance Exam"
                            duration="120 mins"
                            questions="4"
                            difficulty="Hard"
                            color="#8b5cf6"
                            onStart={() => startProblem('Semester Assessment', 'Hard', true)}
                        />
                    </div>

                    <div className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
                        <Award size={48} color="var(--warning)" style={{ marginBottom: '16px' }} />
                        <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Assessment Analytics</h3>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px' }}>
                            Complete assessments to unlock weak area detection and detailed performance metrics.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                            <div>
                                <p style={{ fontSize: '24px', fontWeight: '700' }}>0/10</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Attempted</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '24px', fontWeight: '700' }}>--</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Avg. Accuracy</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '24px', fontWeight: '700' }}>#--</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Global Rank</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodingModule;
