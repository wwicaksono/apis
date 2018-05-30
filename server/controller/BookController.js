

class BookController{
    constructor(){};

    create(req, res, next){
        return true;
    }

    get(req, res, next){
        return [
            {id: 1, name: 'Buku 1', },
            {id: 2, name: 'Buku 2', },
            {id: 3, name: 'Buku 3', },            
        ];
    }
}

export default BookController;