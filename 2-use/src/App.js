import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginRegister from "./pages/LoginRegister"
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
/* 
Replace <Home/> below with <ProductPage/> to view the product page
I'll link it up with the home page after
--Michael
*/

function App() {
  return (
    
        <Router>
            <Route path='/' exact component={Home} />
            <Route path='/loginRegister' exact component={LoginRegister} />
            <Route path='/ProductPage' exact component={ProductPage} />
            <Route path='/ProductList' exact component={ProductList} />
            <Route path='/Product' exact component={Product} />
        </Router>
  
)
}

export default App;
