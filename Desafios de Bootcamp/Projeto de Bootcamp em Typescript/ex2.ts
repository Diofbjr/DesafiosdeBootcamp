class Pessoa{

    nome: String;
    idade: Number;
    profissao: String;
    constructor(nome: String, idade:Number, profissao:String){
        this.nome = nome;
        this.idade = idade;
        this.profissao = profissao;
    }
    
}

let pessoa1 = new Pessoa("Maria", 29, 'Atriz')
let pessoa2 = new Pessoa("Roberto", 19, "Padeiro")
let pessoa3 = new Pessoa("Laura", 32, "Atriz")
let pessoa4 = new Pessoa("Carlos", 19, "Padeiro")