import React from 'react';

const FoodIntakeCard = ({ selectedFoods }) => {
    const totalCalories = selectedFoods.reduce((sum, food) => sum + food.calories, 0);

    if (selectedFoods.length === 0) {
        return (
            <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '2rem',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
                marginTop: '2rem'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
                <div style={{ color: 'var(--text-muted)' }}>
                    Henüz yemek eklemedin. "Araçlar" sekmesinden yemek ekleyebilirsin.
                </div>
            </div>
        );
    }

    return (
        <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--text-color)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                Bugün Ne Yedim? 🍽️
            </h3>

            {/* Özet Kartı */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(99, 102, 241, 0.1))',
                padding: '1.5rem',
                borderRadius: '20px',
                border: '1px solid rgba(236, 72, 153, 0.3)',
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Toplam Kalori Alımı
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'white' }}>
                        {totalCalories} <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>kcal</span>
                    </div>
                </div>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                }}>
                    🔥
                </div>
            </div>

            {/* Yemek Listesi */}
            <div style={{
                background: 'rgba(15, 23, 42, 0.5)',
                padding: '1.5rem',
                borderRadius: '20px',
                border: '1px solid var(--border-color)'
            }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-color)' }}>
                    Yediklerim ({selectedFoods.length} öğe)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedFoods.map((food, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                            <span style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>
                                {food.name}
                            </span>
                            <span style={{
                                color: 'var(--secondary-color)',
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}>
                                {food.calories} kcal
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FoodIntakeCard;
