import express, {NextFunction, Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRoute} from "./routes/products-router";
import {addressesRoute} from "./routes/addresses-router";
import {runDb} from "./repositories/db";

const app = express()


// const blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     // @ts-ignore
//     req.blabla = 'hello'
//     next()
// };
//
// const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     // @ts-ignore
//     if(req.query.token  === '123'){
//         next()
//     } else {
//         res.send(401)
//     }
// };
//
// let requestCounter = 0
//
// const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     requestCounter++
//     next()
// };
// app.use(requestCounterMiddleware)
// app.use(blablaMiddleware)
// app.use(authGuardMiddleware)


const port = process.env.PORT || 5000


const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)



// app.get('/products', (req: Request, res: Response) => {
//     // @ts-ignore
//     const blabla = req.blabla
//     res.send({value: blabla + "!!!!!!!" } )
//
// });
//
// app.get('/products',(req: Request, res: Response) => {
//     // @ts-ignore
//     const blabla = req.blabla
//     res.send({value: blabla + "from users!!!!!!!" } )
//
// });

app.use('/products' , productsRoute)
app.use('/addresses' , addressesRoute)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}
startApp()
