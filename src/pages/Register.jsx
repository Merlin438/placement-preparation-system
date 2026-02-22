import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { UserPlus, ArrowRight, BookOpen, GraduationCap, Users } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const { register } = useUser();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = register(formData);
        if (result.success) {
            navigate(formData.role === 'teacher' ? '/teacher' : '/student');
        } else {
            setError(result.message);
        }
    };

    const setRole = (role) => setFormData({ ...formData, role });

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div className="glass-card animate-fade-in" style={{ padding: '40px', maxWidth: '500px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', marginBottom: '16px' }}>
                        <UserPlus size={32} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Start your journey to a dream placement</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>I am a:</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {[
                                { id: 'student', label: 'Student', icon: BookOpen },
                                { id: 'teacher', label: 'Teacher', icon: GraduationCap },
                                { id: 'mentor', label: 'Mentor', icon: Users }
                            ].map(role => (
                                <button
                                    key={role.id}
                                    type="button"
                                    className={`btn ${formData.role === role.id ? 'btn-primary' : 'btn-outline'}`}
                                    style={{ flex: 1, fontSize: '13px', padding: '8px 12px' }}
                                    onClick={() => setRole(role.id)}
                                >
                                    <role.icon size={14} /> {role.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@university.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    {error && <p style={{ color: 'var(--danger)', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: '48px' }}>
                        Create Account <ArrowRight size={18} />
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '14px' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
