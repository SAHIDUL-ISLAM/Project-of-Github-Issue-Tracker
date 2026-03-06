document.getElementById("login-btn").addEventListener("click", function(){
    // get the username
    const usernameInput = document.getElementById("login-username");
    const loginUsername = usernameInput.value;
    // get the password

    const passwordInput = document.getElementById("login-password");
    const loginPassword = passwordInput.value;

    // match username and password
    function getMessage(){
        if(loginUsername != "admin"){
            console.log("Enter 'admin'");
            return;
        }else if(loginPassword != "admin123"){
            console.log("Use pass: admin123");
            return;
        }else{
            window.location.assign("home.html");
        }
    }
    document.getElementById("result").textContent= getMessage();
})
