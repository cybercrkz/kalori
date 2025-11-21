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
export const getDietPlan = (tdee, goalType = 'maintain') => {
    const plan = {
        breakfast: [],
        lunch: [],
        snack: [],
        dinner: []
    };

    // Hedefe göre kalori ayarlaması (Menü içeriği için mantıksal ayrım)
    // maintain: Dengeli
    // lose: Düşük karbonhidrat, yüksek hacim (sebze vb.)
    // gain: Yüksek karbonhidrat, yüksek protein

    if (goalType === 'lose') {
        // Kilo Verme Odaklı (Daha hafif, sebze ağırlıklı)
        if (tdee < 1800) {
            plan.breakfast = ["Haşlanmış Yumurta (2 adet)", "Bol Yeşillik", "Şekersiz Çay"];
            plan.lunch = ["Ton Balıklı Salata (Yağsız)", "1 Dilim Ekmek", "Limonlu Su"];
            plan.snack = ["1 Yeşil Elma", "Salatalık Dilimleri"];
            plan.dinner = ["Izgara Tavuk Göğsü", "Buharda Sebze", "Yoğurt"];
        } else {
            plan.breakfast = ["Menemen (Az yağlı)", "1 Dilim Tam Buğday Ekmeği", "Yeşil Çay"];
            plan.lunch = ["Izgara Köfte (3 adet)", "Bol Salata", "Ayran"];
            plan.snack = ["1 Kase Yoğurt", "Yulaf Ezmesi"];
            plan.dinner = ["Zeytinyağlı Sebze Yemeği", "Cacık", "1 Dilim Ekmek"];
        }
    } else if (goalType === 'gain') {
        // Kilo Alma/Kas Odaklı (Protein ve Karbonhidrat ağırlıklı)
        if (tdee < 2500) {
            plan.breakfast = ["3 Yumurtalı Kaşarlı Omlet", "2 Dilim Ekmek", "Süt", "Bal"];
            plan.lunch = ["Tavuk Sote", "Pirinç Pilavı (Bol)", "Yoğurt"];
            plan.snack = ["Muz", "Fıstık Ezmesi", "Süt"];
            plan.dinner = ["Kıymalı Makarna", "Mercimek Çorbası", "Salata"];
        } else {
            plan.breakfast = ["Sucuklu Yumurta", "Simit", "Peynir Tabağı", "Meyve Suyu"];
            plan.lunch = ["İskender veya Et Döner", "Pilav", "Ayran"];
            plan.snack = ["Protein Shake", "Kuruyemiş (Ceviz/Badem)", "Kuru Meyve"];
            plan.dinner = ["Biftek/Antrikot", "Fırın Patates", "Pirinç Pilavı"];
        }
    } else {
        // Kilo Koruma / Dengeli (Mevcut Pratik Menü)
        if (tdee < 1800) {
            plan.breakfast = ["Yulaf Ezmesi (Süt/Yoğurt ile)", "veya Haşlanmış Yumurta", "Yeşil Çay"];
            plan.lunch = ["Ton Balıklı Salata (Konserve)", "veya Peynirli Kepekli Sandviç", "Ayran"];
            plan.snack = ["1 Yeşil Elma", "10 Çiğ Badem"];
            plan.dinner = ["Izgara/Tava Tavuk Göğsü", "Hazır Salata", "1 Dilim Ekmek"];
        } else if (tdee < 2500) {
            plan.breakfast = ["Beyaz Peynirli Tost", "veya Simit + Ayran", "Domates/Salatalık"];
            plan.lunch = ["Tavuklu/Köfteli Salata", "veya Ev Yemeği (Isıt-Ye)", "1 Kase Yoğurt"];
            plan.snack = ["1 Muz", "Sütlü Kahve"];
            plan.dinner = ["Kıymalı Makarna", "veya Tavuk Sote + Bulgur", "Mevsim Salatası"];
        } else {
            plan.breakfast = ["3 Yumurtalı Omlet", "veya Büyük Karışık Tost", "Meyve Suyu"];
            plan.lunch = ["Tavuk Pilav (Klasik)", "veya Büyük Boy Sandviç", "Ayran"];
            plan.snack = ["Protein Bar", "Kuruyemiş Paketi", "Muz"];
            plan.dinner = ["Etli Yemek (Biftek/Köfte)", "Makarna veya Pilav", "Bol Salata + Yoğurt"];
        }
    }

    return plan;
};
