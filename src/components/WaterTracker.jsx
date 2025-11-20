import React, { useState, useEffect } from 'react';

const WaterTracker = ({ weight }) => {
    const [glasses, setGlasses] = useState(0);

    // Kilo başına 35ml su ihtiyacı
    const dailyGoal = weight ? Math.round(weight * 0.035 * 1000) : 2500;
    const glassSize = 250; // 1 bardak = 250ml
    const totalGlasses = Math.ceil(dailyGoal / glassSize);
    const currentAmount = glasses * glassSize;
    const progress = Math.min((currentAmount / dailyGoal) * 100, 100);

    useEffect(() => {
        const savedGlasses = localStorage.getItem('waterGlasses');
        const savedDate = localStorage.getItem('waterDate');
        const today = new Date().toDateString();

        if (savedDate === today && savedGlasses) {
            setGlasses(parseInt(savedGlasses));
        } else {
            setGlasses(0);
            localStorage.setItem('waterDate', today);
        }
    }, []);

    const updateGlasses = (newCount) => {
        if (newCount < 0) return;
        setGlasses(newCount);
        localStorage.setItem('waterGlasses', newCount);
        localStorage.setItem('waterDate', new Date().toDateString());
    };

    return (
        <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '1.5rem',
            borderRadius: '24px',
            marginTop: '1rem',
            border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
            <h3 style={{ color: '#60a5fa', marginBottom: '1rem' }}>Su Takibi 💧</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span>{currentAmount} ml</span>
                <span>Hedef: {dailyGoal} ml</span>
            </div>

            {/* Progress Bar */}
            <div style={{
                height: '20px',
                background: 'rgba(15, 23, 42, 0.5)',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                    transition: 'width 0.5s ease-out'
                }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
                <button
                    onClick={() => updateGlasses(glasses - 1)}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        color: 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >-</button>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#60a5fa' }}>{glasses}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bardak</div>
                </div>

                <button
                    onClick={() => updateGlasses(glasses + 1)}
                    style={{
                        background: '#3b82f6',
                        border: 'none',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        color: 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                    }}
                >+</button>
            </div>
        </div>
    );
};

export default WaterTracker;
