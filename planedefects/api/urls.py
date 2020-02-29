from django.urls import path, include
from rest_framework import routers

from api.views import DefectViewSet

router = routers.DefaultRouter()
router.register(
    'defect', DefectViewSet, basename='defect'
)

urlpatterns = [
    path('', include(router.urls))
]
