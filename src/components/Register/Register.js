onSubmitSignIn = () => {
  const { email, password, name } = this.state;

  // Basic validation to check for empty fields
  if (!email || !password || !name) {
    alert("Please fill in all fields");
    return;
  }

  fetch('https://smart-api-v1.onrender.com/register', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to register');
    }
    return response.json();
  })
  .then(user => {
    if (user.id) {
      this.props.loadUser(user);
      this.props.onRouteChange('home');
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Registration failed. Please try again.");
  });
}
