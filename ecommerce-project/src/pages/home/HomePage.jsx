import axios from 'axios';
import { useEffect,useState } from "react";
import { Header } from "../../components/Header";
import './HomePage.css'
import { Helmet } from "react-helmet-async";
import { ProductsGrid } from './ProductsGrid';

export function HomePage ({cart}) {
  const [products, setProducts] = useState ([]);
  

  useEffect(() => {
    axios.get ('http://127.0.0.1:3000/api/products')
  .then((response) => {
    setProducts(response.data);
    });
   
  },[] );

  
  
  return (
    <>

<Helmet>
        <title>Home - Ecommerce</title>
        <link rel="icon" href="/home-favicon.png?v=1" type="image/png" />
      </Helmet>
   
<Header cart={cart} />

    <div className="home-page">
      <ProductsGrid products={products} />
    </div>
</>
  );
}