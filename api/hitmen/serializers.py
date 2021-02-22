from rest_framework import serializers
from hitmen.models import User
# from hits.models import Hit

class UserSerializer(serializers.ModelSerializer):
    # hits = serializers.PrimaryKeyRelatedField(many=True, queryset=Hit.objects.all())
    manager = serializers.ReadOnlyField(source='manager.username')

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'manager']