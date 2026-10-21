from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view
from .models import (
    User,
    Note,
    Settings,
)
from .serializers import (
    UserSerializer,
    NoteSerializer,
    SettingsSerializer
)

@csrf_exempt
@api_view(["POST"])
def login_view(request : Request):
    print(request)
    username = request.data.get('username')
    password = request.data.get('password')
    print((username,password))
    user = authenticate(username=username, password=password)
    print(user)
    if user:
        login(request,user)
        return Response({
            'id' : user.id,
            'username': user.username
            })
    return Response({"error":"Invalid credentials"},status=401)

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class NoteView(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class SettingView(viewsets.ModelViewSet):
    queryset = Settings.objects.all()
    serializer_class = SettingsSerializer

    @action(detail=True)
    def user_settings(self, request: Request, *args, **kwargs):
        settings = self.get_object()
        if request.method == 'PUT':
            serializer = self.get_serializer(
                settings, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            serializer = self.get_serializer(settings)
        return Response(serializer.data)
