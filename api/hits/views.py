from hits.models import Hit
from hits.serializers import HitSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

class HitList(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        hits = Hit.objects.all()
        serializer = HitSerializer(hits, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = HitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HitDetail(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try: 
            return Hit.objects.get(pk=pk)
        except Hit.DoesNotExist:
            raise Http404

    def perform_create(self, serializer):
        serializer.save(hitman=self.request.user)

    def get(self, request, pk, format=None):
        hit = self.get_object(pk)
        serializer = HitSerializer(hit)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        hit = self.get_object(pk)
        serializer = HitSerializer(hit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        hit = self.get_object(pk)
        hit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
