// =============================================
// FUNCIONES DE NAVEGACIÓN
// =============================================

function nextStep(step) {
    // Validar campos obligatorios según el paso actual
    let isValid = true;
    
    if (step === 2) {
        isValid = validateStep1();
    } else if (step === 3) {
        isValid = validateStep2();
    } else if (step === 4) {
        isValid = validateStep3();
    } else if (step === 5) {
        isValid = validateStep4();
    }
    
    if (isValid) {
        updateWizardProgress(step);
        showWizardStep(step);
    }
}

function prevStep(step) {
    updateWizardProgress(step - 1);
    showWizardStep(step - 1);
}

function updateWizardProgress(step) {
    const progress = ((step - 1) / 4) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
    
    document.querySelectorAll('.wizard-progress .step').forEach(el => {
        el.classList.remove('active');
        const stepNumber = parseInt(el.getAttribute('data-step'));
        if (stepNumber <= step) {
            el.classList.add('active');
        }
    });
}

function showWizardStep(step) {
    document.querySelectorAll('.wizard-step').forEach(el => {
        el.classList.remove('active');
    });
    
    document.getElementById(`wizard-step-${step}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
// CONFIGURACIÓN DE EVENT LISTENERS
// =============================================

function setupNavigationButtons() {
    // Botones de navegación del wizard
    document.getElementById('next-step-1').addEventListener('click', () => nextStep(2));
    document.getElementById('prev-step-2').addEventListener('click', () => prevStep(2));
    document.getElementById('next-step-2').addEventListener('click', () => nextStep(3));
    document.getElementById('prev-step-3').addEventListener('click', () => prevStep(3));
    document.getElementById('next-step-3').addEventListener('click', () => nextStep(4));
    document.getElementById('prev-step-4').addEventListener('click', () => prevStep(4));
    document.getElementById('calculate-results').addEventListener('click', calcularResultados);
    
    // Botones de resultados
    document.getElementById('save-evaluation').addEventListener('click', guardarEvaluacion);
    document.getElementById('export-pdf').addEventListener('click', () => generarPDF());
    document.getElementById('new-evaluation').addEventListener('click', nuevaEvaluacion);
    
    // Botones del historial
    document.getElementById('search-button').addEventListener('click', buscarEvaluaciones);
    document.getElementById('filter-date').addEventListener('change', buscarEvaluaciones);
    document.getElementById('filter-level').addEventListener('change', buscarEvaluaciones);
    
    // Botones de reportes
    document.getElementById('export-excel').addEventListener('click', exportToExcel);
    document.getElementById('export-all-pdf').addEventListener('click', exportAllToPDF);
    
    // Menú lateral
    document.querySelectorAll('.menu li').forEach(item => {
        item.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            showStep(step);
            
            if (step === 'history') {
                cargarHistorial();
            } else if (step === 'reports') {
                generarReportes();
            }
        });
    });
}

// =============================================
// INICIALIZACIÓN DE LA APLICACIÓN
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Configurar todos los event listeners
    setupNavigationButtons();
    
    // Mostrar primer paso
    showStep('evaluation');
    
    // Manejar el caso cuando no existe el logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.onerror = function() {
            this.style.display = 'none';
        };
    }
});

// =============================================
// FUNCIONES RESTANTES (MANTIENE EL CÓDIGO ANTERIOR)
// =============================================

// ... (El resto del código de app.js que proporcioné anteriormente se mantiene igual)
// Incluyendo las funciones de validación, cálculos HAY, gestión de evaluaciones, etc.
// Solo asegúrate de que todas las funciones estén definidas antes de ser llamadas