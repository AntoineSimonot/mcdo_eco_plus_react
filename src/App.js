import { BrowserRouter, Route, Routes} from 'react-router-dom'
import RequireAuth from './Components/RequireAuth';
import LoginPageTerminal from './Pages/LoginPageTerminal';
import LoginPageUser from './Pages/LoginPageUser';
import Main from './Pages/Main';
import NotFoundPage from './Pages/NotFoundPage';
import { UserProvider } from './Providers/UserProvider';

function App() {
  return (
    <BrowserRouter>
        <UserProvider>
          <Routes>
              <Route path="/login_user" element={<LoginPageUser/>} > </Route>
              <Route path="/login_terminal" element={<LoginPageTerminal/>} > </Route>

              <Route path="/main" element={
                    <RequireAuth><Main></Main></RequireAuth>
                  } >
              </Route>

              <Route path="*" element={<NotFoundPage/>}></Route>
          </Routes>
        </UserProvider>
  </BrowserRouter>
  );
}

export default App;
