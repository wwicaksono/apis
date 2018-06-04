
'use strict';

class BookController{
    constructor(){};

    create(req, res, next){
        res.json({status: true, message: 'created'});
    }

    get(req, res, next){
        res.json(
            {id: 1, name: 'Buku 1'}
        );
    }
}

export default BookController;