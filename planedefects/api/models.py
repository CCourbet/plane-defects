from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Defect(models.Model):
    DEFECT_TYPE = (
        ('D', 'delamination'),
        ('P', 'porosity'),
        ('C', 'crack'),
    )
    xcoordinate = models.PositiveIntegerField(validators=[MinValueValidator(500), MaxValueValidator(1000)])
    ycoordinate = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(500)])
    zcoordinate = models.IntegerField(validators=[MinValueValidator(-1000), MaxValueValidator(1000)])
    defecttype = models.CharField(max_length=1, choices=DEFECT_TYPE)
    comment = models.CharField(max_length=600, null=True, blank=True)


class MaintenanceState(models.Model):
    is_maintenance = models.BooleanField(default=True)

