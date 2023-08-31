var PokemonService = /** @class */ (function () {
    function PokemonService() {
    }
    PokemonService.prototype.selecionarPokemonPorNome = function (nome) {
        var _this = this;
        var url = "https://pokeapi.co/api/v2/pokemon/".concat(nome);
        return fetch(url)
            .then(function (res) { return res.json(); })
            .then(function (obj) { return _this.mapearPokemon(obj); });
    };
    PokemonService.prototype.mapearPokemon = function (obj) {
        return {
            id: obj.id,
            nome: obj.name,
            spriteUrl: obj.sprites.front_default
        };
    };
    return PokemonService;
}());
export { PokemonService };
