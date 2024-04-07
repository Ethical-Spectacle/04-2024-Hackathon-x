import React from "react";
import styled from "styled-components";

// Sample data for the items
const itemsData = [
    {
        id: 1,
        imageUrl: "https://via.placeholder.com/150",
        type: "Beef",
        amount: "1 lb",
        costPerPound: "$1.29",
    },
    {
        id: 2,
        imageUrl: "https://via.placeholder.com/150",
        type: "Chicken",
        amount: "0.5 lb",
        costPerPound: "$1.99",
    },
    {
        id: 3,
        imageUrl: "https://via.placeholder.com/150",
        type: "Turkey",
        amount: "0.5 lb",
        costPerPound: "$1.99",
    },
    // Add more items as needed
];

const Container = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 20px;
`;

const Card = styled.div`
    flex: 0 0 auto;
    width: 200px;
    margin-right: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px;
`;

const Image = styled.img`
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
`;

const Type = styled.div`
    font-weight: bold;
`;

const Details = styled.div`
    margin-top: 5px;
    font-size: 14px;
`;

export default function Marketplace() {
    return (
        <Container>
            {itemsData.map((item) => (
                <Card key={item.id}>
                    <Image src={item.imageUrl} alt={item.type} />
                    <Type>{item.type}</Type>
                    <Details>
                        <div>{item.amount}</div>
                        <div>{item.costPerPound} per lb</div>
                    </Details>
                </Card>
            ))}
        </Container>
    );
}
