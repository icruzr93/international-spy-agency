from django.urls import path
from me import views

urlpatterns = [
    path("me/profile", views.MyProfile.as_view()),
    path("me/my-hits", views.MyHits.as_view()),
    path("me/my-hitmen", views.MyHitmen.as_view()),
]
