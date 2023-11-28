import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ChakraProvider} from "@chakra-ui/react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ROUTES from "./router/routes.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.js";
import {LocalizationProvider} from "@mui/x-date-pickers";
import SnackBar from "./components/reusables/SnackBar.jsx";
import {ThemeProvider} from "@mui/material";
import themes from "./components/reusables/theme.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const router = createBrowserRouter([
    ...ROUTES
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ChakraProvider>
              <ThemeProvider theme={themes}>
                  <Provider store={store}>
                      <SnackBar />
                      <RouterProvider router={router}>
                      </RouterProvider>
                  </Provider>
              </ThemeProvider>
          </ChakraProvider>
      </LocalizationProvider>
  </React.StrictMode>,
)
