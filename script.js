document.addEventListener('DOMContentLoaded', () => {
    // Attach change event listeners to all checkboxes
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        // Retrieve saved state from localStorage
        const section = checkbox.dataset.section;
        const resource = checkbox.dataset.resource;
        const storedState = localStorage.getItem(`${section}-${resource}`);
        
        if (storedState === 'checked') {
            checkbox.checked = true; // Restore the checked state
        }
        
        checkbox.addEventListener('change', updateProgress);
    });

    function updateProgress() {
        const section = this.dataset.section;
        const resource = this.dataset.resource;
        
        // Save checkbox state to localStorage
        if (this.checked) {
            localStorage.setItem(`${section}-${resource}`, 'checked');
        } else {
            localStorage.removeItem(`${section}-${resource}`);
        }

        // Calculate the progress
        const checkboxes = document.querySelectorAll(`input[data-section="${section}"]`);
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const progressPercent = total === 0 ? 0 : (checked / total) * 100;

        const progressElement = document.querySelector(`#progress-${section}`);
        const progressTextElement = document.querySelector(`#progress-text-${section}`);

        if (progressElement && progressTextElement) {
            progressElement.style.width = `${progressPercent}%`;
            progressTextElement.textContent = `${Math.round(progressPercent)}%`;
        }
    }

    // Initialize progress bars on page load
    document.querySelectorAll('.checkbox').forEach(checkbox => {
        updateProgress.call(checkbox);
    });
});
