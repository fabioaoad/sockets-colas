var label = $('#lblNuevoTicket');

// Comando para establecet la conexion
var socket = io();

socket.on('connect', function (){
    console.log('Conectado al servidor');
});


socket.on('disconnect', function (){
    console.log('Desconectado al servidor');
});


$('button').on('click', function (){
   // console.log('click');
    socket.emit('siguienteTicket', null, function (siguienteTicket){
    label.text(siguienteTicket);
    });

});