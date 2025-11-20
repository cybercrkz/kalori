import React from 'react';

const DietList = ({ dietPlan, macros }) => {
    if (!dietPlan) return null;

    return (
        <div style={{ marginTop: '2rem' }}>
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
