import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Card from './pages/card/Card';
import Catalog from './pages/catalog/Catalog';
import Header from './components/header/Header';
import { Product } from './types/product';
import ProductCard from './pages/productCard/ProductCard';
import Admin from './pages/admin/Admin';
import Footer from './components/footer/Footer';

interface ProductItem {
  product: Product,
  count: number
}

function App() {
  const localStor = localStorage.getItem('card')
  const products: ProductItem[] = localStor !== null ? JSON.parse(localStor) : []

  const [cardCount, setCardCount] = useState(products.length)
  const [cardSum, setCardSum] = useState(0)
  const [addedToCart, setAddedToCart] = useState(0)

  const onClickBB = () => {
    setAddedToCart(addedToCart + 1)
  }

  useEffect(() => {
    const localStor = localStorage.getItem('card')
    const products: ProductItem[] = localStor !== null ? JSON.parse(localStor) : []
    const productsCount = products.reduce((sum, current) => sum + current.count, 0)
    const totalSum = products.reduce((sum, current) => sum + current.count * current.product.price, 0)
    setCardSum(totalSum)
    setCardCount(productsCount)
  }, [addedToCart])

  return (
    <div className="app">
      <BrowserRouter>
        <Header cardCount={cardCount} cardSum={cardSum}/>
        <Routes>
          <Route path='/sultan' element={<Catalog onClick={onClickBB} />} />
          <Route path='/sultan/card' element={<Card onClick={onClickBB}/>} />
          <Route path='/sultan/product/:id' element={<ProductCard onClick={onClickBB}/>} />
          <Route path='/sultan/admin' element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
