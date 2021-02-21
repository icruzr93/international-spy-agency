from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from hits import views

urlpatterns = [
    path('hits/', views.HitList.as_view()),
    path('hits/<int:pk>/', views.HitDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
