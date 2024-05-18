let dropdowns = document.querySelectorAll('.drop');
console.log(dropdowns);

dropdowns.forEach(dropdown => {
    const menu = dropdown.querySelector('.menu');
    const navbar = document.querySelector('.navbar');
  
    dropdown.addEventListener("click", () => {
      menu.classList.toggle('menu-open');
    });
    
    document.addEventListener('mouseover', (event) => {
      if (!dropdown.contains(event.target) && !menu.contains(event.target) && !navbar.contains(event.target)) { // Check for outside hover (not on dropdown or menu)
        menu.classList.remove('menu-open');
      }
    });

  });
  
  

// const dropdowns = document.querySelectorAll('.drop');

// dropdowns.forEach(dropdown => {
//   const menu = dropdown.querySelector('.menu');

//   // Add a tabindex attribute for keyboard accessibility (optional)
//   dropdown.setAttribute('tabindex', 0);

//   // Handle click and keydown events (for keyboard navigation)
//   dropdown.addEventListener('click', () => {
//     menu.classList.toggle('menu-open');
//   });

//   dropdown.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter' || event.key === 'Space') {
//       menu.classList.toggle('menu-open');
//     }
//   });

//   // Close the menu when clicking outside the dropdown (optional)
//   document.addEventListener('click', (event) => {
//     if (!dropdown.contains(event.target)) { // Check if clicked outside the dropdown
//       menu.classList.remove('menu-open');
//     }
//   });
// });



// dropdowns.forEach(dropdown => {
//     const menu = dropdown.querySelector('.menu');
//     console.log(menu)
//     dropdown.addEventListener("click",()=>{
//         menu.classList.toggle('menu-open');
//     })
// });

function isNumeric(value) {
    return typeof value === 'number';
}

function Login_Credentials(){
    let Login_email = document.getElementById('login-email').value;
    let Login_pswrd = document.getElementById('login-pswrd').value;

    if(Login_pswrd.trim() ==="" || Login_email.trim() === "") {
        alert("Please enter your credentials.");
        return false
    }
    else{
        if(!(Login_email.endsWith('@gmail.com') || Login_email.endsWith('@hotmail.com') ||Login_email.endsWith('@yahoo.com'))){
            alert("Incorrect mail format.");
            return false;
        }

        else if(Login_pswrd.trim().length < 5){
            alert(" Weak Password ")
            return false;
        }
        else {
            fetch('https://localhost/8080/login',{
                method:'POST',
                body:JSON.stringify({
                  username:document.getElementById("Learner_ID").value,
                  password:document.getElementById("Password").value
                }),
                headers:{
                    'Content-Type': 'application/jsonContent'
                }
              })
              .then(response=>response.json())
              .then(responseData=>{
                console.log(responseData)
              })
              .catch(error=>{
                console.log(error)
              })

              return true;
        }
    }
}

