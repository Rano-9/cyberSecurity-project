from rest_framework import serializers
from .models import ( User, Settings, Note)

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model= Settings
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = '__all__'
    settings = SettingsSerializer(read_only=True)

    def create(self, validated_data):
        # new create method to create a user and associated settings
        if not validated_data.get('username') or not validated_data.get('password'):
            raise serializers.ValidationError("Username and password are required.")
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        Settings.objects.create(user=user)
        return user

