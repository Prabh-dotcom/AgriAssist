// Dummy list of authorized emails
const authorizedEmails = ['user@example.com', 'farmer@farmman.com'];


function resetPassword() {
    const email = document.getElementById('email').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();


    if (!email || !newPassword || !confirmPassword) {
        alert('Please fill out all fields.');
        return;
    }


    if (!authorizedEmails.includes(email)) {
        alert('This email is not registered. Please check your email or sign up.');
        return;
    }


    if (newPassword !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }


    alert('Your password has been reset successfully!');
    window.location.href = 'login.html';
}
