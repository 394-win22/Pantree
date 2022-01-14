import styled from 'styled-components';

export const MainLayout = styled.div`
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        position: fixed; 
        flex-direction: column;
        background: #fff;
        z-index: 0;
    `

export const Header = styled.div`
        display: flex;
        width: 75%;
        height: 12%;
        flex-direction: column;
        align-items: left;
        justify-content: center;
    `
export const H1 = styled.p`
        font-family: Raleway;
        font-style: italic;
        font-weight: 900;
        font-size: 32px;
        line-height: 38px;
        color: #000000;
    `

export const Content = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        width: 100%;
        height: 88%;
        overflow-y: auto;
    `

export const ItemCard = styled.div`
        display: grid;
        width: 100%;
        max-width: 500px;
        height: 134px;
        background: #FFFFFF;
        box-shadow: 4px 4px 10px 5px rgba(57, 57, 57, 0.1);
        border-radius: 15px;
        margin-bottom: 27px;
        grid-template-columns: 38% 62%;
        grid-template-rows: 46% 19% 20%;
        grid-template-areas: 
            'img item-name '
            'img purchase-date'
            'img exp-date';
    `

export const ItemImg = styled.img`
        display: flex;
        align-items: center;
        justify-content: center;
        grid-area: img;
        align-self: center;
        justify-self: center;
        margin-top: 20px;
    `

export const ItemName = styled.p`
        grid-area: item-name; 
        font-family: Quicksand;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        margin-top: 20px;
        color: #000000;
        text-transform: capitalize;
        overflow-wrap: break-word;
    `

export const PurchaseDate = styled.p`
        grid-area: purchase-date; 
        font-family: Quicksand;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #989898;
    `

export const ExpDate = styled.p`
        grid-area: exp-date; 
        font-family: Quicksand;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        color: #989898;
        align-self: top;
    `
