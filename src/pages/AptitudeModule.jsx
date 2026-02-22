import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
    Brain, Clock, CheckCircle2, AlertCircle,
    Target, Zap, Calendar, TrendingUp, ChevronRight
} from 'lucide-react';

const AptitudeTest = ({ questions, title, onComplete, timeLimit, negativeMarking = false }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(timeLimit || questions.length * 60);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleSubmit = () => {
        let score = 0;
        let correct = 0;
        let incorrect = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] !== undefined) {
                if (answers[idx] === q.correct) {
                    correct++;
                    score += 1;
                } else {
                    incorrect++;
                    if (negativeMarking) score -= 0.25;
                }
            }
        });
        onComplete({ score, correct, incorrect, total: questions.length });
    };

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const q = questions[currentIdx];

    return (
        <div className="glass-card animate-fade-in" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>{title}</h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Question {currentIdx + 1} of {questions.length}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: timeLeft < 30 ? 'var(--danger)' : 'var(--primary)', fontWeight: '700', fontSize: '20px' }}>
                    <Clock size={20} /> {formatTime(timeLeft)}
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text)' }}>{q.question}</p>
            </div>

            <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }}>
                {q.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => setAnswers({ ...answers, [currentIdx]: idx })}
                        className="btn"
                        style={{
                            justifyContent: 'flex-start',
                            padding: '16px 24px',
                            background: answers[currentIdx] === idx ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${answers[currentIdx] === idx ? 'var(--primary)' : 'var(--surface-border)'}`,
                            color: answers[currentIdx] === idx ? 'var(--primary)' : 'var(--text)'
                        }}
                    >
                        <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            border: '2px solid currentColor',
                            marginRight: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: '700'
                        }}>
                            {String.fromCharCode(65 + idx)}
                        </div>
                        {opt}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx(prev => prev - 1)}
                    className="btn btn-outline"
                >
                    Previous
                </button>
                {currentIdx < questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentIdx(prev => prev + 1)}
                        className="btn btn-primary"
                    >
                        Next Question
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="btn btn-primary"
                        style={{ background: 'var(--success)' }}
                    >
                        Submit Test
                    </button>
                )}
            </div>
        </div>
    );
};

const FormulaCard = ({ formula }) => {
    const [hidden, setHidden] = useState(true);
    return (
        <div
            onClick={() => setHidden(!hidden)}
            className="glass-card"
            style={{
                padding: '16px',
                cursor: 'pointer',
                background: hidden ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${hidden ? 'var(--primary)' : 'var(--surface-border)'}`,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {hidden && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(99, 102, 241, 0.1)', backdropFilter: 'blur(4px)', zIndex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>TAP TO REVEAL FORMULA</span>
            </div>}
            <p style={{ fontSize: '14px', filter: hidden ? 'blur(8px)' : 'none' }}>{formula}</p>
        </div>
    );
};

