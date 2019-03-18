from rest_framework import serializers

from . import models

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.User
    fields = '__all__'

class TweetSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Tweet
    fields = '__all__'
