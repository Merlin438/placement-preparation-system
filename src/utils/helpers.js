/**
 * Coding Score Calculation Formula:
 * (Weekly × 0.2) + (Monthly × 0.3) + (Semester × 0.5)
 */
export const calculateCodingScore = (weekly, monthly, semester) => {
    return Math.round((weekly * 0.2) + (monthly * 0.3) + (semester * 0.5));
};

export const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
};

export const getBadgeDetails = (points) => {
    if (points >= 2000) return { name: 'Gold', color: '#fbbf24' };
    if (points >= 1000) return { name: 'Silver', color: '#94a3b8' };
    return { name: 'Bronze', color: '#cd7f32' };
};
