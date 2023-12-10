import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  function LandingPage()
  {
    navigate('/');
  }
  function BudgetPage(){
    navigate('/budgetpage');
  }

    return (
      
      <div>
          DashboardPage
          <div>
        <button onClick={LandingPage}>Logout</button>
        <button onClick={BudgetPage}>Budget</button>
    </div>
    
      </div>
    );
  }
  
  export default DashboardPage;
  