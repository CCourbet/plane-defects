from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Defect, MaintenanceState


class DefectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defect
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'is_staff')


class MaintenanceStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceState
        fields = '__all__'
