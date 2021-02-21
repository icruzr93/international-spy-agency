from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from hits.models import Hit
from hits.serializers import HitSerializer


@csrf_exempt
def hits_list(request):
    """
    List all code hits, or create a new hit.
    """
    if request.method == 'GET':
        hits = Hit.objects.all()
        serializer = HitSerializer(hits, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = HitSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def hit_detail(request, pk):
    """
    Retrieve, update or delete a code hit.
    """
    try:
        hit = Hit.objects.get(pk=pk)
    except Hits.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = HitSerializer(hit)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = HitSerializer(hit, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        hit.delete()
        return HttpResponse(status=204)