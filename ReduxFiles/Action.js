import { AddItem,RemoveItem } from "./ActionType"


export const AddItemToCart = data =>({
    type: AddItem,
    payload: data

});

export const RemoveItemFromCart = index =>({
    
    type: RemoveItem,
    payload: index

});