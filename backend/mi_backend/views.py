from django.http import HttpResponse

def index(request):
    return HttpResponse("Hola 🚀, este es el backend limpio de Turbo Empleo")
