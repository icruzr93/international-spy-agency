from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from hitmen import views

urlpatterns = [
    path('hitmen/', views.HitmenList.as_view()),
    path('hitmen/<int:pk>/', views.HitmenList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)