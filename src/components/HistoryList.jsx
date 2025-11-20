import React from 'react';

const HistoryList = ({ history, onClear }) => {
    if (!history || history.length === 0) return null;

    return (
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>Geçmiş Hesaplamalar 🕒</h3>
                <button
                    onClick={onClear}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--secondary-color)',
                        color: 'var(--secondary-color)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                    }}
                >
                    Temizle
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {history.map((item, index) => (
                    <div key={index} style={{
                        background: 'rgba(15, 23, 42, 0.3)',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.9rem'
                    }}>
                        <div>
                            <div style={{ fontWeight: '600', color: 'var(--text-color)' }}>{item.date}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                BMI: {item.bmi} ({item.bmiCategory})
                            </div>
                        </div>
                        <div style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                            {item.tdee} kcal
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryList;
