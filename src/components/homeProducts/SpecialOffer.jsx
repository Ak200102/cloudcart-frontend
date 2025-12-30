// import { useEffect, useState } from "react";

// import NextArrow from "../../components/NextArrow";
// import PreviousArrow from "../../components/PreviousArrow";
// import Title from "../ui/title";
// import ProductCard from "../../components/ProductCard.jsx";
// import { getData } from "../../helpers";
// import { serverUrl } from "../../../config";
// import SlickSlider from "react-slick";
// const Slider = SlickSlider.default || SlickSlider;


// const SpecialOffers = () => {
//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PreviousArrow />,
//     responsive: [
//       {
//         breakpoint: 1025,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 769,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           infinite: true,
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//     ],
//   };
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   // const endpoint = "http://localhost:8000/products/?_type=offers";
//   const endpoint = `${serverUrl}/api/product/list?offer=true`;



//   useEffect(() => {
//     const getProducts = async () => {
//       setLoading(true);
//       try {
//         const data = await getData(endpoint);
//         // Handle the new API response format that includes success field
//         setProducts(data?.products || []);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getProducts();
//   }, []);

//   // Render skeleton loading state
//   if (loading) {
//     return (
//       <div className="w-full py-10">
//         <div className="flex items-center justify-between">
//           <Title className="text-2xl mb-3 font-bold">Special Offers</Title>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {Array.from({ length: 4 }).map((_, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse"
//             >
//               <div className="aspect-square bg-gray-200"></div>
//               <div className="p-4">
//                 <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                 <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full py-10">
//       <div className="flex items-center justify-between">
//         <Title className="text-2xl mb-3 font-bold">Special Offers</Title>
//       </div>

//       {/* Conditionally render slider or grid based on product count */}
//       {products && products.length > 3 ? (
//         // Use slider when more than 3 products
//         <Slider {...settings}>
//           {products?.map((item) => (
//             <div key={item?._id} className="px-1 sm:px-2">
//               <ProductCard item={item} />
//             </div>
//           ))}
//         </Slider>
//       ) : (
//         // Use simple grid when 3 or fewer products
//         <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products?.map((item) => (
//             <ProductCard item={item} key={item?._id} />
//           ))}
//         </div>
//       )}

//       {/* Show message when no products */}
//       {(!products || products.length === 0) && (
//         <div className="text-center py-8 text-gray-500">
//           <p>No special offers available at the moment.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SpecialOffers;
import { useEffect, useState } from "react";
import SlickSlider from "react-slick";
import NextArrow from "../../components/NextArrow";
import PreviousArrow from "../../components/PreviousArrow";
import Title from "../ui/title";
import ProductCard from "../../components/ProductCard";
import { getData } from "../../helpers";
import { serverUrl } from "../../../config";

// IMPORTANT: handle default export safely
const Slider = SlickSlider.default || SlickSlider;

const SpecialOffers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //  mobile detection (ONLY used for layout)
  const isMobile = window.innerWidth < 640;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const endpoint = `${serverUrl}/api/product/list?offer=true`;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await getData(endpoint);
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

  // Skeleton
  if (loading) {
    return (
      <div className="w-full py-10">
        <Title className="text-2xl mb-4 font-bold">Special Offers</Title>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-10">
      <Title className="text-2xl mb-4 font-bold">Special Offers</Title>

      {/*  MOBILE: 2 PRODUCTS PER ROW */}
      {isMobile ? (
        <div className="grid grid-cols-2 gap-3">
          {products.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        /*  DESKTOP/TABLET: UNCHANGED SLIDER */
        <Slider {...settings}>
          {products.map((item) => (
            <div key={item._id} className="px-2">
              <ProductCard item={item} />
            </div>
          ))}
        </Slider>
      )}

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No special offers available.
        </p>
      )}
    </div>
  );
};

export default SpecialOffers;