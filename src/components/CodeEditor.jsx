import React, { useState, useEffect } from 'react';
import {
    Play, Send, RotateCcw, ChevronLeft,
    Settings, Info, CheckCircle2, AlertCircle, Clock
} from 'lucide-react';

const CodeEditor = ({ problem, onBack }) => {
    const [code, setCode] = useState(problem?.starterCode || '// Write your code here...\nfunction solution() {\n  \n}');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('idle'); // idle, running, success, error
    const [timeLeft, setTimeLeft] = useState(problem?.timeLimit || 3600);
    const [performanceData, setPerformanceData] = useState(null);
    const [hintIndex, setHintIndex] = useState(-1);

    const hints = [
        "Try using a Hash Map to store previously seen numbers for O(n) lookup.",
        "Consider the constraints: O(n^2) might TLE if n is up to 10,000.",
        "Edge case: Check if the target can be achieved by using the same number twice (if allowed)."
    ];

    useEffect(() => {
        if (problem?.isAssessment) {
            const timer = setInterval(() => {
                setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [problem]);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const handleRun = () => {
        setStatus('running');
        setOutput('Initializing environment...\nRunning sample test cases...');
        setTimeout(() => {
            setStatus('success');
            setOutput('√ Test Case 1: [2,7,11,15], target=9 => PASSED\n√ Test Case 2: [3,2,4], target=6 => PASSED\n\nAll basic cases passed. Try high-volume test cases now.');
        }, 1500);
    };

    const handleSubmit = () => {
        setStatus('running');
        setOutput('Starting hidden test case execution...\n[1/10] Passed\n[4/10] Passed\n[10/10] Passed\n\nAnalyzing performance profile...');
        setTimeout(() => {
            setStatus('success');
            setPerformanceData({
                runtime: '42ms',
                runtimePercent: '95.4%',
                memory: '41.2MB',
                memoryPercent: '88.1%'
            });
            setOutput('√ All 15 test cases (including hidden) passed!\n\nExecution Time: 42ms\nMemory Usage: 41.2MB\n\nResult: ACCEPTED');
        }, 2500);
    };

    return (
        <div className="animate-fade-in" style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            {/* Editor Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={onBack} className="btn btn-outline" style={{ padding: '8px' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h2 style={{ fontSize: '18px' }}>{problem?.title || 'Solving Problem'}</h2>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '600', padding: '2px 8px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '4px' }}>{problem?.difficulty || 'Easy'}</span>
                            {problem?.isAssessment && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: timeLeft < 600 ? 'var(--danger)' : 'var(--warning)', fontWeight: '700' }}>
                                    <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor' }}></div>
                                    <Clock size={12} /> {formatTime(timeLeft)} PROCTORING ACTIVE
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-outline" onClick={() => setHintIndex(prev => Math.min(prev + 1, hints.length - 1))} title="Get Hint">
                        <Info size={18} /> Hint
                    </button>
                    <button className="btn btn-outline" onClick={() => setCode(problem?.starterCode || '')} title="Reset Code">
                        <RotateCcw size={18} />
                    </button>
                    <button className="btn btn-primary" onClick={handleRun} disabled={status === 'running'}>
                        <Play size={18} /> Run
                    </button>
                    <button className="btn" style={{ background: 'var(--success)', color: 'white' }} onClick={handleSubmit} disabled={status === 'running'}>
                        <Send size={18} /> Submit Assessment
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '20px', minHeight: 0 }}>
                {/* Left: Problem Details & Hints */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                    <div className="glass-card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                            <Settings size={18} color="var(--primary)" />
                            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Problem Description</h3>
                        </div>
                        <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                            <p style={{ marginBottom: '16px' }}>{problem?.description || 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.'}</p>

                            <h4 style={{ color: 'var(--text)', marginBottom: '8px', fontSize: '14px' }}>Example 1:</h4>
                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace' }}>
                                Input: nums = [2,7,11,15], target = 9<br />
                                Output: [0,1]<br />
                                Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                            </div>

                            <h4 style={{ color: 'var(--text)', marginBottom: '8px', fontSize: '14px' }}>Constraints:</h4>
                            <ul style={{ paddingLeft: '20px', listStyleType: 'square' }}>
                                <li>2 &lt;= nums.length &lt;= 10,000</li>
                                <li>Performance matters for full points</li>
                            </ul>
                        </div>
                    </div>

                    {hintIndex >= 0 && (
                        <div className="glass-card animate-scale-in" style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid var(--primary)' }}>
                            <h4 style={{ fontSize: '12px', color: 'var(--primary)', marginBottom: '8px', textTransform: 'uppercase' }}>AI Hint #{hintIndex + 1}</h4>
                            <p style={{ fontSize: '13px', lineHeight: '1.5' }}>{hints[hintIndex]}</p>
                        </div>
                    )}

                    {performanceData && (
                        <div className="glass-card animate-fade-in" style={{ padding: '24px', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid var(--success)' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px', color: 'var(--success)' }}>Runtime Analysis</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Runtime</p>
                                    <p style={{ fontSize: '20px', fontWeight: '700' }}>{performanceData.runtime}</p>
                                    <p style={{ fontSize: '11px', color: 'var(--success)' }}>Beats {performanceData.runtimePercent}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Memory</p>
                                    <p style={{ fontSize: '20px', fontWeight: '700' }}>{performanceData.memory}</p>
                                    <p style={{ fontSize: '11px', color: 'var(--success)' }}>Beats {performanceData.memoryPercent}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right: Code Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass-card" style={{ flex: 3, position: 'relative', overflow: 'hidden', border: '1px solid var(--surface-border)' }}>
                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 20px', borderBottom: '1px solid var(--surface-border)', fontSize: '12px', color: 'var(--text-muted)' }}>
                            Index.js - JavaScript (v18.x)
                        </div>
                        <textarea
                            spellCheck="false"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            style={{
                                width: '100%',
                                height: 'calc(100% - 33px)',
                                background: 'transparent',
                                border: 'none',
                                padding: '20px',
                                color: '#a5b4fc',
                                fontFamily: 'Fira Code, monospace',
                                fontSize: '14px',
                                resize: 'none',
                                lineHeight: '1.6',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div className="glass-card" style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)' }}>Execution Console</h3>
                            {status === 'success' && <CheckCircle2 size={16} color="var(--success)" />}
                        </div>
                        <div style={{
                            flex: 1,
                            background: '#0a0a0f',
                            borderRadius: '8px',
                            padding: '16px',
                            fontFamily: 'monospace',
                            fontSize: '13px',
                            whiteSpace: 'pre-wrap',
                            color: status === 'error' ? 'var(--danger)' : '#94a3b8',
                            overflowY: 'auto',
                            border: '1px solid rgba(255,255,255,0.05)'
                        }}>
                            {output || 'System ready. Waiting for input...'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
