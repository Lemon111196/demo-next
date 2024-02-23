import styled from "styled-components";

export const NavbarContainer = styled.div`
    background-color: antiquewhite;
    .wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
    }
    .first-part{
        display: flex;
    }
    .list-item{
        display: flex;
    }
    .list-item li{
        list-style: none;
        font-weight: 1000;
        font-size: 20px;
        padding-right: 20px;
        cursor: pointer;
    }
    .img{
        margin-right: 20px;
    }
    .list{
        list-style: none;
        background-color: #D7E7A9;
        color: grey;
        width: 10%;
        padding: 10px;
        text-align: center;
        position: absolute;
        top: 55px;
        right: 20px;
    }
`;