import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const navigate = useNavigate();
  function LandingPage(){navigate('/');}


  var token ='';
  function LoginAccount(){
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    console.log(data)

    axios.post('http://localhost:3001/api/loginpage', data).then((response) => 
    {
      console.log(response);
      token = response.data.token;
      localStorage.setItem('jwt', token);
      navigate('/dashboard');
    }, (error) => {
      console.log(error);
    });
  }

    return (


<div class="container-fluid">

<h1 class="row">Login</h1>
<div>
        <button onClick={LandingPage}>Back to Landing</button>
    </div>
<main>

    <div class="row">
        <label for="username">Username</label>
        <input type="text" name="username" id="username"></input>
    </div>

    <div class="row">
        <label for="password">password</label>
        <input type="password" name="password" id="password"></input>
    </div>

    <div>
    <button onClick={LoginAccount}>Login Account</button>


    </div>
</main>

</div>
    );
  }  
  export default LoginPage;
  