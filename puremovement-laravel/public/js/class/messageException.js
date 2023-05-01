"use strict"

class MessageException{
    #header;
    #message;

    constructor(header, message){
        // Hay que controlar que el mensaje que se pasa sea correcto
        this.#header = header;
        this.#message = message;
    }

    get header(){
        return this.#header;
    }

    get message(){
        return this.#message;
    }
}

export default MessageException;