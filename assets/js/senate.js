// document.getElementById("senate-data").innerHTML = JSON.stringify(data, null, 2);
// var datosSenado = data;
var tableUno = $('#senate-data');


if (datosSenado.status == 'OK') {
    var estado = $('#estado').text('Estado ' + datosSenado.status);
    $('#estadoResult').append(estado)
    // $('#estadoResult').append(datosSenado.status[0])
    if (datosSenado.results[0].members) {
        for ( var i=0; i < datosSenado.results[0].members.length; i++) {
            var trUno = $('<tr>');
            tableUno.append(trUno);

            var tdNombreUno = $('<td>');
            var nombreCompletoUno = datosSenado.results[0].members[i].first_name + " " + datosSenado.results[0].members[i].last_name;
            // tdNombreUno.text(nombreCompletoUno);

            var tdFiestaUno = $('<td>');
            tdFiestaUno.text(datosSenado.results[0].members[i].party);

            var tdEstadoUno = $('<td>');
            tdEstadoUno.text(datosSenado.results[0].members[i].state);
            
            var tdAntiguedadUno = $('<td>');
            tdAntiguedadUno.text(datosSenado.results[0].members[i].seniority);

            var tdPorcentajeUno = $('<td>');
            tdPorcentajeUno.text(datosSenado.results[0].members[i].votes_with_party_pct + '% + ' + datosSenado.results[0].members[i].votes_against_party_pct + '%');

            var ancore = $('<a>');
            ancore.attr('href', datosSenado.results[0].members[i].url).text(nombreCompletoUno);

            tdNombreUno.append(ancore);
            ancore.addClass('text-light');

            
            trUno.append(tdNombreUno);
            trUno.append(tdFiestaUno);
            trUno.append(tdEstadoUno);
            trUno.append(tdAntiguedadUno);
            trUno.append(tdPorcentajeUno);
        }
    }
}