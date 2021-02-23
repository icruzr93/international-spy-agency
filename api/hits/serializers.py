from rest_framework import serializers
from hits.models import Hit

class HitSerializer(serializers.ModelSerializer):
    hitman = serializers.ReadOnlyField(source='hitman.email')

    class Meta:
        model = Hit
        fields = ['id', 'target_name', 'assigned_to', 'state', 'hitman']