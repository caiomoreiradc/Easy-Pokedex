import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/poker.service';
import './tela-inicio.css';

class TelaInicio{
    formPrincipal: HTMLFormElement;
    txtPesquisa: HTMLInputElement;
    btnLimpar: HTMLButtonElement;

    pnlConteudo: HTMLDivElement

    private pokemonService: PokemonService;

    constructor(){
        this.pokemonService = new PokemonService();
        this.registrarElementos();
        this.registrarEventos();

        this.pokemonService.selecionarPokemons()
            .then(pokemons => this.gerarGridPokemons(pokemons));
    }

    registrarElementos(): void {
        this.formPrincipal = document.getElementById("formPrincipal") as HTMLFormElement;
        this.txtPesquisa = document.getElementById("txtPesquisa") as HTMLInputElement;
        this.btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
        this.pnlConteudo = document.getElementById("pnlConteudo") as HTMLDivElement;
    }

    registrarEventos(): void {
        this.formPrincipal
            .addEventListener("submit", (e) => this.buscar(e));

            this.btnLimpar
                .addEventListener('click', () => this.limparCard());
    }

    buscar(sender: Event): void {
        sender.preventDefault();

        const nome = this.txtPesquisa.value;

        this.pesquisarPokemonPorNome(nome);

    }

    private obterCard(pokemon: Pokemon): HTMLDivElement {
        const id = document.createElement("p");
        const imagem = document.createElement("img");
        const nomePokemon = document.createElement("p");
    
        id.textContent = pokemon.id.toString();
        nomePokemon.textContent = pokemon.nome;
        imagem.src = pokemon.spriteUrl
    
        const cardPokemon = document.createElement('div');
        cardPokemon.classList.add('card-pokemon');
    
        cardPokemon.appendChild(id);
        cardPokemon.appendChild(imagem);
        cardPokemon.appendChild(nomePokemon);
    
        return cardPokemon;
      }

    pesquisarPokemonPorNome(nome: string){
        this.pokemonService.selecionarPokemonPorNome(nome)
            .then(poke => this.gerarCard(poke))
            .catch((erro: Error) => this.exibirNotificacao(erro));
    }



    limparCard(): void {
        this.pnlConteudo.querySelector('.card-pokemon')
            ?.remove();
    }

    private gerarCard(pokemon: Pokemon): void{
        const lblid = document.createElement("p");
        const lblNome = document.createElement("p");
        const imgSprite = document.createElement("img");

        lblid.textContent = pokemon.id.toString();
        lblNome.textContent = pokemon.nome;
        imgSprite.src = pokemon.spriteUrl;

        const pnlPokemon = document.createElement('div');
        pnlPokemon.classList.add('card-pokemon');

        pnlPokemon.appendChild(lblid);
        pnlPokemon.appendChild(lblNome);
        pnlPokemon.appendChild(imgSprite);

        this.pnlConteudo.appendChild(pnlPokemon);
    }

    private exibirNotificacao(erro: Error): void {
        const divNotificacao = document.createElement('div');

        divNotificacao.textContent = erro.message;
        divNotificacao. classList.add('notificacao');

        divNotificacao
            .addEventListener('click', (sender) => {
                (sender.target as HTMLElement).remove()
            })
        document.body.appendChild(divNotificacao);

        setTimeout(() => {
            divNotificacao.remove();
        }, 3000)
    }

    private gerarGridPokemons(pokemons: Pokemon[]): any {
        const pnlGrid = document.createElement('div');
        pnlGrid.classList.add('grid-pokemon');

        for (let pokemon of pokemons){
            const card = this.obterCard(pokemon);

            pnlGrid.appendChild(card);
        }
        this.pnlConteudo.appendChild(pnlGrid);
    }

}

   

window.addEventListener('load', () => new TelaInicio());