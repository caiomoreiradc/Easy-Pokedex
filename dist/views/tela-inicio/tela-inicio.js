import { PokemonService } from '../../services/poker.service';
import './tela-inicio.css';
var TelaInicio = /** @class */ (function () {
    function TelaInicio() {
        this.pokemonService = new PokemonService();
        this.registrarElementos();
        this.registrarEventos();
    }
    TelaInicio.prototype.registrarElementos = function () {
        this.formPrincipal = document.getElementById("formPrincipal");
        this.txtPesquisa = document.getElementById("txtPesquisa");
        this.btnLimpar = document.getElementById("btnLimpar");
        this.pnlConteudo = document.getElementById("pnlConteudo");
    };
    TelaInicio.prototype.registrarEventos = function () {
        var _this = this;
        this.formPrincipal
            .addEventListener("submit", function (e) { return _this.buscar(e); });
        this.btnLimpar
            .addEventListener('click', function () { return _this.limparCard(); });
    };
    TelaInicio.prototype.buscar = function (sender) {
        sender.preventDefault();
        var nome = this.txtPesquisa.value;
        this.pesquisarPokemonPorNome(nome);
    };
    TelaInicio.prototype.pesquisarPokemonPorNome = function (nome) {
        var _this = this;
        this.pokemonService.selecionarPokemonPorNome(nome)
            .then(function (poke) { return _this.gerarCard(poke); })
            .catch(function (err) { return console.log('Pokémon não encontrado!', err); });
    };
    TelaInicio.prototype.limparCard = function () {
        var _a;
        (_a = this.pnlConteudo.querySelector('.card-pokemon')) === null || _a === void 0 ? void 0 : _a.remove();
    };
    TelaInicio.prototype.gerarCard = function (pokemon) {
        var lblid = document.createElement("p");
        var lblNome = document.createElement("p");
        var imgSprite = document.createElement("img");
        lblid.textContent = pokemon.id.toString();
        lblNome.textContent = pokemon.nome;
        imgSprite.src = pokemon.spriteUrl;
        var pnlPokemon = document.createElement('div');
        pnlPokemon.classList.add('card-pokemon');
        pnlPokemon.appendChild(lblid);
        pnlPokemon.appendChild(lblNome);
        pnlPokemon.appendChild(imgSprite);
        this.pnlConteudo.appendChild(pnlPokemon);
    };
    return TelaInicio;
}());
window.addEventListener('load', function () { return new TelaInicio(); });
