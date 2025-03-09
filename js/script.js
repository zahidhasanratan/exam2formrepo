document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    const fields = [
      "name",
      "email",
      "password",
      "confirmPassword",
      "countryInput",
    ];

    fields.forEach((field) => {
      let input = document.getElementById(field);
      let errorMessage = input
        .closest(".mb-3")
        ?.querySelector(".error-message");

      if (input.value.trim() === "") {
        errorMessage.style.display = "block";
        isValid = false;
      } else {
        errorMessage.style.display = "none";
      }
    });

    const password = document.getElementById("password").value.trim();
    const confirmPassword = document
      .getElementById("confirmPassword")
      .value.trim();
    const confirmPasswordError = document
      .getElementById("confirmPassword")
      .closest(".mb-3")
      .querySelector(".error-message");

    if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Passwords do not match!";
      confirmPasswordError.style.display = "block";
      isValid = false;
    } else {
      confirmPasswordError.textContent = "Please confirm your password";
      confirmPasswordError.style.display = "none";
    }

    if (isValid) {
      alert("Form submitted successfully!");
      this.submit();
    }
  });

// Country API
document
  .getElementById("findCountryBtn")
  .addEventListener("click", function () {
    let countryInput = document.getElementById("countryInput");
    let countryName = countryInput.value.trim();
    let errorMessage = countryInput
      .closest(".mb-3")
      .querySelector(".error-message");

    if (countryName === "") {
      errorMessage.style.display = "block";
      return;
    } else {
      errorMessage.style.display = "none";
    }

    let apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.json();
      })
      .then((data) => {
        let country = data[0];

        document.getElementById("countryFlag").src = country.flags.png;
        document.getElementById("countryName").textContent =
          country.name.common;
        document.getElementById("population").textContent =
          country.population.toLocaleString();
        document.getElementById("borders").textContent = country.borders
          ? country.borders.join(", ")
          : "No borders";
        document.getElementById("currency").textContent = Object.values(
          country.currencies
        )[0].name;
        document.getElementById("capital").textContent = country.capital
          ? country.capital[0]
          : "N/A";
        document.getElementById("area").textContent =
          country.area.toLocaleString();

        document.getElementById("countryDetails").classList.remove("d-none");
      })
      .catch((error) => {
        alert("Country not found. Please enter a valid country name.");
      });
  });
