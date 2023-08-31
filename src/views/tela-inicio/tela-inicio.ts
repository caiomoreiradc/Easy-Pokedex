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

    pesquisarPokemonPorNome(nome: string){
        this.pokemonService.selecionarPokemonPorNome(nome)
            .then(poke => this.gerarCard(poke))
            .catch(err => console.log('Pokémon não encontrado!', err));
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
}

window.addEventListener('load', () => new TelaInicio());