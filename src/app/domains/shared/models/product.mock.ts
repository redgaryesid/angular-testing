import { generateFakeCategory } from "./category.mock";
import { Product } from "./product.model";
import {faker} from "@faker-js/faker";

export const generateFakeProduct = (data?:Partial<Product>): Product => ({
    id: faker.number.int(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    images: [faker.image.url(), faker.image.url()],
    category:generateFakeCategory(),
    creationAt: faker.date.past().toISOString(),
    slug: faker.lorem.slug(),
    ...data,
}); 