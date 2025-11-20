import React, { useState, useEffect } from 'react';
import { foods } from '../data/foods';

const FoodSearch = ({ selectedFoods, setSelectedFoods }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // LocalStorage'a kaydet
    useEffect(() => {
        localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
    }, [selectedFoods]);

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addFood = (food) => {
        setSelectedFoods([...selectedFoods, food]);
    };

    const removeFood = (index) => {
        const newFoods = [...selectedFoods];
        newFoods.splice(index, 1);
        setSelectedFoods(newFoods);
    };

    const totalCalories = selectedFoods.reduce((sum, food) => sum + food.calories, 0);

    return (
        <div style={{ marginTop: '2rem' }}>
            <h3 style={{ color: 'var(--text-color)', marginBottom: '1rem' }}>Yemek Kalori Hesapla 🍔</h3>

            <input
                type="text"
                placeholder="Yemek ara... (Örn: Döner)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '1rem' }}
            />

            {/* Arama Sonuçları */}
            {searchTerm && (
                <div style={{
                    maxHeight: '250px',
                    overflowY: 'auto',
                    background: 'rgba(15, 23, 42, 0.8)',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--border-color)'
                }}>
                    {filteredFoods.map(food => (
                        <div
                            key={food.id}
                            onClick={() => addFood(food)}
                            style={{
                                padding: '0.75rem',
                                borderBottom: '1px solid var(--border-color)',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span>{food.name}</span>
                            <span style={{ color: 'var(--secondary-color)' }}>{food.calories} kcal</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Seçilenler */}
            {selectedFoods.length > 0 && (
                <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '1rem',
                    borderRadius: '12px'
                }}>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Bugün Yediklerim:</h4>
                    {selectedFoods.map((food, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                            color: 'var(--text-muted)'
                        }}>
                            <span>{food.name}</span>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span>{food.calories}</span>
                                <button
                                    onClick={() => removeFood(index)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#ef4444',
                                        cursor: 'pointer',
                                        fontSize: '1.1rem'
                                    }}
                                >×</button>
                            </div>
                        </div>
                    ))}
                    <div style={{
                        borderTop: '1px solid var(--border-color)',
                        marginTop: '0.5rem',
                        paddingTop: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        color: 'var(--primary-color)'
                    }}>
                        <span>Toplam</span>
                        <span>{totalCalories} kcal</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodSearch;
