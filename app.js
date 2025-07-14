// Datos y configuraciones
let currentEvaluation = null;
const evaluationModel = {
    id: Date.now(),
    nombre: "",
    descripcion: "",
    responsabilidades: "",
    funciones: "",
    knowHow: {},
    solucion: {},
    responsabilidad: {},
    fecha: new Date().toISOString()
};

// Navegación
function showStep(step) {
    document.querySelectorAll('.step-content').forEach(el => el.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    
    // Actualizar menú
    document.querySelectorAll('.menu li').forEach(el => el.classList.remove('active'));
    document.querySelector(`.menu li[data-step="${step}"]`).classList.add('active');
    
    // Actualizar barra de progreso
    if(step < 5) {
        document.getElementById('progress').style.width = `${(step-1)*33.33}%`;
        document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    }
}

function nextStep(step) {
    // Validar campos obligatorios
    if(step === 2 && !validateStep1()) return;
    showStep(step);
}

function validateStep1() {
    const required = ['nombrePuesto', 'descripcion', 'responsabilidades'];
    let isValid = true;
    
    required.forEach(id => {
        const field = document.getElementById(id);
        if(!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        }
    });
    
    if(!isValid) alert('Complete los campos obligatorios (*)');
    return isValid;
}

// Gestión de evaluaciones
function guardarEvaluacion() {
    if(!currentEvaluation) return;
    
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    currentEvaluation.id = Date.now();
    currentEvaluation.fecha = new Date().toISOString();
    
    evaluaciones.push(currentEvaluation);
    localStorage.setItem('hayEvaluaciones', JSON.stringify(evaluaciones));
    
    alert('Evaluación guardada correctamente!');
    cargarHistorial();
}

function cargarHistorial() {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    const list = document.getElementById('evaluations-list');
    
    list.innerHTML = evaluaciones.map(eval => `
        <div class="eval-card">
            <h3>${eval.nombre}</h3>
            <small>${new Date(eval.fecha).toLocaleDateString()}</small>
            <p>${eval.descripcion.substring(0, 100)}...</p>
            <div class="eval-actions">
                <button onclick="cargarEvaluacion(${eval.id})"><i class="fas fa-edit"></i> Editar</button>
                <button onclick="generarPDF(${eval.id})"><i class="fas fa-file-pdf"></i> PDF</button>
                <button onclick="eliminarEvaluacion(${eval.id})"><i class="fas fa-trash"></i> Eliminar</button>
            </div>
        </div>
    `).join('');
}

function cargarEvaluacion(id) {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    const eval = evaluaciones.find(e => e.id === id);
    
    if(eval) {
        currentEvaluation = eval;
        // Llenar formularios...
        document.getElementById('nombrePuesto').value = eval.nombre;
        document.getElementById('descripcion').value = eval.descripcion;
        // ... (llenar otros campos)
        
        showStep(1);
    }
}

function eliminarEvaluacion(id) {
    if(confirm('¿Eliminar esta evaluación permanentemente?')) {
        let evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
        evaluaciones = evaluaciones.filter(e => e.id !== id);
        localStorage.setItem('hayEvaluaciones', JSON.stringify(evaluaciones));
        cargarHistorial();
    }
}

// PDF Mejorado
function generarPDF(id = null) {
    const eval = id ? 
        (JSON.parse(localStorage.getItem('hayEvaluaciones')) || []).find(e => e.id === id) : 
        currentEvaluation;
    
    if(!eval) return;
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Cabecera
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(`Evaluación HAY: ${eval.nombre}`, 105, 20, { align: 'center' });
    
    // Descripción
    doc.setFontSize(12);
    doc.text(`Descripción: ${eval.descripcion}`, 20, 40, { maxWidth: 170 });
    
    // Tabla de resultados
    doc.autoTable({
        startY: 60,
        head: [['Dimensión', 'Puntaje', 'Detalle']],
        body: [
            ['Know-How', eval.knowHow.puntaje, eval.knowHow.gerencial],
            ['Solución Problemas', eval.solucion.puntaje, eval.solucion.complejidad],
            ['Responsabilidad', eval.responsabilidad.puntaje, eval.responsabilidad.libertad],
            ['TOTAL', eval.total, `Nivel HAY: ${eval.hayScore}`]
        ]
    });
    
    doc.save(`Evaluacion_HAY_${eval.nombre.replace(/ /g, '_')}.pdf`);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarHistorial();
    showStep(1);
});
