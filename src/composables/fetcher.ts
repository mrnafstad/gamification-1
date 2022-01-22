import { ref } from 'vue';

import categoriesJSON from '../assets/backend/productcategories.json?raw'
import leaderBoardsJSON from '../assets/backend/leaderBoards.json?raw'
import { Product, ProductCategory } from '../business/interface';

export default () => {
    const categories = ref<ProductCategory[]>(JSON.parse(categoriesJSON).map((item:any) => {
        return {
            id: item.id,
            title: item.title,
            featured: item.featured,
            products: item.products.map((product: any): Product => {
                return {
                    id: product.id,
                    title: product.title,
                    type: product.type,
                    image: product.image,
                    active: product.active,
                    description: product.description,
                    platforms: product.supported_platforms,
                }
            })
        }
    }));
    const leaderBoards = ref<any[]>(JSON.parse(leaderBoardsJSON));

    function getProductsForCategory(categoryId: string) {
        return categories.value.find((category: any) => category.id === categoryId).products;
    }

    function getProductLeaderBoard(productId: number) {
        return leaderBoards.value.find((leaderBoard: any) => {
            console.log(leaderBoard, productId);
            
            return leaderBoard.product_id === productId
        })
    }

    function getAllProducts() {
        const products = [];
        console.log(categories);
        
        categories.value.forEach(category => products.push(...category.products))
        return products;
    }

    return {
        categories,
        leaderBoards,
        getProductsForCategory,
        getProductLeaderBoard,
        getAllProducts,
    }
}