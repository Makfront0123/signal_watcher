export async function classifyEventMock(description: string) {
    let severity: "LOW" | "MED" | "HIGH" | "CRITICAL" = "MED";
    let suggestion = "Revisar manualmente";

    if (/error|fallo|crítico/i.test(description)) {
        severity = "HIGH";
        suggestion = "Investigar de inmediato";
    } else if (/alerta|posible/i.test(description)) {
        severity = "LOW";
        suggestion = "Monitorear";
    }

    return {
        summary: `Resumen simulado del evento: "${description}"`,
        severity,
        suggestion,
    };
}

 