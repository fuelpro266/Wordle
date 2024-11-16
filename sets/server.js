import mysql from 'mysql';

// Variáveis e Arrays
let vetor = new Array(5).fill("");
let posi = new Array(5).fill("");
let cache_palavras = [
  "AREIA", "AMIGO", "ANTES", "ARCOS", "AUTOS", "AVISO", "BAIXO", "BANHO", "BARCO", "BANCO", "BOLSA", "BRAVO", "BREVE", "BUSTO", "CAMPO", "CANAL", "CANTO", "CEDRO", "CHAVE", "CICLO", "CIRCO", "CLARO", "CORPO", "COURO", "CURVA", "DADOS", "DEDOS", "DEUSA", "DICAS", "DOIDO", "DUPLO", "ECOAR", "EDITO", "ETICO", "FALAR", "FATOR", "FILHO", "FIRME", "FLUIR", "FOLHA", "FOSCO", "GANSO", "GARFO", "GEADA", "GLOBO", "GRADE", "GRUPO", "GUETO", "HOTEL", "IDADE", "IGUAL", "IMPOR", "INDIO", "IRADO", "JOGAR", "LAGOA", "LEGAL", "LIMPO", "LONGE", "LUGAR", "MANSO", "MEIAS", "MOLAR", "MORTE", "NATAL", "NAVIO", "NOBRE", "NOVOS", "ODIAR", "OLHOS", "OUVIR", "PADRE", "PAGAR", "PALHA", "PARTO", "PAVOR", "PEDRA", "PINHO", "POBRE", "PONTO", "PRAIA", "PRECO", "PRIMO", "PULAR", "QUASE", "QUILO", "RAIOS", "RESTO", "REZAR", "RISCO", "ROUBO", "SALTO", "SANTO", "SECAR", "SELOS", "SENSO", "SEXTO", "SOMAR", "SONHO", "SORTE", "SUBIR", "TEMPO", "TENIS", "TERRA", "TIGRE", "TOQUE", "TRAJE", "TREVO", "TRONO", "TURMA", "URINA", "VAZIO", "VERBO", "VENTO", "VERDE", "VILAO", "VIVER", "VOCAL", "VOTOS", "ZELAR", "ZORRO"
];
let numeColuna = 5;
let numeLinha = 6;
let last_id;
let palavra;
let palavra_anterior;
let palavra_sorteada;
let div_nova_2;
let id_contagem = 0;
let GameOver = false;
let linhas_contagem = 1;

// Conexão com o Banco de Dados
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'apkprog',
  database: 'apkprog'
});

// Função para definir e armazenar a palavra sorteada no banco de dados
function DefinirPalavra() {
  const min = 0; // Alterado para incluir o índice 0
  const max = cache_palavras.length; // Utiliza o comprimento total do array
  let numero_sorteado = Math.floor(Math.random() * (max - min) + min);

  if (numero_sorteado === palavra_anterior) {
    numero_sorteado = Math.floor(Math.random() * (max - min) + min);
  }

  palavra_anterior = numero_sorteado;
  palavra_sorteada = cache_palavras[numero_sorteado];

  // Insere a palavra sorteada no banco de dados
  const query = 'INSERT INTO palavras_sorteadas (palavra) VALUES (?)';
  con.query(query, [palavra_sorteada], (err, result) => {
    if (err) {
      console.error('Erro ao inserir a palavra sorteada:', err);
      return;
    }
    console.log('Palavra sorteada inserida com sucesso no banco de dados:', palavra_sorteada);
  });
}

// Chama a função para definir e armazenar a palavra sorteada
DefinirPalavra();

// Código para criar a interface e manipular os eventos
const container = document.getElementById("scorecard");
container.className = 'container';
const key_imagem = [
  { label: 'Backspace', image: 'backspace.png' },
  { label: 'Enter', image: 'enter.png' }
];
const keys_1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const keys_2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keys_3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

for (let i = 0; i < numeColuna; i++) {
  const coluna = document.createElement("div");
  for (let j = 0; j < numeLinha; j++) {
    const linha = document.createElement("div");
    linha.className = 'box_titles';
    linha.setAttribute("id", `coluna${i + 1}-linha${j + 1}`);
    linha.addEventListener("click", function () {
      TitleId();
    });
    coluna.appendChild(linha);
  }
  container.appendChild(coluna);
}

document.addEventListener('keydown', (tecla) => {
  let key = tecla.key.toUpperCase();
  if (keys_1.includes(key) || keys_2.includes(key) || keys_3.includes(key)) {
    const elemento = document.getElementById(last_id);
    if (elemento.textContent === "") {
      IdEspecific2(key, last_id, 1);
      IdEspecific(last_id, 1);
    } else {
      IdEspecific2(key, last_id, 2);
      IdEspecific(last_id, 1);
    }
  } else if (tecla.key == 'Backspace') {
    const elemento = document.getElementById(last_id);
    elemento.textContent = "";
    IdEspecific(last_id, 2);
  } else if (tecla.key == 'Enter') {
    PalavraFuncao();
  }
});

const keyboard = document.getElementById("keyboard");
keyboard.className = 'keyboard';

