var label = $('#lblNuevoTicket');

// Comando para establecet la conexion
var socket = io();

socket.on('connect', function (){
    console.log('Conectado al servidor');
});


socket.on('disconnect', function (){
    console.log('Desconectado al servidor');
});

socket.on('estadoActual', function (resp) {
    console.log(resp);
    label.text( resp.actual )
});


$('button').on('click', function (){
   // console.log('click');
    socket.emit('siguienteTicket', null, function (siguienteTicket){
    label.text(siguienteTicket);
    });

});