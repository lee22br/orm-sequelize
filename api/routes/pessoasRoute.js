const { Router } = require('express');
const PessoaController = require ('../controllers/PessoaController');

const router = Router();
router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/ativas', PessoaController.pegaTodasAsPessoasAtivas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.post('/pessoas', PessoaController.criaPessoa);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.delete('/pessoas/:id', PessoaController.deletaPessoa);
router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas);
router.post('/pessoas/:id', PessoaController.restauraPessoa);
router.put('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa);

module.exports = router;