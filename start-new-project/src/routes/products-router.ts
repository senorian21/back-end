import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";



export const productsRoute = Router({});


productsRoute.get('', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProuducts(req.query.title?.toString())
    res.send(foundProducts)
})

productsRoute.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.findProductByID(+req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRoute.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }

})

productsRoute.post('', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRoute.put('/:id', (req: Request, res: Response) => {
   const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
    if(isUpdated) {
        const product = productsRepository.findProductByID(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }

})
