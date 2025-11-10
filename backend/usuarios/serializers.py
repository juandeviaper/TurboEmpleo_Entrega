
import re
from rest_framework import serializers
from .models import Empresa, Vacante, Postulacion, ExperienciaLaboral, ExperienciaEscolar, Rol, Usuarios, Aspirante, Notificacion
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.utils import timezone

def clean_location_name(name):
    if not name:
        return name
    
    # Remove leading digits and spaces (e.g., "001203 CARACAS" -> "CARACAS")
    cleaned_name = re.sub(r'^\d+\s*', '', name)
    
    # Convert to title case, handling common Spanish prepositions and articles
    # This is a simplified approach; a more robust solution might involve a list of exceptions
    words = cleaned_name.split()
    title_cased_words = []
    for i, word in enumerate(words):
        if word.lower() in ['de', 'la', 'el', 'los', 'las', 'y', 'o', 'a', 'en']:
            title_cased_words.append(word.lower())
        else:
            title_cased_words.append(word.capitalize())
    
    return ' '.join(title_cased_words)

# Serializadores Base
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', 'user_nombre', 'user_rol_fk', 'is_active', 'is_staff']

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class AspiranteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aspirante
        fields = '__all__'

# Serializador de Registro
class RegistroSerializer(serializers.Serializer):
    # Campos de usuario
    user_nombre = serializers.CharField(max_length=100)
    user_contraseña = serializers.CharField(write_only=True)
    user_rol = serializers.CharField(max_length=50)

    # Campos de aspirante
    asp_nombre = serializers.CharField(max_length=100, required=False, allow_blank=True)
    asp_apellido = serializers.CharField(max_length=100, required=False, allow_blank=True)
    asp_correo = serializers.EmailField(required=False, allow_blank=True)
    asp_telefono = serializers.CharField(max_length=20, required=False, allow_blank=True)
    asp_departamento = serializers.CharField(max_length=100, required=False, allow_blank=True)
    asp_ciudad = serializers.CharField(max_length=100, required=False, allow_blank=True)
    asp_ocupacion = serializers.CharField(max_length=100, required=False, allow_blank=True)
    asp_tipoId = serializers.CharField(max_length=10, required=False, allow_blank=True)
    asp_numeroId = serializers.CharField(max_length=30, required=False, allow_blank=True)
    asp_cargo = serializers.CharField(max_length=100, required=False, allow_blank=True)
    asp_descripcion = serializers.CharField(required=False, allow_blank=True)
    asp_idiomas = serializers.JSONField(required=False)
    asp_curriculum = serializers.FileField(required=False, allow_null=True)
    asp_foto = serializers.ImageField(required=False, allow_null=True)

    # Campos de empresa
    em_nombre = serializers.CharField(max_length=150, required=False, allow_blank=True)
    em_nit = serializers.CharField(max_length=50, required=False, allow_blank=True)
    em_email = serializers.EmailField(required=False, allow_blank=True)
    em_telefono = serializers.CharField(max_length=20, required=False, allow_blank=True)
    em_localidad = serializers.CharField(max_length=100, required=False, allow_blank=True)
    em_barrio = serializers.CharField(max_length=100, required=False, allow_blank=True)
    em_sector = serializers.CharField(max_length=100, required=False, allow_blank=True)
    em_contacto = serializers.CharField(max_length=100, required=False, allow_blank=True)
    em_descripcion = serializers.CharField(required=False, allow_blank=True)
    em_sitioWeb = serializers.URLField(required=False, allow_blank=True)
    em_tamano = serializers.CharField(max_length=50, required=False, allow_blank=True)
    em_direccion = serializers.CharField(max_length=255, required=False, allow_blank=True)
    em_idiomas = serializers.JSONField(required=False)
    em_curriculum = serializers.FileField(required=False, allow_null=True)
    em_logo = serializers.ImageField(required=False, allow_null=True)

    def validate(self, data):
        user_nombre = data.get('user_nombre')
        user_rol = data.get('user_rol', '').lower()
        asp_correo = data.get('asp_correo')
        em_email = data.get('em_email')
        em_nit = data.get('em_nit')

        # Validar que el nombre de usuario no sea un correo electrónico
        if '@' in user_nombre:
            raise serializers.ValidationError({
                'user_nombre': 'El nombre de usuario no puede ser un correo electrónico. Por favor, elija un nombre de usuario que no contenga "@".'
            })

        # Validar nombre de usuario único
        if Usuarios.objects.filter(user_nombre=user_nombre).exists():
            raise serializers.ValidationError({
                'user_nombre': 'Este nombre de usuario ya está en uso'
            })

        # Validar email único a través de todos los modelos
        email_to_check = asp_correo if user_rol == 'aspirante' else em_email
        if email_to_check:
            # Verificar en Usuarios
            if Usuarios.objects.filter(email=email_to_check).exists():
                raise serializers.ValidationError({
                    'email': 'Este correo electrónico ya está registrado'
                })
            # Verificar en Aspirantes
            if Aspirante.objects.filter(asp_correo=email_to_check).exists():
                raise serializers.ValidationError({
                    'email': 'Este correo electrónico ya está registrado por un aspirante'
                })
            # Verificar en Empresas
            if Empresa.objects.filter(em_email=email_to_check).exists():
                raise serializers.ValidationError({
                    'email': 'Este correo electrónico ya está registrado por una empresa'
                })

        # Validaciones específicas para aspirantes
        if user_rol == 'aspirante':
            if not asp_correo:
                raise serializers.ValidationError({
                    'asp_correo': 'El correo es requerido para aspirantes'
                })

        # Validaciones específicas para empresas
        if user_rol == 'empresa':
            if not em_email:
                raise serializers.ValidationError({
                    'em_email': 'El correo es requerido para empresas'
                })
            if not em_nit:
                raise serializers.ValidationError({
                    'em_nit': 'El NIT es requerido para empresas'
                })
            if Empresa.objects.filter(em_nit=em_nit).exists():
                raise serializers.ValidationError({
                    'em_nit': 'Este NIT ya está registrado'
                })

        return data

    def create(self, validated_data):
        request = self.context.get('request')
        files = request.FILES if request else None

        user_rol = validated_data.pop('user_rol').lower()
        user_nombre = validated_data.pop('user_nombre')
        user_contraseña = validated_data.pop('user_contraseña')

        # Obtener email según tipo de usuario
        email = validated_data.get('asp_correo' if user_rol == 'aspirante' else 'em_email')
        
        # Verificar una última vez que el email no exista
        if email and (
            Usuarios.objects.filter(email=email).exists() or
            Aspirante.objects.filter(asp_correo=email).exists() or
            Empresa.objects.filter(em_email=email).exists()
        ):
            raise serializers.ValidationError({
                'email': 'Este correo electrónico ya está registrado'
            })

        # Crear o obtener el rol
        rol_obj, _ = Rol.objects.get_or_create(rol_nombre=user_rol)

        # Crear usuario (inactivo hasta confirmar correo)
        usuario = Usuarios.objects.create_user(
            user_nombre=user_nombre,
            password=user_contraseña,
            user_rol_fk=rol_obj,
            is_active=False,
            email=email
        )

        try:
            # Crear perfil según el rol
            if user_rol == 'aspirante':
                perfil_data = {
                    'asp_usuario_fk': usuario,
                    'asp_nombre': validated_data.get('asp_nombre'),
                    'asp_apellido': validated_data.get('asp_apellido'),
                    'asp_correo': email,
                    'asp_telefono': validated_data.get('asp_telefono'),
                    'asp_departamento': validated_data.get('asp_departamento'),
                    'asp_ciudad': validated_data.get('asp_ciudad'),
                    'asp_ocupacion': validated_data.get('asp_ocupacion'),
                    'asp_tipoId': validated_data.get('asp_tipoId'),
                    'asp_numeroId': validated_data.get('asp_numeroId'),
                    'asp_cargo': validated_data.get('asp_cargo'),
                    'asp_descripcion': validated_data.get('asp_descripcion'),
                    'asp_idiomas': validated_data.get('asp_idiomas'),
                }

                if files:
                    if 'asp_curriculum' in files:
                        perfil_data['asp_curriculum'] = files['asp_curriculum']
                    if 'asp_foto' in files:
                        perfil_data['asp_foto'] = files['asp_foto']

                perfil = Aspirante.objects.create(**perfil_data)

            else:  # empresa
                perfil_data = {
                    'em_usuario_fk': usuario,
                    'em_nombre': validated_data.get('em_nombre'),
                    'em_nit': validated_data.get('em_nit'),
                    'em_email': email,
                    'em_telefono': validated_data.get('em_telefono'),
                    'em_localidad': validated_data.get('em_localidad'),
                    'em_barrio': validated_data.get('em_barrio'),
                    'em_sector': validated_data.get('em_sector'),
                    'em_contacto': validated_data.get('em_contacto'),
                    'em_descripcion': validated_data.get('em_descripcion'),
                    'em_sitioWeb': validated_data.get('em_sitioWeb'),
                    'em_tamano': validated_data.get('em_tamano'),
                    'em_direccion': validated_data.get('em_direccion'),
                    'em_idiomas': validated_data.get('em_idiomas'),
                }

                if files:
                    if 'em_curriculum' in files:
                        perfil_data['em_curriculum'] = files['em_curriculum']
                    if 'em_logo' in files:
                        perfil_data['em_logo'] = files['em_logo']

                perfil = Empresa.objects.create(**perfil_data)

            # Enviar correo de activación
            if email:
                uid = urlsafe_base64_encode(force_bytes(usuario.pk))
                token = default_token_generator.make_token(usuario)
                activation_link = f"{settings.FRONTEND_URL}/activar-cuenta/{uid}/{token}/"
                send_mail(
                    'Activa tu cuenta en TurboEmpleo',
                    f'Hola {user_nombre},\n\nPor favor activa tu cuenta haciendo clic en el siguiente enlace:\n{activation_link}\n\nEste enlace expirará en unas horas.\n',
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )

            return perfil

        except Exception as e:
            usuario.delete()  # Rollback si algo falla
            raise serializers.ValidationError(str(e))


