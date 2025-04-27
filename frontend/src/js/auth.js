document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) throw new Error(await response.text());
      
      const { token, rol } = await response.json();
      localStorage.setItem('jwt', token);
      window.location.href = rol === 'admin' ? '/admin.html' : '/perfil.html';
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });


  