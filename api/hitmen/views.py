from hitmen.models import Hitman
from hitmen.serializers import HitmanSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from app.permissions import IsOwnerOrReadOnly

class HitmanList(APIView):
    """
    List all code hitmen, or create a new hitman.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        hitmen = Hitman.objects.all()
        serializer = HitmanSerializer(hitmen, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = HitmanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HitmanDetail(APIView):
    """
    Retrieve, update or delete a code hitman.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, 
        IsOwnerOrReadOnly]

    def get_object(self, pk):
        try:
            return Hitman.objects.get(pk=pk)
        except Hitman.DoesNotExist:
            raise Http404

    def perform_create(self, serializer):
        serializer.save(manager=self.request.user)

    def get(self, request, pk, format=None):
        hitman = self.get_object(pk)
        serializer = HitmanSerializer(hitman)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        hitman = self.get_object(pk)
        serializer = HitmanSerializer(hitman, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        hitman = self.get_object(pk)
        hitman.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
