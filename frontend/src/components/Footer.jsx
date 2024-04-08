import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 120px;
`;

const SocialMedia = styled.div`
    display: flex;
`;

const SocialLink = styled.a`
    margin-right: 10px;

    img {
        width: 30px; /* Adjust according to your design */
        height: auto;
    }
`;

const Tagline = styled.p`
    margin: 0;
`;

export default function Footer() {
    return (
        <StyledFooter>
            <Tagline>Surplus Solved</Tagline>
            <SocialMedia>
                <SocialLink
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
                        alt="Facebook"
                    />
                </SocialLink>

                <SocialLink
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
                        alt="Instagram"
                    />
                </SocialLink>
                {/* Add more social media links as needed */}
            </SocialMedia>
        </StyledFooter>
    );
}
