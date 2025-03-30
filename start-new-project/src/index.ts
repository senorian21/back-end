import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRoute} from "./routes/products-router";
import {addressesRoute} from "./routes/addresses-router";

const app = express()

const port = process.env.PORT || 5000


const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)




app.use('/products' , productsRoute)
app.use('/addresses' , addressesRoute)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})