# Serializer para autenticación
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'user_nombre'
    default_error_messages = {
        'no_active_account': 'No se encontró una cuenta activa con las credenciales proporcionadas.',
    }

    def validate(self, attrs):
        try:
            user_nombre = attrs.get('user_nombre')
            user = Usuarios.objects.get(user_nombre=user_nombre)

            # Verificar bloqueo
            if user.login_blocked_until and user.login_blocked_until > timezone.now():
                raise serializers.ValidationError({
                    'detail': f'Usuario bloqueado temporalmente. Intente de nuevo después de {user.login_blocked_until.strftime("%H:%M:%S")}'
                })

            # Verificar si la cuenta está activa
            if not user.is_active:
                raise serializers.ValidationError({
                    'detail': 'Esta cuenta aún no ha sido activada. Por favor, revise su correo electrónico para activar su cuenta.'
                })

            # Validar credenciales
            try:
                data = super().validate(attrs)
            except serializers.ValidationError:
                user.failed_login_attempts += 1
                user.last_failed_login = timezone.now()
                
                if user.failed_login_attempts >= 5:
                    from datetime import timedelta
                    user.login_blocked_until = timezone.now() + timedelta(minutes=5)
                    user.failed_login_attempts = 0
                    user.save()
                    raise serializers.ValidationError({
                        'detail': 'Demasiados intentos fallidos. Su cuenta ha sido bloqueada temporalmente por 5 minutos.'
                    })
                
                user.save()
                raise serializers.ValidationError({
                    'detail': 'Nombre de usuario o contraseña incorrectos.'
                })

            # Reset contador de intentos fallidos
            user.failed_login_attempts = 0
            user.login_blocked_until = None
            user.save()

            # Agregar datos del perfil
            user_data = None
            aspirante = Aspirante.objects.filter(asp_usuario_fk=user).first()
            
            if aspirante:
                user_data = AspiranteSerializer(aspirante).data
            else:
                empresa = Empresa.objects.filter(em_usuario_fk=user).first()
                if empresa:
                    user_data = EmpresaSerializer(empresa).data
                    
            data['user'] = user_data
            return data

        except Usuarios.DoesNotExist:
            raise serializers.ValidationError({
                'detail': 'No se encontró ninguna cuenta con ese nombre de usuario.'
            })
        except Exception as e:
            raise serializers.ValidationError({
                'detail': 'Error al iniciar sesión. Por favor, inténtelo de nuevo.'
            })

