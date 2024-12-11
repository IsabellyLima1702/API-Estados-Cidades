var EstadosBrasil = require('./estados_cidades.js')

const getListaDeEstados = function(){
   let estado = {}
   let siglas = []

   EstadosBrasil.listaDeEstados.estados.forEach(function(item){
      siglas.push(item.sigla)

      estado.uf = siglas
      estado.quantidade = siglas.length
   })
   return estado
}

const getDadosEstado = function(sigladosEstados){
   let estado = {}
   let status = false
   let sigla = String(sigladosEstados).toUpperCase()
  
   EstadosBrasil.listaDeEstados.estados.forEach(function(item){
      if(String(item.sigla).toUpperCase()== sigla){
      estado.uf = item.sigla
      estado.descricao = item.nome
      estado.capital = item.capital
      estado.regiao = item.regiao
      }
      return status
   }) 
   return estado
}

const getCapitalEstado = function(sigladoEstado){
   let estado = {}
   let status = true

   let sigla = String(sigladoEstado).toUpperCase()
   EstadosBrasil.listaDeEstados.estados.forEach(function(item){
      if(String(item.sigla).toUpperCase()== sigla){
         estado.uf = item.sigla
         estado.descricao = item.nome
         estado.capital = item.capital
         }
         return status
      })
      return estado
   }

const getEstadosRegiao = function(regiaoEstado){
   let estado = {}
   let estados = []
   let status = true
   let regiao = String(regiaoEstado).toUpperCase()
   EstadosBrasil.listaDeEstados.estados.forEach(function(item){
      if(String(item.regiao).toUpperCase()== regiao){
         estado.regiao = item.regiao
         estado.estados = estados

         let siglas = {}
            estado.uf = item.sigla
            estado.descricao = item.nome
            estados.push (siglas)
         
         }
         return status
      })
      return estado
   }
   
const getCapitalPais = function(){
   let estado = {}
   let CapitaisPais = []
   estado.capitais = CapitaisPais
   let status = true

   EstadosBrasil.listaDeEstados.estados.forEach(function(item){
      if(item.capital_pais !=undefined){
         let capitais = {}

         capitais.capital_atual = item.capital_pais.capital
         capitais.uf = item.sigla
         capitais. descricao = item.nome
         capitais.capital = item.capital
         capitais.capital_pais_ano_inicio = item.capital_pais.ano_inicio
         capitais.capital_pais_ano_termino = item.capital_pais.ano_fim
         CapitaisPais.push(capitais)
      }
      return status
   }) 
   return estado
}

const getCidades = function(listaCidades){
   let estado = {}
   let status = true
   let sigla = String(listaCidades).toUpperCase()
   EstadosBrasil.listaDeEstados.estados.forEach(function(item){
      if(String(item.sigla).toUpperCase()== sigla){
      estado.uf = item.sigla
      estado.descricao = item.nome
      estado.quantidade_cidades = item.cidades.length
      estado.cidade = item.cidades
      
      }
      return status
   })
   return estado
}

//console.log(getCidades('RR'))
//console.log(getCapitalPais())
//console.log(getEstadosRegiao('sul'))
//console.log(getCapitalEstado('SP')) 
//console.log(getDadosEstado('MG')) 
//console.log(getListaDeEstados()) 

module.exports = {
   getListaDeEstados,
   getDadosEstado,
   getCapitalEstado,
   getEstadosRegiao,
   getCapitalPais,
   getCidades
}