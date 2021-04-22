/*$(document).on('keypress', enter => {
    if (enter.which == 13) {
        buscarPokemon();
    }
});
$('#buscar_pokemon').click(enter => {
    buscarPokemon();
});
*/
$(document).ready(function(){
    $( '#buscar_pokemon' ).on( 'click', function(){
        $('#infopokemon').buscarPokemon();
    });
});
//funcion buscar pokemon
jQuery.fn.buscarPokemon = function(){
    var element = this;
        let busqueda = $("#buscador").val(); // captura lo que busca el input
        if(busqueda !== null && busqueda !== undefined && busqueda !==0 && busqueda<=898){
        //importar api en ajax
        $.ajax({
            type:'GET',
            url: `https://pokeapi.co/api/v2/pokemon/${busqueda}`, //enlace de api enlazado a input numerico
            dataType: "json",
            success: verpoke => { //Resultado positivo arroja información de pokémon
                let pokemon = {
                    nombre: verpoke.name,
                    id: verpoke.id,
                    peso: verpoke.weight,
                    ataque: verpoke.stats[1].base_stat,
                    defensa: verpoke.stats[2].base_stat,
                    hp: verpoke.stats[0].base_stat,
                    velocidad: verpoke.stats[5].base_stat,
                    ataqueEspecial: verpoke.stats[3].base_stat,
                    defensaEspecial: verpoke.stats[4].base_stat,
                    imgFront: verpoke.sprites.front_default,
                    imgBack: verpoke.sprites.back_default
                };
                $("#infopokemon").empty(); // se deja vacio contenedor de informacion

                //Se agrega codigo html de grafico tras busqueda de pokémon
                $('#infopokemon').prepend(`
            
            <div class="row">
            <h2 class="nombre col-md-12 py-5 centrado">${pokemon.nombre.toUpperCase()} #${pokemon.id}</h2>
                <div class="centrado col-md-4">
                    <div class="info-pokemon">
                        <div class="i-pokemon-img">
                            <img class="imgpokemon" src=${pokemon.imgFront} alt="" />
                            <img class="imgpokemon" src=${pokemon.imgBack} alt="" />
                        </div>
                        
                        <p>Peso: ${pokemon.peso / 10}Kg</p>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="estadisticas">
                        <h3>Estadísticas</h3>
                        <p class="ataque">Ataque: ${pokemon.ataque}</p>
                        <p class="defensa">Defensa: ${pokemon.defensa}</p>
                        <p class="hp">HP: ${pokemon.hp}</p>
                        <p class="velocidad">Velocidad: ${pokemon.velocidad}</p>
                        <p class="ataqueespecial">Ataque Especial: ${pokemon.ataqueEspecial}</p>
                        <p class="defensaespecial">Defensa Especial: ${pokemon.defensaEspecial}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div>
                    <div id="chartContainer" style="height: 320px; width: 100%;"></div>
                    </div>
                </div>
                </div><hr><br>`);
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    data: [{
                        type: "column",
                        indexLabelFontSize: 8,
                        indexLabel: "{label}: {y}",
                        toolTipContent: "<b>{label}:</b> {y}",
                        dataPoints: [
                            { y: pokemon.ataque, label: "Ataque" },
                            { y: pokemon.defensa, label: "Defensa" },
                            { y: pokemon.hp, label: "HP" },
                            { y: pokemon.velocidad, label: "Velocidad" },
                            { y: pokemon.ataqueEspecial, label: "Ataque Especial" },
                            { y: pokemon.defensaEspecial, label: "Defensa Especial" }
                        ]
                    }]
                });
                chart.render();
                busqueda = $('#buscador').val("");

            }
        });
    }else{
        alert("Ingrese un pokémon del 1 al 898");
    }
};
