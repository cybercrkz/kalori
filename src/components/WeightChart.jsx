import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeightChart = ({ history }) => {
    if (!history || history.length < 2) return null;

    // Grafiği ters çevir (eskiden yeniye)
    const data = [...history].reverse().map(item => ({
        date: item.date,
        bmi: item.bmi
    }));

    return (
        <div style={{ marginTop: '2rem', height: '300px' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-color)', marginBottom: '1rem' }}>
                BMI Değişimi 📈
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                        dataKey="date"
                        stroke="var(--text-muted)"
                        fontSize={12}
                        tick={{ fill: 'var(--text-muted)' }}
                    />
                    <YAxis
                        stroke="var(--text-muted)"
                        fontSize={12}
                        tick={{ fill: 'var(--text-muted)' }}
                        domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--bg-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px'
                        }}
                        itemStyle={{ color: 'var(--primary-color)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="bmi"
                        stroke="var(--secondary-color)"
                        strokeWidth={3}
                        dot={{ fill: 'var(--primary-color)', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeightChart;
