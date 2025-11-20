import React, { useState, useEffect } from 'react';

const FastingTimer = () => {
    const [isFasting, setIsFasting] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsed, setElapsed] = useState(0);
    const [selectedMode, setSelectedMode] = useState(16); // Varsayılan 16 saat

    const modes = [
        { hours: 14, label: '14:10 (Başlangıç)' },
        { hours: 16, label: '16:8 (Standart)' },
        { hours: 18, label: '18:6 (İleri)' },
        { hours: 20, label: '20:4 (Savaşçı)' },
        { hours: 24, label: '24 Saat (Tam Gün)' },
    ];

    // Seçilen moda göre hedef saniye
    const goalSeconds = selectedMode * 60 * 60;

    useEffect(() => {
        const savedStart = localStorage.getItem('fastingStart');
        const savedMode = localStorage.getItem('fastingMode');

        if (savedMode) {
            setSelectedMode(parseInt(savedMode));
        }

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
            if (window.confirm('Orucu sonlandırmak istediğine emin misin?')) {
                setIsFasting(false);
                setStartTime(null);
                setElapsed(0);
                localStorage.removeItem('fastingStart');
            }
        } else {
            const now = Date.now();
            setStartTime(now);
            setIsFasting(true);
            localStorage.setItem('fastingStart', now.toString());
            localStorage.setItem('fastingMode', selectedMode.toString());
        }
    };

    const handleModeChange = (hours) => {
        if (isFasting) {
            alert('Oruç devam ederken mod değiştiremezsin. Önce orucu bitir.');
            return;
        }
        setSelectedMode(hours);
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
            <h3 style={{ color: '#f472b6', marginBottom: '1rem' }}>Aralıklı Oruç 🌙</h3>

            {/* Mod Seçimi */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                paddingBottom: '1rem',
                marginBottom: '1rem',
                justifyContent: 'flex-start' // Mobilde kaydırma için
            }}>
                {modes.map(mode => (
                    <button
                        key={mode.hours}
                        onClick={() => handleModeChange(mode.hours)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            border: selectedMode === mode.hours ? '1px solid #f472b6' : '1px solid rgba(255,255,255,0.1)',
                            background: selectedMode === mode.hours ? 'rgba(244, 114, 182, 0.2)' : 'transparent',
                            color: selectedMode === mode.hours ? '#f472b6' : 'var(--text-muted)',
                            cursor: isFasting ? 'not-allowed' : 'pointer',
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            opacity: isFasting && selectedMode !== mode.hours ? 0.5 : 1
                        }}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

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
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '1rem',
                        background: 'rgba(255,255,255,0.05)',
                        padding: '0.8rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem'
                    }}>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Başlangıç</div>
                            <div style={{ color: 'white', fontWeight: '600' }}>
                                {new Date(startTime).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.3rem' }}>
                                    {new Date(startTime).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                                </span>
                            </div>
                        </div>
                        <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Bitiş (Tahmini)</div>
                            <div style={{ color: '#f472b6', fontWeight: '600' }}>
                                {new Date(startTime + goalSeconds * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.3rem' }}>
                                    {new Date(startTime + goalSeconds * 1000).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <span>Geçen Süre</span>
                        <span>Hedef: {selectedMode} Saat</span>
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
