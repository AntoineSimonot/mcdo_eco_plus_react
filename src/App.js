
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import RequireAuth from './Components/RequireAuth';
import AdminIngredients from './Pages/Admin/AdminIngredients';
import AdminOrders from './Pages/Admin/AdminOrders';
import AdminProducts from './Pages/Admin/AdminProducts';
import AdminStats from './Pages/Admin/AdminStats';
import CustomProductPage from './Pages/User/CustomProductPage';
import Kitchen from './Pages/Kitchen/KitchenPage';
import LoginPageTerminal from './Pages/Other/LoginPageTerminal';
import LoginPageUser from './Pages/Other/LoginPageUser';
import NotFoundPage from './Pages/Other/NotFoundPage';
import OrderPage from './Pages/User/OrderPage';
import Products from './Pages/User/ProductsPage';
import { IngredientProvider } from './Providers/IngredientProvider';
import { OrderProvider } from './Providers/OrderProvider';
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
                <Route path="/" element={<LoginPageTerminal/>} > </Route>
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

                    <Route path="/admin/ingredients" element={
                          <RequireAuth><AdminIngredients></AdminIngredients></RequireAuth>
                        } >
                    </Route>                  

                    <Route path="/admin/products" element={
                          <RequireAuth><AdminProducts></AdminProducts></RequireAuth>
                        } >
                    </Route>

                    <Route path="/admin/orders" element={
                          <RequireAuth><AdminOrders></AdminOrders></RequireAuth>
                        } >
                    </Route>

                    <Route path="/admin/stats" element={
                          <RequireAuth><AdminStats></AdminStats></RequireAuth>
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
