from django.urls import path, include
from app import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('', include('hits.urls')),
    path('', include('hitmen.urls')),
]

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]