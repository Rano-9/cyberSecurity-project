from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    UserView,
    NoteView,
    SettingView,
    login_view
)

api_route = DefaultRouter()

api_route.register(r'notes', NoteView)
api_route.register(r'user', UserView)
api_route.register(r'settings', SettingView)

urlpatterns = [
    path('user/<int:pk>/settings/',
         SettingView.as_view({'get': 'user_settings', 'put': 'user_settings'})),
    path('login/',login_view),
    path('', include(api_route.urls)),
    
]
