import * as React from "react";

const Cart = (props) => {
  // Add two function to calculate total price and total stock
  const calculateTotalPrice = () => {
    return props.products.reduce((total, product) => {
      const quantity = props.inCartProducts[product.id] || 0; // 0 if the product i s not in the cart
      return total + product.price * quantity; // total = price * quantity
    }, 0);
  };
  const calculateTotalStock = () => {
    return props.products.reduce((total, product) => {
      const quantity = props.inCartProducts[product.id] || 0; // 0 if the product is not in the cart
      return total + quantity; // total = sum(quantity)
    }, 0);
  };
  return (
    <div className="card w-50 m-4 pb-4">
      <h1 className="card-header">Shopping Cart</h1>
      <table className="table" class="table table-striped"> 
        <thead>
          <tr class="table-light">
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Add a filter to display only products that are in the cart */}
          {props.products.filter((product) => props.inCartProducts[product.id] > 0).map((product) => (
            <tr class= "table table-striped" key={product.id}>
              <td>{product.name}</td>
              <td>{props.inCartProducts[product.id]}</td>
              <td>{product.price}$</td>
              {/* Add a button to get rid of items directly from the cart */}
              <td><button className="btn btn-primary" onClick={() => props.onDeleteFromCart(product.id)}>Delete 1 from cart</button></td>
              <td><button className="btn btn-primary" onClick={() => props.DeleteAllFromCart(product.id)}>Delete all from cart</button></td>      
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add a table to display the total stock and the total price of the cart. */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Total stock</th>
            <th scope="col">{calculateTotalStock()}</th>
            <th scope="col">Total price</th>
            <th scope="col">{calculateTotalPrice()}$</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export { Cart };
