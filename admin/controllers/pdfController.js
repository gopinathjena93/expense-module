const logger = require('../logger'); // Update the path accordingly
const db = require('../database');
const { PDFDocument, rgb,StandardFonts,PageSizes   } = require('pdf-lib');
const fs = require('fs');
const path = require('path'); // Import the 'path' module

const pdfsDirectory = path.join(__dirname,'../', 'pdfs'); // Specify the directory to save PDFs

const ejs = require('ejs');
const pdf = require('html-pdf');





const pdfController = {};
pdfController.generate = async (req, res) => {
	try {			

		const templatePath = path.join(__dirname,'../', 'views', 'template.ejs');
		console.log(templatePath);
		const templateContent = await ejs.renderFile(templatePath, { username : "Gopinath Jena", imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFEHogO6wllD0s0KDJZxa46I72H4vLW3-fqVYZcQZD&s"  });

		// Create a new PDF document
		const pdfDoc = await PDFDocument.create();
  
		// Add a new page to the PDF
		// const page = pdfDoc.addPage([600, 400]);
		const page = pdfDoc.addPage(PageSizes.A4); 

		const pdfOptions = { format: 'Letter' };

		pdf.create(templateContent, pdfOptions).toStream((err, stream) => {
			if (err) {
			  console.error('Error generating PDF:', err);
			  return res.status(500).send('Error generating PDF');
			}
	
			const pdfFileName = `example_${Date.now()}.pdf`;
			const pdfFilePath = path.join(pdfsDirectory, pdfFileName);
			const writeStream = fs.createWriteStream(pdfFilePath);
	
			stream.pipe(writeStream);
	
			writeStream.on('finish', () => {
			  res.setHeader('Content-Type', 'application/pdf');
			  res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);
			  fs.createReadStream(pdfFilePath).pipe(res);
			});
		 });
  
		// Draw text on the page
	
		
  
		// Serialize the PDF document
		// const pdfBytes = await pdfDoc.save();

		// // Generate a unique filename for the PDF
		// const pdfFileName = `example_${Date.now()}.pdf`;

		// // Save the PDF to the specified directory
		// const pdfFilePath = path.join(pdfsDirectory, pdfFileName);
		// fs.writeFileSync(pdfFilePath, pdfBytes);


		// console.log(pdfBytes);
  
		// // Set the response headers for PDF download
		// res.setHeader('Content-Type', 'application/pdf');
		// res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
  
		// // Send the PDF content as response
		// res.send(pdfBytes);
	 } catch (error) {
		logger.error({ message: error.message, pageName: req.pageName });
		console.error('Error generating PDF:', error);
		res.status(500).send('Error generating PDF');
	 }
};

module.exports = pdfController;
