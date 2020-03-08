from rest_framework import permissions

from api.models import MaintenanceState


class IsNotMaintenanceMode(permissions.BasePermission):
    def has_permission(self, request, view):
        # allow user to add defect if allowed or if logged in user is staff
        maintenance_state = MaintenanceState.objects.get(pk=1)
        return request.user.is_staff or maintenance_state.is_maintenance is False
