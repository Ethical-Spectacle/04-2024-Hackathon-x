import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";

function CustomerCheckout() {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

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
        <Container>
            <Header currentUser={currentUser} />
            <div className="container">
                <ShoppingCart total={total} setTotal={setTotal}/>
                {/* <Payment total={total}/> */}
            </div>
        </Container>
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

export default CustomerCheckout;
