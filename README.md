# 🥗 Kalori Hesaplayıcı

Modern ve kapsamlı bir sağlık ve beslenme takip uygulaması. React ile geliştirilmiş, kullanıcı dostu arayüzü ve detaylı raporlama özellikleriyle günlük kalori, makro besin, su tüketimi ve kilo takibinizi kolayca yapabilirsiniz.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Özellikler

### 📊 Hesaplayıcı
- **Kalori Hesaplama**: Cinsiyet, yaş, kilo, boy ve aktivite seviyesine göre günlük kalori ihtiyacınızı hesaplar
- **BMI Analizi**: Vücut kitle indeksinizi hesaplar ve kategorisini belirler
- **İdeal Kilo Aralığı**: Boyunuza göre ideal kilo aralığınızı gösterir
- **Makro Besin Dağılımı**: Protein, yağ ve karbonhidrat oranlarınızı hesaplar
- **Örnek Diyet Planı**: Kalori hedefinize uygun örnek beslenme önerileri

### 🛠️ Araçlar
- **Su Takibi**: Kilonuza göre günlük su ihtiyacınızı hesaplar ve takip eder
- **Yemek Kalori Hesaplama**: 100+ yemek ve restoran menüsü ile kalori takibi
  - Geleneksel Türk mutfağı
  - Tavuk Dünyası, By Döner, HD İskender menüleri
  - Burger King, McDonald's, Popeyes
  - Starbucks içecekleri
  - Tatlılar, meyveler ve kuruyemişler
- **Oruç Takibi**: Aralıklı oruç (intermittent fasting) zamanlayıcısı

### 📈 Analiz
- **Kilo/BMI Grafiği**: Zaman içindeki kilo ve BMI değişimlerinizi görselleştirir
- **Yemek Alımı Özeti**: Günlük tükettiğiniz yemekleri ve toplam kaloriyi gösterir
- **Geçmiş Kayıtları**: Tüm hesaplama geçmişinizi listeler
- **İlerleme Takibi**: Başlangıç ve mevcut değerlerinizi karşılaştırır

### 📄 PDF Rapor
- **Detaylı Sağlık Raporu**: Tüm verilerinizi içeren profesyonel PDF raporu
  - Günlük kalori hedefi
  - BMI göstergesi (görsel gauge)
  - Su hedefi
  - Makro besin dağılımı (görsel grafikler)
  - Örnek beslenme planı
  - Gelişim takibi tablosu
  - Günlük yemek alımı ve kalori özeti
- **Modern Tasarım**: Renkli, görsel ve okunması kolay rapor formatı

## 🚀 Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/cybercrkz/kalori.git
cd kalori
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcınızda açın**
```
http://localhost:5173
```

## 📦 Kullanılan Teknolojiler

- **React 19.2.0**: UI framework
- **Vite 7.2.4**: Build tool ve dev server
- **Recharts 3.4.1**: Grafik ve veri görselleştirme
- **jsPDF 3.0.4**: PDF oluşturma
- **jsPDF-AutoTable 5.0.2**: PDF tablo oluşturma
- **Vite-Plugin-PWA 1.1.0**: Progressive Web App desteği

## 📖 Kullanım

### 1. Kalori Hesaplama
1. "Hesaplayıcı" sekmesine gidin
2. Cinsiyet, yaş, kilo, boy ve aktivite seviyenizi girin
3. "Hesapla" butonuna tıklayın
4. Sonuçlarınızı ve örnek diyet planınızı görün

### 2. Yemek Takibi
1. "Araçlar" sekmesine gidin
2. "Yemek Kalori Hesapla" bölümünde yemek arayın
3. Yediğiniz yemekleri ekleyin
4. Toplam kalori alımınızı görün

### 3. Analiz ve Takip
1. "Analiz" sekmesine gidin
2. Kilo/BMI grafiğinizi inceleyin
3. Günlük yemek alımınızı kontrol edin
4. Geçmiş kayıtlarınızı görüntüleyin

### 4. PDF Rapor İndirme
1. Sağ alt köşedeki "Raporu İndir" butonuna tıklayın
2. PDF raporunuz otomatik olarak indirilecektir

## 🎨 Özellik Detayları

### Veri Saklama
- Tüm veriler tarayıcınızın `localStorage`'ında saklanır
- Hesaplama geçmişi (son 10 kayıt)
- Yemek seçimleri
- Su takibi
- Oruç zamanlayıcı durumu

### Responsive Tasarım
- Mobil, tablet ve masaüstü uyumlu
- Modern ve kullanıcı dostu arayüz
- Koyu tema (dark mode)
- Smooth animasyonlar

### PWA Desteği
- Offline çalışma desteği
- Ana ekrana ekleme
- Hızlı yükleme

## 🔧 Geliştirme

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## 📁 Proje Yapısı

```
kalori/
├── public/
│   └── fonts/              # Özel fontlar
├── src/
│   ├── components/         # React bileşenleri
│   │   ├── CalorieForm.jsx
│   │   ├── ResultCard.jsx
│   │   ├── DietList.jsx
│   │   ├── HistoryList.jsx
│   │   ├── WeightChart.jsx
│   │   ├── WaterTracker.jsx
│   │   ├── FoodSearch.jsx
│   │   ├── FoodIntakeCard.jsx
│   │   ├── FastingTimer.jsx
│   │   └── ExportButton.jsx
│   ├── data/
│   │   └── foods.js        # Yemek veritabanı (100+ öğe)
│   ├── utils/
│   │   └── calorieCalculator.js  # Hesaplama fonksiyonları
│   ├── App.jsx             # Ana uygulama
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## 🤝 Katkıda Bulunma

1. Bu projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Murat Can**
- GitHub: [@cybercrkz](https://github.com/cybercrkz)

## 🙏 Teşekkürler

Bu proje aşağıdaki açık kaynak kütüphaneleri kullanmaktadır:
- React Team
- Recharts
- jsPDF
- Vite

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
