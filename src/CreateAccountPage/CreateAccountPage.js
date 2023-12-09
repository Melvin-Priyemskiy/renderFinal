import axios from 'axios';
function CreateAccountPage() {
    return (
<div class="container-fluid">

<h1 class="row">Create Account</h1>
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
    <button onClick={CreateAccount}>Create Account</button>


    </div>
</main>

</div>
    );
  }
  
  var token ='';
  function CreateAccount(){
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    console.log(data)

    axios.post('http://localhost:3001/api/createaccount', data).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

  }
  
  
  export default CreateAccountPage;
  