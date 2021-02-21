from rest_framework import serializers
from hits.models import Hit, HIT_STATES

class HitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hit
        fields = ['id', 'target_name', 'assigned_to', 'state']