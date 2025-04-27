document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('jwt');
    if (!token) window.location.href = 'login.html';
  
    // Cargar datos actuales
    const response = await fetch('http://localhost:4000/usuarios/1', { // Reemplazar 1 con ID dinámico
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const usuario = await response.json();
  
    document.getElementById('nombre').value = usuario.nombre || '';
    // ... (llenar otros campos)
  
    // Guardar cambios
    document.getElementById('perfil-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:4000/usuarios/1', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre: document.getElementById('nombre').value,
            // ... otros campos
          })
        });
        document.getElementById('mensaje').textContent = 'Perfil actualizado!';
      } catch (error) {
        console.error(error);
      }
    });
  });