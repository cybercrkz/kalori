import React, { useState } from 'react';

const CalorieForm = ({ onCalculate }) => {
    const [formData, setFormData] = useState({
        gender: 'male',
        age: '',
        height: '',
        weight: '',
        activityLevel: 'sedentary'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.age && formData.height && formData.weight) {
            onCalculate(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Cinsiyet</label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                        />
                        <span className="radio-content">Erkek 🚹</span>
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                        />
                        <span className="radio-content">Kadın 🚺</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>Yaş</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Örn: 25"
                    required
                    min="1"
                    max="120"
                />
            </div>

            <div className="form-group">
                <label>Boy (cm)</label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Örn: 175"
                    required
                    min="50"
                    max="250"
                />
            </div>

            <div className="form-group">
                <label>Kilo (kg)</label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Örn: 70"
                    required
                    min="20"
                    max="300"
                />
            </div>

            <div className="form-group">
                <label>Aktivite Seviyesi</label>
                <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                >
                    <option value="sedentary">Hareketsiz (Masa başı iş)</option>
                    <option value="light">Az Hareketli (Haftada 1-3 gün spor)</option>
                    <option value="moderate">Orta Hareketli (Haftada 3-5 gün spor)</option>
                    <option value="active">Çok Hareketli (Haftada 6-7 gün spor)</option>
                    <option value="veryActive">Aşırı Hareketli (Profesyonel sporcu)</option>
                </select>
            </div>

            <button type="submit" className="submit-btn">
                Hesapla 🔥
            </button>
        </form>
    );
};

export default CalorieForm;
