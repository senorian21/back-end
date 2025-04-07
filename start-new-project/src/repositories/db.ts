import {MongoClient} from 'mongodb'


const mongoUri = process.env.mongoURI || 'mongodb://localhost:27017'

export type ProductType = {
    id: number,
    title: string,
}


export const client = new MongoClient(mongoUri)
const db = client.db("shop");
export const productsCollection = db.collection<ProductType>("products");

export async function runDb(){
    try{
        await client.connect()
        await client.db("products").command({ping: 1})
        console.log("Database Connected")
    }
    catch{
        console.log("can't  database Connected")
        await client.close()
    }
}