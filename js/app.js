const sellerTab = document.getElementById("sellerTab");
const buyerTab = document.getElementById("buyerTab");
const sellerFields = document.getElementById("sellerFields");
const buyerFields = document.getElementById("buyerFields");
const accountType = document.getElementById("accountType");
const signupButton = document.getElementById("signupButton");
const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const propertyLocation = document.getElementById("propertyLocation");
const requirement = document.getElementById("requirement");
const signupForm = document.getElementById("signupForm");

sellerTab.addEventListener("click", function () {
    sellerTab.classList.add("active");
    buyerTab.classList.remove("active");
    accountType.value = "seller";

    sellerFields.style.display = "block";
    buyerFields.style.display = "none";

    propertyLocation.required = true;
    requirement.required = false;

    formTitle.innerText = "Create Account";
    formSubtitle.innerText = "Get started with Apka Apna Ghar Properties.";
    signupButton.querySelector("span").innerText = "Sign Up";
});

buyerTab.addEventListener("click", function () {
    buyerTab.classList.add("active");
    sellerTab.classList.remove("active");
    accountType.value = "buyer";

    sellerFields.style.display = "none";
    buyerFields.style.display = "block";

    propertyLocation.required = false;
    requirement.required = true;

    formTitle.innerText = "Create Buyer Account";
    formSubtitle.innerText = "Find your perfect property with trusted dealers.";
    signupButton.querySelector("span").innerText = "Create Buyer Account";
});

function togglePassword() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bi-eye", "bi-eye-slash");
    } else {
        password.type = "password";
        eyeIcon.classList.replace("bi-eye-slash", "bi-eye");
    }
}

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!document.getElementById("terms").checked) {
        alert("Please accept Terms & Conditions.");
        return;
    }

    if (accountType.value === "seller") {
        window.location.href = "dealer-selection.html";
    } else {
        alert("Buyer account created successfully!");
    }
});
