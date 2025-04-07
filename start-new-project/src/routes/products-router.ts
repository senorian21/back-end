import {Request, Response, Router} from "express";
import {productsInMemoryRepository, ProductType} from "../repositories/products-db-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";



export const productsRoute = Router({});

const titleValidation = body('title').isLength({
    min: 4,
    max: 30
}).withMessage("Title < 4 or Title > 30")

productsRoute.get('', async (req: Request, res: Response) => {
    const foundProducts: ProductType[] = await productsInMemoryRepository.findProuducts(req.query.title?.toString())



    res.send(foundProducts)

})

productsRoute.get('/:id', async (req: Request, res: Response) => {
    let product = await productsInMemoryRepository.findProductByID(+req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRoute.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsInMemoryRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }

})

productsRoute.post('',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        console.log(req.body)
        const newProduct = await productsInMemoryRepository.createProduct(req.body.title);
        res.status(201).send(newProduct);
    });

productsRoute.put('/:id', async (req: Request, res: Response) => {
   const isUpdated = await productsInMemoryRepository.updateProduct(+req.params.id, req.body.title)
    if(isUpdated) {
        const product = await productsInMemoryRepository.findProductByID(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }

})
