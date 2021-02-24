from hitmen.models import User
from hitmen.serializers import UserSerializer
from hits.models import Hit
from hits.serializers import HitSerializer

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.generics import GenericAPIView

class MyProfile(GenericAPIView):
    """ 
    My Profile.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = User.objects.get(email=request.user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyHits(GenericAPIView):
    """
    Get my hits.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        hitman_type = request.user.hitman_type
        if hitman_type == User.BOSS:
            hits = Hit.objects.all()
            serializer = HitSerializer(hits, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        elif hitman_type == User.MANAGER:
            hits = Hit.objects.all().filter(hitman__manager=request.user)
            serializer = HitSerializer(hits, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif hitman_type == User.HITMAN:
            hits = Hit.objects.all().filter(hitman__email=request.user)
            serializer = HitSerializer(hits, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            

class MyHitmen(GenericAPIView):
    """
    Get my hitmen.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        users = User.objects.all().filter(manager__email=request.user)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

