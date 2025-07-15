// Importar datos desde archivos JSON
let knowHowData, solucionData, responsabilidadData;

async function loadData() {
    try {
        const responses = await Promise.all([
            fetch('data/know-how.json').then(res => res.json()),
            fetch('data/solucion-problemas.json').then(res => res.json()),
            fetch('data/responsabilidad.json').then(res => res.json())
        ]);
        
        [knowHowData, solucionData, responsabilidadData] = responses;
        initializeApp();
    } catch (error) {
        console.error("Error cargando los datos:", error);
        alert("Error al cargar los datos necesarios. Por favor recarga la página.");
    }
}

// Variables globales
let currentEvaluation = null;
const evaluationModel = {
    id: null,
    nombre: "",
    descripcion: "",
    responsabilidades: "",
    funciones: "",
    knowHow: {},
    solucion: {},
    responsabilidad: {},
    total: 0,
    hayScore: "",
    fecha: null
};

let charts = {
    levelChart: null,
    trendChart: null,
    profileChart: null
};

// Inicialización de la aplicación
function initializeApp() {
    // Configurar eventos
    setupEventListeners();
    
    // Mostrar descripciones al seleccionar opciones
    setupDimensionDescriptions();
    
    // Mostrar primer paso
    showStep('evaluation');
    
    // Cargar datos iniciales si es necesario
    if (window.location.hash === '#history') {
        showStep('history');
        cargarHistorial();
    } else if (window.location.hash === '#reports') {
        showStep('reports');
        generarReportes();
    }
}

function setupEventListeners() {
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
    
    // Validación en tiempo real
    document.getElementById('nombrePuesto').addEventListener('blur', validateField);
    document.getElementById('descripcion').addEventListener('blur', validateField);
    document.getElementById('responsabilidades').addEventListener('blur', validateField);
    
    // Búsqueda en historial
    document.getElementById('search-eval').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            buscarEvaluaciones();
        }
    });
    
    // Filtros en historial
    document.getElementById('filter-date').addEventListener('change', buscarEvaluaciones);
    document.getElementById('filter-level').addEventListener('change', buscarEvaluaciones);
}

function setupDimensionDescriptions() {
    // Know-How
    document.getElementById('gerencial').addEventListener('change', function() {
        const value = this.value;
        const desc = knowHowData.competencia_gerencial[value] || 'Seleccione una opción para ver la descripción';
        document.getElementById('gerencial-desc').textContent = desc;
    });
    
    document.getElementById('tecnica').addEventListener('change', function() {
        const value = this.value;
        const desc = knowHowData.competencia_tecnica[value] || 'Seleccione una opción para ver la descripción';
        document.getElementById('tecnica-desc').textContent = desc;
    });
    
    document.getElementById('comunicacion').addEventListener('change', function() {
        const value = this.value;
        const desc = knowHowData.comunicacion[value] || 'Seleccione una opción para ver la descripción';
        document.getElementById('comunicacion-desc').textContent = desc;
    });
    
    // Solución de Problemas
    document.getElementById('complejidad').addEventListener('change', function() {
        const value = this.value;
        const desc = solucionData.complejidad[value] || 'Seleccione una opción para ver la descripción';
        document.getElementById('complejidad-desc').textContent = desc;
    });
    
    document.getElementById('marco').addEventListener('change', function() {
        const value = this.value;
        const desc = solucionData.marco_referencia[value] || 'Seleccione una opción para ver la descripción';
        document.getElementById('marco-desc').textContent = desc;
    });
    
    // Responsabilidad
    document.getElementById('libertad').addEventListener('change', function() {
        const value = this.value;
        const desc = responsabilidadData.libertad_actuar[value] || 'Seleccione una opción para ver la descripción';
        document.getElementById('libertad-desc').textContent = desc;
    });
    
    document.getElementById('impacto').addEventListener('change', function() {
        const value = this.value;
        const desc = responsabilidadData.impacto[value] || 'Seleccione una opción para ver la descripción';
        document.getElementById('impacto-desc').textContent = desc;
    });
}

// Navegación entre pasos
function showStep(step) {
    // Actualizar URL
    window.location.hash = step;
    
    // Ocultar todos los pasos
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
    });
    
    // Mostrar paso actual
    document.getElementById(`step-${step}`).classList.add('active');
    
    // Actualizar menú lateral
    document.querySelectorAll('.menu li').forEach(el => el.classList.remove('active'));
    document.querySelector(`.menu li[data-step="${step}"]`).classList.add('active');
    
    // Actualizar breadcrumb
    updateBreadcrumb(step);
    
    // Si es el paso de evaluación, resetear el wizard
    if (step === 'evaluation') {
        resetWizard();
    }
}

