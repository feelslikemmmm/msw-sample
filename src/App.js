import { Fragment, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState({ title: '', size: '' });

  const { title, size } = product;

  const onChangeProduct = (e) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    }).then((res) => {
      fetch('/products')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        });
    });
  };

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className="App">
      <h2>상품 목록</h2>
      <ul>
        {products &&
          products.map((product, idx) => (
            <Fragment key={idx}>
              <li>상품명: {product.title}</li>
              <li>사이즈: {product.size}</li>
            </Fragment>
          ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="상품 명"
          value={title}
          onChange={onChangeProduct}
        />
        <input
          type="text"
          name="size"
          placeholder="사이즈"
          value={size}
          onChange={onChangeProduct}
        />
        <button type="submit">상품 추가하기</button>
      </form>
    </div>
  );
}

export default App;
