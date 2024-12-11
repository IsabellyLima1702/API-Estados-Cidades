/*********************************************************************************************
 * Objetivo: API para retornar dados de estados e cidades do Brasil
 * Data: 30/10/2024
 * Autor: Isabelly Lima
 * Versão 1.0
 ********************************************************************************************/

/*
    Para criar um API devemos instalar:
    express       - npm install express --save  (Serve para criar a API)
    cors          - npm install cors --save     (Serve para dar as permissões da API)
    body-parser   - npm install body-parser     (Serve para a API receber dados dna aquisição)

*/

//Import das bibliotecas
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')
const {request} = require ('http')

//Inicia a utilização do express
const app = express()

//response - Significa a resposta da API
//request  - Significa a chegada de dados na API 
//header em API é onde tem as informações de onde vai e recebe a informação.
//body é conteúdo em API
app.use((request, response, next) =>{
    //Permição de onde virão as requisições na API 
    //(* - fica liberado para qualquer máquina. 
    //Ou pode colocar o IP da máquna que vai realizar as requisições)
    response.header('Acess-Control-Allow-Origin', '*')

    //Permissão de quais métodos a API irá responder
    //GET   (pegar dados da API);
    //POST  (inserir novos itens na API); 
    //PUT   (alterar dados existentes na API); 
    //DELET (deletar itens existentes na API) - são os principais métodos de http
    response.header('Acess-Control-Allow-Methods', 'GET')

    app.use(cors()) //Aplica as restrições para o Cors da requisição; Ativa as configurações do header para o Cors()

    next()
})

 //Import do arquivo de funções
 const getCidades = require('./modulo/funcoes.js')

//EndPoint para retornar todos os estados
app.get('/v1/estados-cidades/lista-siglas-estados', cors(), async function (request, response){

    //Chama a função e retorna todos os estados
    let listaCidades = getCidades.getListaDeEstados()

    //Resposta da API com o JSON e o status code
    response.status(200)
    response.json(listaCidades)

    if(listaCidades){
        response.status(200)
        response.json(listaCidades)
    }else{
        response.status(404)
        response.json({'status': '404', 'message': 'Não foi possível encontrar um estado'})
    }
})

//EndPoint que retorna os dados de um estado filtrando pela sigla
//Para mostrar que é uma variável, basta colocar':'
app.get('/v1/estados-cidades/estado/:sigla', cors(), async function(request, response){
    //Recebe o conteudo da vaiavel sigla que será enviada na URL da aquisição pelo mdelo de parametro (params)
    //Tudo que chega na API é pelo request
    //Tudo o que recebe é o response
    let uf = request.params.sigla

    //Chama a função que irá receber a sigla e retornar os dados referente ao estado
    let dados = getCidades.getDadosEstado(uf)

    response.status(200)
    response.json(dados)

    //Para retornar false no EndPoint caso haja erro na digitação ou não tenha a opção esperada no código
    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Não foi possível encontrar um estado'})
    }

    //console.log(uf)
})

//EndPoint que retorna a capital do estado filtrando pela sigla
app.get('/v1/estados-cidades/capital/estado', cors(), async function(request, response){
    //Recebe a variável sigla através do modelo Query String
    let uf = request.query.sigla
    //let nome = request.query.nome
    //let data = request.query.data

let dados = getCidades.getCapitalEstado(uf)

if(dados){
    response.status(200)
    response.json(dados)
}else{
    response.status(404)
    response.json({'status': '404', 'message': 'Não foi possível encontrar um estado'})
}
    //console.log(uf)
    //console.log(nome)
    //console.log(data)
})

app.get('/v1/estados-cdades/estados/:regiao', cors(), async function(request, response){
    let uf = request.params.regiao

let dados = getCidades.getEstadosRegiao(uf)

if(dados){
    response.status(200)
    response.json(dados)
}else{
    response.status(404)
    response.json({'status': '404', 'message': 'Não foi possível encontrar um estado'})
}
})

app.get('/v1/estados-cidades/capital/pais', cors(), async function(request, response){
    let uf = request.query.sigla

    let dados = getCidades.getCapitalPais(uf)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': '404', 'message': 'Não foi possível encontrar um estado'})
    }
})

app.get('/v1/estados-cidades/cidades/estados', cors(), async function(request, response){
    let uf = request.query.sigla

    let dados = getCidades.getCidades(uf)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': '404', 'message': 'Não foi possível encontrar um estado'})
    }
})
//Executa a API e faz com que fique aguardando novas requisições
app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')
})