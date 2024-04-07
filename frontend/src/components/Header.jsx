import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ClientLogo from "../images/logo.jpeg";
import CustomerLogo from "../images/logo.jpeg";
import { useNavigate } from "react-router-dom";
import Marketplace from "./Marketplace";

export default function Header({
    currentUser,
    showDashboard,
    setShowDashboard,
}) {
    // console.log("header: ", currentUser.type == "Seller");
    const navigate = useNavigate();

    if (currentUser == undefined) {
        navigate("/");
        return;
    }

    const handleDashboardClick = () => {
        if (setShowDashboard) {
            setShowDashboard(!showDashboard);
        } else {
            navigate("/");
        }
    };

    return (
        <Container>
            <IconWrapper>
                {currentUser.type == "Seller" ? (
                    <UserImage src={ClientLogo} alt="Seller User Image" />
                ) : (
                    <UserImage src={CustomerLogo} alt="Buyer User Image" />
                )}
            </IconWrapper>
            <IconWrapper></IconWrapper>
            {currentUser ? (
                <>
                    <UserInfo>
                        <Name>{currentUser.username}</Name>
                        {currentUser.type == "Seller" && (
                            <>
                                {!showDashboard ? (
                                    <HeaderButton
                                        onClick={() => {
                                            handleDashboardClick();
                                        }}
                                    >
                                        {" "}
                                        Dashboard{" "}
                                    </HeaderButton>
                                ) : (
                                    <HeaderButton
                                        onClick={() => {
                                            handleDashboardClick();
                                        }}
                                    >
                                        Marketplace
                                    </HeaderButton>
                                )}
                            </>
                        )}
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
    width: 100%;
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

const HeaderButton = styled.button`
    background-color: #a680ff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    margin-right: 20px;
    margin-left: 12px;
    height: 37px;
    border-radius: 7px;
    font-weight: bold;
    color: black;

    &:hover {
        background-color: #724ccb;
    }
`;
