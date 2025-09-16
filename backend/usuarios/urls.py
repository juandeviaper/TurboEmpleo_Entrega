from django.urls import path
from .views import UsuarioRegistroView
from .password_views import ChangePasswordView, DeleteAccountView

urlpatterns = [
    path('registro/', UsuarioRegistroView.as_view(), name='registro_usuario'),
    path('cambiar-password/', ChangePasswordView.as_view(), name='cambiar_password'),
    path('eliminar-cuenta/', DeleteAccountView.as_view(), name='eliminar_cuenta'),
]