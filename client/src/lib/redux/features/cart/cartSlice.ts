import { IMedicine } from "@/types/medicine";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { toast } from "sonner";

export interface CartProduct extends IMedicine {
    orderQuantity: number;
}

interface TinitialState {
    products: CartProduct[],
    city: string;
    shippingAddress: string;
}

const initialState: TinitialState = {
    products: [],
    city: '',
    shippingAddress: ''
}

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const productToAdd = state.products.find(
                (product) => product._id === action.payload._id
            );

            if (!productToAdd) {
                state.products.push({ ...action.payload, orderQuantity: 1 });
            } else {
                toast.success("Alrady Add This")
            }
        },
        incrementOrderQuantity: (state, action) => {
            const productToIncrement = state.products.find(
                (product) => product._id === action.payload
            );

            if (productToIncrement && productToIncrement?.quantity !== productToIncrement?.orderQuantity) {
                productToIncrement.orderQuantity += 1;
                return;
            }
            if (productToIncrement?.quantity === productToIncrement?.orderQuantity) {
                toast.error("Stock Unavailable")
            }
        },
        decrementOrderQuantity: (state, action) => {
            const productToIncrement = state.products.find(
                (product) => product._id === action.payload
            );

            if (productToIncrement && productToIncrement.orderQuantity > 1) {
                productToIncrement.orderQuantity -= 1;
                return;
            }
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
        },
        updateCity: (state, action) => {
            state.city = action.payload;
        },
        updateShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        clearCart: (state) => {
            state.products = [];
            state.city = "";
            state.shippingAddress = "";
        },
    }
})

//* Products
export const orderedProductsSelector = (state: RootState) => {
    return state.cart.products;
};

// orderSelector
export const orderSelector = (state: RootState) => {
    return {
        products: state.cart.products,
        // shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
        // paymentMethod: "Online",
    }
}

// subTotalSelector
export const subTotalSelector = (state: RootState) => {
    return state.cart.products.reduce((acc, product) => {
        return acc + Number(product.price) * product.orderQuantity
    }, 0)
}

// shippingCostSelector
export const shippingCostSelector = (state: RootState) => {
    if (
        state.cart.city &&
        state.cart.city === "Dhaka" &&
        state.cart.products.length > 0
    ) {
        return 60;
    } else if (
        state.cart.city &&
        state.cart.city !== "Dhaka" &&
        state.cart.products.length > 0
    ) {
        return 120;
    } else {
        return 0;
    }
};

export const grandTotalSelector = (state: RootState) => {
    const subTotal = subTotalSelector(state);
    const shippingCost = shippingCostSelector(state);

    return subTotal + shippingCost;
};

//* Address

export const citySelector = (state: RootState) => {
    return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
    return state.cart.shippingAddress;
};

export const { addProduct, incrementOrderQuantity, decrementOrderQuantity, removeProduct, updateCity, updateShippingAddress, clearCart } = cartSlice.actions
export default cartSlice.reducer