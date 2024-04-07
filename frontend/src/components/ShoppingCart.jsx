import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";

export default function ShoppingCart({ total, setTotal }) {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    console.log("total: ", total);
    const removeProduct = (index) => {
        const updatedTotal =
            total -
            selectedProduct[index].price * selectedProduct[index].quantity;
        setTotal(updatedTotal);
        selectedProduct.splice(index, 1);
        // localStorage.setItem("shoppingCart", JSON.stringify(selectedProduct));
        setSelectedProduct([...selectedProduct]);
    };

    const handleRemoveClick = (index) => {
        // setSelectedProduct(selectedProduct[index]);
        setShowPopup(true);
    };

    useEffect(() => {
        const quantities = JSON.parse(localStorage.getItem("quantities")) || {};
        const itemsData =
            JSON.parse(localStorage.getItem("checkoutItems")) || [];
        const beefPrice = JSON.parse(localStorage.getItem("priceValue")) || 2;
        const chickenPrice =
            JSON.parse(localStorage.getItem("chpriceValue")) || 1.8;
        console.log("bc: ", beefPrice, chickenPrice);

        // Assuming itemsData is an array of objects with imageUrl, type, amount, costPerPound, and quantity fields
        // console.log("qa ", quantities);
        // console.log("item: ", itemsData);
        const mergedList = [];
        let tot = 0;
        for (let i = 0; i < itemsData.length; i++) {
            const item = itemsData[i];
            const quantity = quantities[i] || 0;
            const mergedItem = { ...item, quantity }; // Merge item and quantity
            tot += parseFloat(item.costPerPound) * parseFloat(quantity);
            mergedList.push(mergedItem);
        }
        console.log("merge: ", mergedList);
        mergedList[0].costPerPound = beefPrice;
        mergedList[1].costPerPound = chickenPrice;

        setSelectedProduct(mergedList);
        setTotal(tot);
    }, []);

    return (
        <>
            <ShoppingCartContainer>
                <Title>Shopping Cart</Title>
                <HeaderRow>
                    <HeaderCell>Product</HeaderCell>
                    <HeaderCell>Price/lb</HeaderCell>
                    <HeaderCell>Quantity</HeaderCell>
                    <HeaderCell>Total Price</HeaderCell>
                    <HeaderCell>Remove</HeaderCell>
                    <HeaderCell></HeaderCell>
                </HeaderRow>
                {selectedProduct &&
                    selectedProduct.map((product, index) => (
                        <>
                            {product && product.quantity > 0 ? (
                                <ProductRow key={index}>
                                    <ProductImage
                                        src={product.imageUrl}
                                        alt={product.type}
                                    />
                                    <ProductName>
                                        ${product.costPerPound}
                                    </ProductName>
                                    <div>{product.quantity}</div>
                                    <TotalPrice>
                                        $
                                        {(
                                            parseFloat(product.costPerPound) *
                                            parseFloat(product.quantity)
                                        ).toFixed(2)}
                                    </TotalPrice>

                                    <RemoveButton
                                        onClick={() => handleRemoveClick(index)}
                                    >
                                        ❌
                                    </RemoveButton>
                                </ProductRow>
                            ) : null}
                        </>
                    ))}
                <SubtotalRow>
                    <div>Subtotal:</div>
                    <div>${total.toFixed(2)}</div>
                </SubtotalRow>
                <SubtotalRow>
                    <div>Processing Fee: (7.5%)</div>
                    <div>${(total * 0.075).toFixed(2)}</div>
                </SubtotalRow>
                <TotalAmountRow>
                    <div>Total Amount:</div>
                    <div>${(total + 5).toFixed(2)}</div>
                </TotalAmountRow>
            </ShoppingCartContainer>
            
            {showPopup && (
                <PopupBackground>
                    <PopupContent>
                        <p>Are you sure you want to delete this item?</p>
                        <button onClick={() => setShowPopup(false)}>
                            Cancel
                        </button>
                        <button onClick={() => removeProduct()}>Delete</button>
                    </PopupContent>
                </PopupBackground>
            )}
        </>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    .container {
        height: 100vh;
        width: 100vw;
        background-color: #ddd7f7;
        justify-content: space-between;
        flex-direction: column;
        display: flex;
    }
`;

const ShoppingCartContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    height: 75vh;
    width: 75vw;
    margin-top: auto;
    margin-bottom: auto;
`;

const Title = styled.h2`
    text-align: center;
    margin: 24px 0 48px 0;
`;

const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: 3fr 1.5fr 2fr 2fr auto;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
`;

const HeaderCell = styled.div`
    font-weight: bold;
`;

const ProductRow = styled.div`
    display: grid;
    grid-template-columns: 3fr 1.5fr 2fr 2fr auto;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
`;

const ProductImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 8px;
    margin-left: 24px;
`;

const ProductName = styled.div`
    font-weight: bold;
`;

const TotalPrice = styled.div`
    font-weight: bold;
`;

const RemoveButton = styled.span`
    color: red;
    cursor: pointer;
    margin-left: 24px;
`;

const PopupBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PopupContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
`;

const SubtotalRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
`;

const TotalAmountRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    font-weight: bold;
`;
