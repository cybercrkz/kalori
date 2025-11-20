import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportButton = ({ targetId }) => {
    const handleExport = async () => {
        const element = document.getElementById(targetId);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: '#0f172a', // Arka plan rengi
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('kalori-raporu.pdf');
        } catch (error) {
            console.error('PDF oluşturulurken hata:', error);
            alert('PDF oluşturulamadı. Lütfen tekrar deneyin.');
        }
    };

    return (
        <button
            onClick={handleExport}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                cursor: 'pointer',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            title="Raporu İndir"
        >
            <span style={{ fontSize: '1.5rem' }}>📄</span>
        </button>
    );
};

export default ExportButton;
