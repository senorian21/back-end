import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositories/addresses-repository";



export const addressesRoute = Router({});


addressesRoute.get('', (req: Request, res: Response) => {
   addressesRepository.findAddresses(req.query.title?.toString())
})

addressesRoute.get('/:id', (req: Request, res: Response) => {
    let address = addressesRepository.findAddressesById(+req.params.id);
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})

