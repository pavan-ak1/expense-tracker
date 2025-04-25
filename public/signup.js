const signupForm = document.querySelector('.signup-form');
const alertBox = document.querySelector('.auth-alert');

signupForm.addEventListener('input', () => {
  alertBox.textContent = '';
});

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = signupForm.name.value.trim();
  const email = signupForm.email.value.trim();
  const password = signupForm.password.value.trim();

  if (!name || !email || !password) {
    alertBox.textContent = 'Please fill all fields';
    alertBox.style.color = 'red';
    return;
  }

  if (password.length < 6) {
    alertBox.textContent = 'Password must be at least 6 characters long';
    alertBox.style.color = 'red';
    return;
  }

  if (!email.includes('@')) {
    alertBox.textContent = 'Please provide a valid email address';
    alertBox.style.color = 'red';
    return;
  }

  try {
    const res = await axios.post('/api/v1/auth/register', { name, email, password });
    alertBox.textContent = `User ${res.data.user.name} registered!`;
    alertBox.style.color = 'green';
    signupForm.reset();

    setTimeout(() => {
      window.location.href = './index.html';
    }, 1000);
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response) {
      alertBox.textContent = error.response.data.msg || 'Signup failed';
    } else if (error.request) {
      alertBox.textContent = 'Server is not responding. Please try again later.';
    } else {
      alertBox.textContent = 'An error occurred. Please try again.';
    }
    alertBox.style.color = 'red';
  }
});
