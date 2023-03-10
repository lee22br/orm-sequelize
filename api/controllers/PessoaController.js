const database = require('../models');
const Sequelize = require ('sequelize');


class PessoaController{
    static async pegaTodasAsPessoaAtivas (req, res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }
    static async pegaTodasAsPessoa (req, res){
        try{
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll();
            return res.status(200).json(todasAsPessoas);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    
    
    static async pegaUmaPessoa (req, res){
        const { id } = req.params;
        try{
            const umaPessoa = await database.Pessoas.findOne( {
                where: {
                    id: Number(id)
                }
            } );
            return res.status(200).json(umaPessoa);
        }catch (error){
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa (req, res){
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa (req, res){
        const { id } = req.params;
        const novaInfoPesso = req.body;
        try {
            await database.Pessoas.update(novaInfoPesso, {where: { id: Number(id)}});
            const pessoaAtualizada = await database.Pessoas.findOne( {where: { id: Number(id)}});
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaPessoa (req, res){
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({where: { id: Number(id)}});
            return res.status(200).json({ mensagem: `Pessoa com ID: ${id} foi deletada.`})
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaMatricula (req, res){
        const { estudanteId } = req.params;
        const { matriculaId } = req.params;
        try{
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json(umaMatricula);

        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async criaMatricula (req, res){
        const { estudanteId } = req.params;
        const novaMatricula = {... req.body, estudante_id: Number(estudanteId)};
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(novaMatriculaCriada);
        }catch(error){
            return res.status(500).json(error.message);
        }
    }

    static async atualizaMatricula (req, res){
        const { estudanteId, matriculaId } = req.params;
        const novasInfos = req.body;
        try {
            await database.Matriculas.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            const matriculaAtualizada = await database.Matriculas.findByPk(matriculaId);
            res.status(200).json(matriculaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
            
        }
    }

    static async deletaMatricula (req, res){
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.destroy({where: { id: Number(matriculaId)}});
            return res.status(200).json({mensagem: `matr??cula Id: ${matriculaId} deletada.`});
        } catch (error) {
            
        }
    }

    static async restauraPessoa (req, res){
        const { id } = req.params;
        try {
            await database.Pessoas.restore({where: {id: Number(id)}});
            return res.status(200).json({mesagem: `Pessoa com ID ${id} restaurada.`});
        } catch (error) {
            return res.status(500).json(error.message);
            
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
          await database.Matriculas.restore({
            where: {
              id: Number(matriculaId),
              estudante_id: Number(estudanteId)
            }
          })
          return res.status(200).json({ mensagem: `Matr??cula com id: ${id} restaurada`})
        } catch (error) {
          return res.status(500).json(error.message)
        }
    }
    
    static async pegaMatriculas (req, res){
        const { estudanteId } = req.params;
        try {
            const pessoa = await database.Pessoas.findByPk(Number(estudanteId));
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasPorTurma (req, res){
        const { turmaId } = req.params;
        try {
            const todasMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'DESC']]
             });
            return res.status(200).json(todasMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas (req, res){
        const lotacaoTurma = 2;
        try {
            const turmaLotadas = await database.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            });
            return res.status(200).json(turmaLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaPessoa (req, res){
        const { estudanteId } = req.params;
        try {
            database.sequelize.transaction(async transacao => {
                await database.Pessoas.update({ativo: false}, {where: {id: Number(estudanteId)}}, {transaction: transacao});
                await database.Matriculas.update({status: 'cancelado'}, {where:{estudante_id: Number(estudanteId)}},{transaction: transacao});
                return res.status(200).json({menssage: `matriculas ref. ao estudante ${estudanteId} cancelada(s)`});
            })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController