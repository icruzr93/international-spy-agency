from rest_framework import serializers
from hitmen.models import Hitmen


class HitmenSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(allow_blank=False, max_length=100)
    last_name = serializers.CharField(allow_blank=False, max_length=100)
    email = serializers.EmailField(allow_blank=False, max_length=100)

    def create(self, validated_data):
        """
        Create and return a new `Hitmen` instance, given the validated data.
        """
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Hitmen` instance, given the validated data.
        """
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance