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

// =============================================
// FUNCIONES DE NAVEGACIÓN MEJORADAS
// =============================================

function showStep(step) {
    // Ocultar todos los pasos
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
    });
    
    // Mostrar paso actual
    const stepEl = document.getElementById(`step-${step}`);
    if (stepEl) {
        stepEl.classList.add('active');
    }
    
    // Actualizar menú lateral
    document.querySelectorAll('.menu li').forEach(el => el.classList.remove('active'));
    const menuItem = document.querySelector(`.menu li[data-step="${step}"]`);
    if (menuItem) menuItem.classList.add('active');
    
    // Actualizar barra de progreso
    if (step === 'evaluation') {
        document.getElementById('progress').style.width = '0%';
        resetWizard();
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
        if (parseInt(el.getAttribute('data-step')) <= step) {
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
    const required = ['nombrePuesto', 'descripcion', 'responsabilidades'];
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
    
    // Actualizar si ya existe
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
        
        // Llenar formularios
        document.getElementById('nombrePuesto').value = eval.nombre;
        document.getElementById('descripcion').value = eval.descripcion;
        document.getElementById('responsabilidades').value = eval.responsabilidades;
        document.getElementById('funciones').value = eval.funciones;
        
        // Mostrar primer paso
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
        evaluaciones.filter(e => e.nombre.toLowerCase().includes(term)) : 
        evaluaciones;
    
    const list = document.getElementById('evaluations-list');
    list.innerHTML = filtered.map(eval => `
        <div class="eval-card">
            <h3>${eval.nombre}</h3>
            <small>${new Date(eval.fecha).toLocaleDateString()}</small>
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
    
    // Configuración básica del PDF
    doc.setFontSize(20);
    doc.text('Evaluación HAY - Metodología de Puestos', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text(`Puesto: ${evaluationData.nombre}`, 20, 35);
    
    // Detalles de la evaluación
    doc.setFontSize(12);
    doc.text(`Descripción: ${evaluationData.descripcion}`, 20, 50);
    doc.text(`Responsabilidades: ${evaluationData.responsabilidades}`, 20, 65);
    doc.text(`Funciones: ${evaluationData.funciones}`, 20, 80);
    
    // Resultados
    doc.setFontSize(14);
    doc.text('Resultados de la Evaluación:', 20, 100);
    
    doc.text(`Know-How: ${evaluationData.knowHow.puntaje} pts`, 20, 115);
    doc.text(`- ${evaluationData.knowHow.gerencial}`, 25, 125);
    doc.text(`- ${evaluationData.knowHow.tecnica}`, 25, 135);
    doc.text(`- ${evaluationData.knowHow.comunicacion}`, 25, 145);
    
    doc.text(`Solución de Problemas: ${evaluationData.solucion.puntaje} pts`, 20, 160);
    doc.text(`- ${evaluationData.solucion.complejidad}`, 25, 170);
    doc.text(`- ${evaluationData.solucion.marco}`, 25, 180);
    
    doc.text(`Responsabilidad: ${evaluationData.responsabilidad.puntaje} pts`, 20, 195);
    doc.text(`- ${evaluationData.responsabilidad.libertad}`, 25, 205);
    doc.text(`- Impacto: ${evaluationData.responsabilidad.impacto}`, 25, 215);
    
    // Resumen final
    doc.setFontSize(16);
    doc.text(`Puntaje Total: ${evaluationData.total}`, 20, 235);
    doc.text(`Nivel HAY: ${evaluationData.hayScore}`, 20, 250);
    doc.text(`Perfil: ${evaluationData.solucion.perfil.includes('P') ? 'Estratégico' : 'Técnico'}`, 20, 265);
    
    // Fecha
    doc.setFontSize(10);
    doc.text(`Evaluación generada el: ${new Date(evaluationData.fecha).toLocaleDateString()}`, 20, 280);
    
    doc.save(`Evaluacion_HAY_${evaluationData.nombre.replace(/ /g, '_')}.pdf`);
}

// =============================================
// INICIALIZACIÓN
// =============================================

function setupEventListeners() {
    // Configurar botones de navegación
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
    document.getElementById('new-evaluation').addEventListener('click', () => {
        currentEvaluation = null;
        document.getElementById('nombrePuesto').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('responsabilidades').value = '';
        document.getElementById('funciones').value = '';
        document.getElementById('gerencial').value = '';
        document.getElementById('tecnica').value = '';
        document.getElementById('comunicacion').value = '';
        document.getElementById('complejidad').value = '';
        document.getElementById('marco').value = '';
        document.getElementById('libertad').value = '';
        document.getElementById('impacto').value = '';
        showStep('evaluation');
        resetWizard();
    });
    
    // Botón de búsqueda
    document.getElementById('search-button').addEventListener('click', buscarEvaluaciones);
    
    // Menú lateral
    document.querySelectorAll('.menu li').forEach(item => {
        item.addEventListener('click', function() {
            const step = this.getAttribute('data-step');
            showStep(step);
        });
    });
    
    // Event listeners para descripciones dinámicas
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
}

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    showStep('evaluation');
    
    // Manejar logo faltante
    const logo = document.querySelector('.logo');
    if (logo) logo.onerror = () => logo.style.display = 'none';
    
    // Cargar historial si existe
    cargarHistorial();
});