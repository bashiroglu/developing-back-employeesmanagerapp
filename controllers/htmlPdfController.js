const pdf = require('html-pdf');
const pdfTemplate = require('../utils/pdfTemplate');

const createPdf = (req, res) => {
  pdf
    .create(pdfTemplate(req.body), { directory: '/controllers' })
    .toFile('./PdfFiles/table.pdf', err => {
      // console.log(req.body);

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
  // let reqPath = path.join(__dirname, '../../../');/ this can be solution to go back.
};

exports.createPdf = createPdf;
exports.getPdf = getPdf;
