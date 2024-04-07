import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import ExcessMeatUpload from "./MeatUploadModal";
import { getAllListings } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    padding: 36px;
`;

const Heading = styled.h1`
    font-family: "Roboto", sans-serif;
    font-size: 2rem;
    font-weight: bold;
    color: #333; /* Dark gray color */
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Shadow effect */
`;

const Button = styled.button`
    padding: 20px 40px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    background-color: #6a0dad; /* Dark purple color */
    color: #fff; /* White text color */
    transition: background-color 0.3s ease; /* Smooth transition on hover */
    margin-top: 24px;
    margin-left: auto;
    margin-right: auto;

    &:hover {
        background-color: #4b0082; /* Darker purple color on hover */
    }
`;

const ListingContainer = styled.div`
    height: 50vh;
    overflow-y: scroll;
    width: 100%;
`;

const ListingItem = styled.div`
    background-color: #fff; /* White background color */
    border: 1px solid #ddd; /* Light gray border */
    border-radius: 8px; /* Rounded corners */
    padding: 20px; /* Padding inside the item */
    margin-bottom: 20px; /* Space between items */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Shadow effect */
    transition: transform 0.3s ease; /* Smooth transition on hover */

    &:hover {
        transform: translateY(-3px); /* Move up slightly on hover */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Slightly stronger shadow on hover */
    }
`;

const MyListings = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

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

    const fetchListings = async () => {
        try {
            const companyID = currentUser.email; // Replace with your actual company ID
            console.log("company ID: ", companyID);
            const response = await axios.get(
                `${getAllListings}?companyID=${companyID}`
            );
            console.log("response: ", response);
            if (response.status === 200) {
                setListings(response.data);
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    useEffect(() => {
        // Fetch listings for a specific company ID
        if (!currentUser) {
            return;
        }

        fetchListings();
    }, [currentUser]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchListings();
    };

    return (
        <PageContainer>
            <Heading>My Listings</Heading>
            <ListingContainer>
                {listings.map((listing, index) => (
                    <ListingItem key={index}>
                        <h3>{listing.meatType}</h3>
                        <p>Selling Amount: ${listing.amount}</p>
                        <p>Quantity: {listing.quantity}</p>
                    </ListingItem>
                ))}
            </ListingContainer>
            <Button onClick={openModal}>Add Listing</Button>
            {isModalOpen && <ExcessMeatUpload closeModal={closeModal} />}
        </PageContainer>
    );
};

export default MyListings;
