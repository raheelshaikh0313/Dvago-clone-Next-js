function cartReducer(state, action) {
  switch (action.type) {
    case "addProduct":

      const exist = state.find(
        item => item.id === action.data.id
      )

      if (exist) {

        return state.map(item =>

          item.id === action.data.id

            ? {
              ...item,
              quantity: (item.quantity || 1) + 1
            }

            : item
        )
      }

      return [
        ...state,
        {
          ...action.data,
          quantity: 1
        }
      ]
    case "deleteProduct":
      const id = action.data.id
      const updateData = state.filter((v) => {
        return v.id != id
      })
      return updateData
    case "deleteAllProduct":
      return []
    case "increaseQty":

      return state.map(item =>

        item.id === action.id

          ? {
            ...item,
            quantity: item.quantity + 1
          }

          : item
      )
    case "decreaseQty":

      return state.map(item =>

        item.id === action.id

          ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1
          }

          : item
      )
      case "removeProduct":
        

 return state.filter(
  item => item.id !== action.id
 )
 case "removeProduct":
  return state.filter(
    item => item.id !== action.id
  );

  case "setCart":
  return action.data;

default:
  return state;
  }
}
export default cartReducer