# Serializers para otras funcionalidades
class VacanteSerializer(serializers.ModelSerializer):
    va_idEmpresa_fk = EmpresaSerializer(read_only=True)
    
    class Meta:
        model = Vacante
        fields = '__all__'

class VacanteWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacante
        fields = '__all__'

class PostulacionSerializer(serializers.ModelSerializer):
    pos_vacante_fk = VacanteSerializer(read_only=True)
    pos_aspirante_fk = AspiranteSerializer(read_only=True)
    
    class Meta:
        model = Postulacion
        fields = '__all__'

class PostulacionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulacion
        fields = '__all__'
    
    def validate(self, data):
        aspirante = data.get('pos_aspirante_fk')
        vacante = data.get('pos_vacante_fk')
        
        if not aspirante or not vacante:
            raise serializers.ValidationError({
                'detail': 'Se requieren tanto el aspirante como la vacante.'
            })

        # Validar que la postulación no exista
        if Postulacion.objects.filter(pos_aspirante_fk=aspirante, pos_vacante_fk=vacante).exists():
            raise serializers.ValidationError({
                'detail': 'Ya te has postulado a esta vacante anteriormente.'
            })

        # Asegurar que el estado sea válido y en minúsculas
        estado = data.get('pos_estado', 'pendiente').lower()
        data['pos_estado'] = estado
        
        # Validar que el estado sea uno de los permitidos
        estados_validos = [estado[0] for estado in Postulacion.ESTADOS]
        if estado not in estados_validos:
            raise serializers.ValidationError({
                'pos_estado': f'Estado inválido. Debe ser uno de: {", ".join(estados_validos)}'
            })
        
        return data

class ExperienciaLaboralSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienciaLaboral
        fields = '__all__'

class ExperienciaEscolarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienciaEscolar
        fields = '__all__'

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'
        read_only_fields = ('not_fecha',)

# Serializer para Notificacion
class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'
        read_only_fields = ('not_fecha',)