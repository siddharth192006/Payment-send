document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    const amountField = document.getElementById('amount');

    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');
    const amountError = document.getElementById('amount-error');

    // Clear previous error messages
    nameError.textContent = '';
    phoneError.textContent = '';
    amountError.textContent = '';

    let isValid = true;

    // Validate name
    if (!nameField.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
    }

    // Validate phone number
    if (!phoneField.value.trim() || phoneField.value.length !== 10 || !/^\d{10}$/.test(phoneField.value)) {
        phoneError.textContent = 'Please enter a valid 10-digit phone number.';
        isValid = false;
    }

    // Validate amount
    if (!amountField.value || parseFloat(amountField.value) < 1) {
        amountError.textContent = 'Please enter a valid amount (₹1 or more).';
        isValid = false;
    }

    // Redirect to UPI app if all fields are valid
    if (isValid) {
        const amount = amountField.value;
        const name = nameField.value;

        // Prepare payment URL for UPI
        const upiUrl = `upi://pay?pa=7720887035@fam&pn=NexForge&am=${amount}&cu=INR&tn=Payment from ${name}`;

        // Confirm the redirection
        const userConfirmation = confirm(`You are about to pay ₹${amount}. Do you want to proceed?`);
        if (userConfirmation) {
            alert("Redirecting to your UPI payment app...");
            window.location.href = upiUrl;

            // Optional: You can handle payment confirmation through a server-side solution
            setTimeout(() => {
                alert("Payment attempt was made. Please check your payment status.");
            }, 5000);  // Adjust this timeout based on real-world usage.
        }
    }
});