function Signup_Credentials() {
    let Signup_email = document.getElementById('signup-email').value;
    let Signup_pswrd = document.getElementById('signup-psswrd').value;
    let Signup_confpswrd = document.getElementById('signup-confpsswrd').value;
  
    // Email validation (using a basic regular expression)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(Signup_email.trim() === "" || Signup_pswrd.trim() === "" || Signup_confpswrd.trim() === "") {
        alert("Invalid Entry.");
        return false;
    }
    else{
        if (!Signup_email.match(emailRegex) && !isNumeric(Signup_email)) {
            alert("Invalid username format. Please enter a valid email address or a 10-digit phone number.");
            return false;
          }
        
          // Phone number validation (more advanced logic needed for international formats)
          if (isNumeric(Signup_email) && Signup_email.length !== 10) {
            alert("Invalid phone number. Please enter a 10-digit number.");
            return false;
          }
        
          if (Signup_pswrd === "" || Signup_confpswrd === "") {
            alert("Password fields cannot be empty.");
            return false;
          }
        
          if (Signup_pswrd !== Signup_confpswrd) {
            alert("Passwords do not match. Please re-enter your password.");
            return false;
          }
        
          // Password strength recommendation (consider using a password strength meter)
          if (Signup_pswrd.length < 8) {
            alert("Password is weak. It should be at least 8 characters long and contain a mix of uppercase, lowercase, numbers, and symbols.");
            return false;
          }
    }
  
    // Terms of service check (assuming the checkbox has the ID "signup-checkbox")
    // const termsCheckbox = document.getElementById('signup-checkbox');
    // if (!termsCheckbox.checked) {
    //   alert("Please agree to the terms of service before submitting.");
    //   return false;
    // }
  
    // All validations pass, allow form submission
    return true;
  }

  function handleFormSubmit() {
    // Get the selected radio button
    const selectedRadio = document.querySelector('input[name="choice"]:checked');
  
    if (!selectedRadio) {
      alert("Please select a user type.");
      return false;
    }
  
    // Redirect based on the selected value
    const userChoice = selectedRadio.value;
    let targetPage;
    switch (userChoice) {
      case "patient":
        targetPage = "Patient_User.html";
        break;
      case "doctor":
        targetPage = "Doctor_User.html";
        break;
      case "hospital":
        targetPage = "Hospital_Page.html";
        break;
      case "pharmacy":
        targetPage = "Pharmacy_Page.html";
        break;
      default:
        // Handle unexpected values (optional)
    }
  
    if (targetPage) {
      window.location.href = targetPage;
      return false; // Prevent default form submission behavior
    }
  
    return true; // Allow form submission if redirection fails
  }
  
  function validateSignupForm() {
    // Get references to input fields
    const nameInput = document.getElementById("Patient_name");
    const stateInput = document.getElementById("Patient_state");
    const cityInput = document.getElementById("Patient_city");
    const pincodeInput = document.getElementById("Patient_pincode");
    const phoneInput = document.getElementById("Patient_phone");
    const dobInput = document.getElementById("Patient_dob");
  
    // Validation checks
    let isValid = true;
    let errorMessages = []; // Array to store error messages
  
    // Name validation
    if (nameInput.value.trim() === "") {
      errorMessages.push("Name cannot be empty.");
    }
  
    // State validation
    if (stateInput.value.trim() === "") {
      errorMessages.push("State cannot be empty.");
    }
  
    // City validation
    if (cityInput.value.trim() === "") {
      errorMessages.push("City cannot be empty.");
    }
  
    // Pincode validation
    if (pincodeInput.value.trim() === "" || isNaN(pincodeInput.value) || pincodeInput.value.length !== 6) {
      errorMessages.push("Invalid pincode. Must be 6 numeric digits.");
    }
  
    // Phone number validation
    if (phoneInput.value.trim() === "" || isNaN(phoneInput.value) || phoneInput.value.length < 10) {
      errorMessages.push("Invalid phone number. Must be at least 10 numeric digits.");
    }
  
    // Date of birth validation
    if (dobInput.value === "") {
      errorMessages.push("Please enter your date of birth.");
    }
  
    // Display error messages (if any)
    if (errorMessages.length > 0) {
      const errorMessage = "Please fix the following errors:\n" + errorMessages.join("\n");
      alert(errorMessage);
      isValid = false;
    }
  
    return isValid;
  }

  function validateDoctorSignupForm() {
    // Get references to input fields
    const nameInput = document.getElementById("Doctor_name");
    const stateInput = document.getElementById("Doctor_state");
    const cityInput = document.getElementById("Doctor_city");
    const pincodeInput = document.getElementById("Doctor_pincode");
    const phoneInput = document.getElementById("Doctor_phone");
    const experienceInput = document.getElementById("Doctor_experience");
  
    // Clear any previous error messages (optional)
    // clearErrorMessages(); // Add a function to clear error messages
  
    // Validation checks
    let isValid = true;
    let errorMessages = []; // Array to store error messages
  
    // Name validation
    if (nameInput.value.trim() === "") {
      errorMessages.push("Name cannot be empty.");
    }
  
    // State validation
    if (stateInput.value.trim() === "") {
      errorMessages.push("State cannot be empty.");
    }
  
    // City validation
    if (cityInput.value.trim() === "") {
      errorMessages.push("City cannot be empty.");
    }
  
    // Pincode validation
    if (pincodeInput.value.trim() === "" || isNaN(pincodeInput.value) || pincodeInput.value.length !== 6) {
      errorMessages.push("Invalid pincode. Must be 6 numeric digits.");
    }
  
    // Phone number validation
    if (phoneInput.value.trim() === "" || isNaN(phoneInput.value) || phoneInput.value.length < 10) {
      errorMessages.push("Invalid phone number. Must be at least 10 numeric digits.");
    }
  
    // Experience validation
    if (experienceInput.value.trim() === "") {
      errorMessages.push("Experience cannot be empty.");
    }
  
    // Display error messages (if any)
    if (errorMessages.length > 0) {
      const errorMessage = "Please fix the following errors:\n" + errorMessages.join("\n");
      alert(errorMessage);
      isValid = false;
    }
  
    return isValid;
  }
  
  let modal = document.querySelector(".modal");
  let modal_content = document.querySelector(".modal-content");
  let modal_btn = document.querySelector("#book-btn");
  let modal_submit_btn = document.querySelector("#modal-submit-btn");

  modal_btn.addEventListener("click",()=>{
    modal.classList.remove("hidden");
  });


  modal_submit_btn.addEventListener("click",()=>{
    modal.classList.add("hidden");
  })
  
  let Records = document.querySelector('.record-view');
  let RecordsContent = document.querySelector('.record-content');
  let ShowMoreBtns = document.querySelectorAll('.Show-more');
  console.log(ShowMoreBtns);
  ShowMoreBtns.forEach((ShowMoreBtn)=>{
    ShowMoreBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      
      // console.log("Clicked");
      Records.classList.remove('hidden');
    });
  })

  window.onclick = function (event) {
    if(event.target == modal) {
      modal.classList.add("hidden");
    }
    if (event.target == Records) {
      Records.classList.add('hidden');
    }
  }
