import os
import django
from django.conf import settings

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mi_backend.settings')
django.setup()

def check_media_directories():
    print("\nVerificando directorios de medios...")
    
    # Verificar MEDIA_ROOT
    media_root = settings.MEDIA_ROOT
    print(f"\nMEDIA_ROOT: {media_root}")
    if not os.path.exists(media_root):
        print("Creando MEDIA_ROOT...")
        os.makedirs(media_root)
        print("✓ MEDIA_ROOT creado")
    else:
        print("✓ MEDIA_ROOT existe")

    # Verificar directorio de logos
    logos_dir = os.path.join(media_root, 'logos_empresas')
    print(f"\nDirectorio de logos: {logos_dir}")
    if not os.path.exists(logos_dir):
        print("Creando directorio de logos...")
        os.makedirs(logos_dir)
        print("✓ Directorio de logos creado")
    else:
        print("✓ Directorio de logos existe")

    # Listar contenido del directorio de logos
    print("\nContenido del directorio de logos:")
    try:
        files = os.listdir(logos_dir)
        if files:
            for file in files:
                file_path = os.path.join(logos_dir, file)
                size = os.path.getsize(file_path)
                print(f"- {file} ({size} bytes)")
        else:
            print("(directorio vacío)")
    except Exception as e:
        print(f"Error al listar archivos: {str(e)}")

    print("\nComprobación completada.")

if __name__ == '__main__':
    check_media_directories()