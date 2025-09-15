export async function classifyEventMock(description: string) {
  let severity: "LOW" | "MED" | "HIGH" | "CRITICAL" = "MED";
  let suggestion = "Revisar manualmente";

  if (/crash|caída|down|offline|fatal|crítico/i.test(description)) {
    severity = "CRITICAL";
    suggestion = "Escalar inmediatamente al equipo de soporte";
  } else if (/error|fallo|denegado|timeout|500/i.test(description)) {
    severity = "HIGH";
    suggestion = "Investigar de inmediato";
  } else if (/alerta|posible|warning|alto uso|sospechoso/i.test(description)) {
    severity = "MED";
    suggestion = "Monitorear con más frecuencia";
  } else if (/registrado|creado|ok|correctamente/i.test(description)) {
    severity = "LOW";
    suggestion = "No requiere acción";
  }

  return {
    summary: `Resumen simulado del evento: "${description}"`,
    severity,
    suggestion,
  };
}
