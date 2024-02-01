import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/Axios";

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setFilteredProducts] = useState(null);

  const getProductsCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category === "undefined")
      setFilteredProducts(products);
    if (category != "undefined") getProductsCategory();
  }, [category, products]);

  return products ? (
    <>
      <Navbar />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p) => {
            return (
              <Link
                key={p.id}
                to={"/details/" + p.id}
                className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex flex-col justify-center items-center"
              >
                <div
                  className="w-full h-[80%] mb-3 bg-contain bg-no-repeat bg-center hover:scale-110"
                  style={{
                    backgroundImage: `url(${p.image})`,
                  }}
                ></div>
                <h1 className="hover:text-violet-400">{p.title}</h1>
              </Link>
            );
          })}
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
