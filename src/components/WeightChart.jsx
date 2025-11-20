import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeightChart = ({ history }) => {
    const [showBMI, setShowBMI] = useState(false);

    if (!history || history.length < 2) return (
        <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-muted)',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '24px',
            border: '1px dashed var(--border-color)'
        }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <div>Analiz için en az 2 ölçüm yapmalısın.</div>
        </div>
    );

    // Veriyi hazırla
    const data = useMemo(() => {
        return [...history].reverse()
            .map(item => {
                // Eğer Kilo modu seçiliyse ve kilo verisi yoksa, bu kaydı atla (veya null döndür filter ile temizle)
                if (!showBMI && !item.weight) return null;

                return {
                    date: item.date.split(' ')[0],
                    val: showBMI ? parseFloat(item.bmi) : parseFloat(item.weight),
                    type: showBMI ? 'BMI' : 'Kilo'
                };
            })
            .filter(item => item !== null); // Null olanları temizle
    }, [history, showBMI]);

    if (data.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--text-muted)',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '16px',
                marginTop: '1rem'
            }}>
                {showBMI ? 'Görüntülenecek veri yok.' : 'Henüz kilo geçmişi bulunmuyor. Yeni hesaplamalar yaptıkça grafiğiniz oluşacak.'}
                {!showBMI && <button onClick={() => setShowBMI(true)} style={{ display: 'block', margin: '1rem auto', color: 'var(--primary-color)', background: 'transparent', border: '1px solid var(--primary-color)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>BMI Grafiğini Göster</button>}
            </div>
        );
    }

    // İstatistikler
    const firstVal = data[0].val;
    const lastVal = data[data.length - 1].val;
    const change = (lastVal - firstVal).toFixed(1);
    const isWeightLoss = change < 0;

    // Renkler
    const chartColor = showBMI ? '#8b5cf6' : '#3b82f6'; // BMI: Purple, Weight: Blue

    return (
        <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-color)', margin: 0 }}>
                    Gelişim Grafiği 📈
                </h3>
                <button
                    onClick={() => setShowBMI(!showBMI)}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-muted)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    {showBMI ? 'Kilo Grafiğine Geç' : 'BMI Grafiğine Geç'}
                </button>
            </div>

            {/* İstatistik Kartları */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05))', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Başlangıç</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>
                        {firstVal} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>{showBMI ? '' : 'kg'}</span>
                    </div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))', padding: '1.2rem', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Mevcut</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>
                        {lastVal} <span style={{ fontSize: '0.9rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>{showBMI ? '' : 'kg'}</span>
                    </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>Değişim</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: isWeightLoss ? '#10b981' : '#ef4444' }}>
                        {change > 0 ? '+' : ''}{change}
                    </div>
                </div>
            </div>

            <div style={{ height: '350px', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '24px', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartColor} stopOpacity={0.5} />
                                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="var(--text-muted)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />
                        <YAxis
                            stroke="var(--text-muted)"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            domain={['dataMin - 2', 'dataMax + 2']}
                            tickFormatter={(val) => `${val}${showBMI ? '' : 'kg'}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                                color: 'white'
                            }}
                            itemStyle={{ color: chartColor }}
                            formatter={(value) => [`${value} ${showBMI ? '' : 'kg'}`, showBMI ? 'BMI' : 'Kilo']}
                            labelStyle={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="val"
                            stroke={chartColor}
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorVal)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeightChart;
