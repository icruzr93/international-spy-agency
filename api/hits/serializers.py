from rest_framework import serializers
from hits.models import Hit, HIT_STATES


class HitSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    target_name = serializers.CharField(required=True, max_length=100)
    assigned_to = serializers.CharField(required=True, max_length=100)
    state = serializers.ChoiceField(choices=HIT_STATES, default='in_progress')

    def create(self, validated_data):
        """
        Create and return a new `Hit` instance, given the validated data.
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Hit` instance, given the validated data.
        """
        instance.target_name = validated_data.get('target_name', instance.target_name)
        instance.assigned_to = validated_data.get('assigned_to', instance.assigned_to)
        instance.state = validated_data.get('state', instance.state)
        instance.save()
        return instance