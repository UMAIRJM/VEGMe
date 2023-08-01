
import { AddItem, RemoveItem } from "./ActionType"

const initialState =[]
export const Reducer =(state=initialState,action)=>{
    switch(action.type){
        case AddItem:
            console.log('in reducer',action.payload)
            const ExistingItem = state.find(item => item.key === action.payload.key)
            if (ExistingItem){
                if(ExistingItem.Quantity+action.payload.Quantity > action.payload.Available ) {
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
            }
            case RemoveItem:
            const DeleteArray = state.filter((item,index)=>{
                return (index !== action.payload )
            });
            return DeleteArray;
        default:
            return state;
    }
}