import React, {useState, useEffect} from 'react'
import "./Style/SingleProduct.css"
import Card from '../Card/Card'

const SingleProduct = ({fetchSingleProduct}) => {

  const [singleProduct, setsingleProduct] = useState(null)

  const viewSingleProduct = async () => {
    setsingleProduct(fetchSingleProduct);
  }

  useEffect(() => {
    singleProduct();
  }, []);

  return (
    <div className="container">
      <div className="card m-3">
        {/* <h3 className="text-center m-md-2">Women's Clothing</h3> */}
        <div className="d-flex overflow-auto caro-hight">
          {singleProduct.map((product) => (
            <div className="" key={product.id}>
              <Card
                title={product.title ? product.title.slice(0, 20) : "No Title."}
                id={product.id}
                image={product.image}
                price={product.price}
                rating={product.rating}
                onClick={() => fetchSingleProduct(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
