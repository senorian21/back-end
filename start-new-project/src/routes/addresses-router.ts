import {Request, Response, Router} from "express";


const addresses = [{id: 1, title: 'Recpublic'},{id: 2 ,title: 'Sverlovo'}]


export const addressesRoute = Router({});


addressesRoute.get('', (req: Request, res: Response) => {
    if(req.query.title){
        let searchString = req.query.title.toString();
        res.send(addresses.filter(a => a.title.indexOf(searchString) > -1))
    } else{
        res.send(addresses)
    }
})

addressesRoute.get('/:id', (req: Request, res: Response) => {
    let address = addresses.find(a => a.id === +req.params.id)

    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})

