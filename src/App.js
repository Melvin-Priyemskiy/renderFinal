import logo from './logo.svg';
import './App.css';
import Menu from './Menu/Menu'
import Hero from './Hero/Hero'
import HomePage from './HomePage/HomePage'
import Footer from './Footer/Footer'
import AboutPage from './AboutPage/AboutPage'
import LoginPage from './LoginPage/LoginPage'
import CreateAccountPage from './CreateAccountPage/CreateAccountPage'
import BudgetPage from './BudgetPage/BudgetPage'
import DashboardPage from './DashboardPage/DashboardPage'





import {
  BrowserRouter as Router,
  RouterProvider, 
  Route,
  Link,
  Routes
} from "react-router-dom";




function App() {
  return (
    <Router>
  <Menu></Menu>
  <Hero></Hero>

  <div className='mainContainer'>
    <Routes>
    <Route path='/about' element={<AboutPage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/createaccount' element={<CreateAccountPage/>} />
    <Route path='/dashboard' element={<DashboardPage/>} />
    <Route path='/budgetpage' element={<BudgetPage/>} />
    <Route path='/' element={<HomePage/>} />

    </Routes>
  </div>

  <Footer></Footer>
    </Router>
  );
}

export default App;
