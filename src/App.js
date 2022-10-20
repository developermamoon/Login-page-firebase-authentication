import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Layout/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';


function App() {
  const router = createBrowserRouter([
    {path: '/', element: <Main></Main>, children: [
      {path: '/', element: <Register></Register>},
      {path: '/register', element: <Register></Register>},
      {path: '/login', element: <Login></Login>},
    ]},
  ])




  return (
    <div className="App mt-4">
      <RouterProvider router = {router}></RouterProvider>
    </div>
  );
}

export default App;
