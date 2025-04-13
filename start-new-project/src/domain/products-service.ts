import {productsRepository} from "../repositories/products-db-repository"
import {ProductType} from "../repositories/db";

export const productsService = {
    async findProuducts (title : string | null | undefined): Promise<ProductType[]> {
        return productsRepository.findProuducts(title)
    },


    async findProductByID (id : number) : Promise<ProductType | null>  {
       return productsRepository.findProductByID(id)
    },


    async createProduct(title: string): Promise<ProductType>{
        const newProduct = {
            id: Date.now(),
            title: title,
        }
        const createdProduct = await productsRepository.createProduct(newProduct)
        return createdProduct
    },


    async updateProduct(id: number, title: string): Promise<boolean> {
        return await productsRepository.updateProduct(id, title)
    },


    async deleteProduct(id: number): Promise<boolean> {
        return await productsRepository.deleteProduct(id)

    },
}