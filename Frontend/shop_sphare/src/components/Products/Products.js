// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Style/Products.css";
// import Card from "../Card/Card";

// const Products = ({showAlert}) => {

//   const [products, setProducts] = useState([]);
//   const productContainerRef = useRef(null);
//   const navigate = useNavigate(); // Added: Initialize navigate for routing.

//   const fetchProducts = async () => {
//     const url = await fetch(`https://fakestoreapi.com/products?`);
//     const data = await url.json();
//     setProducts(data);
//   };
  
//    // Added: Function to handle card click and navigate to SingleProduct with the product ID.
//    const handleCardClick = (product) => {
//     navigate(`/SingleProduct/${product.id}`); // Navigating to SingleProduct route with ID.
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const scroll = (direction) => {
//     const { current } = productContainerRef;
//     if (direction === "next") {
//       current.scrollLeft += 300;
//       if (current.scrollLeft + current.clientWidth >= current.scrollWidth) {
//         fetchProducts();
//       }
//     } else {
//       current.scrollLeft -= 300;
//     }
//   };

//   return (
//     <div className="container card my-3">
//       <h3 className="text-center mt-2">Products you may like!</h3>
//       <div className="position-relative">
//         <button
//           className="carousel-control-prev position-absolute top-50 start-0 translate-middle-y"
//           onClick={() => scroll("prev")}
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>

//         <div
//           className="d-flex overflow-auto caro-hight"
//           ref={productContainerRef}
//           style={{ scrollBehavior: "smooth" }}
//         >
//           {products.map((product) => (
//             <div className="col-md-3 flex-shrink-0" key={product.id}  onClick={() => handleCardClick(product)} >
//               <Card
//                 category={product.category}
//                 title={product.title?product.title.slice(0, 20):"No Title"}
//                 id={product.id}
//                 image={product.image}
//                 price={product.price}
//                 rating={product.rating}
//                 showAlert={showAlert}
//               />
//             </div>
//           ))}
//         </div>

//         <button
//           className="carousel-control-next position-absolute top-50 end-0 translate-middle-y"
//           onClick={() => scroll("next")}
//         >
//           <span
//             className="carousel-control-next-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Products;



import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Card from "../Card/Card";

const Products = ({ showAlert }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Added: State for filtered products.
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const data = await response.json();
    setProducts(data);
    setFilteredProducts(data); // Initially, display all products.
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    navigate(`/SingleProduct/${product.id}`); // Navigate to SingleProduct page.
  };

  return (
    <div className="container card my-3">
      <h3 className="text-center mt-2">Products you may like!</h3>

      <div className="d-flex flex-wrap justify-content-start">
        {filteredProducts.map((product) => (
          <div
            className="col-md-3 flex-shrink-0 my-2"
            key={product.id}
            onClick={() => handleCardClick(product)}
          >
            <Card
              category={product.category}
              title={product.title}
              id={product.id}
              image={product.image}
              price={product.price}
              rating={product.rating}
              showAlert={showAlert}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
