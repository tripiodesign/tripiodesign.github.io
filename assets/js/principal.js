var urlSenado = 'https://api.propublica.org/congress/v1/113/senate/members.json'
var urlHouse = 'https://api.propublica.org/congress/v1/113/house/members.json'

var initUno = {
    method: 'GET',
    headers: new Headers({ "X-API-Key" : "60kWuPbuIh4ZzR4popW7WN81llwUmDGGNUZN5dCK" })
};

// Paginas Started | Senate | House |

// Tablas Senado
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

// Tabla House
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

// Tabla Asistencia Senado
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
}

    function tablaCompromisoS(partyMembers) {
        
        //  Datos tablas 10%
      function ascendente(a, b){
        return a.missed_votes - b.missed_votes;
      }
      function descendente(a, b){
        return b.missed_votes - a.missed_votes;
      }
    
      var rango10 = ((partyMembers.length * 10) / 100);

      var arrMasC = partyMembers.sort(ascendente).slice(0, rango10);
      console.log('mas comprometidos = ' + arrMasC.length);

      var arrMenosC = partyMembers.sort(descendente).slice(0, rango10);
      console.log('menos comprometidos = ' + arrMenosC.length);

      
            function compromisoS(arrMas, arrMenos) {
              // Mas comprometidos
              var tbMasComp = $('#tbMasComp');

                for ( i = 0; i < arrMas.length; i++) {
                var nameMas = arrMas[i].first_name + " " + arrMas[i].last_name;
                var ancore = $('<a>');
                ancore.attr('href', arrMas[i].url).text(nameMas);
        
                
                var tRowMas = $('<tr>');
        
                var tdNombreMas = $('<td>');
                tdNombreMas.append(ancore);
                ancore.addClass('text-info');
        
                var tdVotosMas = $('<td>');
                tdVotosMas.text(arrMas[i].missed_votes).addClass('text-center');
        
                var tdPctMas = $('<td>');
                tdPctMas.text(arrMas[i].missed_votes_pct + '%').addClass('text-center');
        
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
        
               // Menos comprometidos
        
                var tbMenosComp = $('#tbMenosComp');
        
                for ( i = 0; i < arrMenos.length; i++) {
                var nameMenos = arrMenos[i].first_name + " " + arrMenos[i].last_name;
                var ancore = $('<a>');
                ancore.attr('href', arrMenos[i].url).text(nameMenos);
        
                
                var tRowMenos = $('<tr>');
        
                var tdNombreMenos = $('<td>');
                tdNombreMenos.append(ancore);
                ancore.addClass('text-info');
        
                var tdVotosMenos = $('<td>');
                tdVotosMenos.text(arrMenos[i].missed_votes).addClass('text-center');
        
                var tdPctMenos = $('<td>');
                tdPctMenos.text(arrMenos[i].missed_votes_pct + '%').addClass('text-center');
        
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
            
            compromisoS(arrMasC, arrMenosC);
            // Compromiso House

            function compromisoH(arrMas, arrMenos) {

              // Mas comprometidos
              var tbMasComp = $('#tbMasCompH');

                for ( i = 0; i < arrMas.length; i++) {
                var nameMas = arrMas[i].first_name + " " + arrMas[i].last_name;
                var ancore = $('<a>');
                ancore.attr('href', arrMas[i].url).text(nameMas);
        
                
                var tRowMas = $('<tr>');
        
                var tdNombreMas = $('<td>');
                tdNombreMas.append(ancore);
                ancore.addClass('text-info');
        
                var tdVotosMas = $('<td>');
                tdVotosMas.text(arrMas[i].missed_votes).addClass('text-center');
        
                var tdPctMas = $('<td>');
                tdPctMas.text(arrMas[i].missed_votes_pct + '%').addClass('text-center');
        
                tRowMas.append(tdNombreMas);
                tRowMas.append(tdVotosMas);
                tRowMas.append(tdPctMas);
        
                $('#tdUnoMasH').remove();
                $('#tdDosMasH').remove();
                $('#tdTresMasH').remove();
        
                tbMasComp.append(tRowMas);
                }
            
                $('#ttMasH1').text('Nombre');
                $('#ttMasH2').text('Votos Perdidos').addClass('text-center');
                $('#ttMasH3').text('% Perdida').addClass('text-center');
        
               // Menos comprometidos
        
                var tbMenosComp = $('#tbMenosCompH');
        
                for ( i = 0; i < arrMenos.length; i++) {
                var nameMenos = arrMenos[i].first_name + " " + arrMenos[i].last_name;
                var ancore = $('<a>');
                ancore.attr('href', arrMenos[i].url).text(nameMenos);
        
                
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
        
                $('#tdUnoMenosH').remove();
                $('#tdDosMenosH').remove();
                $('#tdTresMenosH').remove();
        
                tbMenosComp.append(tRowMenos);
                }
            
                $('#ttMenosH1').text('Nombre');
                $('#ttMenosH2').text('Votos Perdidos').addClass('text-center');
                $('#ttMenosH3').text('% Perdida').addClass('text-center');
            }

            compromisoH(arrMasC, arrMenosC); 

    }
     
    tablaCompromisoS(membSenado);



  }



}

// Tabla Asistencia House
fetch(urlHouse, initUno).then(function(respAtH){
    return respAtH.json()
}).then(tablaPartidosH)

function tablaPartidosH(houseUrl) {
  var estado = houseUrl.status;
  var resultHouse = houseUrl.results[0];
  var membHouse = resultHouse.members;
  
  if(estado == 'OK'){
    console.log('Estado de los datos');
    console.log('>> '+ estado);

    if(resultHouse){
    var contRep = 0;
    var contDem = 0;
    var contInd = 0;
    
    var vtMembRep = 0;
    var vtMembDem = 0;
    var vtMembInd = 0;
    
    var totalVotos = 0;

    for (i = 0; i < membHouse.length; i++) {

        if (membHouse[i].party == 'R') {
            contRep++;
            vtMembRep = vtMembRep + membHouse[i].total_votes;
        } else if (membHouse[i].party == 'D') {
            contDem++;
            vtMembDem = vtMembDem + membHouse[i].total_votes;
        } else {
            contInd++;
            vtMembInd = vtMembInd + membHouse[i].total_votes;
        }
        
        totalVotos = totalVotos + membHouse[i].total_votes;
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

      $('#tdMemRepH').text(contRep).addClass('text-center');
      $('#tdVotRepH').text(pctVtRep + '%').addClass('text-center');
      $('#tdMemDemH').text(contDem).addClass('text-center');
      $('#tdVotDemH').text(pctVtDem + '%').addClass('text-center');
      $('#tdMemIndH').text(contInd).addClass('text-center');
      $('#tdVotIndH').text(pctVtInd + '%').addClass('text-center');


      //  Datos tablas 10%

      function ascendente(a, b){
        return a.missed_votes - b.missed_votes;
      }
      function descendente(a, b){
        return b.missed_votes - a.missed_votes;
      }
    
      var rango10 = ((membHouse.length * 10) / 100);

      var arrMasC = membHouse.sort(ascendente).slice(0, rango10);
      console.log('mas comprometidos = ' + arrMasC.length);

      var arrMenosC = membHouse.sort(descendente).slice(0, rango10);
      console.log('menos comprometidos = ' + arrMenosC.length);

      
            function compromisoH(arrMas, arrMenos) {
              // Mas comprometidos
              var tbMasCompH = $('#tbMasCompH');

                for ( i = 0; i < arrMas.length; i++) {
                var nameMas = arrMas[i].first_name + " " + arrMas[i].last_name;
                var ancore = $('<a>');
                ancore.attr('href', arrMas[i].url).text(nameMas);
        
                
                var tRowMas = $('<tr>');
        
                var tdNombreMas = $('<td>');
                tdNombreMas.append(ancore);
                ancore.addClass('text-info');
        
                var tdVotosMas = $('<td>');
                tdVotosMas.text(arrMas[i].missed_votes).addClass('text-center');
        
                var tdPctMas = $('<td>');
                tdPctMas.text(arrMas[i].missed_votes_pct + '%').addClass('text-center');
        
                tRowMas.append(tdNombreMas);
                tRowMas.append(tdVotosMas);
                tRowMas.append(tdPctMas);
        
                $('#tdUnoMasH').remove();
                $('#tdDosMasH').remove();
                $('#tdTresMasH').remove();
        
                tbMasCompH.append(tRowMas);
                }
            
                $('#ttMasH1').text('Nombre');
                $('#ttMasH2').text('Votos Perdidos').addClass('text-center');
                $('#ttMasH3').text('% Perdida').addClass('text-center');
        
               // Menos comprometidos
        
                var tbMenosCompH = $('#tbMenosCompH');
        
                for ( i = 0; i < arrMenos.length; i++) {
                var nameMenos = arrMenos[i].first_name + " " + arrMenos[i].last_name;
                var ancore = $('<a>');
                ancore.attr('href', arrMenos[i].url).text(nameMenos);
        
                
                var tRowMenos = $('<tr>');
        
                var tdNombreMenos = $('<td>');
                tdNombreMenos.append(ancore);
                ancore.addClass('text-info');
        
                var tdVotosMenos = $('<td>');
                tdVotosMenos.text(arrMenos[i].missed_votes).addClass('text-center');
        
                var tdPctMenos = $('<td>');
                tdPctMenos.text(arrMenos[i].missed_votes_pct + '%').addClass('text-center');
        
                tRowMenos.append(tdNombreMenos);
                tRowMenos.append(tdVotosMenos);
                tRowMenos.append(tdPctMenos);
        
                $('#tdUnoMenosH').remove();
                $('#tdDosMenosH').remove();
                $('#tdTresMenosH').remove();
        
                tbMenosCompH.append(tRowMenos);
                }
            
                $('#ttMenosH1').text('Nombre');
                $('#ttMenosH2').text('Votos Perdidos').addClass('text-center');
                $('#ttMenosH3').text('% Perdida').addClass('text-center');
            }
            
            compromisoH(arrMasC, arrMenosC);

        }



    }
}



// Paginas Lealtad | Senate | House |

// Tabla Lealtad Senado
fetch(urlSenado, initUno).then(function(respLyS){
    return respLyS.json()
}).then(tablaLealtadS)

function tablaLealtadS(senateUrl) {
    var estado = senateUrl.status;
    var resultSenate = senateUrl.results[0];
    var membSenado = resultSenate.members;
    
    if(estado == 'OK'){
      console.log('Estado de los datos');
      console.log('>> '+ estado);
  
      if(resultSenate){

        function ascendente(a, b){
            return a.votes_with_party_pct - b.votes_with_party_pct;
        }
        //y de mayor a menor
        function descendente(a, b){
            return b.votes_with_party_pct - a.votes_with_party_pct;
        }
        
        // rango a mostrar
        var range10 = ((membSenado.length * 10) / 100);
        
        var arrMasLS = membSenado.sort(ascendente).slice(0, range10);
        console.log('mas comprometidos ' + arrMasLS.length);
        
        var arrMenosLS = membSenado.sort(descendente).slice(0, range10);
        console.log('menos comprometidos ' + arrMenosLS.length);
        
        // Mas leales
        var tbMasLealesS = $('#tbMasLealesS');
        
        for ( i = 0; i < arrMasLS.length; i++) {
            var nameMasLS = arrMasLS[i].first_name + " " + arrMasLS[i].last_name;
            var ancore = $('<a>');
            ancore.attr('href', arrMasLS[i].url).text(nameMasLS);
        
            
            var tRowMas = $('<tr>');
        
            var tdNombreMas = $('<td>');
            tdNombreMas.append(ancore);
            ancore.addClass('text-info');
        
            var tdVotosMas = $('<td>');
            tdVotosMas.text(arrMasLS[i].missed_votes).addClass('text-center');
        
            var tdPctMas = $('<td>');
            tdPctMas.text(arrMasLS[i].missed_votes_pct + '%').addClass('text-center');
        
            tRowMas.append(tdNombreMas);
            tRowMas.append(tdVotosMas);
            tRowMas.append(tdPctMas);
        
            $('#rowTxtMasLS').remove();
        
            tbMasLealesS.append(tRowMas);
        }
        
        $('#thMasLS1').text('Nombre');
        $('#thMasLS2').text('Votos Perdidos').addClass('text-center');
        $('#thMasLS3').text('% Perdida').addClass('text-center');
        
        
        // Menos comprometidos
        var tbMenosLealesS = $('#tbMenosLealesS');
        
        for ( i = 0; i < arrMenosLS.length; i++) {
            var nameMenosLS = arrMenosLS[i].first_name + " " + arrMenosLS[i].last_name;
            var ancore = $('<a>');
            ancore.attr('href', arrMenosLS[i].url).text(nameMenosLS);
        
            
            var tRowMenos = $('<tr>');
        
            var tdNombreMenos = $('<td>');
            tdNombreMenos.append(ancore);
            ancore.addClass('text-info');
        
            var tdVotosMenos = $('<td>');
            tdVotosMenos.text(arrMenosLS[i].missed_votes).addClass('text-center');
        
            var tdPctMenos = $('<td>');
            tdPctMenos.text(arrMenosLS[i].missed_votes_pct + '%').addClass('text-center');
        
            tRowMenos.append(tdNombreMenos);
            tRowMenos.append(tdVotosMenos);
            tRowMenos.append(tdPctMenos);
        
            $('#rowTxtMenosLS').remove()
        
            tbMenosLealesS.append(tRowMenos);
        }
        
        $('#thMenosLS1').text('Nombre');
        $('#thMenosLS2').text('Votos Perdidos').addClass('text-center');
        $('#thMenosLS3').text('% Perdida').addClass('text-center');
      }
    }
}

// Tabla Lealtad House
fetch(urlHouse, initUno).then(function(respLyS){
    return respLyS.json()
}).then(tablaLealtadH)

function tablaLealtadH(houseUrl) {
    var estado = houseUrl.status;
    var resultHouse = houseUrl.results[0];
    var membHouse = resultHouse.members;
    
    if(estado == 'OK'){
      console.log('Estado de los datos');
      console.log('>> '+ estado);
  
      if(resultHouse){

        function ascendente(a, b){
            return a.votes_with_party_pct - b.votes_with_party_pct;
        }
        //y de mayor a menor
        function descendente(a, b){
            return b.votes_with_party_pct - a.votes_with_party_pct;
        }
        
        // rango a mostrar
        var range10 = ((membHouse.length * 10) / 100);
        
        var arrMasLH = membHouse.sort(ascendente).slice(0, range10);
        console.log('mas comprometidos ' + arrMasLH.length);
        
        var arrMenosLH = membHouse.sort(descendente).slice(0, range10);
        console.log('menos comprometidos ' + arrMenosLH.length);
        
        // Mas leales
        var tbMasLealesH = $('#tbMasLealesH');
        
        for ( i = 0; i < arrMasLH.length; i++) {
            var nameMasLH = arrMasLH[i].first_name + " " + arrMasLH[i].last_name;
            var ancore = $('<a>');
            ancore.attr('href', arrMasLH[i].url).text(nameMasLH);
        
            
            var tRowMas = $('<tr>');
        
            var tdNombreMas = $('<td>');
            tdNombreMas.append(ancore);
            ancore.addClass('text-info');
        
            var tdVotosMas = $('<td>');
            tdVotosMas.text(arrMasLH[i].missed_votes).addClass('text-center');
        
            var tdPctMas = $('<td>');
            tdPctMas.text(arrMasLH[i].missed_votes_pct + '%').addClass('text-center');
        
            tRowMas.append(tdNombreMas);
            tRowMas.append(tdVotosMas);
            tRowMas.append(tdPctMas);
        
            $('#rowTxtMasLH').remove();
        
            tbMasLealesH.append(tRowMas);
        }
        
        $('#thMasLH1').text('Nombre');
        $('#thMasLH2').text('Votos Perdidos').addClass('text-center');
        $('#thMasLH3').text('% Perdida').addClass('text-center');
        
        
        // Menos comprometidos
        var tbMenosLealesH = $('#tbMenosLealesH');
        
        for ( i = 0; i < arrMenosLH.length; i++) {
            var nameMenosLH = arrMenosLH[i].first_name + " " + arrMenosLH[i].last_name;
            var ancore = $('<a>');
            ancore.attr('href', arrMenosLH[i].url).text(nameMenosLH);
        
            
            var tRowMenos = $('<tr>');
        
            var tdNombreMenos = $('<td>');
            tdNombreMenos.append(ancore);
            ancore.addClass('text-info');
        
            var tdVotosMenos = $('<td>');
            tdVotosMenos.text(arrMenosLH[i].missed_votes).addClass('text-center');
        
            var tdPctMenos = $('<td>');
            tdPctMenos.text(arrMenosLH[i].missed_votes_pct + '%').addClass('text-center');
        
            tRowMenos.append(tdNombreMenos);
            tRowMenos.append(tdVotosMenos);
            tRowMenos.append(tdPctMenos);
        
            $('#rowTxtMenosLH').remove()
        
            tbMenosLealesH.append(tRowMenos);
        }
        
        $('#thMenosLH1').text('Nombre');
        $('#thMenosLH2').text('Votos Perdidos').addClass('text-center');
        $('#thMenosLH3').text('% Perdida').addClass('text-center');
      }
    }
}