keys_1.forEach(key => {
  const row = document.createElement("div");
  row.className = 'box_1';
  row.textContent = key;
  keyboard.appendChild(row);
  row.addEventListener("click", function () {
    let keys = key.toUpperCase();
    const elemento = document.getElementById(last_id);
    if (elemento.textContent === "") {
      IdEspecific2(keys, last_id, 1);
      IdEspecific(last_id, 1);
    } else {
      IdEspecific2(keys, last_id, 2);
      IdEspecific(last_id, 1);
    }
  });
});

const keyboard_2 = document.getElementById("keyboard_2");
keyboard_2.className = 'keyboard';

keys_2.forEach(key => {
  const row_2 = document.createElement("div");
  row_2.className = 'box';
  row_2.textContent = key;
  keyboard_2.appendChild(row_2);
  row_2.addEventListener("click", function () {
    let keys = key.toUpperCase();
    const elemento = document.getElementById(last_id);
    if (elemento.textContent === "") {
      IdEspecific2(keys, last_id, 1);
      IdEspecific(last_id, 1);
    } else {
      IdEspecific2(keys, last_id, 2);
      IdEspecific(last_id, 1);
    }
  });
});

const keyboard_3 = document.getElementById("keyboard_3");
keyboard_3.className = 'keyboard';

keys_3.forEach(key => {
  const row_3 = document.createElement("div");
  row_3.className = 'box';
  row_3.textContent = key;
  keyboard_3.appendChild(row_3);
  row_3.addEventListener("click", function () {
    let keys = key.toUpperCase();
    const elemento = document.getElementById(last_id);
    if (elemento.textContent === "") {
      IdEspecific2(keys, last_id, 1);
      IdEspecific(last_id, 1);
    } else {
      IdEspecific2(keys, last_id, 2);
      IdEspecific(last_id, 1);
    }
  });
});

const keyboard_Enter = document.getElementById("keyboard_3");
keyboard_Enter.className = 'keyboard';

const row_enter = document.createElement("div");
row_enter.className = 'Enter';
row_enter.textContent = "ENTER";
keyboard_Enter.appendChild(row_enter);
row_enter.addEventListener("click", function () {
  PalavraFuncao();
});

var imagem = document.createElement("img");
imagem.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjI1NSIgdmlld0JveD0iMCAwIDI5MCAyNTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOS44OTE0IDEyNy4yNTFMMTAzLjA2OCA0MEgyNzVWMjE2SDEwMy4xM0wxOS44OTE0IDEyNy4yNTFaIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGxpbmUgeDE9IjEzIiB5MT0iLTEzIiB4Mj0iMTMwLjk0NyIgeTI9Ii0xMyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxMDcgMC43MDcxMDcgLTAuNzY1MzY3IDAuNjQzNTk0IDExNSA4NikiIHN0cm9rZT0iI0ZBRkFGRiIgc3Ryb2tlLXdpZHRoPSIyNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxsaW5lIHgxPSIxMyIgeTE9Ii0xMyIgeDI9IjEzMC45NDciIHkyPSItMTMiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IC0wLjcwNzEwNyAwLjc2NTM2NyAwLjY0MzU5NCAxMzMuNDY1IDE4Ny43ODYpIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K";
imagem.className = "imagem_delete";
const keyboard_delete = document.getElementById("keyboard_2");
keyboard_delete.className = 'keyboard';
const crashRide = document.getElementById("delete_img");
const row_delete = document.createElement("div");
row_delete.className = 'delete_img';
row_delete.appendChild(imagem);
keyboard_delete.appendChild(row_delete);
row_delete.addEventListener("click", function () {
  const elemento = document.getElementById(last_id);
  elemento.textContent = "";
  IdEspecific(last_id, 3);
});

TitleId();

function EsvaziarLixeira() {
  vetor.fill("");
  posi.fill("");
}

function VerificacaoLetras() {
  let conta = 0;
  vetor.forEach((key) => {
    if (key !== "" && palavra_sorteada.includes(key)) {
      posi[conta] = key;
    } else {
      posi[conta] = "";
    }
    conta++;
  });

  IdEspecific(last_id, 4);
  EsvaziarLixeira();
}

function TitleId(numero) {
  if (!GameOver) {
    if (numero == 1) {
      const tempo = "coluna" + 1 + "-linha" + linhas_contagem;
      IdEspecific(tempo, 0);
      VerificacaoLetras();
      for (let m = 1; m < 5; m++) {
        const bordas = document.getElementById(`coluna${m + 1}-linha${linhas_contagem}`);
        bordas.className = 'box_titles_2';
        bordas.addEventListener("click", function () {
          IdEspecific(this.id, 0);
          last_id = this.id;
        });
      }
    } else {
      for (let k = 0; k < 5; k++) {
        const bordas = document.getElementById(`coluna${k + 1}-linha${linhas_contagem}`);
        bordas.className = 'box_titles_2';
        bordas.addEventListener("click", function () {
          IdEspecific(this.id, 0);
          last_id = this.id;
        });
      }
    }
  }
}

