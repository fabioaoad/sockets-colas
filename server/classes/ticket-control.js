const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {

       this.ultimo = 0;
       this.hoy = new Date().getDate();
       this.tickets = [];
       this.ultimos4 = [];

       let data = require('../data/data.json');
       // console.log(data);

        if ( data.hoy === this.hoy ){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }


    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        // console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }




    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTicket(){
        return `Ticket ${ this.ultimo }`;
    }

    atenderTicket( escritorio ){

        // verifico si hay tickets pendientes de atender
        if ( this.tickets.length === 0 ){
            return 'No hay tickets';
        }
        let numeroTicket = this.tickets[0].numero; //evito el pasaje por referencia ej JS
        this.tickets.shift(); //elimino el primer elemento del arreglo
        let atenderTicket = new Ticket(numeroTicket, escritorio); // creo un nuevo ticket que atendere
        this.ultimos4.unshift(atenderTicket); // lo agrego al inicio del arreglo al ticket que atenderé

       // despacho los tickes ya atendidos
        if ( this.ultimos4.length > 4 ){
            this.ultimos4.splice(-1,1); // borra el ultimo elemento del arreglo
        }

        console.log('Ultimos 4: ', this.ultimos4);

        this.grabarArchivo();

        return  atenderTicket;
    }


    grabarArchivo (){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }




}


module.exports = {
    TicketControl
}