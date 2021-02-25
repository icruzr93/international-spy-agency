from django.http import Http404
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.generics import GenericAPIView

from hitmen.models import User
from hitmen.serializers import UserSerializer
from hits.models import Hit
from hits.serializers import HitSerializer


class MyProfile(GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = User.objects.get(email=request.user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyHits(GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        hitman_type = request.user.hitman_type

        if hitman_type == User.BOSS:
            hits = Hit.objects.all()
            serializer = HitSerializer(hits, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        elif hitman_type == User.MANAGER:
            hits = Hit.objects.all().filter(
                Q(hitman__manager=request.user) | Q(hitman=request.user)
            )
            serializer = HitSerializer(hits, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif hitman_type == User.HITMAN:
            hits = Hit.objects.all().filter(
                hitman__email=request.user
            )
            serializer = HitSerializer(hits, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            

class MyHitmen(GenericAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        hitman_type = request.user.hitman_type
        is_active = self.request.query_params.get('is_active', None)

        if hitman_type == User.HITMAN:
            return Response([], status=status.HTTP_200_OK)

        if is_active is None and hitman_type == User.MANAGER:
            users = User.objects.all().filter(
                manager__email=request.user
            ).exclude(id=request.user.id)
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        if is_active is None and hitman_type == User.BOSS:
            users = User.objects.all().exclude(id=request.user.id)
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        is_active = bool(is_active)

        if hitman_type == User.MANAGER:
            users = User.objects.all().filter(
                manager__email=request.user,
                is_active=is_active
            ).exclude(id=request.user.id)
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        if hitman_type == User.BOSS:
            users = User.objects.all().filter(
                is_active=is_active
            ).exclude(id=request.user.id)
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

