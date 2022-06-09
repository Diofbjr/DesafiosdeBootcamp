class Conta{
    apiKey: String;
    requestToken: String;
    username: String;
    password: String;
    sessionId: String;
    listId: String;
    constructor(apiKey: String, requestToken: String, username: String, password: String, sessionId: String, listId: String){
        this.apiKey = "3f301be7381a03ad8d352314dcc3ec1d";
        this.requestToken = "https://api.themoviedb.org/3/movie/550?api_key=174878cd7c4eb51d268574464bc61c2c";
        this.username = "Yggix";
        this.password = "*******";
        this.sessionId = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzQ4NzhjZDdjNGViNTFkMjY4NTc0NDY0YmM2MWMyYyIsInN1YiI6IjYyOWZhN2M1MTEzMGJkMDA2NmIzMWI2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lj8i9g_OOebU8O7_xtOQOXcNXx2GfMbnIv71D033tZo";
        this.listId = "7101979";
    }
    
    loginButton = document.getElementById('login-button');
    searchButton = document.getElementById('search-button');
    searchContainer = document.getElementById('search-container');

    loginBotao(username: String, password: String){
        if(this.loginButton){
            this.loginButton.addEventListener('click', async () => {
            await criarRequestToken();
            await logar();
            await criarSessao();
            })
        }
    }

    botaoprocura(botaoprocura:'click'){
        if(this.searchButton){
            let listaDeFilmes:any;
            let searchContainer: any;
            this.searchButton.addEventListener('click', async () => {
            let lista = document.getElementById("lista");
            if (lista) {
                lista.outerHTML = "";
            }
            let query = document.getElementById('search');
            listaDeFilmes = await procurarFilme(query);
            let ul = document.createElement('ul');
            ul.id = "lista"
            for (const item of listaDeFilmes.results) {
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(item.original_title))
                ul.appendChild(li)
            }
            console.log(listaDeFilmes);
            searchContainer.appendChild(ul);
            })
        }
        
    }

    preencherSenha() {
    const password = document.getElementById('senha');
    this.validateLoginButton();
    }

    preencherLogin() {
    const username =  document.getElementById('login');
    this.validateLoginButton();
    }

    preencherApi() {
    const apiKey = document.getElementById('api-key');
    this.validateLoginButton();
    }

    validateLoginButton() {
    if (this.password && this.username && this.apiKey) {
        this.loginButton
    } else {
        this.loginButton
        }
    }

}
class HttpClient {
  static async get({url = " " , method = " " , body = null}) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(this: any, query: string|HTMLElement|any) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

async function adicionarFilme(this: any, filmeId: any) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${this.apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}

async function criarRequestToken (this: any) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`,
    method: "GET"
  })
  const requestToken = this.result.request_token
}

async function logar(this: any) {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${this.apiKey}`,
    method: "POST",
    body: {
      username: `${this.username}`,
      password: `${this.password}`,
      request_token: `${this.requestToken}`
    }
  })
}

async function criarSessao(this: any) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${this.apiKey}&request_token=${this.requestToken}`,
    method: "GET"
  })
  const sessionId = this.result.session_id;
}

async function criarLista(this: any, nomeDaLista: any, descricao: any) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${this.apiKey}&session_id=${this.sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(this: any, filmeId: any, listaId: any) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${this.apiKey}&session_id=${this.sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista(this: any) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${this.listId}?api_key=${this.apiKey}`,
    method: "GET"
  })
  console.log(result);
}