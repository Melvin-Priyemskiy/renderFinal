import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    function Homepage(){navigate('/homepage');}
    function CreateAccount(){navigate('/createaccount');}
    function Login(){navigate('/login');}


    return (
        <div>
        <button onClick={Homepage}>HomePage</button>
        <button onClick={CreateAccount}>Create Account</button>
        <button onClick={Login}>Login </button>
        </div>
    );
  }
  

  export default LandingPage;
  