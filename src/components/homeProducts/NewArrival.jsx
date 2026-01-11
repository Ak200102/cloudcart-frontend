import { useEffect, useState } from "react";
import SlickSlider from "react-slick";
import NextArrow from "../NextArrow";
import PreviousArrow from "../PreviousArrow";
import Title from "../ui/title";
import ProductCard from "../ProductCard";
import { getData } from "../../helpers";
import { serverUrl } from "../../../config";


const Slider = SlickSlider.default || SlickSlider;

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    responsive: [
      {
        breakpoint: 1025, // tablet landscape
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769, // tablet portrait
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const endpoint = `${serverUrl}/api/product/list?_type=new_arrivals`;
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await getData(endpoint);
        // Handle the new API response format that includes success field
        setProducts(data?.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Render skeleton loading state
  if (loading) {
    return (
      <div className="w-full py-10">
        <div className="flex items-center justify-between">
          <Title className="text-2xl mb-3 font-bold">New Arrivals</Title>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse"
            >
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-10">
      <div className="flex items-center justify-between">
        <Title className="text-2xl mb-3 font-bold">New Arrivals</Title>
        {/* <Link to={"/shop"}>See all</Link> */}
      </div>

      {/* Conditionally render slider or grid based on product count */}
            {isMobile ? (
              <div className="grid grid-cols-2 gap-4">
                {products.map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              /* TABLET + DESKTOP: SLIDER  */
              <Slider {...settings}>
                {products.map((item) => (
                  <div key={item._id} className="px-2">
                    <ProductCard item={item} />
                  </div>
                ))}
              </Slider>
            )}

      {/* Show message when no products */}
      {(!products || products.length === 0) && (
        <div className="text-center py-8 text-gray-500">
          <p>No new arrivals available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;