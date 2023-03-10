
let cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))
let endereco = document.getElementById('endereco')

async function buscaEndereco(cep) {
    let mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML = ''
    try {
        let consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`) 
        let consultaCEPConvertida = await consultaCEP.json()
        if (consultaCEPConvertida.erro) {
            throw Error ('Cep não existente')
        }

        let cidade = document.getElementById('cidade')
        let logradouro = document.getElementById('endereco')
        let estado = document.getElementById('estado')
        let bairro = document.getElementById('bairro')
        
        cidade.value = consultaCEPConvertida.localidade
        logradouro.value = consultaCEPConvertida.logradouro
        estado.value = consultaCEPConvertida.uf
        bairro.value = consultaCEPConvertida.bairro

        console.log(consultaCEPConvertida)
        return consultaCEPConvertida
    }
    catch(erro) {
        mensagemErro.innerHTML = `<p>Cep inválido. Tente novamente.</p>`
        mensagemErro.style.color = 'red'
        mensagemErro.style.fontSize = '12px'
        mensagemErro.style.marginTop = '4px'
        console.log(erro)
    }

}


   /* .then(resposta => resposta.json())
    .then(r => {
        if (r.erro) {
            throw Error('esse cep nao existe')
        } else 
            console.log(r)
    })  
    .catch(erro => console.log(erro))
    .finally(mensagem => console.log('processamento concluido'))
*/
/*
let ceps = ['01001000' , '01001001', ]
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores))

Promise.all(conjuntoCeps).then(respostas => console.log(respostas))
*/
