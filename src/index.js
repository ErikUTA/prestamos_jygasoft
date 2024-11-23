import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './routes/root';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/register/Register';
import Delete from './components/delete/Delete';
import Edit from './components/edit/Edit';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/delete",
    element: <Delete />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
