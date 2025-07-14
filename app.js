// Variables globales
let knowHowData, solucionData, responsabilidadData;
let currentEvaluacion = {};

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
    mostrarPaso(1);
    cargarHistorial();
});

// Cargar datos desde los archivos JSON
async function cargarDatos() {
    try {
        const responses = await Promise.all([
            fetch('data/know-how.json').then(res => res.json()),
            fetch('data/solucion-problemas.json').then(res => res.json()),
            fetch('data/responsabilidad.json').then(res => res.json())
        ]);
        
        [knowHowData, solucionData, responsabilidadData] = responses;
    } catch (error) {
        console.error('Error cargando los datos:', error);
        alert('Error al cargar los datos necesarios. Por favor recarga la página.');
    }
}

// Navegación entre pasos
function mostrarPaso(numeroPaso) {
    document.querySelectorAll('.paso').forEach(paso => {
        paso.classList.remove('active');
    });
    document.getElementById(`paso${numeroPaso}`).classList.add('active');
}

function siguientePaso(pasoDestino) {
    const pasoActual = document.querySelector('.paso.active').id.replace('paso', '');
    
    // Validar campos antes de avanzar
    if (pasoDestino > pasoActual) {
        const formulario = document.getElementById('evaluacionForm');
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
        
        // Validaciones específicas
        if (pasoActual == 2) {
            const complejidad = document.getElementById('complejidad').value;
            const marco = document.getElementById('marco').value;
            
            // Validar combinación imposible: Complejidad 5 con Marco A
            if (complejidad == '5' && marco == 'A') {
                alert('Combinación no válida: "Sin precedentes" no puede combinarse con "Rutina Estricta".');
                valido = false;
            }
        }
        
        if (!valido) {
            alert('Por favor complete todos los campos requeridos correctamente.');
            return;
        }
    }
    
    mostrarPaso(pasoDestino);
}

// Cálculos principales
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
    
    // Realizar cálculos
    const knowHow = calcularKnowHow(gerencial, tecnica, comunicacion);
    const solucion = calcularSolucionProblemas(complejidad, marco, knowHow.puntaje);
    const responsabilidad = calcularResponsabilidad(libertad, impacto);
    const resultadoFinal = calcularResultadoFinal(knowHow, solucion, responsabilidad);
    
    // Guardar en objeto global
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
    mostrarResultados(currentEvaluacion);
}

function calcularKnowHow(gerencial, tecnica, comunicacion) {
    const puntaje = knowHowData.puntajes[tecnica][comunicacion];
    return {
        gerencial: knowHowData.competencia_gerencial[gerencial],
        tecnica: knowHowData.competencia_tecnica[tecnica],
        comunicacion: knowHowData.comunicacion[comunicacion],
        puntaje: puntaje
    };
}

function calcularSolucionProblemas(complejidad, marco, knowHowScore) {
  const puntaje = solucionData.puntajes[marco][complejidad]; // ❌ Quita el "* 100"
  const perfil = determinarPerfilCorto(puntaje, knowHowScore);
  return {
    complejidad: solucionData.complejidad[complejidad],
    marco: solucionData.marco_referencia[marco],
    puntaje: puntaje,
    perfil: solucionData.perfil_corto[perfil]
  };
}

function determinarPerfilCorto(puntajeSolucion, puntajeKnowHow) {
    const diferencia = puntajeSolucion - puntajeKnowHow;
    
    if (diferencia > 0) {
        // Perfil alto en solución de problemas (P)
        if (diferencia > 150) return 'P4';
        if (diferencia > 100) return 'P3';
        if (diferencia > 50) return 'P2';
        return 'P1';
    } else {
        // Perfil alto en know-how (A)
        if (diferencia < -150) return 'A4';
        if (diferencia < -100) return 'A3';
        if (diferencia < -50) return 'A2';
        return 'A1';
    }
}

function calcularResponsabilidad(libertad, impacto) {
    const puntaje = responsabilidadData.puntajes[libertad][impacto];
    return {
        libertad: responsabilidadData.libertad_actuar[libertad],
        impacto: responsabilidadData.impacto[impacto],
        puntaje: puntaje
    };
}

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

// Mostrar resultados en pantalla
function mostrarResultados(evaluacion) {
    document.getElementById('result-nombre').textContent = evaluacion.nombre;
    document.getElementById('result-total').textContent = evaluacion.total;
    document.getElementById('result-hay').textContent = evaluacion.hayScore;
    document.getElementById('result-knowhow').textContent = `${evaluacion.knowHow.puntaje} (${evaluacion.knowHow.gerencial.split(':')[0]})`;
    document.getElementById('result-solucion').textContent = `${evaluacion.solucion.puntaje} (${evaluacion.solucion.perfil})`;
    document.getElementById('result-responsabilidad').textContent = `${evaluacion.responsabilidad.puntaje} (${evaluacion.responsabilidad.libertad.split(':')[0]})`;
    document.getElementById('result-perfil').textContent = evaluacion.solucion.perfil.includes('P') ? 'Perfil Estratégico' : 'Perfil Técnico';
    
    // Mostrar interpretación del nivel HAY
    let interpretacion = '';
    if (evaluacion.hayScore >= 21) {
        interpretacion = 'Alta dirección';
    } else if (evaluacion.hayScore >= 16) {
        interpretacion = 'Gerentes medios';
    } else if (evaluacion.hayScore >= 11) {
        interpretacion = 'Supervisores/junior';
    } else {
        interpretacion = 'Puestos operativos básicos';
    }
    
    document.getElementById('result-hay').textContent += ` - ${interpretacion}`;
    
    // Mostrar sección de resultados
    document.getElementById('evaluacionForm').classList.add('hidden');
    document.getElementById('resultados').classList.remove('hidden');
    document.getElementById('historial').classList.remove('hidden');
}

