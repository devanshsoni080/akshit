let currentStep = 1;

const totalSteps = 4;

/* ================= SHOW STEP ================= */

function showStep(step) {
  document.querySelectorAll(".form-step").forEach(function (element) {
    element.classList.remove("active");
  });

  document.getElementById("step" + step).classList.add("active");

  document.querySelectorAll(".step-item").forEach(function (element) {
    const number = parseInt(element.dataset.step);

    element.classList.remove("active", "completed");

    if (number === step) {
      element.classList.add("active");
    }

    if (number < step) {
      element.classList.add("completed");
    }
  });
}

/* ================= VALIDATION ================= */

function validateCurrentStep() {
  const step = document.getElementById("step" + currentStep);

  const fields = step.querySelectorAll("input[required], select[required], textarea[required]");

  let valid = true;

  fields.forEach(function (field) {
    if (!field.checkValidity()) {
      field.classList.add("is-invalid");

      valid = false;
    } else {
      field.classList.remove("is-invalid");
    }
  });

  if (!valid) {
    const firstInvalid = step.querySelector(".is-invalid");

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return false;
  }

  /* PASSWORD CHECK */

  if (currentStep === 1) {
    const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");

      document.getElementById("confirmPassword").focus();

      return false;
    }
  }

  return true;
}

/* ================= NEXT ================= */

function nextStep() {
  if (!validateCurrentStep()) {
    return;
  }

  if (currentStep < totalSteps) {
    currentStep++;

    showStep(currentStep);

    document.getElementById("register").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/* ================= PREVIOUS ================= */

function prevStep() {
  if (currentStep > 1) {
    currentStep--;

    showStep(currentStep);
  }
}

/* ================= REMOVE ERROR ================= */

document.querySelectorAll("input, select, textarea").forEach(function (element) {
  element.addEventListener("input", function () {
    this.classList.remove("is-invalid");
  });

  element.addEventListener("change", function () {
    this.classList.remove("is-invalid");
  });
});

/* ================= FORM SUBMIT ================= */

document.getElementById("dealerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateCurrentStep()) {
    return;
  }

  alert("Dealer Registration submitted successfully!");
});

/* ================= INITIAL STEP ================= */

showStep(1);
