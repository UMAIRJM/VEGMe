

import { AddItem, RemoveItem, ClearAll } from "./ActionType";

const initialState =[]
export const Reducer =(state=initialState,action)=>{
    switch(action.type){
        case AddItem:
            
            const ExistingItem = state.find(item => item.key === action.payload.key)
            if (ExistingItem){
                if(action.payload.Quantity > ExistingItem.Available ) {
                    return state; 
                    
                }
                else{
                return state.map(item=>
                    item.key === action.payload.key ?  { ...item,Quantity:item.Quantity+action.payload.Quantity,
                        Available:item.Available-action.payload.Quantity,
                        TotalPrice: item.TotalPrice + action.payload.TotalPrice
                    }
                        :item)
                    
                }
            }
            else{
                

            return[...state,action.payload]
            console.log(action.payload)
            }
        case RemoveItem:
                const keyToRemove = action.payload;
                const deleteArray = state.filter((item) => item.key !== keyToRemove);
                return deleteArray;
        case ClearAll:
            return [];

        default:
            return state;
    }
}