// Guardar evaluación en localStorage
function guardarEvaluacion() {
    if (!currentEvaluacion.nombre) {
        alert('No hay evaluación para guardar.');
        return;
    }
    
    const evaluaciones = JSON.parse(localStorage.getItem('evaluacionesHAY')) || [];
    evaluaciones.push(currentEvaluacion);
    localStorage.setItem('evaluacionesHAY', JSON.stringify(evaluaciones));
    
    alert('Evaluación guardada correctamente.');
    cargarHistorial();
}

// Cargar historial de evaluaciones
function cargarHistorial() {
    const evaluaciones = JSON.parse(localStorage.getItem('evaluacionesHAY')) || [];
    const lista = document.getElementById('lista-evaluaciones');
    lista.innerHTML = '';
    
    if (evaluaciones.length === 0) {
        lista.innerHTML = '<li>No hay evaluaciones guardadas</li>';
        return;
    }
    
    evaluaciones.forEach((eval, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${eval.nombre}</strong> - HAY ${eval.hayScore}
                <small>${eval.fecha}</small>
            </div>
            <button onclick="eliminarEvaluacion(${index})">Eliminar</button>
        `;
        lista.appendChild(li);
    });
}

// Eliminar evaluación del historial
function eliminarEvaluacion(index) {
    if (confirm('¿Está seguro de eliminar esta evaluación?')) {
        const evaluaciones = JSON.parse(localStorage.getItem('evaluacionesHAY')) || [];
        evaluaciones.splice(index, 1);
        localStorage.setItem('evaluacionesHAY', JSON.stringify(evaluaciones));
        cargarHistorial();
    }
}

// Generar PDF
function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const evaluacion = currentEvaluacion;
    const fecha = new Date().toLocaleDateString();
    
    // Encabezado
    doc.setFontSize(18);
    doc.text('Evaluación HAY - Metodología de Puestos', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Puesto: ${evaluacion.nombre}`, 14, 25);
    doc.text(`Fecha: ${fecha}`, 14, 32);
    
    // Resultados principales
    doc.setFontSize(14);
    doc.text('Resultados Principales', 14, 45);
    doc.setFontSize(12);
    doc.text(`Puntaje Total: ${evaluacion.total}`, 14, 55);
    doc.text(`Nivel HAY: ${evaluacion.hayScore}`, 14, 62);
    
    // Detalles por dimensión
    doc.setFontSize(14);
    doc.text('Detalles por Dimensión', 14, 75);
    doc.setFontSize(12);
    
    doc.text(`Know-How: ${evaluacion.knowHow.puntaje} puntos`, 14, 85);
    doc.text(`• ${evaluacion.knowHow.gerencial}`, 20, 92);
    doc.text(`• ${evaluacion.knowHow.tecnica}`, 20, 99);
    doc.text(`• ${evaluacion.knowHow.comunicacion}`, 20, 106);
    
    doc.text(`Solución de Problemas: ${evaluacion.solucion.puntaje} puntos`, 14, 117);
    doc.text(`• ${evaluacion.solucion.complejidad}`, 20, 124);
    doc.text(`• ${evaluacion.solucion.marco}`, 20, 131);
    doc.text(`• Perfil: ${evaluacion.solucion.perfil}`, 20, 138);
    
    doc.text(`Responsabilidad: ${evaluacion.responsabilidad.puntaje} puntos`, 14, 149);
    doc.text(`• ${evaluacion.responsabilidad.libertad}`, 20, 156);
    doc.text(`• ${evaluacion.responsabilidad.impacto}`, 20, 163);
    
    // Interpretación
    doc.setFontSize(14);
    doc.text('Interpretación', 14, 176);
    doc.setFontSize(12);
    
    let interpretacion = '';
    if (evaluacion.hayScore >= 21) {
        interpretacion = 'Este puesto corresponde a niveles de Alta Dirección, con responsabilidad estratégica y toma de decisiones complejas.';
    } else if (evaluacion.hayScore >= 16) {
        interpretacion = 'Este puesto corresponde a Gerentes Medios, con responsabilidad sobre departamentos o áreas funcionales.';
    } else if (evaluacion.hayScore >= 11) {
        interpretacion = 'Este puesto corresponde a Supervisores o profesionales junior, con responsabilidad sobre procesos específicos.';
    } else {
        interpretacion = 'Este puesto corresponde a niveles operativos básicos, con tareas rutinarias y supervisión cercana.';
    }
    
    doc.text(interpretacion, 14, 186, { maxWidth: 180 });
    
    // Perfil
    const perfil = evaluacion.solucion.perfil.includes('P') ? 
        'El puesto tiene un perfil más estratégico, con mayor énfasis en solución de problemas complejos.' : 
        'El puesto tiene un perfil más técnico, con mayor énfasis en conocimiento especializado.';
    
    doc.text(perfil, 14, 200, { maxWidth: 180 });
    
    // Guardar PDF
    doc.save(`Evaluacion_HAY_${evaluacion.nombre.replace(/ /g, '_')}.pdf`);
}

// Nueva evaluación
function nuevaEvaluacion() {
    document.getElementById('evaluacionForm').reset();
    document.getElementById('evaluacionForm').classList.remove('hidden');
    document.getElementById('resultados').classList.add('hidden');
    mostrarPaso(1);
}
