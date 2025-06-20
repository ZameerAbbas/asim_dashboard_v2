import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Minerals from "./pages/Minerals";
import SpecialOffer from "./pages/SpecialOffer";
import Trendingproduct from "./pages/Trendingproduct";
import FavoriteCategories from "./pages/FavoriteCategories";

const App = () => {
  return (
  
    // <BrowserRouter>
    //   {/* <Header /> */}
    //   <Sidebar>
    //     <UserAuthContextProvider>
    //       <Routes>
    //         <Route
    //           path="/Dashboard"
    //           element={
    //             <ProtectedRoute>
    //               <Dashboard />
    //              </ProtectedRoute>
    //           }
    //         />
    //         <Route
    //           path="/Minerals"
    //           element={
    //              <ProtectedRoute>
    //               <Minerals />
    //             </ProtectedRoute>
    //           }
    //         />
    //         <Route
    //           path="/SpecialOffer"
    //           element={
    //              <ProtectedRoute>
    //               <SpecialOffer />
    //              </ProtectedRoute>
    //           }
    //         />
    //         <Route
    //           path="/Trendingproduct"
    //           element={
    //              <ProtectedRoute>
    //               <Trendingproduct />
    //              </ProtectedRoute>
    //           }
    //         />
    //         <Route
    //           path="/FavoriteCategories"
    //           element={
    //              <ProtectedRoute>
    //               <FavoriteCategories />
    //              </ProtectedRoute>
    //           }
    //         />
    //         <Route path="/" element={<Login />} />
    //         <Route path="/Signup" element={<Signup />} />
    //       </Routes>
    //     </UserAuthContextProvider>
    //   </Sidebar>
    // </BrowserRouter>
   <BrowserRouter>
  <UserAuthContextProvider>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Sidebar>
              <Routes>
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="Minerals" element={<Minerals />} />
                <Route path="SpecialOffer" element={<SpecialOffer />} />
                <Route path="Trendingproduct" element={<Trendingproduct />} />
                <Route path="FavoriteCategories" element={<FavoriteCategories />} />
                {/* Add more protected routes here */}
              </Routes>
            </Sidebar>
          </ProtectedRoute>
        }
      />
    </Routes>
  </UserAuthContextProvider>
</BrowserRouter>

  );
};

export default App;
