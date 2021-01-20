var urlSenado = 'https://api.propublica.org/congress/v1/113/senate/members.json'
var urlHouse = 'https://api.propublica.org/congress/v1/113/house/members.json'

var initUno = {
    method: 'GET',
    headers: new Headers({ "X-API-Key" : "60kWuPbuIh4ZzR4popW7WN81llwUmDGGNUZN5dCK" })
};

// Paginas Started | Senate | House |

fetch(urlSenado, initUno).then(function(respSenado){
    return respSenado.json()
}).then(tablaSenado)

function tablaSenado(senateUrl) {
    console.log(senateUrl);
    
    var estado = senateUrl.status;
    var resultSenado = senateUrl.results[0];
    var membSenado = resultSenado.members;


    if (estado == "OK"){
        if (resultSenado){
            for(var i=0; i < membSenado.length; i++){
                var nameCompleto = membSenado[i].first_name + ' ' + membSenado[i].last_name;
                var ancore = $('<a>').addClass('text-info text-center p-2 ');
                ancore.attr('href', membSenado[i].url).text(nameCompleto);

                var membParty = membSenado[i].party;
                var membState = membSenado[i].state;
                var membSenior = membSenado[i].seniority;
                var membPct = membSenado[i].votes_with_party_pct + membSenado[i].votes_against_party_pct;
                var pctDecimal = membPct.toFixed(1);

                function filaUno(nombre, partido, estado, antiguedad, pctVotos) {
                    var tablaSenado = $('#tbSenado');
                
                        var trUno = $('<tr>');
                            var tdNombre = $('<td>');
                            var tdPartido = $('<td>').addClass('text-center p-2');
                            var tdEstado = $('<td>').addClass('text-center p-2');
                            var tdAntiguedad = $('<td>').addClass('text-center p-2');
                            var tdPctVotos = $('<td>').addClass('text-center p-2');
                
                            ancore.text(nombre);
                            tdPartido.text(partido);
                            tdEstado.text(estado);
                            tdAntiguedad.text(antiguedad);
                            tdPctVotos.text(membSenado[i].votes_with_party_pct + '% + ' + membSenado[i].votes_against_party_pct + '% (' + pctVotos + '%)');
                    
                    tablaSenado.append(trUno);
                    
                    trUno.append(tdNombre);
                        tdNombre.append(ancore);
                    trUno.append(tdPartido);
                    trUno.append(tdEstado);
                    trUno.append(tdAntiguedad);
                    trUno.append(tdPctVotos);
                
                }

                filaUno(nameCompleto, membParty, membState, membSenior, pctDecimal);
            }
        }
    }

}

fetch(urlHouse, initUno).then(function(respHouse){
    return respHouse.json()
}).then(tablaHouse)

function tablaHouse(houseUrl) {
    console.log(houseUrl);
    
    var estado = houseUrl.status;
    var resultHouse = houseUrl.results[0];
    var membHouse = resultHouse.members;


    if (estado == "OK"){
        if (resultHouse){
            for(var i=0; i < membHouse.length; i++){
                var nameCompletoDos = membHouse[i].first_name + ' ' + membHouse[i].last_name;
                var ancore = $('<a>').addClass('text-info text-center p-2 ');
                ancore.attr('href', membHouse[i].url).text(nameCompletoDos);

                var membPartyDos = membHouse[i].party;
                var membStateDos = membHouse[i].state;
                var membSeniorDos = membHouse[i].seniority;
                var membPctDos = membHouse[i].votes_with_party_pct + membHouse[i].votes_against_party_pct;
                var pctDecimalDos = membPctDos.toFixed(1);

                function filaUnoH(nombre, partido, estado, antiguedad, pctVotos) {
                    var tablaHouse = $('#tbHouse');
                
                        var trUno = $('<tr>');
                            var tdNombre = $('<td>');
                            var tdPartido = $('<td>').addClass('text-center p-2');
                            var tdEstado = $('<td>').addClass('text-center p-2');
                            var tdAntiguedad = $('<td>').addClass('text-center p-2');
                            var tdPctVotos = $('<td>').addClass('text-center p-2');
                
                            ancore.text(nombre);
                            tdPartido.text(partido);
                            tdEstado.text(estado);
                            tdAntiguedad.text(antiguedad);
                            tdPctVotos.text(membHouse[i].votes_with_party_pct + '% + ' + membHouse[i].votes_against_party_pct + '% (' + pctVotos + '%)');
                    
                    tablaHouse.append(trUno);
                    
                    trUno.append(tdNombre);
                        tdNombre.append(ancore);
                    trUno.append(tdPartido);
                    trUno.append(tdEstado);
                    trUno.append(tdAntiguedad);
                    trUno.append(tdPctVotos);
                
                }

                filaUnoH(nameCompletoDos, membPartyDos, membStateDos, membSeniorDos, pctDecimalDos);
            }
        }
    }
}

// Paginas Attendace | Senate | House |

fetch(urlSenado, initUno).then(function(respAtS){
    return respAtS.json()
}).then(tablaPartidos)

