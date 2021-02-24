from hitmen.models import User
from hitmen.permissions import IsOwnerOrReadOnly
from hitmen.serializers import UserSerializer
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.generics import GenericAPIView

class MyProfile(GenericAPIView):
    """
    Get profile info
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = User.objects.get(email=request.user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyHits(GenericAPIView):
    """
    Get profile info
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = User.objects.get(email=request.user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MyHitmen(GenericAPIView):
    """
    Get profile info
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = User.objects.get(email=request.user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserList(APIView):
    """
    List all code users, or create a new user.
    """
    permission_classes = []

    def get(self, request, format=None):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    """
    Retrieve, update or delete a code user.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, 
        IsOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        User.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