const SuddenDeathMode = ({ questions, onComplete }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question
    const [score, setScore] = useState(0);

    const handleAnswer = React.useCallback((idx) => {
        if (idx === questions[currentIdx].correct) {
            setScore(prev => prev + 1);
            if (currentIdx < questions.length - 1) {
                setCurrentIdx(prev => prev + 1);
                setTimeLeft(10);
            } else {
                onComplete({ score: score + 1, total: questions.length, mode: 'Sudden Death' });
            }
        } else {
            onComplete({ score, total: questions.length, mode: 'Sudden Death', failed: true });
        }
    }, [currentIdx, questions, score, onComplete]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleAnswer(null); // Timeout is wrong answer
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, handleAnswer]);

    const q = questions[currentIdx];

    return (
        <div className="glass-card animate-scale-in" style={{ padding: '40px', maxWidth: '600px', margin: '40px auto', border: '2px solid var(--danger)' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div style={{ fontSize: '12px', color: 'var(--danger)', fontWeight: '800', marginBottom: '8px' }}>SUDDEN DEATH MODE</div>
                <h2 style={{ fontSize: '32px', color: 'var(--danger)' }}>{timeLeft}s</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Question {currentIdx + 1} of {questions.length}</p>
            </div>

            <p style={{ fontSize: '18px', marginBottom: '32px', textAlign: 'center' }}>{q.question}</p>

            <div style={{ display: 'grid', gap: '12px' }}>
                {q.options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(idx)} className="btn btn-outline" style={{ justifyContent: 'center', borderColor: 'var(--danger-border)' }}>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

const TopicLearning = ({ topic, onBack, onStartPractice }) => {
    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="btn btn-outline" style={{ marginBottom: '24px' }}>
                Back to Topics
            </button>
            <div className="glass-card" style={{ padding: '32px', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>{topic.name}</h1>
                <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '32px' }}>
                    {topic.explanation}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Brain size={18} /> Interactive Formula Revision
                        </h3>
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {topic.formulas.map((f, i) => (
                                <FormulaCard key={i} formula={f} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--warning)' }}>Expert Tricks</h3>
                        <p style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '8px', border: '1px dashed var(--warning)', fontSize: '14px', lineHeight: '1.5' }}>
                            {topic.tricks}
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Solved Examples</h3>
                    {topic.examples.map((ex, i) => (
                        <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--surface-border)', marginBottom: '16px' }}>
                            <p style={{ fontWeight: '600', marginBottom: '12px' }}>Q: {ex.q}</p>
                            <p style={{ color: 'var(--success)', fontSize: '14px' }}>Sol: {ex.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Practice Section</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                <button className="glass-card btn" style={{ padding: '24px', flexDirection: 'column', gap: '8px', border: '1px solid var(--success)' }} onClick={() => onStartPractice('Easy')}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--success)' }}>Easy</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Foundational Concepts</span>
                </button>
                <button className="glass-card btn" style={{ padding: '24px', flexDirection: 'column', gap: '8px', border: '1px solid var(--warning)' }} onClick={() => onStartPractice('Medium')}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--warning)' }}>Medium</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Intermediate Difficulty</span>
                </button>
                <button className="glass-card btn" style={{ padding: '24px', flexDirection: 'column', gap: '8px', border: '1px solid var(--danger)' }} onClick={() => onStartPractice('Hard')}>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--danger)' }}>Hard</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Advanced Problems</span>
                </button>
            </div>
        </div>
    );
};

const AptitudeModule = () => {
    const { aptitudeTopics, aptitudeQuestions, updateAptitudeStats } = useApp();
    const [view, setView] = useState('overview'); // overview, learning, test, analytics, sudden-death
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [testConfig, setTestConfig] = useState(null);
    const [result, setResult] = useState(null);

    // Mock Accuracy Data
    const accuracyData = [
        { topic: 'Trains', score: 85 },
        { topic: 'Average', score: 60 },
        { topic: 'Percentage', score: 92 },
        { topic: 'Profit & Loss', score: 45 },
        { topic: 'Simple Interest', score: 78 }
    ];

    const startTest = (config) => {
        setTestConfig(config);
        setView('test');
        setResult(null);
    };

    const handleComplete = (data) => {
        setView('overview');
        setResult(data);
        if (data.score > 0) {
            updateAptitudeStats({
                accuracy: Math.round((data.score / data.total) * 100),
                dailyDrillDone: true
            });
        }
    };

    if (view === 'test') {
        return <AptitudeTest {...testConfig} onComplete={handleComplete} />;
    }

    if (view === 'sudden-death') {
        return <SuddenDeathMode questions={aptitudeQuestions} onComplete={handleComplete} />;
    }

    if (view === 'analytics') {
        return (
            <div className="animate-fade-in">
                <button onClick={() => setView('overview')} className="btn btn-outline" style={{ marginBottom: '24px' }}>
                    Back to Module
                </button>
                <div className="glass-card" style={{ padding: '32px' }}>
                    <h2 style={{ fontSize: '24px', marginBottom: '32px' }}>Performance Analytics</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '40px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Topic-wise Accuracy</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {accuracyData.map(item => (
                                    <div key={item.topic}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                                            <span>{item.topic}</span>
                                            <span style={{ fontWeight: '600', color: item.score < 50 ? 'var(--danger)' : 'var(--text)' }}>{item.score}%</span>
                                        </div>
                                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                            <div style={{ height: '100%', background: item.score < 50 ? 'var(--danger)' : 'var(--primary)', width: `${item.score}%`, borderRadius: '4px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="glass-card" style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid var(--danger)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                    <AlertCircle color="var(--danger)" size={20} />
                                    <h4 style={{ color: 'var(--danger)' }}>Weak Topic Detected</h4>
                                </div>
                                <p style={{ fontSize: '14px' }}>Your accuracy in <b>Profit & Loss</b> is below 50%. We recommend taking a foundational practice session.</p>
                                <button className="btn btn-outline" style={{ marginTop: '16px', color: 'var(--danger)', borderColor: 'var(--danger)', width: '100%' }}>Practice Now</button>
                            </div>
                            <div className="glass-card" style={{ padding: '24px' }}>
                                <h4 style={{ marginBottom: '12px' }}>Rank Comparison</h4>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>You are in the <b>Top 15%</b> of students in the Batch of 2026 for Aptitude.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (view === 'learning' && selectedTopic) {
        return (
            <TopicLearning
                topic={selectedTopic}
                onBack={() => setView('overview')}
                onStartPractice={(level) => startTest({
                    questions: aptitudeQuestions.filter(q => q.topic === selectedTopic.id).slice(0, 5),
                    title: `${selectedTopic.name} - ${level}`,
                    timeLimit: 300
                })}
            />
        );
    }

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Aptitude Training</h1>
                <p style={{ color: 'var(--text-muted)' }}>Master quantitative and logical reasoning with structured practice.</p>
            </div>

            {result && (
                <div className={`glass-card animate-scale-in`} style={{ padding: '32px', marginBottom: '40px', background: result.failed ? 'rgba(239, 68, 68, 0.05)' : 'rgba(34, 197, 94, 0.05)', border: `1px solid ${result.failed ? 'var(--danger)' : 'var(--success)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ color: result.failed ? 'var(--danger)' : 'var(--success)', marginBottom: '8px' }}>{result.mode === 'Sudden Death' ? (result.failed ? 'Survival Failed!' : 'Survival Master!') : 'Test Completed!'}</h2>
                            <p style={{ fontSize: '24px', fontWeight: '700' }}>Score: {result.score} / {result.total}</p>
                            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>
                                {result.failed ? 'One wrong answer or timeout ends the run!' : 'Excellent performance! Keep it up.'}
                            </p>
                        </div>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: `4px solid ${result.failed ? 'var(--danger)' : 'var(--success)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                            {Math.round((result.score / result.total) * 100)}%
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                <div className="glass-card highlight-hover" style={{ padding: '24px', borderLeft: '4px solid var(--danger)', cursor: 'pointer' }} onClick={() => setView('sudden-death')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Zap size={20} color="var(--danger)" />
                        <h3 style={{ fontSize: '18px' }}>Sudden Death Drill</h3>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                        10 seconds per question. One mistake and you're out. Build extreme speed.
                    </p>
                    <div style={{ color: 'var(--danger)', fontSize: '12px', fontWeight: '700' }}>ENTER DRILL →</div>
                </div>

                <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Calendar size={20} color="var(--primary)" />
                        <h3 style={{ fontSize: '18px' }}>Weekly Topic Test</h3>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                        20 question assessment. 30-minute timer. Negative marking included.
                    </p>
                    <button
                        className="btn btn-outline"
                        style={{ width: '100%' }}
                        onClick={() => startTest({
                            questions: aptitudeQuestions.slice(0, 3), // Mock questions
                            title: 'Weekly Assessment',
                            timeLimit: 1800,
                            negativeMarking: true
                        })}
                    >
                        Start Weekly Test
                    </button>
                </div>

                <div className="glass-card" style={{ padding: '24px', borderLeft: '4px solid var(--secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <TrendingUp size={20} color="var(--secondary)" />
                        <h3 style={{ fontSize: '18px' }}>Performance Stats</h3>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                        Detailed accuracy tracking, weak topic detection, and rank comparison.
                    </p>
                    <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setView('analytics')}>View Dashboard</button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px' }}>Aptitude Topics</h2>
                <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '12px' }}>
                    {aptitudeTopics.length} Topics Available
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {aptitudeTopics.map(topic => (
                    <div
                        key={topic.id}
                        className="glass-card"
                        style={{
                            padding: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease',
                            border: '1px solid var(--surface-border)'
                        }}
                        onClick={() => {
                            setSelectedTopic(topic);
                            setView('learning');
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div>
                            <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{topic.name}</h4>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Learn & Practice</p>
                        </div>
                        <ChevronRight size={18} color="var(--text-muted)" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AptitudeModule;
