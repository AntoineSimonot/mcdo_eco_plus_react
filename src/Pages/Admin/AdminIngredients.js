import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-modal";
import AdminNavigation from '../../Components/AdminNavigation';
import IngredientForm from '../../Components/Forms/IngredientFormJs';
import Ingredient from '../../Components/Ingredient';
import { IngredientContext } from '../../Providers/IngredientProvider';
import { OrderContext } from '../../Providers/OrderProvider';
import { onSocketSetOrder } from '../../Services/OrderHelper';
import '../../Style/Admin/AdminIngredientsStyle.css';

const AdminIngredients = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const { ingredients, setIngredients } = useContext(IngredientContext);

    const { orders, setOrders } = useContext(OrderContext);
    useEffect(() => {
      console.log("useEffect");
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
         

          <div className="AdminIngredientPageContainer">
              <button
                onClick={() => {
                  openModal();
                }}
              >
                Add ingredient
              </button>
              <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <button
                  onClick={() => {
                    closeModal();
                  }}
                >
                  X
                </button>
                <IngredientForm></IngredientForm>
              </Modal>

              <div className='IngredientAdminContainer'>
                {ingredients.map((ingredient) => {
                  return <Ingredient key={ingredient.id} ingredient={ingredient} />;
                })}
              </div>           
          </div>
         
        </div>
      );
};

export default AdminIngredients;