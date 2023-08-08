import { AddItem, RemoveItem, ClearAll } from "./ActionType";


export const AddItemToCart = data =>({
    type: AddItem,
    payload: data,

});

export const RemoveItemFromCart = index =>({
    
    type: RemoveItem,
    payload: index,

});

export const ClearFullState = () => dispatch =>{
    dispatch({
        type: ClearAll


    });
}

