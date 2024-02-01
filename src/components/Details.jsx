import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/Axios";
import Loading from "./Loading";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get("/products/" + id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return product ? (
    <div className="w-[75%] flex h-full justify-between items-center m-auto p-[10%]">
      <img className="w-[40%] h-[80%] object-contain" src={product.image} />
      <div className="content w-[50%]">
        <h1 className="text-3xl">{product.title}</h1>
        <h3 className="text-zinc-400 my-5 capitalize">{product.category}</h3>
        <h2 className="text-red-300">${product.price}</h2>
        <p className="my-[5%]">{product.description}</p>
        <Link className="py-2 px-5 mr-5 border rounded border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white">
          Edit
        </Link>
        <Link className="py-2 px-5 border rounded border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
          Delete
        </Link>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;
