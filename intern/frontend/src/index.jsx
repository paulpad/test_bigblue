import * as React from "react";
import * as ReactDOM from "react-dom";
import { Cart } from "./components/Cart/Cart";
import { Shop } from "./components/Shop/Shop";

const App = () => {
  const [products, setProducts] = React.useState([]);

  // availableProducts is an object that looks like
  // { ['product 1 name']: number of products 1 available,
  //   ['product 2 name']: number of products 2 available,
  //    ....
  //  }
  const [availableProducts, setAvailableProducts] = React.useState({});

  // inCartProducts is an object that looks like
  // { ['product 1 name']: number of products 1 in cart,
  //   ['product 2 name']: number of products 2 in cart,
  //    ....
  //  }
  // A product item is either available or in cart so that
  // product.stock = availableProducts[product.id] + inCartProducts[product.id]
  const [inCartProducts, setInCartProducts] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");

  // Fetch products from the backend
  // and store them in the products state.
  React.useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products.products);

        // Initialize availableProducts and cartProducts
        const initialAvailableProducts = products.products.reduce(
          (acc, curr) => {
            return { ...acc, [curr.id]: curr.stock };
          },
          {}
        );
        const initialInCartProducts = products.products.reduce((acc, curr) => {
          return { ...acc, [curr.id]: 0 };
        }, {});

        setAvailableProducts(initialAvailableProducts);
        setInCartProducts(initialInCartProducts);
      });
  }, []);

  // Add a product to cart.
  // Updating corresponding quantities in availableProducts and inCartProducts
  const onAddToCart = (productId) => {
    const availableBeforeAdd = availableProducts[productId];
    setAvailableProducts({
      ...availableProducts,
      [productId]: availableBeforeAdd -  1,
    });
    const inCartBeforeAdd = inCartProducts[productId];
    setInCartProducts({
      ...inCartProducts,
      [productId]: inCartBeforeAdd + 1,
    });
  };

  const onDeleteFromCart = (productId) => {{
    const availableBeforeDelete = availableProducts[productId];
    setAvailableProducts({
      ...availableProducts,
      [productId]: availableBeforeDelete + 1,
    });
    const inCartBeforeDelete = inCartProducts[productId];
    setInCartProducts({
      ...inCartProducts,
      [productId]: inCartBeforeDelete - 1,
    });
  };
  }
  const DeleteAllFromCart = (productId) => {{
    const availableBeforeDelete = availableProducts[productId];
    const inCartBeforeDelete = inCartProducts[productId];
    setAvailableProducts({
      ...availableProducts,
      [productId]: availableBeforeDelete + inCartBeforeDelete,
    });
    setInCartProducts({
      ...inCartProducts,
      [productId]: 0,
    });
  };
  }
  // What is displayed.
  // Display the Shop component and the Cart component.
  return (
    <div className="d-flex justify-content-between">
      <Shop
      
        products={products}
        availableProducts={availableProducts}
        onAddToCart={onAddToCart}
        onDeleteFromCart={onDeleteFromCart}
        inCartProducts={inCartProducts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Cart products={products} inCartProducts={inCartProducts} onDeleteFromCart={onDeleteFromCart} DeleteAllFromCart={DeleteAllFromCart}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
