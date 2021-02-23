from rest_framework import serializers
from django.conf import settings
from hitmen.models import User
from hits.models import Hit

class UserSerializer(serializers.ModelSerializer):
    hits = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    hitmen = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    manager = serializers.ReadOnlyField(source='manager.email', read_only=True)
    manager_id = serializers.IntegerField(required=False, write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'manager_id', "manager", 'hitman_type', 'password', 'hits', 'hitmen']

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        password = validated_data['password']

        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.manager_id = validated_data.get("manager_id", instance.manager_id)
        instance.hitman_type = validated_data.get("hitman_type", instance.hitman_type)
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.save()

        return instance