// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.pageYOffset - navbarHeight,
      behavior: 'smooth'
    });
  });
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const scrollPos = window.pageYOffset;
  document.querySelector('.parallax-bg').style.transform = `translateY(${scrollPos * 0.3}px)`;
});

// Dynamic Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Dark Mode Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;
themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
  }
});

// Skills Interaction
const skillSpheres = document.querySelectorAll('.skill-sphere');
const skillDescription = document.getElementById('skill-description');
const skillData = {
  "VideoEditing": "I craft compelling stories through seamless video edits, bringing visuals to life.",
  "SEO": "I optimize digital content to skyrocket visibility and dominate search engine rankings.",
  "WebDevelopment": "I build stunning, responsive websites that blend creativity with functionality.",
  "ContentCreation": "I create engaging content that captures audiences and sparks meaningful connections."
};
skillSpheres.forEach(sphere => {
  sphere.addEventListener('click', () => {
    skillDescription.textContent = skillData[sphere.dataset.skill];
  });
});

// Load Projects from JSON
const projectsContainer = document.getElementById('projects-container');
async function loadProjects() {
  try {
    const response = await fetch('data/igboanugo_projects.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    projectsContainer.innerHTML = ''; // Clear existing content
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
    <h3>${project.name}</h3>
    <p>${project.description}</p>
    <a href="${project.link}" target="_blank" class="dive-in-btn">Dive In</a>
`;
      projectsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    projectsContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
  }
}
window.addEventListener('load', loadProjects);