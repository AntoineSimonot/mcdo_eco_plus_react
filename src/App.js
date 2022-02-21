
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import RequireAuth from './Components/RequireAuth';
import CustomProductPage from './Pages/CustomProductPage';
import Kitchen from './Pages/KitchenPage';
import LoginPageTerminal from './Pages/LoginPageTerminal';
import LoginPageUser from './Pages/LoginPageUser';
import NotFoundPage from './Pages/NotFoundPage';
import OrderPage from './Pages/OrderPage';
import Products from './Pages/ProductsPage';
import { IngredientProvider } from './Providers/IngredientProvider';
import { OrderContext, OrderProvider } from './Providers/OrderProvider';
import { ProductsProvider } from './Providers/ProductsProvider';
import { UserProvider } from './Providers/UserProvider';



function App() {
  
  return (
    <BrowserRouter>
        <UserProvider>
          <OrderProvider>
            <ProductsProvider>
              <IngredientProvider>
                <Routes>
                    <Route path="/login_terminal" element={<LoginPageTerminal/>} > </Route>

                    <Route path="/login_user" element={
                          <RequireAuth><LoginPageUser></LoginPageUser></RequireAuth>
                        } >
                    </Route>
                    <Route path="/products" element={
                          <RequireAuth><Products></Products></RequireAuth>
                        } >
                    </Route>

                    <Route path="/custom-product" element={
                          <RequireAuth><CustomProductPage></CustomProductPage></RequireAuth>
                        } >
                    </Route>

                    <Route path="/kitchen" element={
                          <RequireAuth><Kitchen></Kitchen></RequireAuth>
                        } >
                    </Route>

                    <Route path="/order" element={
                          <RequireAuth><OrderPage></OrderPage></RequireAuth>
                        } >
                    </Route>

                    <Route path="*" element={<NotFoundPage/>}></Route>
                </Routes>
              </IngredientProvider>
            </ProductsProvider>
          </OrderProvider>
         
        </UserProvider>
  </BrowserRouter>
  );
}

export default App;
