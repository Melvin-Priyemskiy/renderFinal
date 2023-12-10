import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BudgetPage() {
  const navigate = useNavigate();

  
  function DashboardPage()
  {
    navigate('/dashboard');
  }
    return (
      <div>
          BudgetPage
          <button onClick={DashboardPage}>Dashboard</button>
      </div>
    );
  }
  
  export default BudgetPage;

  
  