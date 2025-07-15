let evaluacionEnCurso = false;
// =============================================
// DATOS DE EVALUACIÓN HAY (Know-How, Solución, Responsabilidad)
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
// FUNCIONES DE NAVEGACIÓN
// =============================================
function showStep(step) {
    if (step === 5 && evaluacionEnCurso) {
        alert("No podés acceder al historial mientras estás completando una evaluación.");
        return;
    }
    // Ocultar todos los pasos
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
    });
    
    // Mostrar paso actual
    const stepEl = document.getElementById(`step-${step}`);
    if (stepEl) {
        stepEl.style.display = 'block';
        setTimeout(() => {
            stepEl.classList.add('active');
        }, 10);
    }
    
    // Actualizar menú lateral
    document.querySelectorAll('.menu li').forEach(el => el.classList.remove('active'));
    const menuItem = document.querySelector(`.menu li[data-step="${step}"]`);
    if (menuItem) menuItem.classList.add('active');
    
    // Actualizar barra de progreso (solo para pasos 1-4)
    if (step >= 1 && step <= 4) {
        document.getElementById('progress').style.width = `${(step-1)*33.33}%`;
        document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
    }
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
    } else if (step === 'results') {
        isValid = validateStep4();
    }
    
    if (isValid) {
        showStep(step);
        window.scrollTo(0, 0);
    }
}

// =============================================
// VALIDACIONES DE FORMULARIOS
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
        alert('Por favor complete todos los campos obligatorios (*)');
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
        alert('Por favor complete todos los campos de Know-How');
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
        alert('Por favor complete todos los campos de Solución de Problemas');
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
        alert('Por favor complete todos los campos de Responsabilidad');
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
    
    // Mostrar paso de resultados
    showStep('results');
}

// =============================================
// GESTIÓN DE EVALUACIONES (CRUD)
// =============================================
function guardarEvaluacion() {
    if (!currentEvaluation) {
        alert('No hay evaluación para guardar. Calcule primero los resultados.');
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
    alert('Evaluación guardada correctamente!');
    cargarHistorial();
}

function cargarHistorial() {
    const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
    const list = document.getElementById('evaluations-list');
    
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
    
    showStep(5);
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
        showStep(1);
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
    
    let evaluationData;
    
    if (id) {
        const evaluaciones = JSON.parse(localStorage.getItem('hayEvaluaciones')) || [];
        evaluationData = evaluaciones.find(e => e.id === id);
    } else {
        evaluationData = currentEvaluation;
    }
    
    if (!evaluationData) {
        alert('No se encontraron datos para generar el PDF');
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
            fillColor: [52, 73, 94], // Color dark
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

// =============================================
// OTRAS FUNCIONALIDADES
// =============================================
function nuevaEvaluacion() {
    currentEvaluation = null;
    document.getElementById('evaluacionForm').reset();
    showStep(1);
}

// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Configurar tooltips
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });
    
    // Mostrar primer paso
    showStep(1);
});

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-element';
    tooltip.textContent = e.target.getAttribute('data-tooltip');
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width/2}px`;
    tooltip.style.top = `${rect.top - 35}px`;
    
    setTimeout(() => {
        tooltip.classList.add('visible');
    }, 10);
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip-element');
    if (tooltip) {
        tooltip.classList.remove('visible');
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }
}