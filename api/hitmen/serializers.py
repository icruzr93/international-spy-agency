from rest_framework import serializers
from hitmen.models import Hitmen

class HitmenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hitmen
        fields = ['id', 'frist_name', 'last_name', 'email']