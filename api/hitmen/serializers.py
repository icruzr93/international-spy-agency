from rest_framework import serializers
from hitmen.models import Hitmen

class HitmenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ['id', 'frist_name', 'last_name', 'email']