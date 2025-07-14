// Variable global para almacenar la evaluación actual
let currentEvaluacion = null;

// Datos integrados (sin necesidad de JSON externos)
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

// Función para calcular Know-How
function calcularKnowHow(gerencial, tecnica, comunicacion) {
  const puntaje = knowHowData.puntajes[tecnica][comunicacion];
  return {
    gerencial: knowHowData.competencia_gerencial[gerencial],
    tecnica: knowHowData.competencia_tecnica[tecnica],
    comunicacion: knowHowData.comunicacion[comunicacion],
    puntaje: puntaje
  };
}

// Función para calcular Solución de Problemas
function calcularSolucionProblemas(complejidad, marco, knowHowScore) {
  const puntaje = solucionData.puntajes[marco][complejidad];
  const perfil = determinarPerfilCorto(puntaje, knowHowScore);
  return {
    complejidad: solucionData.complejidad[complejidad],
    marco: solucionData.marco_referencia[marco],
    puntaje: puntaje,
    perfil: perfil
  };
}

// Función para determinar perfil corto
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

// Función para calcular Responsabilidad
function calcularResponsabilidad(libertad, impacto) {
  const puntaje = responsabilidadData.puntajes[libertad][impacto];
  return {
    libertad: responsabilidadData.libertad_actuar[libertad],
    impacto: responsabilidadData.impacto[impacto],
    puntaje: puntaje
  };
}

// Función para calcular el resultado final
function calcularResultadoFinal(knowHow, solucion, responsabilidad) {
  const total = knowHow.puntaje + solucion.puntaje + responsabilidad.puntaje;

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

  return { total, hayScore: determinarNivelHAY(total) };
}

// Función principal llamada desde el HTML
function calcularResultados() {
  // Obtener valores del formulario
  const gerencial = document.getElementById('gerencial').value;
  const tecnica = document.getElementById('tecnica').value;
  const comunicacion = document.getElementById('comunicacion').value;
  const complejidad = document.getElementById('complejidad').value;
  const marco = document.getElementById('marco').value;
  const libertad = document.getElementById('libertad').value;
  const impacto = document.getElementById('impacto').value;
  const nombrePuesto = document.getElementById('nombrePuesto').value;

  // Validar campos vacíos
  if (!gerencial || !tecnica || !comunicacion || !complejidad || !marco || !libertad || !impacto || !nombrePuesto) {
    alert('Por favor complete todos los campos.');
    return;
  }

  // Calcular dimensiones
  const knowHow = calcularKnowHow(gerencial, tecnica, comunicacion);
  const solucion = calcularSolucionProblemas(complejidad, marco, knowHow.puntaje);
  const responsabilidad = calcularResponsabilidad(libertad, impacto);
  const resultadoFinal = calcularResultadoFinal(knowHow, solucion, responsabilidad);

  // Guardar evaluación actual
  currentEvaluacion = {
    nombre: nombrePuesto,
    knowHow,
    solucion,
    responsabilidad,
    total: resultadoFinal.total,
    hayScore: resultadoFinal.hayScore,
    fecha: new Date().toLocaleString()
  };

  // Mostrar resultados
  document.getElementById('result-nombre').textContent = currentEvaluacion.nombre;
  document.getElementById('result-total').textContent = currentEvaluacion.total;
  document.getElementById('result-hay').textContent = currentEvaluacion.hayScore;
  document.getElementById('result-knowhow').textContent = `${currentEvaluacion.knowHow.puntaje} (${currentEvaluacion.knowHow.gerencial.split(':')[0].trim()})`;
  document.getElementById('result-solucion').textContent = `${currentEvaluacion.solucion.puntaje} (${currentEvaluacion.solucion.perfil})`;
  document.getElementById('result-responsabilidad').textContent = `${currentEvaluacion.responsabilidad.puntaje} (${currentEvaluacion.responsabilidad.libertad.split(':')[0].trim()})`;
  document.getElementById('result-perfil').textContent = currentEvaluacion.solucion.perfil.includes('P') ? 'Perfil Estratégico' : 'Perfil Técnico';

  // Mostrar sección de resultados
  document.getElementById('evaluacionForm').classList.add('hidden');
  document.getElementById('resultados').classList.remove('hidden');
}

// Función para guardar evaluación
function guardarEvaluacion() {
  if (!currentEvaluacion) {
    alert('No hay evaluación para guardar. Calcule primero los resultados.');
    return;
  }

  const evaluaciones = JSON.parse(localStorage.getItem('evaluacionesHAY')) || [];
  evaluaciones.push(currentEvaluacion);
  localStorage.setItem('evaluacionesHAY', JSON.stringify(evaluaciones));
  alert('Evaluación guardada correctamente.');
}

// Función para generar PDF
function generarPDF() {
  if (!currentEvaluacion) {
    alert('No hay resultados para exportar. Calcule primero la evaluación.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(18);
  doc.text('Evaluación HAY - Metodología de Puestos', 105, 20, { align: 'center' });

  // Datos básicos
  doc.setFontSize(12);
  doc.text(`Puesto: ${currentEvaluacion.nombre}`, 20, 40);
  doc.text(`Fecha: ${currentEvaluacion.fecha}`, 20, 50);

  // Resultados
  doc.setFontSize(14);
  doc.text('Resultados:', 20, 70);
  doc.setFontSize(12);
  doc.text(`Puntaje Total: ${currentEvaluacion.total}`, 20, 80);
  doc.text(`Nivel HAY: ${currentEvaluacion.hayScore}`, 20, 90);

  // Detalles
  doc.text(`Know-How: ${currentEvaluacion.knowHow.puntaje} pts`, 20, 110);
  doc.text(`Solución Problemas: ${currentEvaluacion.solucion.puntaje} pts`, 20, 120);
  doc.text(`Responsabilidad: ${currentEvaluacion.responsabilidad.puntaje} pts`, 20, 130);

  // Guardar PDF
  doc.save(`Evaluacion_HAY_${currentEvaluacion.nombre.replace(/ /g, '_')}.pdf`);
}

// Función para nueva evaluación
function nuevaEvaluacion() {
  document.getElementById('evaluacionForm').reset();
  document.getElementById('evaluacionForm').classList.remove('hidden');
  document.getElementById('resultados').classList.add('hidden');
  mostrarPaso(1);
}

// Función para navegar entre pasos
function mostrarPaso(numeroPaso) {
  document.querySelectorAll('.paso').forEach(paso => {
    paso.classList.remove('active');
  });
  document.getElementById(`paso${numeroPaso}`).classList.add('active');
}

function siguientePaso(pasoDestino) {
  const pasoActual = parseInt(document.querySelector('.paso.active').id.replace('paso', ''));
  
  // Validar campos antes de avanzar
  if (pasoDestino > pasoActual) {
    const inputs = document.querySelectorAll(`#paso${pasoActual} [required]`);
    let valido = true;
    
    inputs.forEach(input => {
      if (!input.value) {
        input.style.borderColor = 'red';
        valido = false;
      } else {
        input.style.borderColor = '#ddd';
      }
    });
    
    if (!valido) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }
  }
  
  mostrarPaso(pasoDestino);
}

// Cargar tooltips (opcional)
document.querySelectorAll('.tooltip-icon').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = icon.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
  });
});
