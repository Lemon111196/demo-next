import { Dialog } from "@mui/material";
import styled from "styled-components";

export const ModalContainer = styled(Dialog)`
        .dialog-container{
        padding: 20px;
        width: 500px;
        height: 400px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        position: relative;
    }
    .header{
        position: absolute;
        top: 10px;
    }
    .group-btn{
        position: absolute;
        bottom: 10px;
        right: 10px
    }
    .cancel{
        margin-right: 10px;
    }
    .confirm{
        margin-right: 10px;
    }
    .text-field-title{
        margin-bottom: 15px;
    }
    .text-field-content{
        margin-bottom: 15px;
    }
    .text{
        width: 457px;
    }
    .dialog-title{
        margin-top: 30px;
        margin-bottom: 17px;
    }
    .dialog-url{
        margin-bottom: 17px;
    }
    .dialog-status{
        margin-bottom: 17px;
    }
    .error{
        margin-left: 7px;
        color: red;
    }
`;