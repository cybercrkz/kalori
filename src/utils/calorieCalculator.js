/**
 * Harris-Benedict Denklemi ile BMR (Bazal Metabolizma Hızı) hesaplar.
 * 
 * Erkekler için: BMR = 88.362 + (13.397 x ağırlık kg) + (4.799 x boy cm) - (5.677 x yaş)
 * Kadınlar için: BMR = 447.593 + (9.247 x ağırlık kg) + (3.098 x boy cm) - (4.330 x yaş)
 */
export const calculateBMR = (gender, weight, height, age) => {
    if (gender === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
};

/**
 * Aktivite seviyesine göre günlük kalori ihtiyacını hesaplar.
 */
export const calculateTDEE = (bmr, activityLevel) => {
    const multipliers = {
        sedentary: 1.2,      // Hareketsiz
        light: 1.375,        // Az hareketli
        moderate: 1.55,      // Orta hareketli
        active: 1.725,       // Çok hareketli
        veryActive: 1.9      // Aşırı hareketli
    };

    return Math.round(bmr * (multipliers[activityLevel] || 1.2));
};

/**
 * Hedefe göre kalori önerilerini döndürür.
 */
export const calculateGoals = (tdee) => {
    return {
        maintain: tdee,
        mildWeightLoss: tdee - 250,    // Haftada 0.25kg ver
        weightLoss: tdee - 500,        // Haftada 0.5kg ver
        extremeWeightLoss: tdee - 1000, // Haftada 1kg ver
        mildWeightGain: tdee + 250,
        weightGain: tdee + 500
    };
};

/**
 * Vücut Kitle İndeksi (BMI) hesaplar.
 */
export const calculateBMI = (weight, height) => {
    // Boyu metreye çevir
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

/**
 * BMI değerine göre kategori döndürür.
 */
export const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { label: 'Zayıf', color: '#3b82f6' };
    if (bmi < 25) return { label: 'Normal', color: '#10b981' };
    if (bmi < 30) return { label: 'Fazla Kilolu', color: '#f59e0b' };
    return { label: 'Obez', color: '#ef4444' };
};

/**
 * Boya göre ideal kilo aralığını hesaplar (BMI 18.5 - 24.9 arası).
 */
export const calculateIdealWeightRange = (height) => {
    const heightInMeters = height / 100;
    const minWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1);
    const maxWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1);
    return { min: minWeight, max: maxWeight };
};

/**
 * Mevcut kilo ile ideal kilo arasındaki farka göre mesaj döndürür.
 */
export const getWeightDifferenceMessage = (weight, idealRange) => {
    if (weight < idealRange.min) {
        const diff = (idealRange.min - weight).toFixed(1);
        return `İdeal kilonuza ulaşmak için en az ${diff} kg almalısınız.`;
    } else if (weight > idealRange.max) {
        const diff = (weight - idealRange.max).toFixed(1);
        return `İdeal kilonuza ulaşmak için en az ${diff} kg vermelisiniz.`;
    } else {
        return "Harika! Kilonuz ideal aralıkta. 🎉";
    }
};

/**
 * Günlük kaloriye göre makro besin dağılımını hesaplar.
 * Protein: %30, Yağ: %35, Karbonhidrat: %35
 */
export const calculateMacros = (tdee) => {
    return {
        protein: Math.round((tdee * 0.30) / 4), // 1g protein = 4 kcal
        fat: Math.round((tdee * 0.35) / 9),     // 1g yağ = 9 kcal
        carbs: Math.round((tdee * 0.35) / 4)    // 1g karb = 4 kcal
    };
};

/**
 * Kaloriye göre örnek diyet listesi döndürür.
 */
export const getDietPlan = (tdee) => {
    const plan = {
        breakfast: [],
        lunch: [],
        snack: [],
        dinner: []
    };

    if (tdee < 1800) {
        plan.breakfast = ["2 Haşlanmış Yumurta", "1 Dilim Tam Buğday Ekmeği", "Domates, Salatalık", "Şekersiz Çay"];
        plan.lunch = ["Izgara Tavuk Göğsü (100g)", "Mevsim Salatası", "1 Kase Yoğurt"];
        plan.snack = ["1 Adet Yeşil Elma", "10 Adet Çiğ Badem"];
        plan.dinner = ["Zeytinyağlı Sebze Yemeği", "1 Dilim Ekmek", "Cacık"];
    } else if (tdee < 2500) {
        plan.breakfast = ["Menemen (2 Yumurta)", "2 Dilim Tam Buğday Ekmeği", "5 Zeytin", "Yeşillik"];
        plan.lunch = ["Köfte veya Et Sote (150g)", "Bulgur Pilavı (4 kaşık)", "Ayran"];
        plan.snack = ["1 Muz", "1 Avuç Ceviz"];
        plan.dinner = ["Balık Izgara", "Roka Salatası", "Mercimek Çorbası"];
    } else {
        plan.breakfast = ["3 Yumurtalı Omlet", "Yulaf Ezmesi (Sütlü)", "Muz ve Bal", "Ceviz"];
        plan.lunch = ["Tavuklu Makarna", "Yoğurtlu Semizotu", "Mercimek Çorbası"];
        plan.snack = ["Protein Bar veya Shake", "Kuruyemiş Karışımı"];
        plan.dinner = ["Biftek veya Hindi", "Fırın Patates", "Bol Salata"];
    }

    return plan;
};
