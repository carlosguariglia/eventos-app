document.addEventListener('DOMContentLoaded', async () => {
  await cargarEventos();
  document.getElementById('btn-filtrar').addEventListener('click', cargarEventos);
});

async function cargarEventos() {
  try {
      const url = new URL('http://localhost:4000/eventos');
      const tipo = document.getElementById('filtro-tipo').value;
      const estado = document.getElementById('filtro-estado')?.value;

      if (tipo) url.searchParams.append('tipo', tipo);
      if (estado) url.searchParams.append('estado', estado);

      const response = await fetch(url);
      if (!response.ok) throw new Error(await response.text());
      
      mostrarEventos(await response.json());
  } catch (error) {
      mostrarError(error);
  }
}

function mostrarEventos(eventos) {
  const container = document.getElementById('eventos-container');
  container.innerHTML = eventos.map(evento => `
      <div class="evento ${evento.estado === 'cancelado' ? 'evento-cancelado' : ''}">
          <h3>${evento.titulo}</h3>
          <p>${evento.descripcion}</p>
          <p><strong>Tipo:</strong> ${evento.tipo_evento}</p>
          <p><strong>Fecha:</strong> ${new Date(evento.fecha).toLocaleString()}</p>
          ${evento.estado === 'cancelado' ? '<p class="estado-cancelado">⛔ Cancelado</p>' : ''}
      </div>
  `).join('');
}

function mostrarError(error) {
  document.getElementById('mensaje-error').innerHTML = `
      <div class="error">
          <p>${error.message || 'Error al cargar eventos'}</p>
          <button onclick="cargarEventos()">Reintentar</button>
      </div>
  `;
}