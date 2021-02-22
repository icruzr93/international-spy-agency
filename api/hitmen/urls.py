from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from hitmen import views

urlpatterns = [
    path('hitmen/', views.UserList.as_view()),
    path('hitmen/<int:pk>/', views.UserDetail.as_view()),
    path('', include('hits.urls')),
]

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)