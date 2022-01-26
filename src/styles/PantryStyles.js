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
        margin-bottom: 20px;
        justify-content: center;
    `

export const H1 = styled.p`
        font-family: Raleway;
        font-style: italic;
        font-weight: 900;
        font-size: 32px;
        line-height: 38px;
        margin-top: 50px;
        color: #000000;
    `

export const Content = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        width: 100%;
        height: 88%;
        margin-top: 10%;
        overflow-y: auto;
    `


    //min-height: 130px;
    //overflow: hidden;
export const ItemCard = styled.div`
    display: grid;
    width: 100%;
    max-width: 600px;
    height:134px;
    
    box-shadow: 4px 4px 10px 5px rgba(57, 57, 57, 0.1);
    border-radius: 15px;
    margin-bottom: 27px;
    
    grid-template-columns: 38% 42% 20%;
    grid-template-rows: 60% 12% 28%;
    grid-template-areas: 
        'img item-name delete'
        'img purchase-date purchase-date'
        'img exp-date edit';
    background: ${({ bg }) => handleBGcolor(bg)};
`
//grid-template-rows: 56% 19% 35%;

const handleBGcolor = bg => {
    switch (bg) {
      case 1: // on mouse enter
        return "#e9ffdb";
      case 2: // on mouse leave
        return "#FFFFFF";
      default:
        return "#FFFFFF"
    }
  };

export const ItemImg = styled.img`
        display: flex;
        align-items: center;
        justify-content: center;
        grid-area: img;
        align-self: center;
        justify-self: center;
        margin-top: 20px;
        width: 50px;
        height: 50px;
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
        ${({ active }) => active && `
        color: red;
      `}
    `

export const DeleteButton = styled.p`
    grid-area: delete; 
    font-family: Quicksand;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #989898;
    align-self: top;
    padding: 8px;
    padding-top: 15px;
`

export const EditButton = styled.p`
    grid-area: edit; 
    font-family: Quicksand;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #989898;
    align-self: top;
    padding: 8px;
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
    align-self: top;
    color: ${({ color }) => handleColorType(color)};
`

const handleColorType = color => {
    switch (color) {
      case 2: // not gonna expire soon
        return "#989898";
      case 1: // about to expire
        return "#ffa500";
      case 0: //expired
        return "#ff0000";
        
      default:
        return "#989898"
    }
  };
