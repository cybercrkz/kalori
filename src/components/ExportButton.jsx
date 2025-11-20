import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportButton = ({ result, history, userWeight }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleExport = async () => {
        if (!result) {
            alert('Lütfen önce hesaplama yapın.');
            return;
        }

        setIsGenerating(true);

        // Simüle edilmiş bir gecikme (UX için)
        await new Promise(resolve => setTimeout(resolve, 500));

        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;

        // --- RENKLER ---
        const colors = {
            primary: [99, 102, 241], // Indigo
            secondary: [236, 72, 153], // Pink
            dark: [15, 23, 42], // Slate 900
            light: [248, 250, 252], // Slate 50
            text: [51, 65, 85], // Slate 700
            textLight: [100, 116, 139], // Slate 500
            success: [16, 185, 129],
            warning: [245, 158, 11],
            danger: [239, 68, 68]
        };

        // --- YARDIMCI FONKSİYONLAR ---
        const drawHeader = () => {
            // Arkaplan Deseni
            doc.setFillColor(...colors.dark);
            doc.rect(0, 0, pageWidth, 60, 'F');

            // Dekoratif Daireler
            doc.setFillColor(255, 255, 255);
            doc.setGState(new doc.GState({ opacity: 0.05 }));
            doc.circle(pageWidth - 30, 30, 40, 'F');
            doc.circle(40, -10, 50, 'F');
            doc.setGState(new doc.GState({ opacity: 1 }));

            // Başlık
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(26);
            doc.setFont('helvetica', 'bold');
            doc.text('SAĞLIK RAPORU', margin, 35);

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }), margin, 45);

            // Logo / İkon (Basit Çizim)
            doc.setDrawColor(255, 255, 255);
            doc.setLineWidth(1);
            doc.circle(pageWidth - margin - 10, 30, 12, 'S');
            doc.line(pageWidth - margin - 16, 30, pageWidth - margin - 4, 30);
            doc.line(pageWidth - margin - 10, 24, pageWidth - margin - 10, 36);
        };

        const drawFooter = (pageNumber, totalPages) => {
            doc.setFillColor(...colors.light);
            doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');

            doc.setFontSize(8);
            doc.setTextColor(...colors.textLight);
            doc.text(`Sayfa ${pageNumber} / ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
            doc.text('Bu rapor kişisel bilgilendirme amaçlıdır. Tıbbi tavsiye yerine geçmez.', margin, pageHeight - 8);
        };

        // --- SAYFA 1: ÖZET ---
        drawHeader();

        let yPos = 80;

        // KART: Kalori
        doc.setFillColor(...colors.light);
        doc.roundedRect(margin, yPos, (pageWidth - margin * 3) / 2, 50, 4, 4, 'F');
        doc.setFillColor(...colors.primary);
        doc.circle(margin + 15, yPos + 15, 4, 'F');

        doc.setFontSize(10);
        doc.setTextColor(...colors.textLight);
        doc.text('GÜNLÜK KALORİ HEDEFİ', margin + 25, yPos + 18);

        doc.setFontSize(24);
        doc.setTextColor(...colors.dark);
        doc.setFont('helvetica', 'bold');
        doc.text(`${result.tdee}`, margin + 10, yPos + 35);
        doc.setFontSize(12);
        doc.text('kcal', margin + 10 + doc.getTextWidth(`${result.tdee}`) + 2, yPos + 35);

        // KART: Su
        const rightColX = margin + ((pageWidth - margin * 3) / 2) + margin;
        doc.setFillColor(...colors.light);
        doc.roundedRect(rightColX, yPos, (pageWidth - margin * 3) / 2, 50, 4, 4, 'F');

        // Su Damlaları Görseli
        const waterTarget = userWeight ? Math.round(userWeight * 35) : 2500;
        doc.setFillColor(56, 189, 248); // Sky Blue
        for (let i = 0; i < 5; i++) {
            doc.circle(rightColX + 20 + (i * 15), yPos + 35, 4, 'F');
        }

        doc.setFontSize(10);
        doc.setTextColor(...colors.textLight);
        doc.text('GÜNLÜK SU HEDEFİ', rightColX + 15, yPos + 18);
        doc.text(`${waterTarget} ml`, rightColX + 15, yPos + 45); // Altına yaz

        yPos += 65;

        // BMI GÖSTERGESİ
        doc.setFontSize(14);
        doc.setTextColor(...colors.dark);
        doc.setFont('helvetica', 'bold');
        doc.text('Vücut Kitle İndeksi (BMI)', margin, yPos);

        yPos += 15;

        // Gauge Arkaplan
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(10);
        doc.line(margin + 20, yPos + 20, pageWidth - margin - 20, yPos + 20);

        // Gauge Değer
        let bmiValue = parseFloat(result.goals.bmi);
        let maxBmi = 40;
        let minBmi = 15;
        let percent = Math.max(0, Math.min(1, (bmiValue - minBmi) / (maxBmi - minBmi)));
        let barWidth = (pageWidth - margin * 2 - 40);
        let fillWidth = barWidth * percent;

        // Renk belirle
        let gaugeColor = colors.success;
        if (bmiValue < 18.5) gaugeColor = colors.primary;
        else if (bmiValue > 25) gaugeColor = colors.warning;
        if (bmiValue > 30) gaugeColor = colors.danger;

        doc.setDrawColor(...gaugeColor);
        doc.line(margin + 20, yPos + 20, margin + 20 + fillWidth, yPos + 20);

        // İşaretçi
        doc.setFillColor(...colors.dark);
        doc.triangle(
            margin + 20 + fillWidth, yPos + 28,
            margin + 20 + fillWidth - 4, yPos + 34,
            margin + 20 + fillWidth + 4, yPos + 34,
            'F'
        );

        doc.setFontSize(12);
        doc.text(result.goals.bmi, margin + 20 + fillWidth, yPos + 12, { align: 'center' });
        doc.setFontSize(10);
        doc.setTextColor(...gaugeColor);
        doc.text(result.goals.bmiLabel, margin + 20 + fillWidth, yPos + 42, { align: 'center' });

        yPos += 60;

        // MAKRO BESİNLER
        doc.setFontSize(14);
        doc.setTextColor(...colors.dark);
        doc.text('Makro Besin Dağılımı', margin, yPos);

        yPos += 15;

        const macros = [
            { label: 'Protein', val: result.goals.macros.protein, color: colors.primary, pct: '30%' },
            { label: 'Yağ', val: result.goals.macros.fat, color: colors.warning, pct: '35%' },
            { label: 'Karbonhidrat', val: result.goals.macros.carbs, color: colors.success, pct: '35%' }
        ];

        macros.forEach((macro, i) => {
            const x = margin + (i * ((pageWidth - margin * 2) / 3));

            // Daire Grafik (Basit)
            doc.setDrawColor(...macro.color);
            doc.setLineWidth(3);
            doc.circle(x + 25, yPos + 25, 15, 'S');

            doc.setFontSize(12);
            doc.setTextColor(...colors.dark);
            doc.text(`${macro.val}g`, x + 25, yPos + 29, { align: 'center' });

            doc.setFontSize(10);
            doc.setTextColor(...colors.textLight);
            doc.text(macro.label, x + 25, yPos + 50, { align: 'center' });
        });

        // --- SAYFA 2: DİYET & GEÇMİŞ ---
        doc.addPage();
        drawHeader();

        yPos = 80;

        doc.setFontSize(14);
        doc.setTextColor(...colors.dark);
        doc.text('Örnek Beslenme Planı', margin, yPos);

        const dietBody = [
            ['Kahvaltı', result.goals.dietPlan.breakfast.join('\n')],
            ['Öğle', result.goals.dietPlan.lunch.join('\n')],
            ['Ara Öğün', result.goals.dietPlan.snack.join('\n')],
            ['Akşam', result.goals.dietPlan.dinner.join('\n')],
        ];

        doc.autoTable({
            startY: yPos + 10,
            head: [['Öğün', 'İçerik']],
            body: dietBody,
            theme: 'grid',
            headStyles: {
                fillColor: colors.dark,
                fontSize: 11,
                fontStyle: 'bold',
                halign: 'left',
                cellPadding: 8
            },
            bodyStyles: {
                fontSize: 10,
                cellPadding: 8,
                lineColor: [226, 232, 240]
            },
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 40, valign: 'middle' },
                1: { cellWidth: 'auto' }
            },
            alternateRowStyles: {
                fillColor: colors.light
            }
        });

        if (history && history.length > 0) {
            const finalY = doc.lastAutoTable.finalY + 20;

            // Eğer sayfa sonuna yaklaştıysa yeni sayfa
            if (finalY > pageHeight - 60) {
                doc.addPage();
                drawHeader();
                yPos = 80;
            } else {
                yPos = finalY;
            }

            doc.setFontSize(14);
            doc.setTextColor(...colors.dark);
            doc.text('Gelişim Takibi', margin, yPos);

            const historyBody = history.map(item => [
                item.date,
                item.weight ? `${item.weight} kg` : '-',
                item.bmi,
                item.bmiCategory,
                `${item.tdee} kcal`
            ]);

            doc.autoTable({
                startY: yPos + 10,
                head: [['Tarih', 'Kilo', 'BMI', 'Durum', 'Kalori']],
                body: historyBody,
                theme: 'striped',
                headStyles: { fillColor: colors.primary },
                styles: { fontSize: 9, cellPadding: 6 }
            });
        }

        // Sayfa numaralarını ekle
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            drawFooter(i, totalPages);
        }

        doc.save('saglik-raporu.pdf');
        setIsGenerating(false);
    };

    return (
        <>
            <style>
                {`
                    @keyframes pulse-glow {
                        0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
                        70% { box-shadow: 0 0 0 15px rgba(99, 102, 241, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
                    }
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-5px); }
                        100% { transform: translateY(0px); }
                    }
                `}
            </style>
            <button
                onClick={handleExport}
                disabled={isGenerating}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: 'white',
                    padding: isHovered ? '1rem 2rem' : '1rem',
                    borderRadius: '50px',
                    cursor: isGenerating ? 'wait' : 'pointer',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isHovered
                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)'
                        : '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                    animation: isHovered ? 'none' : 'float 3s ease-in-out infinite',
                    overflow: 'hidden',
                    maxWidth: isHovered ? '300px' : '60px',
                    whiteSpace: 'nowrap'
                }}
            >
                <div style={{
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    animation: isGenerating ? 'spin 1s linear infinite' : 'pulse-glow 2s infinite'
                }}>
                    {isGenerating ? '⏳' : '📄'}
                </div>

                <div style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(0)' : 'translateX(20px)',
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    fontSize: '1rem'
                }}>
                    {isGenerating ? 'Hazırlanıyor...' : 'Raporu İndir'}
                </div>
            </button>
        </>
    );
};

export default ExportButton;
