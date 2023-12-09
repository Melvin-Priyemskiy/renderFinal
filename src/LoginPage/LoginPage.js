import axios from 'axios';
function LoginPage() {
    return (
<div class="container-fluid">

<h1 class="row">Login</h1>
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
  
  var token ='';
  function LoginAccount(){
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    console.log(data)

    axios.post('http://localhost:3001/api/loginpage', data).then(res => {
        console.log(res)
    });
  }
  
  
  export default LoginPage;
  