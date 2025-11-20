export const foods = [
    // --- Çorbalar ---
    { id: 1, name: "Mercimek Çorbası (1 kase)", calories: 130 },
    { id: 2, name: "Ezogelin Çorbası (1 kase)", calories: 140 },
    { id: 3, name: "Tarhana Çorbası (1 kase)", calories: 120 },
    { id: 4, name: "Yayla Çorbası (1 kase)", calories: 115 },
    { id: 5, name: "Domates Çorbası (1 kase)", calories: 110 },
    { id: 6, name: "İşkembe Çorbası (1 kase)", calories: 280 },
    { id: 7, name: "Kelle Paça Çorbası (1 kase)", calories: 320 },
    { id: 8, name: "Tavuk Suyu Çorba (1 kase)", calories: 100 },

    // --- Ana Yemekler (Geleneksel) ---
    { id: 20, name: "Kuru Fasulye (1 porsiyon)", calories: 340 },
    { id: 21, name: "Nohut Yemeği (1 porsiyon)", calories: 300 },
    { id: 22, name: "Pirinç Pilavı (1 porsiyon)", calories: 360 },
    { id: 23, name: "Bulgur Pilavı (1 porsiyon)", calories: 290 },
    { id: 24, name: "Karnıyarık (1 adet)", calories: 190 },
    { id: 25, name: "İmam Bayıldı (1 porsiyon)", calories: 170 },
    { id: 26, name: "Taze Fasulye (1 porsiyon)", calories: 150 },
    { id: 27, name: "Ispanak Yemeği (1 porsiyon)", calories: 130 },
    { id: 28, name: "Mantı (1 porsiyon)", calories: 450 },
    { id: 29, name: "Et Sote (1 porsiyon)", calories: 320 },
    { id: 30, name: "Tavuk Sote (1 porsiyon)", calories: 240 },
    { id: 31, name: "Hünkar Beğendi (1 porsiyon)", calories: 450 },

    // --- Kebap & Pide & Lahmacun ---
    { id: 50, name: "İskender Kebap (1 porsiyon)", calories: 750 },
    { id: 51, name: "Adana Kebap (1 porsiyon)", calories: 360 },
    { id: 52, name: "Urfa Kebap (1 porsiyon)", calories: 340 },
    { id: 53, name: "Lahmacun (1 adet)", calories: 220 },
    { id: 54, name: "Kıymalı Pide (1 adet)", calories: 500 },
    { id: 55, name: "Kaşarlı Pide (1 adet)", calories: 550 },
    { id: 56, name: "Kuşbaşılı Pide (1 adet)", calories: 520 },
    { id: 57, name: "Döner Dürüm (Et)", calories: 550 },
    { id: 58, name: "Döner Dürüm (Tavuk)", calories: 450 },
    { id: 59, name: "Çiğ Köfte Dürüm (1 adet)", calories: 350 },

    // --- Kahvaltılıklar ---
    { id: 80, name: "Menemen (1 porsiyon)", calories: 220 },
    { id: 81, name: "Sahanda Yumurta (2 adet)", calories: 240 },
    { id: 82, name: "Haşlanmış Yumurta (1 adet)", calories: 75 },
    { id: 83, name: "Simit (1 adet)", calories: 320 },
    { id: 84, name: "Poğaça (Peynirli)", calories: 280 },
    { id: 85, name: "Açma (Sade)", calories: 300 },
    { id: 86, name: "Su Böreği (1 dilim)", calories: 330 },
    { id: 87, name: "Beyaz Peynir (1 dilim - 30g)", calories: 90 },
    { id: 88, name: "Kaşar Peyniri (1 dilim - 20g)", calories: 70 },
    { id: 89, name: "Zeytin (5 adet)", calories: 45 },
    { id: 90, name: "Bal (1 tatlı kaşığı)", calories: 60 },
    { id: 91, name: "Tereyağı (1 tatlı kaşığı)", calories: 75 },

    // --- Tavuk Dünyası Menüleri ---
    { id: 120, name: "Tavuk Dünyası - Şefin Tavası (Menü)", calories: 950 },
    { id: 121, name: "Tavuk Dünyası - Kekiklim (Menü)", calories: 920 },
    { id: 122, name: "Tavuk Dünyası - Köri Soslu Tavuk (Menü)", calories: 980 },
    { id: 123, name: "Tavuk Dünyası - Barbekü Soslu Tavuk (Menü)", calories: 960 },
    { id: 124, name: "Tavuk Dünyası - Bi Köri (Menü)", calories: 990 },
    { id: 125, name: "Tavuk Dünyası - Gendime Çorbası", calories: 180 },

    // --- By Döner / HD İskender / Restoranlar ---
    { id: 140, name: "By Döner - İskender (Tek)", calories: 850 },
    { id: 141, name: "By Döner - İskender (1.5 Porsiyon)", calories: 1250 },
    { id: 142, name: "By Döner - Et Döner Dürüm", calories: 600 },
    { id: 143, name: "HD İskender - Porsiyon", calories: 880 },
    { id: 144, name: "Köfteci Yusuf - Köfte (200g)", calories: 480 },
    { id: 145, name: "Köfteci Yusuf - Piyaz", calories: 250 },
    { id: 146, name: "Baydöner - Beyti", calories: 950 },

    // --- Burger King / McDonald's / Fast Food ---
    { id: 160, name: "Burger King - Whopper (Sadece Burger)", calories: 640 },
    { id: 161, name: "Burger King - Whopper Menü (Orta)", calories: 1100 },
    { id: 162, name: "Burger King - Big King (Sadece Burger)", calories: 550 },
    { id: 163, name: "Burger King - Tavukburger", calories: 380 },
    { id: 164, name: "McDonald's - Big Mac (Sadece Burger)", calories: 505 },
    { id: 165, name: "McDonald's - McChicken", calories: 400 },
    { id: 166, name: "McDonald's - Patates Kızartması (Orta)", calories: 330 },
    { id: 167, name: "Popeyes - 2 Parça Tavuk", calories: 450 },
    { id: 168, name: "Pizza (Karışık - 1 Dilim)", calories: 280 },
    { id: 169, name: "Hamburger (Ev Yapımı - 150g)", calories: 450 },

    // --- İçecekler (Starbucks vb.) ---
    { id: 200, name: "Starbucks - Latte (Grande - Yağsız Süt)", calories: 130 },
    { id: 201, name: "Starbucks - Latte (Grande - Tam Yağlı)", calories: 220 },
    { id: 202, name: "Starbucks - Americano (Grande)", calories: 15 },
    { id: 203, name: "Starbucks - Cappuccino (Grande)", calories: 140 },
    { id: 204, name: "Starbucks - White Chocolate Mocha (Grande)", calories: 400 },
    { id: 205, name: "Starbucks - Frappuccino (Karamel - Grande)", calories: 420 },
    { id: 206, name: "Çay (Şekersiz)", calories: 1 },
    { id: 207, name: "Türk Kahvesi (Sade)", calories: 7 },
    { id: 208, name: "Türk Kahvesi (Orta)", calories: 25 },
    { id: 209, name: "Ayran (300ml)", calories: 110 },
    { id: 210, name: "Kola (330ml Kutu)", calories: 140 },
    { id: 211, name: "Fanta (330ml Kutu)", calories: 150 },
    { id: 212, name: "Meyve Suyu (Portakal - 200ml)", calories: 90 },

    // --- Tatlılar ---
    { id: 250, name: "Baklava (1 dilim)", calories: 165 },
    { id: 251, name: "Sütlaç (1 kase)", calories: 280 },
    { id: 252, name: "Kazandibi (1 porsiyon)", calories: 300 },
    { id: 253, name: "Künefe (1 porsiyon)", calories: 450 },
    { id: 254, name: "Profiterol (1 porsiyon)", calories: 380 },
    { id: 255, name: "Dondurma (2 top)", calories: 200 },
    { id: 256, name: "Çikolata (Sütlü - 30g)", calories: 160 },
    { id: 257, name: "Tiramisu (1 dilim)", calories: 350 },
    { id: 258, name: "Cheesecake (Limonlu)", calories: 400 },

    // --- Meyve & Kuruyemiş ---
    { id: 300, name: "Elma (1 orta boy)", calories: 52 },
    { id: 301, name: "Muz (1 orta boy)", calories: 105 },
    { id: 302, name: "Portakal (1 adet)", calories: 60 },
    { id: 303, name: "Ceviz (3 adet tüm)", calories: 80 },
    { id: 304, name: "Badem (10 adet)", calories: 70 },
    { id: 305, name: "Fındık (10 adet)", calories: 65 }
];
