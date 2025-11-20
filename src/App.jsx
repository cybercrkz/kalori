import React, { useState, useEffect } from 'react';
import CalorieForm from './components/CalorieForm';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import DietList from './components/DietList';
import WeightChart from './components/WeightChart';
import { calculateBMR, calculateTDEE, calculateGoals, calculateBMI, getBMICategory, calculateIdealWeightRange, getWeightDifferenceMessage, calculateMacros, getDietPlan } from './utils/calorieCalculator';

function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Uygulama açıldığında geçmişi yükle
  useEffect(() => {
    const savedHistory = localStorage.getItem('calorieHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleCalculate = (data) => {
    const weight = parseFloat(data.weight);
    const height = parseFloat(data.height);
    const age = parseFloat(data.age);

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
      bmiCategory: bmiCategory.label
    };

    const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Son 10 kaydı tut (Grafik için artırdık)
    setHistory(updatedHistory);
    localStorage.setItem('calorieHistory', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calorieHistory');
  };

  return (
    <div className="container">
      <h1>Kalori Hesaplayıcı 🥗</h1>
      <CalorieForm onCalculate={handleCalculate} />

      {result && (
        <>
          <ResultCard tdee={result.tdee} goals={result.goals} />
          <DietList dietPlan={result.goals.dietPlan} macros={result.goals.macros} />
        </>
      )}

      <WeightChart history={history} />
      <HistoryList history={history} onClear={clearHistory} />
    </div>
  );
}

export default App;
