// =============================================
// DATOS DE EVALUACIÓN HAY
// =============================================
const knowHowData = {
    "competencia_gerencial": {
        "I": "Específica: Ejecución de actividades específicas con interacción limitada.",
        "II": "Homogénea: Integración de operaciones relacionadas.",
        "III": "Heterogénea: Integración de funciones diversas.",
        "IV": "Amplia: Liderazgo estratégico."
    },
    "competencia_tecnica": {
        "A": "Básico: Conocimientos elementales.",
        "B": "Introductorio: Rutinas estandarizadas.",
        "C": "General: Métodos y procedimientos especializados.",
        "D": "Avanzado: Conocimiento especializado con base práctica.",
        "E": "Especializado: Basado en teorías y contexto.",
        "F": "Especialización Madura: Dominio profundo.",
        "G": "Especialización Amplia: Autoridad reconocida.",
        "H": "Referente: Liderazgo científico/innovador."
    },
    "comunicacion": {
        "1": "Comunica: Intercambio básico de información.",
        "2": "Razonamiento: Influencia con argumentos técnicos.",
        "3": "Cambio de comportamientos: Liderazgo y motivación."
    },
    "puntajes": {
        "A": { "1": 50, "2": 57, "3": 66 },
        "B": { "1": 66, "2": 76, "3": 87 },
        "C": { "1": 87, "2": 100, "3": 115 },
        "D": { "1": 115, "2": 132, "3": 152 },
        "E": { "1": 152, "2": 175, "3": 200 },
        "F": { "1": 200, "2": 230, "3": 264 },
        "G": { "1": 264, "2": 304, "3": 350 },
        "H": { "1": 350, "2": 400, "3": 460 }
    }
};

const solucionData = {
    "complejidad": {
        "1": "Repetitivo: Soluciones aprendidas.",
        "2": "Con modelos: Elección entre alternativas conocidas.",
        "3": "Variable: Identificación de patrones.",
        "4": "Adaptación: Soluciones creativas.",
        "5": "Sin precedentes: Innovación radical."
    },
    "marco_referencia": {
        "A": "Rutina Estricta: Supervisión permanente.",
        "B": "Rutina: Instrucciones detalladas.",
        "C": "Semi-Rutina: Procedimientos diversificados.",
        "D": "Estandarizado: Múltiples precedentes.",
        "E": "Definición Clara: Políticas específicas.",
        "F": "Definición Amplia: Objetivos amplios.",
        "G": "Definición Genérica: Metas organizativas.",
        "H": "Abstracto: Guía filosófica/estratégica."
    },
    "puntajes": {
        "A": { "1": 50, "2": 57, "3": 66, "4": 76, "5": 87 },
        "B": { "1": 66, "2": 76, "3": 87, "4": 100, "5": 115 },
        "C": { "1": 87, "2": 100, "3": 115, "4": 132, "5": 152 },
        "D": { "1": 115, "2": 132, "3": 152, "4": 175, "5": 200 },
        "E": { "1": 152, "2": 175, "3": 200, "4": 230, "5": 264 },
        "F": { "1": 200, "2": 230, "3": 264, "4": 304, "5": 350 },
        "G": { "1": 264, "2": 304, "3": 350, "4": 400, "5": 460 },
        "H": { "1": 350, "2": 400, "3": 460, "4": 530, "5": 610 }
    }
};

