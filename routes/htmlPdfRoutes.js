const express = require('express');


const { createPdf, getPdf } = require('../controllers/htmlPdfController');

const router = express.Router();

router.post('/', createPdf);
router.get('/', getPdf);

module.exports = router;
