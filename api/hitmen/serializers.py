from rest_framework import serializers
from hitmen.models import Hitman
from hits.models import Hit

class HitmanSerializer(serializers.ModelSerializer):
    hits = serializers.PrimaryKeyRelatedField(many=True, queryset=Hit.objects.all())
    manager = serializers.ReadOnlyField(source='manager.username')

    class Meta:
        model = Hitman
        fields = ['id', 'frist_name', 'last_name', 'email', 'manager']