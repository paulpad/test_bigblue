import * as React from "react";
import "./index.css";

const Shop = (props) => {
  return (
    <div className="card m-4 w-50 pb-4">
      <h1 className="card-header">Shop</h1>
      {/*  Add a searchBar to filter products by name */}
      <input type="text" className="form-control" placeholder="Search" onChange={(e) => props.setSearchTerm(e.target.value)} value = {props.searchTerm}/>
      <div className="d-flex justify-content-between flex-wrap">
        {/* Modify mapping to filter products by name */}
        {props.products.filter((product) =>
            product.name.toLowerCase().includes(props.searchTerm.toLowerCase()) 
          ).map((product) => (
          <div className="col-md-4 mt-4" key={product.id}>
            <div className="card">
              <div className="card-img-container">
                <img
                  className="card-img-top h-100 w-100"
                  src={product.image_url}
                  alt={product.name}
                  // Grey the images if the quantity is null
                  style={{ filter: props.availableProducts[product.id] === 0 ? "grayscale(100%)" : "none" }}
                />
              </div>
              <div className="card-body">
                <span className="card-title">
                  <div className="d-flex justify-content-between">
                    <span>{product.name}</span>
                    {/* Display the number of products left in stock, in red if it's the final one*/}
                    <span style={{ color: props.availableProducts[product.id] <= 1   ? "red":props.availableProducts[product.id] > 5 ? 'black':"orange" }}>{props.availableProducts[product.id]} left</span>
                    <span>{product.price}$</span>
                  </div>
                </span>
                <span className="d-flex justify-content-between">
                <div className="d-flex flex-column align-items-end mt-2">
                  <table className="table">
                    <tbody>
                      <tr>
                      <td>                      
                        {/* if we hit 0 in stock, the add to cart button disappear */}
                        {props.availableProducts[product.id] != 0 && (<button
                          onClick={() => props.onAddToCart(product.id)}
                          className="btn btn-primary btn-sm"
                          style = {{fontSize: "15px"}}>
                          Add
                          </button>
                          )}
                      </td>
                      <td>
                          {/* If the cart is not empty, display the delete button */}
                        {props.inCartProducts[product.id] > 0 && (<button
                          onClick={() => props.onDeleteFromCart(product.id)}
                          className="btn btn-danger btn-sm"
                          style={{ fontSize: "15px" }}>
                          Delete
                        </button>)}
                      </td>
                      </tr>       
                    </tbody>
                  </table>
                </div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Shop };
