from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from hitmen import views

urlpatterns = [
    path('hitmen/', views.HitmanList.as_view()),
    path('hitmen/<int:pk>/', views.HitmanDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)