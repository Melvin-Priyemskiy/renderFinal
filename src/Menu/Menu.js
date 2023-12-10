import {
  BrowserRouter as Router,
  RouterProvider, 
  Route,
  Link,
  Routes
} from "react-router-dom";
import axios from 'axios';



function Menu() {  
  var loggedIn = false;

  return (
    <nav
      role="navigation"
      aria-label="Main menu"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
        {/* <ul>
            <li><Link itemProp="url" to="/">Home</Link></li>
            <li><Link itemProp="url" to="/about">About</Link></li>
            <li><Link itemProp="url" to="/login">Logout</Link></li>
            <li><Link itemProp="url" to="/dashboard">Dashboard</Link></li>
            <li><Link itemProp="url" to="/budgetpage">Budget</Link></li>
        </ul> */}
    </nav>
  );
}



export default Menu;
