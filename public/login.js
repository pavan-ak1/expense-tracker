const loginForm = document.querySelector('.login-form');
const authAlert = document.querySelector('.auth-alert');

// Configure axios defaults
axios.defaults.withCredentials = true;

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const res = await axios.post('/api/v1/auth/login', { email, password });
    authAlert.textContent = `Welcome, ${res.data.user.name}`;
    authAlert.style.color = 'green';
    
    // Store user info in localStorage
    localStorage.setItem('user', JSON.stringify(res.data.user));
    
    // Wait for cookie to be set
    setTimeout(() => {
      window.location.href = '/index.html';
    }, 1000);
  } catch (error) {
    console.error('Login error:', error);
    authAlert.textContent = error.response?.data?.msg || 'Login failed';
    authAlert.style.color = 'red';
  }
});
