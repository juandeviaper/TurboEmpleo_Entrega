from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Postulacion, Notificacion, Aspirante, Empresa

@receiver(post_save, sender=Postulacion)
def crear_notificacion_nueva_postulacion(sender, instance, created, **kwargs):
    """
    Crea una notificación para el empleador cuando un aspirante se postula a una vacante.
    HU10 - Notificaciones de Postulación
    """
    if created:
        # Obtener la empresa de la vacante
        vacante = instance.pos_vacante_fk
        empresa = vacante.va_idEmpresa_fk
        usuario_empresa = empresa.em_usuario_fk
        
        # Obtener el nombre del aspirante
        aspirante = instance.pos_aspirante_fk
        nombre_aspirante = f"{aspirante.asp_nombre} {aspirante.asp_apellido}"
        
        # Crear notificación para el empleador
        Notificacion.objects.create(
            not_usuario_fk=usuario_empresa,
            not_contenido=f"Nueva postulación de {nombre_aspirante} para la vacante '{vacante.va_titulo}'",
            not_estado='No leída'
        )

@receiver(pre_save, sender=Postulacion)
def notificar_cambio_estado_postulacion(sender, instance, **kwargs):
    """
    Crea una notificación para el aspirante cuando cambia el estado de su postulación.
    HU11 - Notificaciones de Estado
    """
    # Solo si la postulación ya existe (actualización)
    if instance.pk:
        try:
            # Obtener el estado anterior
            postulacion_anterior = Postulacion.objects.get(pk=instance.pk)
            estado_anterior = postulacion_anterior.pos_estado
            estado_nuevo = instance.pos_estado
            
            # Si el estado cambió, crear notificación
            if estado_anterior != estado_nuevo:
                aspirante = instance.pos_aspirante_fk
                usuario_aspirante = aspirante.asp_usuario_fk
                vacante = instance.pos_vacante_fk
                empresa = vacante.va_idEmpresa_fk
                
                # Mensaje según el nuevo estado
                mensajes_estado = {
                    'Pendiente': f"Tu postulación a '{vacante.va_titulo}' está pendiente de revisión.",
                    'En revisión': f"Tu postulación a '{vacante.va_titulo}' está siendo revisada por {empresa.em_nombre}.",
                    'En Revisión': f"Tu postulación a '{vacante.va_titulo}' está siendo revisada por {empresa.em_nombre}.",
                    'Entrevista programada': f"¡Felicidades! {empresa.em_nombre} ha programado una entrevista para la vacante '{vacante.va_titulo}'.",
                    'Entrevista Programada': f"¡Felicidades! {empresa.em_nombre} ha programado una entrevista para la vacante '{vacante.va_titulo}'.",
                    'Aceptada': f"¡Felicitaciones! Tu postulación a '{vacante.va_titulo}' ha sido aceptada por {empresa.em_nombre}.",
                    'Rechazada': f"Tu postulación a '{vacante.va_titulo}' no ha sido seleccionada en esta ocasión."
                }
                
                mensaje = mensajes_estado.get(estado_nuevo, f"El estado de tu postulación a '{vacante.va_titulo}' ha cambiado a: {estado_nuevo}")
                
                # Crear notificación para el aspirante
                Notificacion.objects.create(
                    not_usuario_fk=usuario_aspirante,
                    not_contenido=mensaje,
                    not_estado='No leída'
                )
        except Postulacion.DoesNotExist:
            pass
