var istatus = document.querySelector("h5")
var text = document.querySelector("#add")

var btn = document.querySelector("#add")
var flag = 0
btn.addEventListener("click",function(){
    if(flag==0){
            istatus.innerHTML = "Friends"
    istatus.style.color = "Green"
    btn.innerHTML = "Remove Friend"
    btn.style.backgroundColor = "#cacaca"
    text.style.color = "black"
    
    flag = 1
    }else{
        istatus.innerHTML = "Stranger"
        istatus.style.color = "red"
        btn.innerHTML = "Add Friend"
            btn.style.backgroundColor = "cadetblue"
                text.style.color = "white"

        flag = 0
    }

})

// Password validation functionality
function validatePassword() {
    const correctPassword = "MadamJi";
    const passwordInput = document.querySelector("#password-input");
    const letterBox = document.querySelector("#letter-box");
    
    if (passwordInput.value === correctPassword) {
        letterBox.style.display = "block";
        passwordInput.style.borderColor = "green";
        alert("Access granted! The hidden message is now visible.");
    } else {
        letterBox.style.display = "none";
        passwordInput.style.borderColor = "red";
        alert("Incorrect password. Please try again.");
    }
}

// Add event listener for unlock button
var unlockBtn = document.querySelector("#unlock-btn");
unlockBtn.addEventListener("click", validatePassword);

// Add event listener for Enter key on password input
var passwordInput = document.querySelector("#password-input");
passwordInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        validatePassword();
    }
});
