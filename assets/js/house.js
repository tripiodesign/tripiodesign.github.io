// document.getElementById("senate-data").innerHTML = JSON.stringify(data, null, 2);
// var datosHouse = data;
var tableUno = $('#house-data');


if (datosHouse.status == 'OK') {
    var estado = $('#estado').text('Estado ' + datosHouse.status);
    $('#estadoResult').append(estado)
    // $('#estadoResult').append(datosHouse.status[0])
    if (datosHouse.results[0].members) {
        for ( var i=0; i < datosHouse.results[0].members.length; i++) {
            var trUno = $('<tr>');
            tableUno.append(trUno);

            var tdNombreUno = $('<td>');
            var nombreCompletoUno = datosHouse.results[0].members[i].first_name + " " + datosHouse.results[0].members[i].last_name;
            // tdNombreUno.text(nombreCompletoUno);

            var tdFiestaUno = $('<td>');
            tdFiestaUno.text(datosHouse.results[0].members[i].party);

            var tdEstadoUno = $('<td>');
            tdEstadoUno.text(datosHouse.results[0].members[i].state);
            
            var tdAntiguedadUno = $('<td>');
            tdAntiguedadUno.text(datosHouse.results[0].members[i].seniority);

            var tdPorcentajeUno = $('<td>');
            tdPorcentajeUno.text(datosHouse.results[0].members[i].votes_with_party_pct + ' + ' + datosHouse.results[0].members[i].votes_against_party_pct);

            var ancore = $('<a>');
            ancore.attr('href', datosHouse.results[0].members[i].url).text(nombreCompletoUno);

            tdNombreUno.append(ancore);
            ancore.addClass('text-info');

            trUno.append(tdNombreUno);
            trUno.append(tdFiestaUno);
            trUno.append(tdEstadoUno);
            trUno.append(tdAntiguedadUno);
            trUno.append(tdPorcentajeUno);
        }
    }
}