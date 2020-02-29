from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from api.models import Defect
from api.serializers import DefectSerializer


class DefectViewSet(viewsets.ModelViewSet):

    serializer_class = DefectSerializer
    queryset = Defect.objects.all()