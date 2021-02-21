from django.urls import path, include

urlpatterns = [
    path('', include('hits.urls')),
    path('', include('hitmen.urls')),
]