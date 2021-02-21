from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from hitmen.models import Hitmen
from hitmen.serializers import HitmenSerializer


@csrf_exempt
def hitmen_list(request):
    """
    List all code hitmen, or create a new hitman.
    """
    if request.method == 'GET':
        hitmen = Hitmen.objects.all()
        serializer = HitmenSerializer(hitmen, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = HitmenSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def hitmen_detail(request, pk):
    """
    Retrieve, update or delete a code hitmen.
    """
    try:
        hitmen = Hitmen.objects.get(pk=pk)
    except Hitmen.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = HitmenSerializer(hitmen)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = HitmenSerializer(hitmen, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        hitmen.delete()
        return HttpResponse(status=204)