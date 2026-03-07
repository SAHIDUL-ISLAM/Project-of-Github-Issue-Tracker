document.getElementById("login-btn").addEventListener("click", function(){
    // get the username
    const usernameInput = document.getElementById("login-username");
    const loginUsername = usernameInput.value;
    // get the password

    const passwordInput = document.getElementById("login-password");
    const loginPassword = passwordInput.value;

    // match username and password

        if(loginUsername != "admin"){
            const enterAdmin = document.getElementById('enter-admin');
            enterAdmin.innerText = "Default: admin";
            return;
        }else if(loginPassword != "admin123"){
            const enterPassword = document.getElementById("enter-password");
            enterPassword.innerText = "Default: admin123";
            return;
        }else{
            window.location.assign("home.html");
        }

})
