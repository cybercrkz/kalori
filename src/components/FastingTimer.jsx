import React, { useState, useEffect } from 'react';

const FastingTimer = () => {
    const [isFasting, setIsFasting] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsed, setElapsed] = useState(0);

    // 16 Saatlik hedef (saniye cinsinden)
    const goalSeconds = 16 * 60 * 60;

    useEffect(() => {
        const savedStart = localStorage.getItem('fastingStart');
        if (savedStart) {
            setStartTime(parseInt(savedStart));
            setIsFasting(true);
        }
    }, []);

    useEffect(() => {
        let interval;
        if (isFasting && startTime) {
            interval = setInterval(() => {
                const now = Date.now();
                setElapsed(Math.floor((now - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isFasting, startTime]);

    const toggleFasting = () => {
        if (isFasting) {
            setIsFasting(false);
            setStartTime(null);
            setElapsed(0);
            localStorage.removeItem('fastingStart');
        } else {
            const now = Date.now();
            setStartTime(now);
            setIsFasting(true);
            localStorage.setItem('fastingStart', now.toString());
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = Math.min((elapsed / goalSeconds) * 100, 100);

    return (
        <div style={{
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            padding: '1.5rem',
            borderRadius: '24px',
            marginTop: '2rem',
            textAlign: 'center',
            border: '1px solid var(--border-color)'
        }}>
            <h3 style={{ color: '#f472b6', marginBottom: '1rem' }}>Aralıklı Oruç (16:8) 🌙</h3>

            <div style={{
                fontSize: '3rem',
                fontWeight: '800',
                fontVariantNumeric: 'tabular-nums',
                color: isFasting ? '#f472b6' : 'var(--text-muted)',
                marginBottom: '1rem'
            }}>
                {isFasting ? formatTime(elapsed) : '00:00:00'}
            </div>

            {isFasting && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <span>Geçen Süre</span>
                        <span>Hedef: 16 Saat</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${progress}%`, background: '#f472b6', transition: 'width 1s linear' }} />
                    </div>
                </div>
            )}

            <button
                onClick={toggleFasting}
                style={{
                    background: isFasting ? 'rgba(239, 68, 68, 0.2)' : '#f472b6',
                    color: isFasting ? '#ef4444' : 'white',
                    border: isFasting ? '1px solid #ef4444' : 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                {isFasting ? 'Orucu Bitir ⏹️' : 'Oruca Başla ▶️'}
            </button>
        </div>
    );
};

export default FastingTimer;