function updateBreadcrumb(step) {
    const breadcrumb = document.getElementById('current-step-name');
    let stepName = '';
    
    switch(step) {
        case 'evaluation':
            stepName = 'Nueva Evaluación';
            break;
        case 'history':
            stepName = 'Historial de Evaluaciones';
            break;
        case 'reports':
            stepName = 'Reportes y Estadísticas';
            break;
    }
    
    breadcrumb.textContent = stepName;
}

function resetWizard() {
    // Resetear el progreso
    document.getElementById('progress').style.width = '0%';
    
    // Resetear los pasos
    document.querySelectorAll('.wizard-step').forEach(el => {
        el.classList.remove('active');
    });
    
    document.querySelectorAll('.wizard-progress .step').forEach((el, index) => {
        el.classList.remove('active');
        if (index === 0) el.classList.add('active');
    });
    
    // Mostrar primer paso del wizard
    document.getElementById('wizard-step-1').classList.add('active');
}

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

// Validaciones
function validateField() {
    if (!this.value.trim()) {
        this.style.borderColor = 'var(--danger)';
    } else {
        this.style.borderColor = 'var(--light-gray)';
    }
}

function validateStep1() {
    const required = ['nombrePuesto', 'descripcion', 'responsabilidades'];
    let isValid = true;
    
    required.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--light-gray)';
        }
    });
    
    if (!isValid) {
        showAlert('Por favor complete todos los campos obligatorios marcados con (*)');
        return false;
    }
    return true;
}

function validateStep2() {
    const required = ['gerencial', 'tecnica', 'comunicacion'];
    let isValid = true;
    
    required.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value) {
            field.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--light-gray)';
        }
    });
    
    if (!isValid) {
        showAlert('Por favor complete todos los campos de Know-How');
        return false;
    }
    return true;
}

function validateStep3() {
    const required = ['complejidad', 'marco'];
    let isValid = true;
    
    // Validar combinación imposible
    const complejidad = document.getElementById('complejidad').value;
    const marco = document.getElementById('marco').value;
    
    if (complejidad === '5' && marco === 'A') {
        showAlert('¡Combinación inválida! No puede tener "Innovación radical" con "Rutina estricta"');
        return false;
    }
    
    required.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value) {
            field.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--light-gray)';
        }
    });
    
    if (!isValid) {
        showAlert('Por favor complete todos los campos de Solución de Problemas');
        return false;
    }
    return true;
}

function validateStep4() {
    const required = ['libertad', 'impacto'];
    let isValid = true;
    
    required.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value) {
            field.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--light-gray)';
        }
    });
    
    if (!isValid) {
        showAlert('Por favor complete todos los campos de Responsabilidad');
        return false;
    }
    return true;
}

function showAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'alert-message';
    alert.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 5000);
}

// Cálculos HAY
function calcularKnowHow(gerencial, tecnica, comunicacion) {
    const puntaje = knowHowData.puntajes[tecnica][comunicacion];
    return {
        gerencial: knowHowData.competencia_gerencial[gerencial],
        tecnica: knowHowData.competencia_tecnica[tecnica],
        comunicacion: knowHowData.comunicacion[comunicacion],
        puntaje: puntaje
    };
}

function calcularSolucionProblemas(complejidad, marco) {
    const puntaje = solucionData.puntajes[marco][complejidad];
    return {
        complejidad: solucionData.complejidad[complejidad],
        marco: solucionData.marco_referencia[marco],
        puntaje: puntaje
    };
}

function calcularResponsabilidad(libertad, impacto) {
    const puntaje = responsabilidadData.puntajes[libertad][impacto];
    return {
        libertad: responsabilidadData.libertad_actuar[libertad],
        impacto: responsabilidadData.impacto[impacto],
        puntaje: puntaje
    };
}

function determinarPerfilCorto(puntajeSolucion, puntajeKnowHow) {
    const diferencia = puntajeSolucion - puntajeKnowHow;
    
    if (diferencia > 0) {
        if (diferencia > 150) return 'P4';
        if (diferencia > 100) return 'P3';
        if (diferencia > 50) return 'P2';
        return 'P1';
    } else {
        if (diferencia < -150) return 'A4';
        if (diferencia < -100) return 'A3';
        if (diferencia < -50) return 'A2';
        return 'A1';
    }
}

