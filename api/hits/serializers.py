from rest_framework import serializers
from hits.models import Hit

class HitSerializer(serializers.ModelSerializer):
    hitman = serializers.ReadOnlyField(source='hitman.email')
    hitman_id = serializers.IntegerField(required=False, write_only=True)

    class Meta:
        model = Hit
        fields = ['id', 'target_name', 'hitman_id', 'state', 'hitman']