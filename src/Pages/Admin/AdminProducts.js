import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import CreateProduct from "../../Components/Forms/CreateProduct";
import { deleteProduct } from "../../Services/API";
import { ProductContext } from "../../Providers/ProductsProvider";
import AdminNavigation from "../../Components/AdminNavigation";
import '../../Style/Admin/AdminProductsStyle.css';
import { OrderContext } from "../../Providers/OrderProvider";
import { onSocketSetOrder } from "../../Services/OrderHelper";
import { IngredientContext } from '../../Providers/IngredientProvider';

Modal.setAppElement("body");

const AdminProducts = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { products, setProducts } = useContext(ProductContext);
  const { orders, setOrders } = useContext(OrderContext);
  const { ingredients, setIngredients } = useContext(IngredientContext);

  useEffect(() => {
    onSocketSetOrder(setOrders, orders, setIngredients)
  }, [orders]);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="AdminPage">
      <AdminNavigation></AdminNavigation>
      <div className="AdminProductsPageContainer">
        <button
          onClick={() => {
            openModal();
          }}
        >
          Add product
        </button>
        <div>
          {products.map((product) => {
            return (
              <div className="product" key={product.productId}>
                <div>
                <img src={product.file.location} alt={product.name}></img>
                  <div>
                    <h1>{product.name}</h1>
                    <h2>{product.price} €</h2>
                  </div>        
                </div>

                <div>
                <button
                  onClick={() => {
                    openModal();
                  }}
                >
                  Modify 
                </button>
                <button
                  onClick={() => {
                    deleteProduct(product.id).then(() => {
                      setProducts(products.filter((p) => p.id !== product.id));
                    });
                  }}
                >
                  Delete 
                </button>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                  <button
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    X
                  </button>
                  <CreateProduct></CreateProduct>
                </Modal>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
