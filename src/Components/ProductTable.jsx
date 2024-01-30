import React, { useState, useEffect } from 'react';
import axios from 'axios';
import createNewObject from './newProduct';

/*----------------Hooks-----------------*/
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [run ,setRun] =useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        if (storedProducts.length > 0) 
        {
          setProducts(storedProducts);
        } 
        else
        {
          const response = await axios.get('https://fakestoreapi.com/products/');
          const fetchedProducts = response.data;
          setProducts(fetchedProducts);
          localStorage.setItem('products', JSON.stringify(fetchedProducts));
        }
      } catch (error) {
        console.error('Error fetching and storing data:', error);
      }
    };

    fetchData();
  }, [run]);


/*-------------   Search Operation -------------*/
  const handleSearch = () => {
    if(searchTerm.length==0){ setRun(!run)};
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
    };



/*-------------   Add Item Operation -------------*/

  const handleAddItem = async () => {
    const newProduct = await createNewObject(products.length);
    setProducts([...products, newProduct]);
    localStorage.setItem('products', JSON.stringify([...products, newProduct]));
  };


  /*-------------   Update  Operation -------------*/

  const handleUpdateItem = async (productId) => {
    try {
      const updatedProducts = products.map(product =>
        product.id === productId ? { ...product, price:`${prompt("Enter price ")}` } : product    //i just updated the price here we can do for title also
      );
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };



/*-------------   Delete  Operation -------------*/
  const handleDeleteItem = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };



  return (
    <div className="product-container">

      <div className="search-bar flex gap-5">
        <input type="text" placeholder="Search products" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
        <button onClick={() => handleSearch()} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Search</button>

        <button onClick={() => handleAddItem(products.length)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
          Add Item
        </button>
      </div>
      <br /><br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

        {products.map(product => (

          <div key={product.id} className="bg-white border border-gray-300 rounded overflow-hidden shadow-md ">

            <img src={product.image} alt={product.title} className="w-full h-40 md:h-48 lg:h-56 xl:h-64 object-contains" />

            <div className="product-details">

              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>

              <p className="text-sm text-gray-500 mb-10  whitespace-pre-line">
                {product.description}
              </p>


              <p className="product-price text-xl font-semibold mb-2" >${product.price}</p>
              <div className="flex justify-end items-end text-xs ">
                <span>Rating: {product.rating.rate}</span>
                <span>({product.rating.count} reviews)</span>
                <br /><br />
              </div>
              <div className="product-actions flex gap-3 justify-start items-end ">
                <button
                  onClick={() => handleUpdateItem(product.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800  py-2 px-3 rounded"
                >
                  UDATE ITEM
                </button>
                <button
                  onClick={() => handleDeleteItem(product.id)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800  py-2 px-3 rounded"
                >
                  DELETE ITEM
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductTable;
