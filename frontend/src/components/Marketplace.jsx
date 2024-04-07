import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Analysis from "../images/analysis.jpeg";
// Sample data for the items
const itemsData = [
    {
        id: 1,
        imageUrl:
            "https://images.albertsons-media.com/is/image/ABS/188100109?$ng-ecom-pdp-desktop$&defaultImage=Not_Available",
        type: "Beef",
        min: 1.5,
        max: 2.566,
        amount: "1 lb",
        costPerPound: 5.132,
    },
    {
        id: 2,
        imageUrl:
            "https://media.istockphoto.com/id/1085313230/photo/uncooked-chicken-legs-on-white-background.jpg?s=612x612&w=0&k=20&c=_MkbNakXWjog9u-Ev_IJPWpJ3SGfy_ZVnXR2sDcRTow=",
        type: "Chicken",
        min: 1.25,
        max: 2.05,
        amount: "1 lb",
        costPerPound: 4.1,
    },
    {
        id: 3,
        imageUrl:
            "https://media.istockphoto.com/id/507755834/photo/raw-turkey.jpg?s=612x612&w=0&k=20&c=nRFy7172rBp5QbFtC8qfYQBi0_Pt46sRXLXHcw_9Xa0=",
        type: "Turkey",
        min: 1.06,
        max: 2.01,
        amount: "1 lb",
        costPerPound: 4.02,
    },
    {
        id: 4,
        imageUrl:
            "https://www.mashed.com/img/gallery/the-real-reason-youre-craving-raw-fish/intro-1595963116.jpg",
        type: "Fish",
        min: 1.2,
        max: 2.3,
        amount: "1 lb",
        costPerPound: 4.6,
    },
    {
        id: 5,
        imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5vBJUFha2m9jlRH0DznayV-wkQ21OilEti2zt08dBA&s",
        type: "Lamb",
        min: 2,
        max: 3.4,
        amount: "1 lb",
        costPerPound: 6.8,
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
    margin-top: 12%;
`;

const MiddleCostRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    font-size: 12px;
    margin-top: 16px;
`;

const MStyle = styled.div`
    font-size: 12px;
    width: fit-content;
    margin: 0 6px;
`;

const StyledInput = styled.input`
    font-size: 12px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    background-color: #f0f0f0;
    outline: none;

    &:hover,
    &:focus {
        background-color: #e0e0e0;
    }
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

const Button = styled.button`
    background-color: ${(props) => props.backgroundColor || "#4CAF50"};
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-left: 72px;

    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049; /* Darker Green */
    }

    &:focus {
        outline: none;
    }

    &:active {
        background-color: #3e8e41; /* Active Dark Green */
    }
`;

const Loader = () => <div>Loading...</div>;

// Modal styled components
const ModalBackground = styled.div`
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

const ModalContent = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 20px;
`;

const ModalImage = styled.img`
    width: 100%;
    max-height: 80vh;
    border-radius: 8px;
`;

const Title = styled.h1`
    margin-left: 30px;
    font-size: 32px;
`;

export default function Marketplace() {
    const [quantities, setQuantities] = useState(itemsData.map(() => 0));
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [priceValue, setPriceValue] = useState(1.5); // beef
    const [chickenPriceValue, setChickenPriceValue] = useState(1.25); // chicken

    const navigate = useNavigate();

    const handlePriceChange = (e) => {
        // console.log("price value: ", e.target.min)
        const inputValue = e.target.value;
        if (e.target.min == 1.5) {
            console.log("beef");
            setPriceValue(inputValue);
        } else if (e.target.min == 1.25) {
            console.log("chicken");
            setChickenPriceValue(inputValue);
        }
    };

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
        localStorage.setItem("priceValue", JSON.stringify(priceValue));
        localStorage.setItem("chpriceValue", JSON.stringify(chickenPriceValue));
        navigate("/checkout");
    };

    useEffect(() => {
        async function isUserPresent() {
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                console.log("user not present");
                navigate("/login");
            } else {
                setCurrentUser(
                    await JSON.parse(
                        localStorage.getItem(
                            process.env.REACT_APP_LOCALHOST_KEY
                        )
                    )
                );
                console.log("user present");
            }
            setIsLoading(false);
        }

        isUserPresent();
    }, []);

    if (isLoading) {
        return (
            <Container>
                <Loader />
            </Container>
        );
    }

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const Modal = ({ onClose }) => (
        <ModalBackground onClick={onClose}>
            <ModalContent>
                <ModalImage src={Analysis} alt="Analysis" />
            </ModalContent>
        </ModalBackground>
    );

    return (
        <Container>
            <Title>Marketplace</Title>
            <ImagesContainer>
                {itemsData.map((item, index) => (
                    <Card key={item.id}>
                        <Image src={item.imageUrl} alt={item.type} />
                        <Type>{item.type}</Type>
                        <Details>
                            <div>{item.amount}</div>
                            <div>${item.costPerPound} per lb</div>
                        </Details>
                        <MiddleCostRow>
                            <MStyle>min: ${item.min}</MStyle>
                            <StyledInput
                                type="number"
                                min={item.min} // Minimum value
                                max={item.max} // Maximum value
                                onChange={handlePriceChange}
                            />
                            <MStyle>max: ${item.max}</MStyle>
                        </MiddleCostRow>
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
                        {currentUser && (
                            <>
                                {currentUser.type == "Seller" ? (
                                    <Button
                                        backgroundColor="#000"
                                        onClick={() => {
                                            handleModalOpen();
                                        }}
                                    >
                                        {" "}
                                        Analytics{" "}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            handleModalOpen();
                                        }}
                                    >
                                        {" "}
                                        Analytics{" "}
                                    </Button>
                                )}
                            </>
                        )}
                    </Card>
                ))}
            </ImagesContainer>

            <CheckoutButton onClick={() => handleCheckout()}>
                {currentUser.type == "Seller" ? (
                    <div>List Items</div>
                ) : (
                    <div>Checkout</div>
                )}
            </CheckoutButton>

            {isModalOpen && <Modal onClose={handleModalClose} />}
        </Container>
    );
}
