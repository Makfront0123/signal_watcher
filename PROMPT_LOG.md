# Historial de clasificación de eventos por IA

## Evento 1
**Descripción:** Servidor principal caído en us-east-1  
**IA debería devolver:**  
- severity: CRITICAL  
- suggestion: Escalar inmediatamente al equipo de soporte

## Evento 2
**Descripción:** Error 500 en endpoint /api/watchlists  
**IA debería devolver:**  
- severity: HIGH  
- suggestion: Investigar de inmediato

## Evento 3
**Descripción:** Posible uso anormal de memoria detectado  
**IA debería devolver:**  
- severity: MED  
- suggestion: Monitorear con más frecuencia

## Evento 4
**Descripción:** Watchlist creada correctamente por el usuario  
**IA debería devolver:**  
- severity: LOW  
- suggestion: No requiere acción

## Evento 5
**Descripción:** Timeout en conexión a Redis  
**IA debería devolver:**  
- severity: HIGH  
- suggestion: Investigar de inmediato

## Evento 6
**Descripción:** CPU al 95% en servidor secundario  
**IA debería devolver:**  
- severity: MED  
- suggestion: Monitorear con más frecuencia

## Evento 7
**Descripción:** Evento registrado correctamente en la base de datos  
**IA debería devolver:**  
- severity: LOW  
- suggestion: No requiere acción

## Watchlist 1:
Nombre: Seguridad
Términos: ["caída", "crash", "fatal", "offline"]

## Watchlist 2:
Nombre: Rendimiento
Términos: ["alto uso", "CPU", "memoria", "lento"]

## Watchlist 3:
Nombre: Errores comunes
Términos: ["error", "fallo", "timeout", "500"]
