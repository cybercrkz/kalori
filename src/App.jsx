import React, { useState, useEffect } from 'react';
import CalorieForm from './components/CalorieForm';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import DietList from './components/DietList';
import WeightChart from './components/WeightChart';
import WaterTracker from './components/WaterTracker';
import FoodSearch from './components/FoodSearch';
import FastingTimer from './components/FastingTimer';
import ExportButton from './components/ExportButton';
import FoodIntakeCard from './components/FoodIntakeCard';
import { calculateBMR, calculateTDEE, calculateGoals, calculateBMI, getBMICategory, calculateIdealWeightRange, getWeightDifferenceMessage, calculateMacros, getDietPlan } from './utils/calorieCalculator';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [userWeight, setUserWeight] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState([]);

  // Uygulama açıldığında geçmişi ve yemekleri yükle
  useEffect(() => {
    const savedHistory = localStorage.getItem('calorieHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const savedFoods = localStorage.getItem('selectedFoods');
    if (savedFoods) {
      setSelectedFoods(JSON.parse(savedFoods));
    }
  }, []);

  const handleCalculate = (data) => {
    const weight = parseFloat(data.weight);
    const height = parseFloat(data.height);
    const age = parseFloat(data.age);

    setUserWeight(weight); // Su takibi için kiloyu sakla

    const bmr = calculateBMR(data.gender, weight, height, age);
    const tdee = calculateTDEE(bmr, data.activityLevel);
    let goals = calculateGoals(tdee);

    // BMI Hesaplama
    const bmi = calculateBMI(weight, height);
    const bmiCategory = getBMICategory(bmi);

    // İdeal Kilo Hesaplama
    const idealWeightRange = calculateIdealWeightRange(height);
    const weightDifferenceMessage = getWeightDifferenceMessage(weight, idealWeightRange);

    // Makro ve Diyet Planı
    const macros = calculateMacros(tdee);
    const dietPlan = getDietPlan(tdee);

    goals = {
      ...goals,
      bmi,
      bmiLabel: bmiCategory.label,
      bmiColor: bmiCategory.color,
      idealWeightRange,
      weightDifferenceMessage,
      macros,
      dietPlan
    };

    setResult({ tdee, goals });

    // Geçmişe kaydet
    const newHistoryItem = {
      date: new Date().toLocaleDateString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      tdee,
      bmi,
      weight, // Kilo verisini ekle
      bmiCategory: bmiCategory.label
    };

    const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('calorieHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calorieHistory');
  };

  return (
    <div className="container" id="app-content">
      <h1>Kalori Hesaplayıcı 🥗</h1>

      {/* Sekmeler */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'rgba(15, 23, 42, 0.5)', padding: '0.5rem', borderRadius: '12px' }}>
        <button
          onClick={() => setActiveTab('calculator')}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: activeTab === 'calculator' ? 'var(--primary-color)' : 'transparent',
            color: activeTab === 'calculator' ? 'white' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >Hesaplayıcı</button>
        <button
          onClick={() => setActiveTab('tools')}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: activeTab === 'tools' ? 'var(--primary-color)' : 'transparent',
            color: activeTab === 'tools' ? 'white' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >Araçlar</button>
        <button
          onClick={() => setActiveTab('analysis')}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: activeTab === 'analysis' ? 'var(--primary-color)' : 'transparent',
            color: activeTab === 'analysis' ? 'white' : 'var(--text-muted)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >Analiz</button>
      </div>

      {/* İçerik */}
      {activeTab === 'calculator' && (
        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <CalorieForm onCalculate={handleCalculate} />
          {result && (
            <>
              <ResultCard tdee={result.tdee} goals={result.goals} />
              <DietList dietPlan={result.goals.dietPlan} macros={result.goals.macros} />
            </>
          )}
        </div>
      )}

      {activeTab === 'tools' && (
        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <WaterTracker weight={userWeight} />
          <FastingTimer />
          <FoodSearch selectedFoods={selectedFoods} setSelectedFoods={setSelectedFoods} />
        </div>
      )}

      {activeTab === 'analysis' && (
        <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <WeightChart history={history} />
          <FoodIntakeCard selectedFoods={selectedFoods} />
          <HistoryList history={history} onClear={clearHistory} />
        </div>
      )}


      <ExportButton result={result} history={history} userWeight={userWeight} selectedFoods={selectedFoods} />
    </div>
  );
}

export default App;
