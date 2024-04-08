import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Marketplace from "../components/Marketplace";
import Dashboard from "../components/Dashboard";

export default function Landing() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [showDashboard, setShowDashboard] = useState(true);

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

    return (
        <Container>
            <div className="container">
                <Header
                    currentUser={currentUser}
                    showDashboard={showDashboard}
                    setShowDashboard={setShowDashboard}
                />
                {showDashboard ? <Dashboard /> : <Marketplace />}
                <Footer />
            </div>
        </Container>
    );
}

const Loader = () => <div>Loading...</div>;

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
        background-color: #f3f0ff;
        justify-content: space-between;
        flex-direction: column;
        display: flex;
    }
`;
