function showEmailSidebar(sidebar) {
    if (!sidebar) return; // Já está presente
    if (!emailOverlay) return; // Adicione isso para verificar o emailOverlay

    const sidebarVisibility = getComputedStyle(sidebar).visibility;

    if (sidebarVisibility === 'hidden') {
        sidebar.classList.add('transform-none');
        sidebar.classList.replace('invisible', 'visible');

        emailOverlay.classList.remove('hidden');
        setTimeout(() => {
            emailOverlay.classList.add('bg-opacity-40');
            emailOverlay.addEventListener('click', () => hideEmailSidebar(sidebar));
        }, 15);
    }
}

function hideEmailSidebar(sidebar) {
    if (!sidebar) return;
    if (!emailOverlay) return; // Adicione isso para evitar erros com emailOverlay

    const sidebarVisibility = getComputedStyle(sidebar).visibility;

    if (sidebarVisibility === 'visible') {
        sidebar.classList.remove('transform-none');
        emailOverlay.classList.remove('bg-opacity-40');

        setTimeout(() => {
            sidebar.classList.replace('visible', 'invisible');
            emailOverlay.classList.add('hidden');
        }, 300);
    }
}
