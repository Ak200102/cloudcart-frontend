// export default SearchInput;
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { getData } from "../helpers";
import { config } from "../../config";
import PriceFormat from "./PriceFormat";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef(null);
  const navigate = useNavigate();

  //  Fetch products on search
  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts([]);
      return;
    }

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const endpoint = `${config.baseUrl}/api/products?_search=${encodeURIComponent(
          search
        )}`;
        const data = await getData(endpoint, {
          signal: controller.signal,
        });
        setFilteredProducts(data?.products || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [search]);

  //  Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="flex-1 h-12 relative max-w-2xl">
      {/* Input */}
      <div className="relative h-full">
        <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          className="w-full h-full border border-gray-200 rounded-full outline-none pl-12 pr-12 text-gray-900 placeholder-gray-500 bg-gray-50 focus:bg-white focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <IoCloseOutline className="text-xl" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isInputFocused && search && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center text-gray-600">
              Searching…
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="p-3 bg-gray-50 border-b text-sm text-gray-600 font-medium">
                {filteredProducts.length} product
                {filteredProducts.length > 1 ? "s" : ""} found
              </div>

              <div className="max-h-80 overflow-y-auto">
                {filteredProducts.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSearch("");
                      setIsInputFocused(false);
                      navigate(`/product/${item._id}`, {
                        state: { item },
                      });
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    {/* Image */}
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      {item?.images?.[0] || item?.image ? (
                        <img
                          src={item?.images?.[0] || item?.image}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <CiSearch />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <PriceFormat
                        amount={item.price}
                        className="text-sm text-gray-600"
                      />
                    </div>

                    <CiSearch className="text-gray-400" />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <CiSearch className="text-3xl text-gray-400 mx-auto mb-3" />
              <p className="font-medium text-gray-900">No results found</p>
              <p className="text-sm text-gray-500 mt-1">
                No products match “{search}”
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;