function determinarNivelHAY(total) {
    if (total >= 2300) return "25 - Alta Dirección (Estratégico)";
    if (total >= 1900) return "23-24 - Alta Dirección";
    if (total >= 1500) return "20-22 - Gerentes Senior";
    if (total >= 1100) return "17-19 - Gerentes Medios";
    if (total >= 800) return "14-16 - Supervisores Senior";
    if (total >= 500) return "11-13 - Supervisores";
    if (total >= 300) return "8-10 - Operativos Avanzados";
    return "1-7 - Operativos Básicos";
}

// Función principal de cálculo
function calcularResultados() {
    if (!validateStep4()) return;
    
    // Obtener valores del formulario
    const nombrePuesto = document.getElementById('nombrePuesto').value;
    const descripcion = document.getElementById('descripcion').value;
    const responsabilidades = document.getElementById('responsabilidades').value;
    const funciones = document.getElementById('funciones').value;
    
    const gerencial = document.getElementById('gerencial').value;
    const tecnica = document.getElementById('tecnica').value;
    const comunicacion = document.getElementById('comunicacion').value;
    
    const complejidad = document.getElementById('complejidad').value;
    const marco = document.getElementById('marco').value;
    
    const libertad = document.getElementById('libertad').value;
    const impacto = document.getElementById('impacto').value;
    
    // Calcular dimensiones
    const knowHow = calcularKnowHow(gerencial, tecnica, comunicacion);
    const solucion = calcularSolucionProblemas(complejidad, marco);
    const responsabilidad = calcularResponsabilidad(libertad, impacto);
    
    // Calcular perfil
    solucion.perfil = determinarPerfilCorto(solucion.puntaje, knowHow.puntaje);
    
    // Calcular total y nivel HAY
    const total = knowHow.puntaje + solucion.puntaje + responsabilidad.puntaje;
    const hayScore = determinarNivelHAY(total);
    
    // Guardar evaluación actual
    currentEvaluation = {
        id: Date.now(),
        nombre: nombrePuesto,
        descripcion: descripcion,
        responsabilidades: responsabilidades,
        funciones: funciones,
        knowHow: knowHow,
        solucion: solucion,
        responsabilidad: responsabilidad,
        total: total,
        hayScore: hayScore,
        fecha: new Date().toISOString()
    };
    
    // Mostrar resultados
    mostrarResultados();
    nextStep(5);
}

function mostrarResultados() {
    if (!currentEvaluation) return;
    
    document.getElementById('result-nombre').textContent = currentEvaluation.nombre;
    document.getElementById('result-total').textContent = currentEvaluation.total;
    document.getElementById('result-hay').textContent = currentEvaluation.hayScore;
    
    // Know-How
    document.getElementById('result-knowhow').textContent = `${currentEvaluation.knowHow.puntaje} pts`;
    document.getElementById('result-knowhow-detail').textContent = 
        `${currentEvaluation.knowHow.gerencial.split(':')[0].trim()}, ${currentEvaluation.knowHow.tecnica.split(':')[0].trim()}, ${currentEvaluation.knowHow.comunicacion.split(':')[0].trim()}`;
    
    // Solución de Problemas
    document.getElementById('result-solucion').textContent = `${currentEvaluation.solucion.puntaje} pts`;
    document.getElementById('result-solucion-detail').textContent = 
        `${currentEvaluation.solucion.complejidad.split(':')[0].trim()}, ${currentEvaluation.solucion.marco.split(':')[0].trim()}`;
    
    // Responsabilidad
    document.getElementById('result-responsabilidad').textContent = `${currentEvaluation.responsabilidad.puntaje} pts`;
    document.getElementById('result-responsabilidad-detail').textContent = 
        `${currentEvaluation.responsabilidad.libertad.split(':')[0].trim()}, ${currentEvaluation.responsabilidad.impacto.split(':')[0].trim()}`;
    
    // Perfil
    const perfilElement = document.getElementById('result-perfil');
    const profileType = document.getElementById('profile-type');
    const profileDesc = document.getElementById('profile-desc');
    
    if (currentEvaluation.solucion.perfil.includes('P')) {
        perfilElement.style.backgroundColor = '#4cc9f0';
        profileType.textContent = 'Perfil Estratégico';
        profileDesc.textContent = '(Mayor enfoque en solución de problemas)';
    } else {
        perfilElement.style.backgroundColor = '#7209b7';
        profileType.textContent = 'Perfil Técnico';
        profileDesc.textContent = '(Mayor enfoque en conocimiento técnico)';
    }
}

