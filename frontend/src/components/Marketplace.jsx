import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Sample data for the items
const itemsData = [
    {
        id: 1,
        imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGmY7Y20qTdCly8fUgQxV4zOO2SVrBW_d4uHy4kbggQ&s",
        type: "Beef",
        amount: "101.45 lb",
        costPerPound: "$1.29",
    },
    {
        id: 2,
        imageUrl:
            "https://www.allrecipes.com/thmb/SoBuPU73KcbYHl3Kp3j8Xx4A3fc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8805-CrispyFriedChicken-mfs-3x2-072-d55b8406d4ae45709fcdeb58a04143c2.jpg",
        type: "Chicken",
        amount: "9.5 lb",
        costPerPound: "$1.34",
    },
    {
        id: 3,
        imageUrl:
            "https://images.ctfassets.net/lufu0clouua1/2cSQKvJYskEqgyaAYawE48/7b71e49f5de264f38541c055926f8f5a/classic-roast-turkey.jpg",
        type: "Turkey",
        amount: "3.56 lb",
        costPerPound: "$2.01",
    },
    {
        id: 4,
        imageUrl:
            "https://www.tastingtable.com/img/gallery/x-different-ways-to-cook-fish/l-intro-1643135113.jpg",
        type: "Fish",
        amount: "1.34 lb",
        costPerPound: "$1.01",
    },
    {
        id: 5,
        imageUrl:
            "https://images.getrecipekit.com/v1615995124_RedRubbedBabyLambChopsPg101_xyzuwo.jpg?aspect_ratio=1:1&quality=90&",
        type: "Lamb",
        amount: "23.3 lb",
        costPerPound: "$5.23",
    },
    // Add more items as needed
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 20px;
`;

const Card = styled.div`
    flex: 0 0 auto;
    width: 300px;
    height: 500px;
    justify-content: space-between;
    margin-right: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px;
`;

const Image = styled.img`
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
    height: 220px;
`;

const Type = styled.div`
    font-weight: bold;
`;

const Details = styled.div`
    margin-top: 5px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BottomRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    margin-top: 28%;
`;

const Minus = styled.div`
    border-radius: 24px;
    background: #c5c5c5;
    padding: 16px 24px;

    &:hover {
        background: #a9a9a9;
        cursor: pointer;
    }
`;

const Plus = styled.div`
    border-radius: 24px;
    background: ${(props) => (props.active ? "#ff0000" : "#c5c5c5")};
    padding: 16px 24px;

    &:hover {
        background: ${(props) => (props.active ? "#ff0000" : "#a9a9a9")};
        cursor: pointer;
    }
`;
const Value = styled.h2`
    font-size: 1rem;
`;

const CheckoutButton = styled.button`
    border-radius: 12px;
    margin: 20px;
    height: 60px;
    width: 120px;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
    background-color: #392787;
    color: white;
    cursor: pointer;
`;

export default function Marketplace() {
    const [quantities, setQuantities] = useState(itemsData.map(() => 0));
    const navigate = useNavigate();

    const handleIncrement = (index) => {
        const newQuantities = [...quantities];
        newQuantities[index]++;
        setQuantities(newQuantities);
    };

    const handleDecrement = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 0) {
            newQuantities[index]--;
            setQuantities(newQuantities);
        }
    };

    const handleCheckout = () => {
        localStorage.setItem("quantities", JSON.stringify(quantities));
        localStorage.setItem("checkoutItems", JSON.stringify(itemsData));
        navigate("/checkout");
    };

    return (
        <Container>
            <ImagesContainer>
                {itemsData.map((item, index) => (
                    <Card key={item.id}>
                        <Image src={item.imageUrl} alt={item.type} />
                        <Type>{item.type}</Type>
                        <Details>
                            <div>{item.amount}</div>
                            <div>{item.costPerPound} per lb</div>
                        </Details>
                        <BottomRow>
                            <Minus onClick={() => handleDecrement(index)}>
                                -
                            </Minus>{" "}
                            <Value>{quantities[index]}</Value>{" "}
                            <Plus
                                active={quantities[index] > 0 ? 1 : 0}
                                onClick={() => handleIncrement(index)}
                            >
                                +
                            </Plus>{" "}
                        </BottomRow>
                    </Card>
                ))}
            </ImagesContainer>

            <CheckoutButton onClick={() => handleCheckout()}>
                Checkout
            </CheckoutButton>
        </Container>
    );
}
