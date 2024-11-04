import React, {useState, useEffect} from 'react'
import './Style/Women.css'
import Card from '../Card/Card'

const Women = () => {
  const [woMenProduct, setWoMenProduct] = useState([])

  const woManProduct = async () => {
    const url = await fetch(`https://fakestoreapi.com/products/category/women's clothing`);
    const newUrl = await url.json();
    setWoMenProduct(newUrl);
  }
  useEffect(() => {
    woManProduct();
  }, [])

  return (
    <div>
      <div className="container card my-3">
        <h3 className='text-center m-md-3'>Women's Clothing</h3>
      {woMenProduct.map((product) => (
        <div className="" key={product.id}>
              <Card
                title={product.title}
                id={product.id}
                image={product.image}
                price={product.price}
                // category={product.category}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Women
