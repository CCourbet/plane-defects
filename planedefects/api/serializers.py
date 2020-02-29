from rest_framework import serializers

from api.models import Defect


class DefectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defect
        fields = '__all__'
