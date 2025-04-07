import {productsCollection, ProductType} from "./db";

export const productsInMemoryRepository = {
    async findProuducts (title : string | null | undefined): Promise<ProductType[]> {
        const filter:any = { }

        if(title){
          filter.titel = {$regex: title}

        }

        return  productsCollection
            .find(filter)
            .toArray()
    },


    async findProductByID (id : number) : Promise<ProductType | null>  {
        let product = await productsCollection
            .findOne({id: id})
        if(!product){
            return null;
        } else {
            return product;
        }
    },


    async createProduct(title: string): Promise<ProductType>{
        const newProduct = {
            id: Date.now(),
            title: title,
        }
        await productsCollection.insertOne(newProduct)
        return newProduct
    },


    async updateProduct(id: number, title: string): Promise<boolean> {
        const result = await productsCollection.updateOne({id: id}, {
            $set: {title : title}
        })

        return result.matchedCount === 1
    },


    async deleteProduct(id: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id: id})
        return result.deletedCount === 1;

    },
}