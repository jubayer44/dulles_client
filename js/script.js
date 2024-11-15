document.addEventListener("DOMContentLoaded", function () {
  const memberForm = document.getElementById("member-form");
  const nextBtn = document.getElementById("next-btn");

  // Function to check if all required fields are filled
  function areFieldsFilled() {
    const inputs = memberForm.querySelectorAll(
      "input[required], select[required]"
    );
    for (let input of inputs) {
      if (!input.value) {
        return false; // If any required field is empty, return false
      }
    }
    return true;
  }

  nextBtn.addEventListener("click", function () {
    // Check if all required fields are filled
    if (areFieldsFilled()) {
      // Slide the member form to the left
      memberForm.style.transform = "translateX(-200%)";

      // Show the payment info section and slide it in
      const paymentInfo = document.getElementById("payment-info");
      setTimeout(() => {
        paymentInfo.classList.remove("hidden");
        memberForm.classList.add("member-hidden");

        paymentInfo.style.right = "0";
      }, 500); // Small delay to ensure the transition is smooth
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  });

  document.getElementById("cancel-btn").addEventListener("click", function () {
    // Slide the member form back into view
    memberForm.classList.remove("member-hidden");
    memberForm.style.transform = "translateX(0)";

    // Slide the payment info section back to the right
    const paymentInfo = document.getElementById("payment-info");
    paymentInfo.style.right = "-100%";

    // Hide the payment info section after the transition
    paymentInfo.classList.add("hidden");
    setTimeout(() => {}, 500); // Wait for the transition to finish
  });
});

// // Select payment method toggle
function togglePaymentMethod(selectedMethod) {
  // Hide all the payment method sections
  document.querySelectorAll(".payment-method-section").forEach((section) => {
    section.classList.add("hidden");
  });

  // Get all payment buttons
  const buttons = {
    check: document.getElementById("check-btn"),
    cash: document.getElementById("cash-btn"),
    zelle: document.getElementById("zelle-btn"),
    paypal: document.getElementById("paypal-btn"),
    stripe: document.getElementById("stripe-btn"),
  };

  // Hide all sections and remove selected state from all buttons
  Object.keys(buttons).forEach((method) => {
    document.getElementById(`${method}-section`).classList.add("hidden");
    buttons[method].classList.remove("selected-payment-btn");
  });

  // Show the selected payment method section and highlight the respective button
  document
    .getElementById(`${selectedMethod}-section`)
    .classList.remove("hidden");
  buttons[selectedMethod].classList.add("selected-payment-btn");
}

// document.addEventListener("DOMContentLoaded", function () {
//   // Select the payment button

// // Get the Stripe public key (replace with your actual key)
// const stripe = Stripe(
//   "pk_test_51M65RLSIrCWJQylGhY5H7fIcgSgxS5xTztCkFIc2bnmTw1Uj4wjFnwVEbYg1DUdI7pEBc7fmTTHrJye8CESMtHJ000YHQOk1rG"
// );

// document.getElementById("payButton").addEventListener("click", async () => {
//   // Call your backend to create the checkout session
//   const response = await fetch("https://dua-server-beta.vercel.app/payment", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const session = await response.json();

//   // Redirect to Stripe Checkout page
//   const { error } = await stripe.redirectToCheckout({
//     sessionId: session.id,
//   });

//   if (error) {
//     console.error("Error redirecting to Checkout:", error);
//   }
// });

//   // Initialize PayPal Buttons
//   paypal
//     .Buttons({
//       // This function sets up the transaction when the button is clicked
//       createOrder: function (data, actions) {
//         // Fetch order details from your backend
//         return fetch("/create-paypal-order", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             totalAmount: 100.0, // Adjust the total amount you need
//             currency: "USD", // Specify the currency
//           }),
//         })
//           .then((response) => response.json()) // Parse the response from the server
//           .then((orderData) => {
//             // Return the order ID from PayPal to the button
//             return orderData.id;
//           });
//       },

//       // This function captures the payment once the user approves it
//       onApprove: function (data, actions) {
//         // Call your backend to capture the payment
//         return fetch("/capture-paypal-payment", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             orderID: data.orderID,
//           }),
//         })
//           .then((response) => response.json())
//           .then((paymentData) => {
//             // Show a confirmation message or handle the success
//             alert("Payment completed successfully!");
//             console.log(paymentData);
//             // You can update the UI here based on the payment success
//           })
//           .catch((error) => {
//             // Handle any errors that occur during the payment process
//             alert("Payment failed, please try again!");
//             console.error(error);
//           });
//       },

//       // Handle payment errors
//       onError: function (err) {
//         console.error("Error in PayPal transaction:", err);
//         alert("An error occurred during the payment process.");
//       },
//     })
//     .render("#paypal-button-container"); // Render the PayPal button into the container
// });

// ==================================================================

// Function to collect form data for payment
document.addEventListener("DOMContentLoaded", function () {
  // Select the submit buttons
  const submitButton = document.querySelector(".submit-btn");
  const payButton = document.getElementById("payButton");
  const cashBtnSub = document.getElementById("cash-btn-sub");

  // Function to collect form data
  function collectFormData() {
    // Get personal information from the member-form
    const personalInfo = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      gender: document.getElementById("gender").value,
      address: document.getElementById("address").value,
    };

    // Get payment information based on selected payment method
    let paymentInfo = {};

    // Check which payment method is selected and collect relevant data
    const selectedMethod = document.querySelector(".selected-payment-btn");

    if (selectedMethod) {
      const selectedMethodId = selectedMethod.id.split("-")[0]; // Extract the payment method name (e.g., "check", "cash")
      console.log("sellll", selectedMethodId);

      // Payment details (you can add more as needed)
      paymentInfo.method = selectedMethodId;

      // Collect memo data for "check" and "cash"
      if (selectedMethodId === "check" || selectedMethodId === "cash") {
        paymentInfo.memo = document.getElementById(
          `${selectedMethodId}-memo`
        ).value;
      }

      // If payment is via Zelle, we don't need additional information, we just log the method
      if (selectedMethodId === "zelle") {
        paymentInfo.zelleInfo = "Sent to uniteddulles@gmail.com via Zelle";
      }

      // If payment is via PayPal or Stripe, we can just note the method
      if (selectedMethodId === "paypal" || selectedMethodId === "stripe") {
        paymentInfo.methodDetails = `${selectedMethodId} payment selected`;
      }
    }

    return { personalInfo, paymentInfo };
  }

  // Event listener for Submit button (for Check, Cash, or Zelle)
  if (submitButton) {
    submitButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission

      const { personalInfo, paymentInfo } = collectFormData();

      // Log the data to the console
      console.log("Personal Info:", personalInfo);
      console.log("Payment Info:", paymentInfo);

      // You can handle the form submission here or send it to the server if needed
    });
  }
  if (cashBtnSub) {
    cashBtnSub.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission
      const { personalInfo, paymentInfo } = collectFormData();
      console.log(personalInfo, paymentInfo);

      // Log the data to the console
      // console.log("Personal Info:", personalInfo);
      // console.log("Payment Info:", paymentInfo);

      // You can handle the form submission here or send it to the server if needed
    });
  }

  // Event listener for Pay with Card button (for Stripe)
  if (payButton) {
    payButton.addEventListener("click", async (event) => {
      event.preventDefault(); // Prevent form submission

      const { personalInfo, paymentInfo } = collectFormData();

      // Log the data to the console
      console.log("Personal Info:", personalInfo);
      console.log("Payment Info:", paymentInfo);

      const stripe = Stripe(
        "pk_test_51M65RLSIrCWJQylGhY5H7fIcgSgxS5xTztCkFIc2bnmTw1Uj4wjFnwVEbYg1DUdI7pEBc7fmTTHrJye8CESMtHJ000YHQOk1rG"
      );

      // Proceed with Stripe payment (already handled in your current code)
      const response = await fetch(
        "https://dua-server-beta.vercel.app/payment/stripe-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const session = await response.json();

      // Redirect to Stripe Checkout page
      const { error } = await stripe.redirectToCheckout({
        sessionId: session?.data?.id,
      });

      if (error) {
        console.error("Error redirecting to Checkout:", error);
      }
    });
  }

  // Initialize PayPal Buttons (you already have this setup)
  paypal
    .Buttons({
      createOrder: function (data, actions) {
        return fetch("/create-paypal-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalAmount: 100.0, // Adjust the total amount
            currency: "USD", // Specify the currency
          }),
        })
          .then((response) => response.json())
          .then((orderData) => {
            return orderData.id;
          });
      },

      onApprove: function (data, actions) {
        return fetch("/capture-paypal-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: data.orderID,
          }),
        })
          .then((response) => response.json())
          .then((paymentData) => {
            alert("Payment completed successfully!");
            console.log(paymentData);
          })
          .catch((error) => {
            alert("Payment failed, please try again!");
            console.error(error);
          });
      },

      onError: function (err) {
        console.error("Error in PayPal transaction:", err);
        alert("An error occurred during the payment process.");
      },
    })
    .render("#paypal-button-container"); // Render PayPal button
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("templatemo-contact");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  function clearForm() {
    document.getElementById("templatemo-contact").reset();
  }

  // Event listener for form submission
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Disable the submit button and change its text
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    // Collect the values from the form fields
    const name = document.getElementById("nametext").value;
    const email = document.getElementById("emailtext").value;
    const message = document.getElementById("message").value;

    try {
      // Send the form data to the server
      const response = await fetch(
        "https://dua-server-beta.vercel.app/contact-us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
          }),
        }
      );

      // Handle the response and display success message
      if (response.ok) {
        showMessage(successMessage);
        clearForm();
      } else {
        throw new Error("Failed to submit message");
      }
    } catch (error) {
      // Handle any errors and display error message
      console.error(error);
      showMessage(errorMessage);
    } finally {
      // Re-enable the submit button and reset its text
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
    }
  });

  // Function to show the message (success or error)
  function showMessage(messageBox) {
    successMessage.style.display = "none";
    errorMessage.style.display = "none";
    messageBox.style.display = "flex";
  }

  // Function to hide the message
  window.hideMessage = function (messageId) {
    const messageBox = document.getElementById(messageId);
    messageBox.style.display = "none";
  };
});
