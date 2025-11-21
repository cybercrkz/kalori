import React from 'react';

const DietList = ({ dietPlan, macros, bmi, bmiLabel, bmiColor }) => {
    if (!dietPlan) return null;

    // BMI Bar Helper
    const getPosition = (value) => {
        // Scale BMI from 15 to 40 for the visual bar
        const min = 15;
        const max = 40;
        const percentage = ((value - min) / (max - min)) * 100;
        return Math.min(Math.max(percentage, 0), 100);
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            {/* BMI Görsel Gösterge */}
            {bmi && (
                <div style={{
                    marginBottom: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(30, 41, 59, 0.5)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Vücut Kitle İndeksi (BMI)</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                                {bmi} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: bmiColor }}>• {bmiLabel}</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Bar Track */}
                    <div style={{
                        height: '12px',
                        width: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Gradient Background for Categories */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(to right, 
                                #3b82f6 0%, #3b82f6 14%, 
                                #10b981 14%, #10b981 40%, 
                                #f59e0b 40%, #f59e0b 60%, 
                                #ef4444 60%, #ef4444 100%)`,
                            opacity: 0.8
                        }}></div>

                        {/* Marker */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: `${getPosition(bmi)}%`,
                            height: '100%',
                            width: '4px',
                            background: 'white',
                            boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                            transform: 'translateX(-50%)',
                            zIndex: 2
                        }}></div>
                    </div>

                    {/* Labels below bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        <span style={{ width: '14%', textAlign: 'center' }}>Zayıf</span>
                        <span style={{ width: '26%', textAlign: 'center' }}>Normal</span>
                        <span style={{ width: '20%', textAlign: 'center' }}>Fazla</span>
                        <span style={{ width: '40%', textAlign: 'center' }}>Obez</span>
                    </div>
                </div>
            )}

            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-color)', marginBottom: '1rem' }}>
                Günlük Makro ve Örnek Menü 🍎
            </h3>

            {/* Makro Bilgileri */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#93c5fd' }}>Protein</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{macros.protein}g</div>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#6ee7b7' }}>Yağ</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{macros.fat}g</div>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '0.75rem', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.8rem', color: '#fcd34d' }}>Karb</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{macros.carbs}g</div>
                </div>
            </div>

            {/* Diyet Listesi */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <MealCard title="Kahvaltı 🍳" items={dietPlan.breakfast} />
                <MealCard title="Öğle Yemeği 🥗" items={dietPlan.lunch} />
                <MealCard title="Ara Öğün 🍏" items={dietPlan.snack} />
                <MealCard title="Akşam Yemeği 🐟" items={dietPlan.dinner} />
            </div>
        </div>
    );
};

const MealCard = ({ title, items }) => (
    <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid var(--border-color)'
    }}>
        <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem', fontSize: '1rem' }}>{title}</h4>
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
            {items.map((item, index) => (
                <li key={index} style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{ marginRight: '0.5rem', color: 'var(--secondary-color)' }}>•</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default DietList;
