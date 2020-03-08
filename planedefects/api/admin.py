from django.contrib import admin

from .models import Defect, MaintenanceState

admin.site.register(Defect)
admin.site.register(MaintenanceState)
