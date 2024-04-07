import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
    width: 180px;
    height: 100%;
    background-color: #333;
    color: white;
    padding-top: 20px;
`;

const SidebarItem = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    background-color: ${(props) =>
        props.selected ? "#765bee" : "transparent"};

    &:hover {
        background-color: #524395;
    }
`;

export default function Sidebar({ selectedValue, setSelectedValue }) {
    return (
        <SidebarContainer>
            <SidebarItem
                selected={selectedValue === "Dashboard"}
                onClick={() => setSelectedValue("Dashboard")}
            >
                Dashboard
            </SidebarItem>
            <SidebarItem
                selected={selectedValue === "My Listings"}
                onClick={() => setSelectedValue("My Listings")}
            >
                {" "}
                My Listings
            </SidebarItem>
        </SidebarContainer>
    );
}
