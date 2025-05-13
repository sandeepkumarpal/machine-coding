import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [products, setProducts] = useState(0);
  const [page, setPage] = useState(3);

  const fetchproducts = async () => {
    let res = await fetch("https://dummyjson.com/products?limit=100");

    const data = await res.json();

    if (data && data?.products) setProducts(data?.products);
  };

  console.log("products :>> ", products);
  useEffect(() => {
    fetchproducts();
  }, []);

  const selectPagehandler = (selectedpage) => {
    console.log(selectedpage);
    if (
      selectedpage >= 1 &&
      selectedpage <= products.length / 10 &&
      selectedpage !== page
    ) {
      setPage(selectedpage);
    }
  };

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products?.slice(page * 10 - 10, page * 10)?.map((product) => {
            return (
              <span className="products__single" key={product?.id}>
                <img src={product?.thumbnail} alt={product?.title} />
                <span>{product?.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disable"}
            onClick={() => selectPagehandler(page - 1)}
          >
            prev
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selectedPage" : ""}
                onClick={() => selectPagehandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            className={page < products.length / 10 ? "" : "pagination_disable"}
            onClick={() => selectPagehandler(page + 1)}
          >
            next
          </span>
        </div>
      )}
    </>
  );
}

export default App;
