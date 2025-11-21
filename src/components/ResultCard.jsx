import React from 'react';

const ResultCard = ({ tdee, goals, selectedGoal, onGoalSelect }) => {
    const getStyle = (goalKey) => ({
        cursor: 'pointer',
        border: selectedGoal === goalKey ? '2px solid var(--primary-color)' : '1px solid transparent',
        background: selectedGoal === goalKey ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        transform: selectedGoal === goalKey ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.2s ease'
    });

    return (
        <div className="result-card">
            <div className="result-header">
                <h3>Günlük Kalori İhtiyacın</h3>
                <div className="calories-display">
                    {tdee}
                    <span className="calories-unit"> kcal</span>
                </div>

                {/* BMI Göstergesi */}
                <div style={{
                    marginTop: '1rem',
                    padding: '0.5rem',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    display: 'inline-block'
                }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginRight: '0.5rem' }}>BMI:</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{goals.bmi}</span>
                    <span style={{
                        marginLeft: '0.5rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        backgroundColor: goals.bmiColor,
                        color: '#fff',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                    }}>
                        {goals.bmiLabel}
                    </span>
                </div>

                {/* İdeal Kilo Bilgisi */}
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'left'
                }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        İdeal Kilo Aralığınız:
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-color)' }}>
                        {goals.idealWeightRange.min} kg - {goals.idealWeightRange.max} kg
                    </div>
                    <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.95rem',
                        color: 'var(--secondary-color)',
                        fontWeight: '500'
                    }}>
                        {goals.weightDifferenceMessage}
                    </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                    Hedefinize uygun menüyü görmek için aşağıdaki seçeneklerden birine tıklayın.
                </p>
            </div>

            <div className="goals-grid">
                <div
                    className="goal-item"
                    style={getStyle('maintain')}
                    onClick={() => onGoalSelect('maintain')}
                >
                    <span className="goal-label">Kilo Korumak</span>
                    <span className="goal-value">{goals.maintain} kcal</span>
                </div>

                <div
                    className="goal-item"
                    style={getStyle('mildWeightLoss')}
                    onClick={() => onGoalSelect('mildWeightLoss')}
                >
                    <span className="goal-label">Hafif Kilo Ver (-0.25kg)</span>
                    <span className="goal-value">{goals.mildWeightLoss} kcal</span>
                </div>

                <div
                    className="goal-item"
                    style={getStyle('weightLoss')}
                    onClick={() => onGoalSelect('weightLoss')}
                >
                    <span className="goal-label">Kilo Ver (-0.5kg)</span>
                    <span className="goal-value">{goals.weightLoss} kcal</span>
                </div>

                <div
                    className="goal-item"
                    style={getStyle('extremeWeightLoss')}
                    onClick={() => onGoalSelect('extremeWeightLoss')}
                >
                    <span className="goal-label">Hızlı Kilo Ver (-1kg)</span>
                    <span className="goal-value">{goals.extremeWeightLoss} kcal</span>
                </div>

                <div
                    className="goal-item"
                    style={getStyle('weightGain')}
                    onClick={() => onGoalSelect('weightGain')}
                >
                    <span className="goal-label">Kilo Al (+0.5kg)</span>
                    <span className="goal-value">{goals.weightGain} kcal</span>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
