"use strict"

class MessageException{
    #header;
    #message;

    constructor(header, message){
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