import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Products from "./Products";
import Layouts from "./Layouts";
import Users from "./user";
import Post from "./posts";

const App = () => {
    return ( 
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Layouts />} >
                        <Route index element={<Home /> } />
                        <Route path="products" element={<Products />} />
                        <Route path="login" element={<Login />} />
                        <Route path="user" element={<Users/>} />
                        <Route path="posts" element={<Post />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
     );
}
 
export default App;
