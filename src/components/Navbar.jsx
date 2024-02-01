import { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { Link } from "react-router-dom";

function Navbar() {
  const [products] = useContext(ProductContext);

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()}, ${(
      Math.random() * 255
    ).toFixed()}, ${(Math.random() * 255).toFixed()}, 0.4)`;
  };

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  return (
    <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5">
      <a
        className="py-2 px-5 border rounded border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white"
        href="/create"
      >
        Add New Product
      </a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-xl mb-3 w-[80%]">Category Filter</h1>
      <div className="w-[80%]">
        {distinct_category.map((cat, i) => (
          <Link
            to={`/?category=${cat}`}
            key={i}
            className="mb-3 flex items-center"
          >
            <span
              style={{ backgroundColor: color() }}
              className="w-[10px] h-[10px] mr-2 rounded-full"
            ></span>
            <p className="text-sm capitalize">{cat}</p>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
