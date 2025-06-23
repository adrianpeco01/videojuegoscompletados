 <!-- Script de JavaScript -->
  <script>
    // Lista de juegos (puedes agregar más juegos o modificar los existentes)
    const games = [
      { title: 'Game A', lastUpdated: '2025-04-01', platinum: true },
      { title: 'Game B', lastUpdated: '2025-03-25', platinum: false },
      { title: 'Game C', lastUpdated: '2025-03-10', platinum: true },
      { title: 'Game Z', lastUpdated: '2025-02-01', platinum: false },
      { title: 'Game D', lastUpdated: '2025-01-20', platinum: true }
    ];

    // Función para mostrar los juegos en el DOM
    function displayGames(filteredGames) {
      const gamesGrid = document.getElementById('gamesGrid');
      gamesGrid.innerHTML = '';  // Limpiar el contenido previo

      // Mostrar cada juego en el grid
      filteredGames.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game-item');
        gameElement.innerHTML = `
          <h3>${game.title}</h3>
          <p>Last Updated: ${game.lastUpdated}</p>
          ${game.platinum ? '<img src="./adricollantex • Platinum Hunt MARZO 2025_files/platinum.c0edb513.png" alt="Platinum" />' : ''}
        `;
        gamesGrid.appendChild(gameElement);
      });
    }

    // Función de búsqueda por título de juego
    document.getElementById('searchBar').addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchTerm));
      displayGames(filteredGames);
    });

    // Ordenar juegos por "Last Updated"
    document.getElementById('lastUpdatedBtn').addEventListener('click', () => {
      const sortedByDate = [...games].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      displayGames(sortedByDate);
    });

    // Filtrar juegos con Platinum
    document.getElementById('percentBtn').addEventListener('click', () => {
      const platinumGames = games.filter(game => game.platinum);
      displayGames(platinumGames);
    });

    // Mostrar todos los juegos
    document.getElementById('allBtn').addEventListener('click', () => {
      displayGames(games);
    });

    // Mostrar todos los juegos inicialmente
    displayGames(games);
  </script>