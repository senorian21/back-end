import {Request, Response, Router} from "express";
import {ProductType} from "../repositories/db"
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../midlewares/input-validation-middleware";
import {productsService} from "../domain/products-service";



export const productsRoute = Router({});

const titleValidation = body('title').isLength({
    min: 4,
    max: 30
}).withMessage("Title < 4 or Title > 30")

productsRoute.get('', async (req: Request, res: Response) => {
    const foundProducts: ProductType[] = await productsService.findProuducts(req.query.title?.toString())



    res.send(foundProducts)

})

productsRoute.get('/:id', async (req: Request, res: Response) => {
    let product = await productsService.findProductByID(+req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRoute.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsService.deleteProduct(+req.params.id)
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
        const newProduct = await productsService.createProduct(req.body.title);
        res.status(201).send(newProduct);
    });

productsRoute.put('/:id', async (req: Request, res: Response) => {
   const isUpdated = await productsService.updateProduct(+req.params.id, req.body.title)
    if(isUpdated) {
        const product = await productsService.findProductByID(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }

})
