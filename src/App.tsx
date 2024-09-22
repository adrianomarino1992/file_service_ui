import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Directory from "./components/directory/Directory";
import Header from "./components/header/Header";

import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import { Router } from "@remix-run/router";


import NotFound from "./components/common/notfound/NotFound";
import Home from "./components/common/home/Home";
import GlobalContextProvider from "./components/context/GlobalContext";


import Confirm from './components/prompt/confirm/Confirm';
import Dialog from "./components/prompt/dialog/Dialog";
import { ToastContainer } from "react-toastify";


function App() {
  let router: Router = createBrowserRouter([
    {
      path: "/spread",
      element: <Directory />,
      errorElement: <NotFound />,
    },
    {
      path: "/home",
      element: <Home />,
      errorElement: <NotFound />,
    },
    {
      path: "/",
      element: <NotFound />,
      errorElement: <NotFound />,
    },
  ]);  
  

  return (
    <GlobalContextProvider {...{childrens : 
      [        
        
          <Dialog {...{childrens : [


              <Confirm {...{key: 1, childrens: [

                  <div key={1} className="App">
                    <Header />
                    <div style={{ marginTop: "80px" }}>
                      <RouterProvider router={router} />
                    </div>     
                    <ToastContainer position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light" />     
                  </div>
                  
                  
                
              ]}}/>


          ]}}/>
       
        

      ]}}/>
      
    
  );
}

export default App;
