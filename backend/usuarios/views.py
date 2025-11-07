from .models import Postulacion, Notificacion
from .serializers import PostulacionSerializer, NotificacionSerializer
# ViewSet para Postulacion
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
class PostulacionViewSet(viewsets.ModelViewSet):
    queryset = Postulacion.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            from .serializers import PostulacionWriteSerializer
            return PostulacionWriteSerializer
        return PostulacionSerializer
    
    def get_queryset(self):
        queryset = Postulacion.objects.all()
        
        # Filtrar por aspirante
        aspirante = self.request.query_params.get('pos_aspirante_fk', None)
        if aspirante is not None:
            queryset = queryset.filter(pos_aspirante_fk=aspirante)
        
        # Filtrar por vacante
        vacante = self.request.query_params.get('pos_vacante_fk', None)
        if vacante is not None:
            queryset = queryset.filter(pos_vacante_fk=vacante)
        
        # Filtrar por estado
        estado = self.request.query_params.get('pos_estado', None)
        if estado is not None:
            queryset = queryset.filter(pos_estado=estado)
        
        # Ordenar por fecha de postulación (más recientes primero)
        queryset = queryset.order_by('-pos_fechaPostulacion')
        
        return queryset
from .models import ExperienciaLaboral, ExperienciaEscolar
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UsuarioSerializer, AspiranteSerializer, EmpresaSerializer, VacanteSerializer, UsuarioRegistroSerializer, ExperienciaLaboralSerializer, ExperienciaEscolarSerializer
# ViewSet para ExperienciaLaboral
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class ExperienciaLaboralViewSet(viewsets.ModelViewSet):
    queryset = ExperienciaLaboral.objects.all()
    serializer_class = ExperienciaLaboralSerializer
    permission_classes = [IsAuthenticated]

# ViewSet para ExperienciaEscolar
class ExperienciaEscolarViewSet(viewsets.ModelViewSet):
    queryset = ExperienciaEscolar.objects.all()
    serializer_class = ExperienciaEscolarSerializer
    permission_classes = [IsAuthenticated]
from .models import Usuarios, Aspirante, Empresa, Vacante

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuarioSerializer

from rest_framework import filters

class AspiranteViewSet(viewsets.ModelViewSet):
    queryset = Aspirante.objects.all()
    serializer_class = AspiranteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['asp_usuario_fk__user_nombre']

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer


class VacanteViewSet(viewsets.ModelViewSet):
    queryset = Vacante.objects.all()
    serializer_class = VacanteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['va_titulo', 'va_descripcion', 'va_requisitos']
    
    def get_serializer_class(self):
        # Usar VacanteWriteSerializer para crear/actualizar
        if self.action in ['create', 'update', 'partial_update']:
            from .serializers import VacanteWriteSerializer
            return VacanteWriteSerializer
        # Usar VacanteSerializer para listar/obtener (con datos de empresa)
        return VacanteSerializer
    
    def get_queryset(self):
        queryset = Vacante.objects.all()
        
        # Filtrar por empresa
        empresa = self.request.query_params.get('empresa', None)
        if empresa is not None:
            queryset = queryset.filter(va_idEmpresa_fk=empresa)
        
        # Filtrar por ubicación
        ubicacion = self.request.query_params.get('ubicacion', None)
        if ubicacion is not None:
            queryset = queryset.filter(va_ubicacion__icontains=ubicacion)
        
        # Filtrar por tipo de empleo
        tipo_empleo = self.request.query_params.get('tipo_empleo', None)
        if tipo_empleo is not None:
            queryset = queryset.filter(va_tipo_empleo=tipo_empleo)
        
        # Filtrar por estado (activa/inactiva)
        estado = self.request.query_params.get('estado', None)
        if estado is not None:
            queryset = queryset.filter(va_estado=estado)
        
        # Ordenar por fecha de publicación (más recientes primero)
        queryset = queryset.order_by('-va_fecha_publicacion')
        
        return queryset

class DetalleVacanteViewSet(viewsets.ModelViewSet):
    pass  # Eliminado Detalle_Vacante




class UsuarioRegistroView(APIView):
    def post(self, request):
        serializer = UsuarioRegistroSerializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()
            return Response(
                {"message": "Usuario registrado exitosamente"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# ViewSet para Notificaciones
class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filtrar notificaciones del usuario actual"""
        user = self.request.user
        queryset = Notificacion.objects.filter(not_usuario_fk=user).order_by('-not_fecha')
        
        # Filtrar por estado (leída/no leída)
        estado = self.request.query_params.get('not_estado', None)
        if estado is not None:
            queryset = queryset.filter(not_estado=estado)
        
        return queryset
    
    @action(detail=True, methods=['post'])
    def marcar_leida(self, request, pk=None):
        """Marcar una notificación como leída"""
        notificacion = self.get_object()
        notificacion.not_estado = 'Leída'
        notificacion.save()
        serializer = self.get_serializer(notificacion)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def marcar_todas_leidas(self, request):
        """Marcar todas las notificaciones del usuario como leídas"""
        user = request.user
        Notificacion.objects.filter(not_usuario_fk=user, not_estado='No leída').update(not_estado='Leída')
        return Response({'message': 'Todas las notificaciones han sido marcadas como leídas'})
    
    @action(detail=False, methods=['get'])
    def no_leidas_count(self, request):
        """Obtener el conteo de notificaciones no leídas"""
        user = request.user
        count = Notificacion.objects.filter(not_usuario_fk=user, not_estado='No leída').count()
        return Response({'count': count})


# Vista para el formulario de contacto
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings

@api_view(['POST'])
@permission_classes([AllowAny])
def contacto_view(request):
    """
    Vista para procesar el formulario de contacto.
    Envía un email con los datos del formulario.
    """
    try:
        nombre = request.data.get('nombre', '')
        email = request.data.get('email', '')
        asunto = request.data.get('asunto', '')
        mensaje = request.data.get('mensaje', '')
        
        # Validar que todos los campos estén presentes
        if not all([nombre, email, asunto, mensaje]):
            return Response(
                {'error': 'Todos los campos son requeridos'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Construir el mensaje del email
        mensaje_email = f"""
Nuevo mensaje de contacto de TurboEmpleo:

Nombre: {nombre}
Email: {email}
Asunto: {asunto}

Mensaje:
{mensaje}
"""
        
        # En desarrollo, imprimir en consola
        print('='*60)
        print('NUEVO MENSAJE DE CONTACTO')
        print('='*60)
        print(mensaje_email)
        print('='*60)
        
        # Intentar enviar email (opcional en desarrollo)
        try:
            # Configurar el email solo si está configurado en settings
            if hasattr(settings, 'EMAIL_HOST') and settings.EMAIL_HOST:
                send_mail(
                    subject=f'Contacto TurboEmpleo: {asunto}',
                    message=mensaje_email,
                    from_email=getattr(settings, 'DEFAULT_FROM_EMAIL', 'noreply@turboempleo.co'),
                    recipient_list=[getattr(settings, 'CONTACT_EMAIL', 'contacto@turboempleo.co')],
                    fail_silently=True,
                )
        except Exception as email_error:
            # Si falla el email, solo lo registramos pero no fallar la petición
            print(f"Advertencia: No se pudo enviar email: {str(email_error)}")
        
        return Response(
            {'message': 'Mensaje enviado con éxito'},
            status=status.HTTP_200_OK
        )
            
    except Exception as e:
        print(f"Error en contacto_view: {str(e)}")
        return Response(
            {'error': 'Error al procesar el mensaje'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )