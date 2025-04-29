import { byTestId, createRoutingFactory,Spectator } from "@ngneat/spectator/jest";

import { ProductComponent } from "./product.component";
import { generateFakeProduct } from "@shared/models/product.mock";

describe("ProductComponent", () => {

    let spectator: Spectator<ProductComponent>;

    const createComponent = createRoutingFactory(ProductComponent);
    
    const mockProduct = generateFakeProduct();

    beforeEach(() => {
        spectator = createComponent({
            detectChanges: false,
        });
        spectator.setInput("product", mockProduct);
    });
    
    it("should create", () => {
        spectator.detectChanges();
        expect(spectator.component).toBeTruthy();
    });

    it("should display product title", () => {
        spectator.detectChanges();   
        const element = spectator.query(byTestId('product-title'));
        expect(element).toHaveText(
            mockProduct.title
        );
    }
    );
});