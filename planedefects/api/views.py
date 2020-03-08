from django.contrib.auth.models import User
from django.http import Http404

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Defect, MaintenanceState
from api.permissions import IsNotMaintenanceMode
from api.serializers import DefectSerializer, UserSerializer, MaintenanceStateSerializer


class DefectViewSet(viewsets.ModelViewSet):
    """
    Defect queryset if it is not in maintenance mode or if user is admin
    """
    permission_classes = [IsNotMaintenanceMode]

    serializer_class = DefectSerializer
    queryset = Defect.objects.all()


class MaintenanceStateDetail(APIView):
    """
    Retrieve a maintenance instance from its id 1, for admin user only.
    """
    permission_classes = [IsAdminUser]

    @staticmethod
    def get_object():
        try:
            return MaintenanceState.objects.get(pk=1)
        except MaintenanceState.DoesNotExist:
            raise Http404

    def get(self, request):
        maintenance_state = self.get_object()
        maintenance_state_s = MaintenanceStateSerializer(maintenance_state)
        return Response(maintenance_state_s.data)

    def post(self, request):
        maintenance_state = self.get_object()
        maintenance_state_s = MaintenanceStateSerializer(maintenance_state, data=request.data)
        if maintenance_state_s.is_valid():
            maintenance_state_s.save()
            return Response(maintenance_state_s.data)
        return Response(maintenance_state_s.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    """
    Retrieve a user instance from its id if it is not in maintenance mode or if user is admin
    """
    permission_classes = [IsNotMaintenanceMode]

    @staticmethod
    def get_object(pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk)
        user = UserSerializer(user)
        return Response(user.data)
