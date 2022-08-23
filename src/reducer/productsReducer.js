export function productsReducer(initialState = [], action) {
  switch (action.type) {
    case "add product":
      return [...initialState, action.payload];
      break;
    case "edit product":
      const productsValidate = initialState.filter(
        (p) => p.id != action.payload.id
      );
      const productValidate = productsValidate.find(
        (p) => p.id == action.payload.product.id
      );
      if (productValidate) {
        return initialState;
      } else {
        return initialState.map((product) => {
          if (product.id == action.payload.id) {
            return action.payload.product;
          }
          return product;
        });
      }
      break;
    case "delete product":
      return initialState.filter((product) => product.id != action.payload);
      break;

    default:
      return initialState;
      break;
  }
}
