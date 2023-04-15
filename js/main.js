const form = document.getElementById("novoItem")//acessa o formulario geral
const lista = document.getElementById("lista")//acessa os itens criados

//criando um array para salvar os objetos no localstorage sem preder nenhum
//primeiro ele checa se existe algo com a chave "itens" no localStorage
const itens = JSON.parse(localStorage.getItem("itens")) || [] //se estiver vazio ele cria apenas um array vazio disponivel
// o JSON.parse( ) acima, ele recebe as string do LocalStore e transforma em objeto dentro de um array


//#### Looping para percorrer todo  array ITENS ######
//sem o JSON.parse( ) ele não vai conseguir funcionar porque vai ser apenas strings
itens.forEach((elemento) => {
    criaElemento(elemento)
})


//retorna a entrada dasinformções submitidas
form.addEventListener("submit", (evento) => {

    //#### remove da URL o historico enviado ao clicar adicionar#####
    evento.preventDefault()

    //## Guarda a informação digitada no campo nome/quantidad e#####
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)


    //#### Transformando em objeto para não subscrever no localstorage #####
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    //falta transformar em string para enviar para o localstorage
    //#### Transformando em objeto para não subscrever no localstorage #####




    if (existe) {
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0

        criaElemento(itemAtual)//inserindo a entrada de informações do formulario dentro da função

        itens.push(itemAtual) //inserindo o novo OBJETO no array itens
    }


    //transformando em texto o objeto para ser enviado ao localStorage
    localStorage.setItem("itens", JSON.stringify(itens))
    // "itens" e o nome da key no localStorage , e (itens) e o OBJETO com o valor ja transformado em string


    //##### Limpa o campo Nome e Quantidade ao clicar Adicionar ########
    nome.value = ""
    quantidade.value = ""

})

function criaElemento(item) {

    const novoItem = document.createElement('li')//cria uma lista no html para o novo item
    novoItem.classList.add("item")//adiciona a classe item na li

    const numeroItem = document.createElement('strong') //cria um strong que vai representar a quantidade
    numeroItem.innerHTML = item.quantidade // const recebe o valor da quantidade inserida
    numeroItem.dataset.id = item.id // const recebe um id para cada item
    
    novoItem.appendChild(numeroItem)//inseri no front e HTML o numero do item


    
    novoItem.innerHTML += item.nome //inseri no front e HTML o nome do item


    //################################## CRIA BOTÕES + - X #####################################
    novoItem.appendChild(botaoSoma(item.id))
    novoItem.appendChild(botaoSubtrair(item.id))
    novoItem.appendChild(botaoDeleta(item.id))
    //################################## CRIA BOTÕES + - X #####################################


    lista.appendChild(novoItem)//inseri no front e HTML o novo item ja com o numero


    // console.log(item) //lista de itens dentro do objeto
    // console.log(item.quantidade) // quantidade do item no strong
    // console.log(item.nome) // descrição do item tipo string
    // console.log(item.id) // id do item

    

}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade
}



//########################## SOMA ####################

function botaoSoma(tag, id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "+"

    elementoBotao.addEventListener("click", function () {
        somarElemento(this.parentNode, id)

    })

    return elementoBotao

}

function somarElemento(tag, id) {

    //teste de troca de valor no objeto
    var me = { nome: "teste", quantidade: "5", id: 0 }
    console.log(me)
    me.quantidade = "7"
    console.log(me)



}


//########################## SUBTRAIR ####################

function botaoSubtrair(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "-"

    elementoBotao.addEventListener("click", function () {
        subtrairElemento(this.parentNode, id)
    })

    return elementoBotao
}

function subtrairElemento(tag, id) {


   
}

//########################## DELETA ####################

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}