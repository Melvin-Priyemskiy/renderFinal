import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ExpensePage from '../ExpensePage/ExpensePage';

function DashboardPage() {
  const navigate = useNavigate();

  function LandingPage()
  {
    localStorage.removeItem('jwt');
    navigate('/');
  }
  function BudgetPage(){
    navigate('/budgetpage');
  }
  function ExpensePage(){
    navigate('/expensepage');
  }

    return (
      
      <div>
          DashboardPage
          <div>
        <button onClick={LandingPage}>Logout</button>
        <button onClick={BudgetPage}>Configure Budget</button>
        <button onClick={ExpensePage}>Add Expenses</button>
    </div>
    
      </div>
    );
  }
  
  export default DashboardPage;
  