// Gestión de evaluaciones
function guardarEvaluacion() {
    if (!currentEvaluation) {
        showAlert('No hay evaluación para guardar. Calcule primero los resultados.');
        return;
    }
    
    let evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    // Si ya existe, actualizarla
    const index = evaluaciones.findIndex(e => e.id === currentEvaluation.id);
    if (index !== -1) {
        evaluaciones[index] = currentEvaluation;
    } else {
        evaluaciones.push(currentEvaluation);
    }
    
    localStorage.setItem('hayEvaluaciones', JSON.stringify(evaluaciones));
    showAlert('Evaluación guardada correctamente!');
    cargarHistorial();
}

function cargarHistorial() {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    const list = document.getElementById('evaluations-list');
    
    if (evaluaciones.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>No hay evaluaciones guardadas</h3>
                <p>Realice una nueva evaluación para verla aquí</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = evaluaciones.map(eval => `
        <div class="eval-card">
            <h3>${eval.nombre}</h3>
            <small>${new Date(eval.fecha).toLocaleDateString('es-AR', { 
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit' 
            })}</small>
            <p><strong>Nivel HAY:</strong> ${eval.hayScore.split(' -')[0]}</p>
            <p>${eval.descripcion.substring(0, 80)}...</p>
            <div class="eval-actions">
                <button onclick="editarEvaluacion(${eval.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="generarPDF(${eval.id})">
                    <i class="fas fa-file-pdf"></i> PDF
                </button>
                <button onclick="eliminarEvaluacion(${eval.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

function editarEvaluacion(id) {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    const eval = evaluaciones.find(e => e.id === id);
    
    if (eval) {
        currentEvaluation = eval;
        
        // Llenar formularios
        document.getElementById('nombrePuesto').value = eval.nombre;
        document.getElementById('descripcion').value = eval.descripcion;
        document.getElementById('responsabilidades').value = eval.responsabilidades;
        document.getElementById('funciones').value = eval.funciones;
        
        // Mostrar paso de evaluación
        showStep('evaluation');
        
        // Mostrar primer paso del wizard
        resetWizard();
    }
}

function eliminarEvaluacion(id) {
    if (confirm('¿Eliminar esta evaluación permanentemente?')) {
        let evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
        evaluaciones = evaluaciones.filter(e => e.id !== id);
        localStorage.setItem('hayEvaluaciones', JSON.stringify(evaluaciones));
        cargarHistorial();
        showAlert('Evaluación eliminada correctamente');
    }
}

function buscarEvaluaciones() {
    const term = document.getElementById('search-eval').value.toLowerCase();
    const dateFilter = document.getElementById('filter-date').value;
    const levelFilter = document.getElementById('filter-level').value;
    
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    const filtered = evaluaciones.filter(eval => {
        // Filtro por texto
        const matchesText = term ? eval.nombre.toLowerCase().includes(term) || 
                                 eval.descripcion.toLowerCase().includes(term) : true;
        
        // Filtro por fecha
        const evalDate = new Date(eval.fecha);
        const today = new Date();
        let matchesDate = true;
        
        if (dateFilter === 'today') {
            matchesDate = evalDate.toDateString() === today.toDateString();
        } else if (dateFilter === 'week') {
            const weekAgo = new Date();
            weekAgo.setDate(today.getDate() - 7);
            matchesDate = evalDate >= weekAgo;
        } else if (dateFilter === 'month') {
            const monthAgo = new Date();
            monthAgo.setMonth(today.getMonth() - 1);
            matchesDate = evalDate >= monthAgo;
        }
        
        // Filtro por nivel
        let matchesLevel = true;
        if (levelFilter !== 'all') {
            const evalLevel = eval.hayScore.split(' -')[0];
            if (levelFilter.includes('-')) {
                const [min, max] = levelFilter.split('-').map(Number);
                const evalLevelNum = parseInt(evalLevel);
                matchesLevel = evalLevelNum >= min && evalLevelNum <= max;
            } else {
                matchesLevel = evalLevel === levelFilter;
            }
        }
        
        return matchesText && matchesDate && matchesLevel;
    });
    
    const list = document.getElementById('evaluations-list');
    
    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No se encontraron evaluaciones</h3>
                <p>Pruebe con otros criterios de búsqueda</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = filtered.map(eval => `
        <div class="eval-card">
            <h3>${eval.nombre}</h3>
            <small>${new Date(eval.fecha).toLocaleDateString('es-AR', { 
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit' 
            })}</small>
            <p><strong>Nivel HAY:</strong> ${eval.hayScore.split(' -')[0]}</p>
            <p>${eval.descripcion.substring(0, 80)}...</p>
            <div class="eval-actions">
                <button onclick="editarEvaluacion(${eval.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="generarPDF(${eval.id})">
                    <i class="fas fa-file-pdf"></i> PDF
                </button>
                <button onclick="eliminarEvaluacion(${eval.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Generación de PDF
function generarPDF(id = null) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let evaluationData;
    
    if (id) {
        const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
        evaluationData = evaluaciones.find(e => e.id === id);
    } else {
        evaluationData = currentEvaluation;
    }
    
    if (!evaluationData) {
        showAlert('No se encontraron datos para generar el PDF');
        return;
    }
    
    // Configuración
    doc.setProperties({
        title: `Evaluación HAY - ${evaluationData.nombre}`,
        subject: 'Evaluación de puesto metodología HAY',
        author: 'Sistema HAY Evaluation'
    });
    
    // Logo y título
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Evaluación HAY - Metodología de Puestos', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text(`Puesto: ${evaluationData.nombre}`, 20, 35);
    
    // Información básica
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date(evaluationData.fecha).toLocaleDateString('es-AR')}`, 20, 45);
    
    // Descripción del puesto
    doc.setFontSize(14);
    doc.text('Descripción del Puesto:', 20, 60);
    doc.setFontSize(12);
    doc.text(`${evaluationData.descripcion}`, 20, 70, { maxWidth: 170 });
    
    // Responsabilidades
    doc.setFontSize(14);
    doc.text('Responsabilidades Clave:', 20, 90);
    doc.setFontSize(12);
    const responsabilidades = evaluationData.responsabilidades.split(';').map(r => r.trim());
    responsabilidades.forEach((r, i) => {
        doc.text(`• ${r}`, 25, 100 + (i * 7), { maxWidth: 165 });
    });
    
    // Resultados (tabla)
    doc.autoTable({
        startY: 140,
        head: [['Dimensión', 'Puntaje', 'Detalle']],
        body: [
            ['Know-How', evaluationData.knowHow.puntaje, evaluationData.knowHow.gerencial],
            ['Solución Problemas', evaluationData.solucion.puntaje, evaluationData.solucion.complejidad],
            ['Responsabilidad', evaluationData.responsabilidad.puntaje, evaluationData.responsabilidad.libertad],
            ['TOTAL', evaluationData.total, evaluationData.hayScore]
        ],
        headStyles: {
            fillColor: [52, 73, 94],
            textColor: 255,
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [241, 241, 241]
        },
        margin: { top: 10 },
        styles: {
            cellPadding: 5,
            fontSize: 11,
            valign: 'middle'
        }
    });
    
    // Guardar PDF
    doc.save(`Evaluacion_HAY_${evaluationData.nombre.replace(/ /g, '_')}.pdf`);
}

// Reportes
function generarReportes() {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    if (evaluaciones.length === 0) {
        document.querySelector('.reports-grid').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chart-line"></i>
                <h3>No hay datos para generar reportes</h3>
                <p>Realice algunas evaluaciones para ver estadísticas</p>
            </div>
        `;
        return;
    }
    
    // Destruir gráficos existentes
    Object.values(charts).forEach(chart => {
        if (chart) chart.destroy();
    });
    
    // Gráfico de distribución por niveles
    const levelCtx = document.getElementById('level-chart').getContext('2d');
    charts.levelChart = new Chart(levelCtx, {
        type: 'bar',
        data: prepareLevelChartData(evaluaciones),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} evaluaciones`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // Gráfico de tendencia mensual
    const trendCtx = document.getElementById('trend-chart').getContext('2d');
    charts.trendChart = new Chart(trendCtx, {
        type: 'line',
        data: prepareTrendChartData(evaluaciones),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} evaluaciones`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // Gráfico de perfiles
    const profileCtx = document.getElementById('profile-chart').getContext('2d');
    charts.profileChart = new Chart(profileCtx, {
        type: 'doughnut',
        data: prepareProfileChartData(evaluaciones),
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function prepareLevelChartData(evaluaciones) {
    const levels = [
        '1-7', '8-10', '11-13', '14-16', 
        '17-19', '20-22', '23-24', '25'
    ];
    
    const counts = levels.map(level => {
        return evaluaciones.filter(eval => {
            const evalLevel = eval.hayScore.split(' -')[0];
            if (level.includes('-')) {
                const [min, max] = level.split('-').map(Number);
                const evalLevelNum = parseInt(evalLevel);
                return evalLevelNum >= min && evalLevelNum <= max;
            } else {
                return evalLevel === level;
            }
        }).length;
    });
    
    return {
        labels: levels.map(level => `Nivel ${level}`),
        datasets: [{
            data: counts,
            backgroundColor: [
                '#4361ee', '#3a0ca3', '#7209b7', 
                '#f72585', '#b5179e', '#4895ef', 
                '#4cc9f0', '#560bad'
            ],
            borderWidth: 1
        }]
    };
}

function prepareTrendChartData(evaluaciones) {
    // Agrupar por mes
    const monthlyData = {};
    
    evaluaciones.forEach(eval => {
        const date = new Date(eval.fecha);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = 0;
        }
        monthlyData[monthYear]++;
    });
    
    // Ordenar por fecha
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
        const [aMonth, aYear] = a.split('/').map(Number);
        const [bMonth, bYear] = b.split('/').map(Number);
        
        if (aYear !== bYear) return aYear - bYear;
        return aMonth - bMonth;
    });
    
    return {
        labels: sortedMonths,
        datasets: [{
            label: 'Evaluaciones',
            data: sortedMonths.map(month => monthlyData[month]),
            borderColor: '#4361ee',
            backgroundColor: 'rgba(67, 97, 238, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };
}

function prepareProfileChartData(evaluaciones) {
    const profiles = ['P1', 'P2', 'P3', 'P4', 'A1', 'A2', 'A3', 'A4'];
    const counts = profiles.map(profile => {
        return evaluaciones.filter(eval => eval.solucion.perfil === profile).length;
    });
    
    return {
        labels: profiles,
        datasets: [{
            data: counts,
            backgroundColor: [
                '#4cc9f0', '#4895ef', '#4361ee', '#3a0ca3',
                '#f72585', '#b5179e', '#7209b7', '#560bad'
            ],
            borderWidth: 1
        }]
    };
}

function exportToExcel() {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    if (evaluaciones.length === 0) {
        showAlert('No hay evaluaciones para exportar');
        return;
    }
    
    // Crear contenido CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Encabezados
    csvContent += "Nombre del Puesto,Descripción,Nivel HAY,Puntaje Total,Fecha\n";
    
    // Datos
    evaluaciones.forEach(eval => {
        const row = [
            `"${eval.nombre}"`,
            `"${eval.descripcion.replace(/"/g, '""')}"`,
            `"${eval.hayScore}"`,
            eval.total,
            new Date(eval.fecha).toLocaleDateString('es-AR')
        ].join(",");
        
        csvContent += row + "\n";
    });
    
    // Descargar
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "evaluaciones_hay.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportAllToPDF() {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    if (evaluaciones.length === 0) {
        showAlert('No hay evaluaciones para exportar');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configuración
    doc.setProperties({
        title: 'Reporte Completo de Evaluaciones HAY',
        subject: 'Exportación completa de evaluaciones',
        author: 'Sistema HAY Evaluation'
    });
    
    // Título
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Reporte Completo de Evaluaciones HAY', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Generado el: ${new Date().toLocaleDateString('es-AR')}`, 105, 30, { align: 'center' });
    
    // Tabla de resumen
    doc.autoTable({
        startY: 40,
        head: [['Puesto', 'Nivel HAY', 'Puntaje', 'Fecha']],
        body: evaluaciones.map(eval => [
            eval.nombre,
            eval.hayScore.split(' -')[0],
            eval.total,
            new Date(eval.fecha).toLocaleDateString('es-AR')
        ]),
        headStyles: {
            fillColor: [52, 73, 94],
            textColor: 255,
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [241, 241, 241]
        },
        margin: { top: 10 },
        styles: {
            cellPadding: 5,
            fontSize: 10,
            valign: 'middle'
        }
    });
    
    // Descargar
    doc.save('Reporte_Completo_Evaluaciones_HAY.pdf');
}

// Otras funciones
function nuevaEvaluacion() {
    currentEvaluation = null;
    document.querySelector('form').reset();
    showStep('evaluation');
    resetWizard();
    
    // Limpiar descripciones
    document.querySelectorAll('.dimension-description').forEach(el => {
        el.textContent = '';
    });
}

// Iniciar la aplicación
document.addEventListener('DOMContentLoaded', loadData);