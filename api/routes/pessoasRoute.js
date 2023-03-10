const { Router } = require('express');
const PessoaController = require ('../controllers/PessoaController');

const router = Router();
router.get('/pessoas', PessoaController.pegaTodasAsPessoa);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.post('/pessoas', PessoaController.criaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.deletaPessoa);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula);

module.exports = router;