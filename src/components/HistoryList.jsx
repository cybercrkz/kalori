import React from 'react';

const HistoryList = ({ history, onClear }) => {
    if (!history || history.length === 0) return null;

    const getCategoryColor = (category) => {
        if (category.includes('Zayıf')) return '#3b82f6'; // Blue
        if (category.includes('Normal')) return '#10b981'; // Green
        if (category.includes('Fazla')) return '#f59e0b'; // Orange
        return '#ef4444'; // Red
    };

    return (
        <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-color)', margin: 0 }}>Geçmiş Hesaplamalar 🕒</h3>
                <button
                    onClick={onClear}
                    style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: 'none',
                        color: '#ef4444',
                        padding: '0.5rem 1rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                >
                    Geçmişi Temizle
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {history.map((item, index) => {
                    const categoryColor = getCategoryColor(item.bmiCategory);

                    return (
                        <div key={index} style={{
                            background: 'rgba(30, 41, 59, 0.5)',
                            padding: '1.25rem',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid var(--border-color)',
                            transition: 'transform 0.2s',
                            cursor: 'default'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '14px',
                                    background: `${categoryColor}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: categoryColor,
                                    fontSize: '1.2rem'
                                }}>
                                    {item.bmiCategory.includes('Normal') ? '💪' : (item.bmiCategory.includes('Zayıf') ? '🥗' : '🏃')}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', color: 'white', fontSize: '1rem', marginBottom: '0.2rem' }}>
                                        {item.date}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: categoryColor }}></span>
                                            {item.bmiCategory}
                                        </span>
                                        {item.weight && (
                                            <span>• {item.weight} kg</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: '700', color: 'var(--primary-color)', fontSize: '1.1rem' }}>
                                    {item.tdee} <span style={{ fontSize: '0.8rem', fontWeight: 'normal' }}>kcal</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                                    BMI: {item.bmi}
                                </div>
                                {item.goal && (
                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--secondary-color)',
                                        marginTop: '0.2rem',
                                        background: 'rgba(236, 72, 153, 0.1)',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        display: 'inline-block'
                                    }}>
                                        {item.goal === 'maintain' ? 'Koru' :
                                            item.goal.includes('Loss') ? 'Ver' : 'Al'}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HistoryList;
