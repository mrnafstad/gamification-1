export interface Product {
    id: number;
    title: string;
    type: string;
    image: string;
    active: boolean;
    description: string;
    platforms:  Platform[];
}

export interface Entry {
    userId: number;
    userName: string;
    image: string;
    rank: number;
    score: number;
}

export interface Leaderboard {
     category: string;
     scope: string;
     productId: number;
     myEntry: Entry;
     entries: Entry[];

}

export interface ProductCategory {
    id: number;
    title: string;
    featured: boolean;
    products: Product[];
}

export type Platform = "iOS" | "Android" | "WebGL" | "Windows" | "Mac"