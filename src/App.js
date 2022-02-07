import { BrowserRouter, Route, Routes} from 'react-router-dom'
import RequireAuth from './Components/RequireAuth';
import CustomProductPage from './Pages/CustomProductPage';
import LoginPageTerminal from './Pages/LoginPageTerminal';
import LoginPageUser from './Pages/LoginPageUser';
import NotFoundPage from './Pages/NotFoundPage';
import Products from './Pages/ProductsPage';
import { IngredientProvider } from './Providers/IngredientProvider';
import { ProductsProvider } from './Providers/ProductsProvider';
import { UserProvider } from './Providers/UserProvider';

function App() {
  return (
    <BrowserRouter>
        <UserProvider>
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

                  <Route path="*" element={<NotFoundPage/>}></Route>
              </Routes>
            </IngredientProvider>
          </ProductsProvider>
        </UserProvider>
  </BrowserRouter>
  );
}

export default App;
