from django.urls import path
from hitmen import views

urlpatterns = [
    path('hitmen/', views.hitmen_list),
    path('hitmen/<int:pk>/', views.hitmen_detail),
]