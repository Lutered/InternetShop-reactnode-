import { 
    fetchProductById,
    searchProducts,
    getFilterOptions,
    fetchProductType,
    fetchProductTypes, 
    fetchCategoryById,
    fetchCategories
} from '../http/API/ProductApi';

export default class ProductService{
    _productImagesFolderUrl = process.env.REACT_APP_IMAGES_PRODUCTS_FOLDER_URL;
    _categoryImagesFolderUrl = process.env.REACT_APP_IMAGES_PREVIEW_FOLDER_URL;
    _iconsFolderUrl = process.env.REACT_APP_ICONS_FOLDER_URL;

    _errorService;

    constructor(errorService){
        this._errorService = errorService;
    }

    async getProductById(){
        let product = await this._errorService.handleRequest(
            fetchProductById(...arguments)
        );

        if(!product){
            return null;
        }

        product.imgUrl = this._productImagesFolderUrl + product.img;

        return product;
    }

    async searchProducts(){
        const products = await this._errorService.handleRequest( 
            searchProducts(...arguments)
        );

        if(!products) return [];

        const folderUrl = this._productImagesFolderUrl;

        const mappedProducts = products.rows.map(val => {
            return {
                id: val.id,
                name: val.name,
                description: val.description,
                rating: val.rating,
                price: val.price,
                imgUrl: folderUrl + val.img
            };
        });

        return mappedProducts;
    }

    async getFilterOptions(id){
        return await this._errorService.handleRequest(getFilterOptions(id));
    }

    async getProductType(){
        return await this._errorService.handleRequest(fetchProductType(...arguments));
    }

    async getProductTypes(){
        const productTypes = await this._errorService.handleRequest(
            fetchProductTypes(...arguments)
        );

        if(!productTypes) return [];

        const folderUrl = this._iconsFolderUrl;

        const mappedProductTypes = productTypes.rows.map(val => {
            return {
                id: val.id,
                name: val.name,
                code: val.code,
                iconUrl: val.icon ? (folderUrl + val.icon) : null
            };
        });

        return mappedProductTypes;
    }

    async getCategoryByIdAsync(){
        return await this._errorService.handleRequest(fetchCategoryById(...arguments));
    }

    async getCategoriesAsync(){
        const categories = await this._errorService.handleRequest(
            fetchCategories(...arguments)
        );

        if(!categories) return [];

        const folderUrl = this._categoryImagesFolderUrl;

        const mappedCategories = categories.rows.map(val => {
            return {
                id: val.id,
                name: val.name,
                filter: val.filter,
                typeCode: val.product_type.code,
                typeName: val.product_type.name,
                imgUrl: val.img ? (folderUrl + val.img) : null,
            };
        });

        return mappedCategories;
    }
}

