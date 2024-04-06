import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ClientLogo from "../images/client-logo.png"
import CustomerLogo from "../images/customer-logo.png"

export default function Header({ currentUser }) {
    console.log("header: ", currentUser.type == "Seller");
    return (
        <Container>
            <IconWrapper>
                {currentUser.type == "Seller" ? (
                    <UserImage
                        src={ClientLogo}
                        alt="Seller User Image"
                    />
                ) : (
                    <UserImage
                        src={CustomerLogo}
                        alt="Buyer User Image"
                    />
                )}
            </IconWrapper>
            {currentUser ? (
                <>
                    <UserInfo>
                        <Name>{currentUser.username}</Name>
                        <Logout />
                    </UserInfo>
                </>
            ) : (
                <>
                    <h2>Register</h2>
                </>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #f5f5f5;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
    margin-right: 10px;
`;

const UserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`;

const Name = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
`;

const LogoutButton = styled.button`
    background-color: #f44336;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #d32f2f;
    }
`;