const responsabilidadData = {
    "libertad_actuar": {
        "A": "Control Estricto: Supervisión permanente.",
        "B": "Control: Instrucciones establecidas.",
        "C": "Estandarizado: Procedimientos definidos.",
        "D": "Regulación General: Políticas claras.",
        "E": "Dirección: Gestión autónoma.",
        "F": "Dirección General: Objetivos amplios.",
        "G": "Guía: Orientación estratégica.",
        "H": "Guía Estratégica: Tendencias del negocio."
    },
    "impacto": {
        "N": "No cuantificada",
        "1": "Muy pequeño",
        "2": "Pequeño",
        "3": "Medio",
        "4": "Grande"
    },
    "puntajes": {
        "A": { "N": 50, "1": 66, "2": 87, "3": 115, "4": 152 },
        "B": { "N": 87, "1": 115, "2": 152, "3": 200, "4": 264 },
        "C": { "N": 115, "1": 152, "2": 200, "3": 264, "4": 350 },
        "D": { "N": 152, "1": 200, "2": 264, "3": 350, "4": 460 },
        "E": { "N": 200, "1": 264, "2": 350, "3": 460, "4": 610 },
        "F": { "N": 264, "1": 350, "2": 460, "3": 610, "4": 800 },
        "G": { "N": 350, "1": 460, "2": 610, "3": 800, "4": 1050 },
        "H": { "N": 460, "1": 610, "2": 800, "3": 1050, "4": 1400 }
    }
};

// =============================================
// VARIABLES GLOBALES
// =============================================
let currentEvaluation = null;
const evaluationModel = {
    id: null,
    nombre: "",
    departamento: "",
    nivelReporte: "",
    descripcion: "",
    responsabilidades: "",
    funciones: "",
    competencias: "",
    knowHow: {},
    solucion: {},
    responsabilidad: {},
    total: 0,
    hayScore: "",
    fecha: null
};

// =============================================
// FUNCIÓN PARA RESETEAR EL FORMULARIO
// =============================================
function resetearFormulario() {
    currentEvaluation = null;
    
    // Resetear todos los campos del formulario
    document.getElementById('nombrePuesto').value = '';
    document.getElementById('departamento').value = '';
    document.getElementById('nivelReporte').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('responsabilidades').value = '';
    document.getElementById('funciones').value = '';
    document.getElementById('competencia').value = '';
    
    // Resetear campos de Know-How
    document.getElementById('gerencial').value = '';
    document.getElementById('tecnica').value = '';
    document.getElementById('comunicacion').value = '';
    document.getElementById('gerencial-desc').textContent = '';
    document.getElementById('tecnica-desc').textContent = '';
    document.getElementById('comunicacion-desc').textContent = '';
    
    // Resetear campos de Solución de Problemas
    document.getElementById('complejidad').value = '';
    document.getElementById('marco').value = '';
    document.getElementById('complejidad-desc').textContent = '';
    document.getElementById('marco-desc').textContent = '';
    
    // Resetear campos de Responsabilidad
    document.getElementById('libertad').value = '';
    document.getElementById('impacto').value = '';
    document.getElementById('libertad-desc').textContent = '';
    document.getElementById('impacto-desc').textContent = '';
    
    // Resetear contador de caracteres
    document.getElementById('descripcion-counter').textContent = '0';
    
    // Mostrar el primer paso
    showStep('evaluation');
    resetWizard();
}

// =============================================
// FUNCIONES DE NAVEGACIÓN
// =============================================
function showStep(step) {
    // Ocultar todos los pasos
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
    });
    
    // Mostrar el paso seleccionado
    const stepEl = document.getElementById(`step-${step}`);
    if (stepEl) {
        stepEl.classList.add('active');
        document.getElementById('current-step-name').textContent = 
            step === 'evaluation' ? 'Nueva Evaluación' : 
            step === 'history' ? 'Historial' : 'Reportes';
    }
    
    // Actualizar menú activo
    document.querySelectorAll('.menu li').forEach(el => el.classList.remove('active'));
    const menuItem = document.querySelector(`.menu li[data-step="${step}"]`);
    if (menuItem) menuItem.classList.add('active');
    
    // Resetear progreso si es nueva evaluación
    if (step === 'evaluation') {
        document.getElementById('progress').style.width = '0%';
        resetWizard();
    }
    
    // Inicializar reportes si es necesario
    if (step === 'reports') {
        inicializarReportes();
    }
}

function resetWizard() {
    document.querySelectorAll('.wizard-step').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById('wizard-step-1').classList.add('active');
    
    document.querySelectorAll('.wizard-progress .step').forEach((el, index) => {
        el.classList.remove('active');
        if (index === 0) el.classList.add('active');
    });
}

