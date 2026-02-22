import React from 'react';
import { Trophy, Medal, Crown, TrendingUp, ArrowUp, ArrowDown, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LeaderboardRow = ({ entry, index }) => {
    const isTop3 = index < 3;
    const isCurrentUser = entry.name === 'Ethan Hunt'; // Mock current user check

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '16px 24px',
            background: isCurrentUser ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
            borderBottom: '1px solid var(--surface-border)',
            borderLeft: isCurrentUser ? '4px solid var(--primary)' : '4px solid transparent',
            transition: 'all 0.2s ease'
        }}>
            <div style={{ width: '40px', textAlign: 'center', fontSize: '18px', fontWeight: '800', color: isTop3 ? 'var(--warning)' : 'var(--text-muted)' }}>
                {index === 0 ? <Crown size={24} /> : index + 1}
            </div>

            <div style={{ position: 'relative' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--glass)',
                    border: isTop3 ? `2px solid var(--warning)` : '1px solid var(--surface-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <User size={24} color={isTop3 ? 'var(--warning)' : 'var(--text-muted)'} />
                </div>
                {index === 0 && <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--warning)', color: 'black', fontSize: '10px', fontWeight: '800', padding: '2px 6px', borderRadius: '10px' }}>PRO</div>}
            </div>

            <div style={{ flex: 1 }}>
                <p style={{ fontSize: '16px', fontWeight: '700', color: isCurrentUser ? 'var(--primary)' : 'var(--text)' }}>
                    {entry.name} {isCurrentUser && '(You)'}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Level 12 • Batch A-2026</p>
            </div>

            <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '18px', fontWeight: '800' }}>{(entry.score || 0).toLocaleString()}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', color: index % 2 === 0 ? 'var(--success)' : 'var(--danger)', fontSize: '11px' }}>
                    {index % 2 === 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                    <span>{index % 2 === 0 ? '+12' : '-5'} pts</span>
                </div>
            </div>
        </div>
    );
};

const Leaderboard = () => {
    const { leaderboard } = useApp();

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Global <span className="gradient-text">Leaderboard</span></h1>
                    <p style={{ color: 'var(--text-muted)' }}>Comparing your performance with top placement candidates worldwide.</p>
                </div>
                <div className="glass-card" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Medal color="var(--warning)" />
                    <div>
                        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Global Rank</p>
                        <p style={{ fontSize: '16px', fontWeight: '800' }}>#1,248 / 85K</p>
                    </div>
                </div>
            </div>

            <div className="glass-card overflow-hidden" style={{ border: '1px solid var(--surface-border)' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 24px', display: 'flex', borderBottom: '1px solid var(--surface-border)', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <div style={{ width: '40px' }}>Rank</div>
                    <div style={{ width: '68px' }}>Avatar</div>
                    <div style={{ flex: 1 }}>Candidate</div>
                    <div style={{ textAlign: 'right' }}>Total Points</div>
                </div>
                {leaderboard?.map((entry, index) => (
                    <LeaderboardRow key={entry.id} entry={entry} index={index} />
                ))}
            </div>

            <div style={{ marginTop: '32px' }} className="glass-card p-24 text-center">
                <TrendingUp size={32} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '18px' }}>Keep Climbing the Ranks!</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>Consistent practice in the coding and communication labs helps you gain more points and jump ahead on the leaderboard.</p>
            </div>
        </div>
    );
};

export default Leaderboard;
