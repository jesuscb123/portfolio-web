// 1. Inicializar la librería de animaciones (AOS)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true, // La animación solo ocurre la primera vez que se baja
        offset: 100 // Distancia desde abajo para activarse
    });
});

// 2. Efecto de "Máquina de escribir" al hacer click en el nombre
const miNombre = document.getElementById('mi-nombre');
const miRol = document.getElementById('mi-rol');

miNombre.addEventListener('click', () => {
    const textoA_Escribir = "Software Developer";
    miRol.innerHTML = ''; // Limpiamos el texto
    
    // Añadimos un cursor
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    cursor.innerHTML = '&nbsp;';
    
    let i = 0;
    
    // Función recursiva con setTimeout para simular tecleo
    function teclear() {
        if (i < textoA_Escribir.length) {
            miRol.innerHTML = textoA_Escribir.substring(0, i + 1);
            miRol.appendChild(cursor);
            i++;
            setTimeout(teclear, 100); // 100ms por cada letra
        } else {
            // Eliminar cursor al terminar si lo deseas (opcional)
            setTimeout(() => cursor.remove(), 2000); 
        }
    }
    
    teclear();
});

// 3. Obtener los proyectos directamente desde GitHub
// IMPORTANTE: Cambia 'TU_USUARIO_AQUI' por tu nombre de usuario real de GitHub
const githubUsername = 'jesuscb123'; 
const projectsContainer = document.getElementById('projects-container');
const msjCargando = document.getElementById('cargando-proyectos');

async function obtenerProyectos() {
    try {
        // Hacemos la petición a la API de GitHub
        const respuesta = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
        
        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los proyectos');
        }
        
        const proyectos = await respuesta.json();
        
        // Limpiamos el mensaje de carga
        msjCargando.style.display = 'none';
        
        // Generamos el HTML para cada proyecto
        proyectos.forEach(repo => {
            // Ignorar forks si lo deseas (opcional)
            if(repo.fork) return;

            const card = document.createElement('div');
            card.classList.add('project-card');
            card.setAttribute('data-aos', 'fade-up');
            
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : 'Proyecto sin descripción en GitHub.'}</p>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Ver en GitHub ➔</a>
            `;
            
            projectsContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error cargando GitHub:", error);
        msjCargando.innerText = "Hubo un error al cargar los proyectos. Revisa tu nombre de usuario en script.js.";
    }
}

// Llamamos a la función
obtenerProyectos();