function nextStep(step) {
    if (validateCurrentStep(step - 1)) {
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
        if (parseInt(el.getAttribute('data-step')) {
            el.classList.add('active');
        }
    });
}

function showWizardStep(step) {
    document.querySelectorAll('.wizard-step').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById(`wizard-step-${step}`).classList.add('active');
    window.scrollTo(0, 0);
}

function validateCurrentStep(step) {
    switch(step) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        case 4:
            return validateStep4();
        default:
            return true;
    }
}

// =============================================
// VALIDACIONES
// =============================================
function validateStep1() {
    const required = ['nombrePuesto', 'departamento', 'nivelReporte', 'descripcion', 'responsabilidades'];
    let isValid = true;
    
    required.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    const descripcion = document.getElementById('descripcion');
    if (descripcion.value.length > 500) {
        descripcion.style.borderColor = 'red';
        isValid = false;
        alert('La descripción no puede exceder los 500 caracteres');
    }
    
    if (!isValid) {
        alert('Complete los campos obligatorios (*)');
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
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    if (!isValid) {
        alert('Complete todos los campos de Know-How');
        return false;
    }
    return true;
}

function validateStep3() {
    const required = ['complejidad', 'marco'];
    let isValid = true;
    
    const complejidad = document.getElementById('complejidad').value;
    const marco = document.getElementById('marco').value;
    
    if (complejidad === '5' && marco === 'A') {
        alert('¡Combinación inválida! No puede tener "Innovación radical" con "Rutina estricta"');
        return false;
    }
    
    required.forEach(id => {
        const field = document.getElementById(id);
        if (!field.value) {
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    if (!isValid) {
        alert('Complete todos los campos de Solución de Problemas');
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
            field.style.borderColor = 'red';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    if (!isValid) {
        alert('Complete todos los campos de Responsabilidad');
        return false;
    }
    return true;
}

// =============================================
// CÁLCULOS HAY
// =============================================
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
    return diferencia > 0 ? `P${Math.min(4, Math.floor(diferencia/50) + 1)}` : `A${Math.min(4, Math.floor(-diferencia/50) + 1)}`;
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

// =============================================
// FUNCIÓN PRINCIPAL DE CÁLCULO
// =============================================
function calcularResultados() {
    if (!validateStep4()) return;
    
    const nombrePuesto = document.getElementById('nombrePuesto').value;
    const departamento = document.getElementById('departamento').value;
    const nivelReporte = document.getElementById('nivelReporte').value;
    const descripcion = document.getElementById('descripcion').value;
    const responsabilidades = document.getElementById('responsabilidades').value;
    const funciones = document.getElementById('funciones').value;
    const competencias = document.getElementById('competencia').value;
    
    const gerencial = document.getElementById('gerencial').value;
    const tecnica = document.getElementById('tecnica').value;
    const comunicacion = document.getElementById('comunicacion').value;
    
    const complejidad = document.getElementById('complejidad').value;
    const marco = document.getElementById('marco').value;
    
    const libertad = document.getElementById('libertad').value;
    const impacto = document.getElementById('impacto').value;
    
    const knowHow = calcularKnowHow(gerencial, tecnica, comunicacion);
    const solucion = calcularSolucionProblemas(complejidad, marco);
    const responsabilidad = calcularResponsabilidad(libertad, impacto);
    
    solucion.perfil = determinarPerfilCorto(solucion.puntaje, knowHow.puntaje);
    
    const total = knowHow.puntaje + solucion.puntaje + responsabilidad.puntaje;
    const hayScore = determinarNivelHAY(total);
    
    currentEvaluation = {
        id: Date.now(),
        nombre: nombrePuesto,
        departamento: departamento,
        nivelReporte: nivelReporte,
        descripcion: descripcion,
        responsabilidades: responsabilidades,
        funciones: funciones,
        competencias: competencias,
        knowHow: knowHow,
        solucion: solucion,
        responsabilidad: responsabilidad,
        total: total,
        hayScore: hayScore,
        fecha: new Date().toISOString()
    };
    
    mostrarResultados();
    nextStep(5);
}

function mostrarResultados() {
    document.getElementById('result-nombre').textContent = currentEvaluation.nombre;
    document.getElementById('result-total').textContent = currentEvaluation.total;
    document.getElementById('result-hay').textContent = currentEvaluation.hayScore;
    
    document.getElementById('result-knowhow').textContent = 
        `${currentEvaluation.knowHow.puntaje} pts (${currentEvaluation.knowHow.gerencial.split(':')[0].trim()})`;
    
    document.getElementById('result-solucion').textContent = 
        `${currentEvaluation.solucion.puntaje} pts (${currentEvaluation.solucion.perfil})`;
    
    document.getElementById('result-responsabilidad').textContent = 
        `${currentEvaluation.responsabilidad.puntaje} pts (${currentEvaluation.responsabilidad.libertad.split(':')[0].trim()})`;
    
    document.getElementById('result-perfil').textContent = 
        currentEvaluation.solucion.perfil.includes('P') ? 'Perfil Estratégico' : 'Perfil Técnico';
}

// =============================================
// GESTIÓN DE EVALUACIONES
// =============================================
function guardarEvaluacion() {
    if (!currentEvaluation) {
        alert('No hay evaluación para guardar');
        return;
    }
    
    let evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    const index = evaluaciones.findIndex(e => e.id === currentEvaluation.id);
    if (index !== -1) {
        evaluaciones[index] = currentEvaluation;
    } else {
        evaluaciones.push(currentEvaluation);
    }
    
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
            <small>${new Date(eval.fecha).toLocaleDateString('es-AR')}</small>
            <p><strong>Departamento:</strong> ${eval.departamento}</p>
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
    
    showStep('history');
}

function editarEvaluacion(id) {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    const eval = evaluaciones.find(e => e.id === id);
    
    if (eval) {
        currentEvaluation = eval;
        
        document.getElementById('nombrePuesto').value = eval.nombre;
        document.getElementById('departamento').value = eval.departamento;
        document.getElementById('nivelReporte').value = eval.nivelReporte;
        document.getElementById('descripcion').value = eval.descripcion;
        document.getElementById('responsabilidades').value = eval.responsabilidades;
        document.getElementById('funciones').value = eval.funciones;
        document.getElementById('competencia').value = eval.competencias;
        
        showStep('evaluation');
    }
}

function eliminarEvaluacion(id) {
    if (confirm('¿Eliminar esta evaluación permanentemente?')) {
        let evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
        evaluaciones = evaluaciones.filter(e => e.id !== id);
        localStorage.setItem('hayEvaluaciones', JSON.stringify(evaluaciones));
        cargarHistorial();
    }
}

function buscarEvaluaciones() {
    const term = document.getElementById('search-eval').value.toLowerCase();
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    const filtered = term ? 
        evaluaciones.filter(e => e.nombre.toLowerCase().includes(term) || 
                               e.departamento.toLowerCase().includes(term)) : 
        evaluaciones;
    
    const list = document.getElementById('evaluations-list');
    list.innerHTML = filtered.map(eval => `
        <div class="eval-card">
            <h3>${eval.nombre}</h3>
            <small>${new Date(eval.fecha).toLocaleDateString()}</small>
            <p><strong>Departamento:</strong> ${eval.departamento}</p>
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

// =============================================
// GENERACIÓN DE PDF
// =============================================
function generarPDF(id = null) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let evaluationData = id ? 
        (JSON.parse(localStorage.getItem('hayEvaluaciones')) || []).find(e => e.id === id) : 
        currentEvaluation;
    
    if (!evaluationData) {
        alert('No se encontraron datos para generar el PDF');
        return;
    }
    
    doc.setFontSize(20);
    doc.text('Evaluación HAY - Metodología de Puestos', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`Puesto: ${evaluationData.nombre}`, 20, 35);
    doc.text(`Departamento: ${evaluationData.departamento}`, 20, 45);
    doc.text(`Nivel de Reporte: ${evaluationData.nivelReporte}`, 20, 55);
    
    doc.setFontSize(12);
    doc.text(`Descripción: ${evaluationData.descripcion}`, 20, 70);
    doc.text(`Responsabilidades: ${evaluationData.responsabilidades}`, 20, 90);
    doc.text(`Funciones: ${evaluationData.funciones}`, 20, 110);
    doc.text(`Competencias: ${evaluationData.competencias}`, 20, 130);
    
    doc.setFontSize(14);
    doc.text('Resultados de la Evaluación:', 20, 150);
    
    doc.text(`Know-How: ${evaluationData.knowHow.puntaje} pts`, 20, 165);
    doc.text(`- ${evaluationData.knowHow.gerencial}`, 25, 175);
    doc.text(`- ${evaluationData.knowHow.tecnica}`, 25, 185);
    doc.text(`- ${evaluationData.knowHow.comunicacion}`, 25, 195);
    
    doc.text(`Solución de Problemas: ${evaluationData.solucion.puntaje} pts`, 20, 210);
    doc.text(`- ${evaluationData.solucion.complejidad}`, 25, 220);
    doc.text(`- ${evaluationData.solucion.marco}`, 25, 230);
    
    doc.text(`Responsabilidad: ${evaluationData.responsabilidad.puntaje} pts`, 20, 245);
    doc.text(`- ${evaluationData.responsabilidad.libertad}`, 25, 255);
    doc.text(`- Impacto: ${evaluationData.responsabilidad.impacto}`, 25, 265);
    
    doc.setFontSize(16);
    doc.text(`Puntaje Total: ${evaluationData.total}`, 20, 285);
    doc.text(`Nivel HAY: ${evaluationData.hayScore}`, 20, 300);
    doc.text(`Perfil: ${evaluationData.solucion.perfil.includes('P') ? 'Estratégico' : 'Técnico'}`, 20, 315);
    
    doc.setFontSize(10);
    doc.text(`Evaluación generada el: ${new Date(evaluationData.fecha).toLocaleDateString()}`, 20, 330);
    
    doc.save(`Evaluacion_HAY_${evaluationData.nombre.replace(/ /g, '_')}.pdf`);
}

// =============================================
// REPORTES Y ESTADÍSTICAS
// =============================================
function inicializarReportes() {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    if (evaluaciones.length === 0) {
        document.getElementById('level-chart').parentElement.innerHTML = '<p class="no-data">No hay datos para mostrar</p>';
        document.getElementById('trend-chart').parentElement.innerHTML = '<p class="no-data">No hay datos para mostrar</p>';
        document.getElementById('profile-chart').parentElement.innerHTML = '<p class="no-data">No hay datos para mostrar</p>';
        return;
    }
    
    const nivelCtx = document.getElementById('level-chart').getContext('2d');
    generarGraficoNiveles(nivelCtx, evaluaciones);
    
    const tendenciaCtx = document.getElementById('trend-chart').getContext('2d');
    generarGraficoTendencia(tendenciaCtx, evaluaciones);
    
    const perfilCtx = document.getElementById('profile-chart').getContext('2d');
    generarGraficoPerfiles(perfilCtx, evaluaciones);
    
    document.getElementById('export-excel').addEventListener('click', exportarExcel);
    document.getElementById('export-all-pdf').addEventListener('click', exportarTodosPDF);
}

function generarGraficoNiveles(ctx, evaluaciones) {
    const niveles = {
        '1-7': 0,
        '8-10': 0,
        '11-13': 0,
        '14-16': 0,
        '17-19': 0,
        '20-22': 0,
        '23-24': 0,
        '25': 0
    };
    
    evaluaciones.forEach(eval => {
        const nivel = eval.hayScore.split(' -')[0];
        
        if (nivel === '25') {
            niveles['25']++;
        } else if (nivel.includes('23-24')) {
            niveles['23-24']++;
        } else if (nivel.includes('20-22')) {
            niveles['20-22']++;
        } else if (nivel.includes('17-19')) {
            niveles['17-19']++;
        } else if (nivel.includes('14-16')) {
            niveles['14-16']++;
        } else if (nivel.includes('11-13')) {
            niveles['11-13']++;
        } else if (nivel.includes('8-10')) {
            niveles['8-10']++;
        } else {
            niveles['1-7']++;
        }
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(niveles).map(key => {
                if (key === '1-7') return 'Operativos Básicos';
                if (key === '8-10') return 'Operativos Avanzados';
                if (key === '11-13') return 'Supervisores';
                if (key === '14-16') return 'Supervisores Senior';
                if (key === '17-19') return 'Gerentes Medios';
                if (key === '20-22') return 'Gerentes Senior';
                if (key === '23-24') return 'Alta Dirección';
                return 'Alta Dirección (Estratégico)';
            }),
            datasets: [{
                label: 'Evaluaciones por Nivel',
                data: Object.values(niveles),
                backgroundColor: [
                    '#2a4bd7', '#2340b9', '#2f2bb0', '#4cc9f0', 
                    '#4895ef', '#560bad', '#7209b7', '#b5179e'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
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
            }
        }
    });
}

function generarGraficoTendencia(ctx, evaluaciones) {
    const meses = {};
    const ahora = new Date();
    const ultimos6Meses = [];
    
    for (let i = 5; i >= 0; i--) {
        const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
        const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
        meses[clave] = 0;
        ultimos6Meses.push(clave);
    }
    
    evaluaciones.forEach(eval => {
        const fecha = new Date(eval.fecha);
        const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
        
        if (meses.hasOwnProperty(clave)) {
            meses[clave]++;
        }
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ultimos6Meses.map(mes => {
                const [ano, mesNum] = mes.split('-');
                return `${mesNum}/${ano}`;
            }),
            datasets: [{
                label: 'Evaluaciones por Mes',
                data: ultimos6Meses.map(mes => meses[mes]),
                fill: false,
                borderColor: '#2a4bd7',
                tension: 0.4,
                pointBackgroundColor: '#2a4bd7',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
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
            }
        }
    });
}

function generarGraficoPerfiles(ctx, evaluaciones) {
    const perfiles = {
        'P1': 0, 'P2': 0, 'P3': 0, 'P4': 0,
        'A1': 0, 'A2': 0, 'A3': 0, 'A4': 0
    };
    
    evaluaciones.forEach(eval => {
        const perfil = eval.solucion.perfil;
        if (perfiles.hasOwnProperty(perfil)) {
            perfiles[perfil]++;
        }
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(perfiles).map(p => {
                return p.startsWith('P') ? `Estratégico ${p.substring(1)}` : `Técnico ${p.substring(1)}`;
            }),
            datasets: [{
                data: Object.values(perfiles),
                backgroundColor: [
                    '#2a4bd7', '#2340b9', '#2f2bb0', '#4cc9f0',
                    '#4895ef', '#560bad', '#7209b7', '#b5179e'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const value = context.parsed;
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function exportarExcel() {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    if (evaluaciones.length === 0) {
        alert('No hay evaluaciones para exportar');
        return;
    }
    
    let csvContent = "Nombre,Puesto,Departamento,Nivel,Perfil,Puntaje,Fecha\n";
    
    evaluaciones.forEach(eval => {
        csvContent += `"${eval.nombre}","${eval.descripcion.substring(0, 50)}...","${eval.departamento}","${eval.hayScore}","${eval.solucion.perfil}","${eval.total}","${new Date(eval.fecha).toLocaleDateString()}"\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `evaluaciones_hay_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportarTodosPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    
    if (evaluaciones.length === 0) {
        alert('No hay evaluaciones para exportar');
        return;
    }
    
    doc.setFontSize(20);
    doc.text('Reporte Completo de Evaluaciones HAY', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
    
    doc.autoTable({
        startY: 40,
        head: [['Nombre', 'Departamento', 'Nivel', 'Perfil', 'Puntaje', 'Fecha']],
        body: evaluaciones.map(eval => [
            eval.nombre,
            eval.departamento,
            eval.hayScore.split(' -')[0],
            eval.solucion.perfil.includes('P') ? 'Estratégico' : 'Técnico',
            eval.total.toString(),
            new Date(eval.fecha).toLocaleDateString()
        ]),
        theme: 'grid',
        headStyles: {
            fillColor: [42, 75, 215],
            textColor: 255
        }
    });
    
    doc.save(`Reporte_HAY_${new Date().toISOString().slice(0, 10)}.pdf`);
}

// =============================================
// INICIALIZACIÓN
// =============================================
function setupEventListeners() {
    // Navegación del wizard
    document.getElementById('next-step-1').addEventListener('click', () => nextStep(2));
    document.getElementById('prev-step-2').addEventListener('click', () => prevStep(2));
    document.getElementById('next-step-2').addEventListener('click', () => nextStep(3));
    document.getElementById('prev-step-3').addEventListener('click', () => prevStep(3));
    document.getElementById('next-step-3').addEventListener('click', () => nextStep(4));
    document.getElementById('prev-step-4').addEventListener('click', () => prevStep(4));
    document.getElementById('calculate-results').addEventListener('click', calcularResultados);
    
    // Acciones de resultados
    document.getElementById('save-evaluation').addEventListener('click', guardarEvaluacion);
    document.getElementById('export-pdf').addEventListener('click', () => generarPDF());
    document.getElementById('new-evaluation').addEventListener('click', resetearFormulario);
    
    // Búsqueda
    document.getElementById('search-button').addEventListener('click', buscarEvaluaciones);
    
    // Menú principal
    document.querySelectorAll('.menu li').forEach(item => {
        item.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            if (step === 'evaluation' && !currentEvaluation) {
                resetearFormulario();
            } else {
                showStep(step);
            }
        });
    });
    
    // Actualización de descripciones al cambiar selecciones
    document.getElementById('gerencial').addEventListener('change', function() {
        document.getElementById('gerencial-desc').textContent = knowHowData.competencia_gerencial[this.value] || '';
    });
    
    document.getElementById('tecnica').addEventListener('change', function() {
        document.getElementById('tecnica-desc').textContent = knowHowData.competencia_tecnica[this.value] || '';
    });
    
    document.getElementById('comunicacion').addEventListener('change', function() {
        document.getElementById('comunicacion-desc').textContent = knowHowData.comunicacion[this.value] || '';
    });
    
    document.getElementById('complejidad').addEventListener('change', function() {
        document.getElementById('complejidad-desc').textContent = solucionData.complejidad[this.value] || '';
    });
    
    document.getElementById('marco').addEventListener('change', function() {
        document.getElementById('marco-desc').textContent = solucionData.marco_referencia[this.value] || '';
    });
    
    document.getElementById('libertad').addEventListener('change', function() {
        document.getElementById('libertad-desc').textContent = responsabilidadData.libertad_actuar[this.value] || '';
    });
    
    document.getElementById('impacto').addEventListener('change', function() {
        document.getElementById('impacto-desc').textContent = responsabilidadData.impacto[this.value] || '';
    });
    
    // Contador de caracteres
    document.getElementById('descripcion').addEventListener('input', function() {
        const counter = document.getElementById('descripcion-counter');
        counter.textContent = this.value.length;
        
        if (this.value.length > 450) {
            counter.classList.add('warning');
            counter.classList.remove('error');
        } else if (this.value.length > 490) {
            counter.classList.remove('warning');
            counter.classList.add('error');
        } else {
            counter.classList.remove('warning', 'error');
        }
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    resetearFormulario();
    showStep('evaluation'); // Forzar mostrar evaluación al inicio
    
    const logo = document.querySelector('.logo');
    if (logo) logo.onerror = () => logo.style.display = 'none';
    
    cargarHistorial();
});