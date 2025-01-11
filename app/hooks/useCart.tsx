import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../components/product/ProductDetails";
import { Product } from "../types/product";

type CartContextType = {
    cartTotalQty: number
    cartTotalAmount: number
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleQtyProductIncrease: (product: CartProductType) => void
    handleQtyProductDecrease: (product: CartProductType) => void
    handleClearCart: (product: CartProductType) => void
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any
}
export const CartContextProvider = (props: Props) => {

    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);


    useEffect(() => {
        const cartItems: any = localStorage.getItem('shopCartItems')
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);

        setCartProducts(cProducts)

    }, [])

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity;

                    acc.total += itemTotal
                    acc.qty += item.quantity

                    return acc;
                }, {
                    total: 0,
                    qty: 0
                })

                setCartTotalQty(qty);
                setCartTotalAmount(total)
            }
        }

        getTotals();
    }, [cartProducts])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            // Check if the product is already in the cart
            const productExists = prev?.some((item) => item.id === product.id);
    
            if (productExists) {
                alert("Product is already in the cart.");
                return prev; // Do not add the product again
            }
    
            // Add the product to the cart
            const updatedCart = prev ? [...prev, product] : [product];
            localStorage.setItem('shopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);
    

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const filterProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filterProducts)
            localStorage.setItem('shopCartItems', JSON.stringify(filterProducts))
        }


    }, [cartProducts])

    const handleQtyProductIncrease = useCallback((product: CartProductType) => {

        let updatedCart;

        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('shopCartItems', JSON.stringify(updatedCart))

        }


    }, [cartProducts])
    const handleQtyProductDecrease = useCallback((product: CartProductType) => {

        let updatedCart;

        if (product.quantity === 1) {
            return;
        }

        if (cartProducts) {
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if (existingIndex > -1) {
                updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('shopCartItems', JSON.stringify(updatedCart))

        }
    }, [cartProducts])


    const handleClearCart = useCallback((product: CartProductType) => {

        setCartProducts(null);
        setCartTotalQty(0);
        setCartTotalAmount(0);
        localStorage.setItem('shopCartItems', JSON.stringify(null))

    }, [cartProducts])

    const handleAddToUserProfile = useCallback((product: CartProductType) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

    if (!loggedInUser) {
        alert("You need to log in to add items to your profile cart.");
        return;
    }

}, []);

    

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleQtyProductIncrease,
        handleQtyProductDecrease,
        handleClearCart,
    }

    return <CartContext.Provider value={value} {...props} />
};

export const useCart = () => {
    const context = useContext(CartContext)

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context;
}