from django.urls import path
from hits import views

urlpatterns = [
    path('hits/', views.HitList.as_view()),
    path('hits/<int:pk>', views.HitDetail.as_view()),
]
