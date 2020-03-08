from django.urls import path, include
from rest_framework import routers

from api.views import DefectViewSet, UserDetail, MaintenanceStateDetail

router = routers.DefaultRouter()
router.register('defect', DefectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/<int:pk>/', UserDetail.as_view()),
    path('maintenance/', MaintenanceStateDetail.as_view()),
]
