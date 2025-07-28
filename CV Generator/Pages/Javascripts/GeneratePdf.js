//Generate PDf
async function exportToPDF() {
    const { jsPDF } = window.jspdf;

    // Create a new jsPDF instance with A4 size (210mm x 297mm)
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
    });

    const content = document.getElementById('live-preview'); // Get content
    const id = "cv";
    const pdfname = generateFilename(id);
    // Configure html2pdf with proper page breaks
    await html2pdf()
        .from(content)
        .set({
            margin: 16,
            filename: pdfname,
            html2canvas: {
                scale: 2, // High resolution for better quality
                useCORS: true
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'p'
            }
        })
        .toPdf()
        .get('pdf')
        .then((pdf) => {
            let totalPages = pdf.internal.getNumberOfPages();

            // Apply page numbers
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(10);
                pdf.text(`Page ${i} of ${totalPages}`, 180, 290); // Position footer at bottom
            }
        })
        .save(); // Save the generated PDF file
}

const generateFilename = (id) => {
    const guid = crypto.randomUUID(); // Generate a UUID (GUID)
    return `${id}-${guid}.pdf`;
};