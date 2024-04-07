import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { addListingRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
`;

const FormContainer = styled.div`
    max-width: 300px;
    margin: 0 auto;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    border: 1px solid #cccccc;
    border-radius: 4px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #cccccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    background-color: #8f1aff;
    color: #ffffff;
`;

const ExcessMeatUpload = ({ closeModal }) => {
    const [currentUser, setCurrentUser] = useState(undefined);

    const [values, setValues] = useState({
        meatType: "",
        amount: "",
        quantity: "",
    });
    const navigate = useNavigate();
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("value")
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleValidation = () => {
        console.log("handle validation");
        const { meatType, amount, quantity } = values;
        console.log("values: ", values);
        if (meatType == "") {
            console.log("false 1");
            toast.error("Please select a meat type", toastOptions);
            return false;
        } else if (amount <= 0) {
            console.log("false 2");
            toast.error("Selling amount must be greater than 0", toastOptions);
            return false;
        } else if (quantity <= 0) {
            console.log("false 3");
            toast.error("Quantity must be greater than 0", toastOptions);
            return false;
        }
        console.log("validation true");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { meatType, amount, quantity } = values;
            const companyID = currentUser.email;
            const type = "Sell";
            const { data } = await axios.post(addListingRoute, {
                companyID,
                type,
                meatType,
                amount,
                quantity,
            });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                navigate("/");
            }
            closeModal();
        }
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
        }

        isUserPresent();
    }, []);

    return (
        <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="meatType">Meat Type</Label>
                            <Select
                                id="meatType"
                                name="meatType"
                                value={values.meatType}
                                onChange={handleChange}
                            >
                                <option value="">Select Meat Type</option>
                                <option value="beef">Beef</option>
                                <option value="turkey">Turkey</option>
                                <option value="fish">Fish</option>
                                <option value="chicken">Chicken</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="amount">
                                Selling Amount ($)
                            </Label>
                            <Input
                                type="number"
                                id="amount"
                                name="amount"
                                value={values.amount}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={values.quantity}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                        <Button
                            style={{ marginLeft: "12px" }}
                            variant="cancel"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                    </form>
                </FormContainer>
                <ToastContainer />
            </ModalContent>
        </ModalOverlay>
    );
};

export default ExcessMeatUpload;
