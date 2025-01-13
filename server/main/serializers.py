# serializers.py
from rest_framework import serializers
from .models import CustomUser, Lecture, Present
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  
  def create(self, validated_data): 
    validated_data["is_active"] = True
    validated_data["password"] = make_password(validated_data["password"])
    return super().create(validated_data)
    
  def to_representation(self, instance):
    representation = super().to_representation(instance)
    request = self.context.get('request')  # Access the request context
    if instance.passport and hasattr(instance.passport, 'url'):
      # Build the full URL for the passport
      representation['passport'] = request.build_absolute_uri(instance.passport.url)
    return representation

  class Meta:
    model = CustomUser
    fields = '__all__'

class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, attrs):
    # Field-level validation
    if not attrs.get('username'):
      raise serializers.ValidationError('Username is required.')
    if not attrs.get('password'):
      raise serializers.ValidationError('Password is required.')
    return attrs

class CustomTokenSerializer(serializers.Serializer):
  token = serializers.CharField(source='key')
  user = UserSerializer()

class LectureSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Lecture
    exclude = ['lecturer']
    
  def create(self, validated_data):
    # Automatically assign the authenticated user (usually instructor) to the lecture
    request = self.context.get('request')  # Access request context
    if request and hasattr(request, 'user'):
      validated_data['lecturer'] = request.user  # Assign the authenticated user
    return super().create(validated_data)
  
  def to_representation(self, instance):
    # Include the lecturer field in the output
    representation = super().to_representation(instance)
    representation['lecturer'] = UserSerializer(instance.lecturer,  context={'request': self.context.get('request')}).data  # Assuming you want to return the lecturer's username
    return representation

class PresentSerializer(serializers.ModelSerializer): 
  student = UserSerializer(read_only=True)
  
  class Meta: 
    model = Present
    fields = "__all__"
    
  def create(self, validated_data): 
    request = self.context.get('request')  # Access request context
    if request and request.data.get('student', None):
      validated_data['student'] = request.user
    return super().create(validated_data)
