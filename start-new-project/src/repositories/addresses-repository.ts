import {productsRepository} from "./products-repository";

const addresses = [{id: 1, title: 'Recpublic'},{id: 2 ,title: 'Sverlovo'}]

export const addressesRepository = {
    findAddresses (title : string | null | undefined) {
        if(title){
            const findAdress = (addresses.filter(a => a.title.indexOf(title) > -1))
            return findAdress
        } else{
            return (addresses)
        }
    },
    findAddressesById (id: number) {
        let address = addresses.find(a => a.id === id)
        return address
    }
}