//   function mode_Credentials() {
//     // Get all radio buttons in the form with the name "choice"
//     const radioButtons = document.querySelectorAll('input[name="choice"]');
  
//     // Check if any radio button is selected
//     let isSelected = false;
//     for (const radioButton of radioButtons) {
//       if (radioButton.checked) {
//         isSelected = true;
//         break; // Stop iterating if a selected button is found
//       }
//     }
  
//     if (!isSelected) {
//       alert("Please select a user type (Patient, Doctor, Hospital, or Pharmacy).");
//       return false; // Prevent form submission
//     }
  
//     // All good, allow form submission
//     return true;
//   }
  

// function Signup_Credentials(){
//     let Signup_email = document.getElementById('signup-email').value;
//     let Signup_pswrd = document.getElementById('signup-psswrd').value;
//     let Signup_confpswrd = document.getElementById('signup-confpsswrd').value;

//     if(Signup_email.trim() === "" || Signup_pswrd.trim() === "" || Signup_confpswrd.trim() === "") {
//         alert("Invalid Entry.");
//         return false;
//     }
//     else{
//         if(!(Signup_email_email.endsWith('@gmail.com') || Signup_email.endsWith('@hotmail.com') || Signup_email.endsWith('@yahoo.com')) && !(isNumeric(Signup_email))){
//             alert("Incorrect format.");
//             return false;
//         }
//         else{
//             if(!(Signup_email.length === 10)) {
//                 alert("Invalid Number,");
//                 return false;
//             }
//         }
//         if(Signup_pswrd !== Signup_confpswrd) {
//             alert("Enter password correctly");
//             return false;
//         }
//         if(Signup_pswrd < 5) {
//             alert("Weak Password");
//             return false;
//         }
//     }
//     return true;
// }

// const radioForm = document.getElementById("radio-form");
// const submitButton = radioForm.querySelector("button");

// radioForm.addEventListener("change", function () {
//   submitButton.disabled = false; // Enable submit button when a radio button is selected
// });