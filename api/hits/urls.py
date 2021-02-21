from django.urls import path
from hits import views

urlpatterns = [
    path('hits/', views.hits_list),
    path('hits/<int:pk>/', views.hit_detail),
]