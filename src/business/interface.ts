export interface Product {
    id: number;
    title: string;
    type: string;
    image: string;
    active: boolean;
    description: string;
    platforms:  string[];
}

export interface ProductCategory {
    id: number;
    title: string;
    featured: boolean;
    products: Product[];
}