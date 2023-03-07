const { Router } = require('express');
const PessoaController = require ('../controllers/PessoaController');

const router = Router();
router.get('/pessoas', PessoaController.pegaTodasAsPessoa);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);

module.exports = router;