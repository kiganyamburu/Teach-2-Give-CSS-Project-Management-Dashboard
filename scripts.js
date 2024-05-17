
document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('project-form');
    const projectNameInput = document.getElementById('project-name');
    const projectDescriptionInput = document.getElementById('project-description');
    const projectList = document.getElementById('projects');
    const projectDetails = document.getElementById('project-details');
    const detailsName = document.getElementById('details-name');
    const detailsDescription = document.getElementById('details-description');
    const backToListButton = document.getElementById('back-to-list');

    let projects = [];

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = projectNameInput.value;
        const description = projectDescriptionInput.value;

        const newProject = { id: Date.now(), name, description };
        projects.push(newProject);
        renderProjects();
        projectForm.reset();
    });

    function renderProjects() {
        projectList.innerHTML = '';
        projects.forEach(project => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${project.name}
                <div>
                    <button onclick="viewProject(${project.id})">View</button>
                    <button onclick="deleteProject(${project.id})">Delete</button>
                </div>
            `;
            projectList.appendChild(li);
        });
    }

    window.viewProject = (id) => {
        const project = projects.find(proj => proj.id === id);
        if (project) {
            detailsName.textContent = `Name: ${project.name}`;
            detailsDescription.textContent = `Description: ${project.description}`;
            projectDetails.classList.remove('hidden');
            projectList.parentElement.classList.add('hidden');
        }
    }

    window.deleteProject = (id) => {
        projects = projects.filter(project => project.id !== id);
        renderProjects();
    }

    backToListButton.addEventListener('click', () => {
        projectDetails.classList.add('hidden');
        projectList.parentElement.classList.remove('hidden');
    });

    renderProjects();
});