function VerificarId() {
  return last_id;
}

function IdEspecific(id, numero) {
  if (!GameOver) {
    if (numero == 0) {
      last_id = id;
      const bordas_bottom = document.getElementById(id);
      bordas_bottom.className = 'box_titles_3';
    } else if (numero == 1) {
      for (let i = 0; i <= 5; i++) {
        if (id == 'coluna' + i + '-linha' + linhas_contagem) {
          if (id == "coluna5-linha" + linhas_contagem) {
            const bordas_bottom = document.getElementById("coluna" + i + "-linha" + linhas_contagem);
            bordas_bottom.className = 'box_titles_3';
          } else {
            const bordas_bottom = document.getElementById("coluna" + (i + 1) + "-linha" + linhas_contagem);
            bordas_bottom.className = 'box_titles_3';
            const bordas_bottom_2 = document.getElementById("coluna" + i + "-linha" + linhas_contagem);
            bordas_bottom_2.className = 'box_titles_2';
            last_id = "coluna" + (i + 1) + "-linha" + linhas_contagem;
          }
        }
      }
    } else if (numero == 4) {
      for (let k = 0; k < 5; k++) {
        if (posi[k] === palavra_sorteada[k]) {
          const alterar = document.getElementById(`coluna${k + 1}-linha${linhas_contagem - 1}`);
          alterar.className = 'box_titles_4';
          posi[k] = "";
        } else {
          for (let m = 0; m < 5; m++) {
            if (posi[m] != "") {
              const alterar_2 = document.getElementById(`coluna${m + 1}-linha${linhas_contagem - 1}`);
              alterar_2.className = 'box_titles_5';
            }
          }
        }
      }
    } else {
      for (let i = 0; i <= 5; i++) {
        if (id == 'coluna' + i + '-linha' + linhas_contagem) {
          if (vetor[i] == "" || vetor[i] == null) {
            const bordas_bottom = document.getElementById("coluna" + (i - 1) + "-linha" + linhas_contagem);
            bordas_bottom.className = 'box_titles_3';
            const bordas_bottom_2 = document.getElementById("coluna" + i + "-linha" + linhas_contagem);
            bordas_bottom_2.className = 'box_titles_2';
            last_id = "coluna" + (i - 1) + "-linha" + linhas_contagem;
          } else {
            const elemento = document.getElementById(last_id);
            elemento.textContent = "";
            const bordas_bottom = document.getElementById("coluna" + i + "-linha" + linhas_contagem);
            bordas_bottom.className = 'box_titles_3';
            let col = parseInt(last_id.split('linha')[0].split('coluna')[1]);
            vetor[col] = "";
            id_contagem--;
          }
        }
      }
    }
  }
}

function IdEspecific2(letra, ids, numeros) {
  if (!GameOver) {
    if (numeros == 1) {
      for (let i = 0; i <= 5; i++) {
        if (last_id == 'coluna' + i + '-linha' + linhas_contagem) {
          const elemento = document.getElementById(last_id);
          if (!elemento) return;
          elemento.className = 'title-designi';
          const div_nova = document.createElement("div");
          div_nova.id = "div_nova" + id_contagem;
          id_contagem++;
          div_nova.className = 'title-designi_div';
          div_nova.innerHTML = letra;
          elemento.appendChild(div_nova);
          vetor[i - 1] = letra;
        }
      }
    } else {
      for (let i = 0; i < 5; i++) {
        let last_id_fun = VerificarId();
        if (last_id_fun == 'coluna' + i + '-linha' + linhas_contagem) {
          switch (linhas_contagem) {
            case 1:
              div_nova_2 = document.getElementById(`div_nova${(i - 1)}`);
              break;
            case 2:
              div_nova_2 = document.getElementById(`div_nova${((i + 4))}`);
              break;
            case 3:
              div_nova_2 = document.getElementById(`div_nova${(i + 9)}`);
              break;
            case 4:
              div_nova_2 = document.getElementById(`div_nova${(i + 14)}`);
              break;
            case 5:
              div_nova_2 = document.getElementById(`div_nova${(i + 19)}`);
              break;
            case 6:
              div_nova_2 = document.getElementById(`div_nova${(i + 24)}`);
              break;
          }

          if (!div_nova_2) return;
          div_nova_2.textContent = "";
          div_nova_2.textContent = letra;
          vetor[i - 1] = letra;
        }
      }
    }
  }
}

function PalavraFuncao() {
  palavra = vetor.filter(v => v !== undefined).join('');
  let contagem = palavra.length;
  VerificarSorteada(palavra, contagem);
}

function VerificarSorteada(palavra, contagem) {
  if (contagem == 5) {
    if (palavra == palavra_sorteada) {
      alert("acertou");
      const ajuste = document.getElementById(last_id);
      ajuste.className = 'box_titles_2';
      linhas_contagem++;
      TitleId(1);
      GameOver = true;
    } else {
      alert("errou");
      const ajuste = document.getElementById(last_id);
      ajuste.className = 'box_titles_2';
      linhas_contagem++;
      TitleId(1);
    }
  } else {
    alert("palavra inexistente");
  }
}