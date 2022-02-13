import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginRegister from "./pages/LoginRegister"
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
        </Router>
  
)
}

export default App;
