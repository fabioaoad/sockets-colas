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

       let data = require('../data/data.json');
       // console.log(data);

        if ( data.hoy === this.hoy ){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
        } else {
            this.reiniciarConteo();
        }

    }


    reiniciarConteo(){
        this.ultimo = 0;
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


    grabarArchivo (){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }




}


module.exports = {
    TicketControl
}