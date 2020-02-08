const pdf = require('html-pdf');
const pdfTemplate = require('../utils/pdfTemplate');

const createPdf = (req, res) => {
  pdf
    .create(pdfTemplate(), { directory: '/controllers' })
    .toFile('./PdfFiles/table.pdf', err => {
      if (err) {
        res.send(Promise.reject());
      }
      res.send(Promise.resolve());
    });
};

const getPdf = (req, res) => {
  res.sendFile(
    `C:/Users/Abdulla/Desktop/Practise/developing-back-employeesmanagerapp/PdfFiles/table.pdf`
  );
  //   res.download(`${__dirname}/table.pdf`);
  console.log(__dirname);
};

exports.createPdf = createPdf;
exports.getPdf = getPdf;
