// Comando para establecet la conexion
var socket = io();

var label = $('small');


var searchParams = new URLSearchParams( window.location.search );
//console.log(searchParams.has('escritorio'));

if ( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es necesariooo');

}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function (){
    socket.emit('atenderTicket', { escritorio }, function ( resp ){
        //console.log(resp);
        if ( resp === 'No hay tickets' ){
            label.text(resp);
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});