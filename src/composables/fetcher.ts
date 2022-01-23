import { ref } from 'vue';

import categoriesJSON from '../assets/backend/productcategories.json?raw'
import leaderBoardsJSON from '../assets/backend/leaderBoards.json?raw'
import { Entry, Leaderboard, Product, ProductCategory } from '../business/interface';

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
    const leaderBoards = ref<Leaderboard[]>(JSON.parse(leaderBoardsJSON).map((leaderBoard: any): Leaderboard => {
        return {
            category: leaderBoard.category,
            scope: leaderBoard.scope,
            productId: leaderBoard.product_id,
            myEntry: toEntry(leaderBoard.my_entry),
            entries: leaderBoard.entries.map((entry: any): Entry => {
                return toEntry(entry);
            })
        }
    }));

    function toEntry(entry: any): Entry {
        return {
            userId: entry.user_id,
            userName: entry.username,
            image: entry.image,
            rank: entry.rank,
            score: entry.score
        }
    }
    
    function getProductLeaderBoard(productId: number): Leaderboard | null {
        const leaderboard =  leaderBoards.value.find((leaderBoard: Leaderboard) => 
            leaderBoard.productId === productId
        )

        return leaderboard || null;
    }

    function getAllProducts(): Product[] {
        const products: Product[] = [];
        categories.value.forEach(category => products.push(...category.products))
        return products;
    }

    return {
        categories,
        leaderBoards,
        getProductLeaderBoard,
        getAllProducts,
    }
}