function tablaPartidos(senateUrl) {
  var estado = senateUrl.status;
  var resultSenado = senateUrl.results[0];
  var membSenado = resultSenado.members;
  
  if(estado == 'OK'){
    console.log('Estado de los datos');
    console.log('>> '+ estado);

    if(resultSenado){
    var contRep = 0;
    var contDem = 0;
    var contInd = 0;
    
    var vtMembRep = 0;
    var vtMembDem = 0;
    var vtMembInd = 0;
    
    var totalVotos = 0;

    for (i = 0; i < membSenado.length; i++) {

        if (membSenado[i].party == 'R') {
            contRep++;
            vtMembRep = vtMembRep + membSenado[i].total_votes;
        } else if (membSenado[i].party == 'D') {
            contDem++;
            vtMembDem = vtMembDem + membSenado[i].total_votes;
        } else {
            contInd++;
            vtMembInd = vtMembInd + membSenado[i].total_votes;
        }
        
        totalVotos = totalVotos + membSenado[i].total_votes;
      }

      console.log('Miembros por partido');
      console.log('R: '+ contRep +'|D: '+ contDem +'|I: '+ contInd);
      console.log('Votos por partido');
      console.log('|R: '+ vtMembRep +'|');
      console.log('|D: '+ vtMembDem +'|');
      console.log('|I: '+ vtMembInd +'|');
    
      var pctVtRep = ((vtMembRep * 100) / totalVotos).toFixed(2);
      var pctVtDem = ((vtMembDem * 100) / totalVotos).toFixed(2);
      var pctVtInd = ((vtMembInd * 100) / totalVotos).toFixed(2);

      console.log('Pct Votos partido');
      console.log('|R:'+ pctVtRep);
      console.log('|D:'+ pctVtDem);
      console.log('|I:'+ pctVtInd);

      $('#tdMemRep').text(contRep).addClass('text-center');
      $('#tdVotRep').text(pctVtRep + '%').addClass('text-center');
      $('#tdMemDem').text(contDem).addClass('text-center');
      $('#tdVotDem').text(pctVtDem + '%').addClass('text-center');
      $('#tdMemInd').text(contInd).addClass('text-center');
      $('#tdVotInd').text(pctVtInd + '%').addClass('text-center');


      //  Datos tablas 10%

      function ascendente(a, b){
        return a.missed_votes - b.missed_votes;
      }
      function descendente(a, b){
        return b.missed_votes - a.missed_votes;
      }
    
      var rango10 = ((membSenado.length * 10) / 100);

      var arrMasC = membSenado.sort(ascendente).slice(0, rango10);
      console.log('mas comprometidos = ' + arrMasC.length);

      var arrMenosC = membSenado.sort(descendente).slice(0, rango10);
      console.log('menos comprometidos = ' + arrMenosC.length);

    //   Mas comprometidos

      var tbMasComp = $('#tbMasComp');

      for ( i = 0; i < arrMasC.length; i++) {
        var nameMas = arrMasC[i].first_name + " " + arrMasC[i].last_name;
        var ancore = $('<a>');
        ancore.attr('href', arrMasC[i].url).text(nameMas);

        
        var tRowMas = $('<tr>');

        var tdNombreMas = $('<td>');
        tdNombreMas.append(ancore);
        ancore.addClass('text-info');

        var tdVotosMas = $('<td>');
        tdVotosMas.text(arrMasC[i].missed_votes).addClass('text-center');

        var tdPctMas = $('<td>');
        tdPctMas.text(arrMasC[i].missed_votes_pct + '%').addClass('text-center');

        tRowMas.append(tdNombreMas);
        tRowMas.append(tdVotosMas);
        tRowMas.append(tdPctMas);

        $('#tdUnoMas').remove();
        $('#tdDosMas').remove();
        $('#tdTresMas').remove();

        tbMasComp.append(tRowMas);
      }
    
      $('#ttMas1').text('Nombre');
      $('#ttMas2').text('Votos Perdidos').addClass('text-center');
      $('#ttMas3').text('% Perdida').addClass('text-center');

    //   Menos comprometidos

      var tbMenosComp = $('#tbMenosComp');

      for ( i = 0; i < arrMenosC.length; i++) {
        var nameMenos = arrMenosC[i].first_name + " " + arrMenosC[i].last_name;
        var ancore = $('<a>');
        ancore.attr('href', arrMenosC[i].url).text(nameMenos);

        
        var tRowMenos = $('<tr>');

        var tdNombreMenos = $('<td>');
        tdNombreMenos.append(ancore);
        ancore.addClass('text-info');

        var tdVotosMenos = $('<td>');
        tdVotosMenos.text(arrMenosC[i].missed_votes).addClass('text-center');

        var tdPctMenos = $('<td>');
        tdPctMenos.text(arrMenosC[i].missed_votes_pct + '%').addClass('text-center');

        tRowMenos.append(tdNombreMenos);
        tRowMenos.append(tdVotosMenos);
        tRowMenos.append(tdPctMenos);

        $('#tdUnoMenos').remove();
        $('#tdDosMenos').remove();
        $('#tdTresMenos').remove();

        tbMenosComp.append(tRowMenos);
      }
    
      $('#ttMenos1').text('Nombre');
      $('#ttMenos2').text('Votos Perdidos').addClass('text-center');
      $('#ttMenos3').text('% Perdida').addClass('text-center');
    }
  }
}

