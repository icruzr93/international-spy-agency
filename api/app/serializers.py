from django.contrib.auth.models import User
from hitmen.models import Hitman
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    hitmen = serializers.PrimaryKeyRelatedField(many=True, queryset=Hitman.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'hitmen']