# Generated by Django 3.0.3 on 2020-02-23 11:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Defect',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('xcoordinate', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(500), django.core.validators.MaxValueValidator(1000)])),
                ('ycoordinate', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(500)])),
                ('zcoordinate', models.IntegerField(validators=[django.core.validators.MinValueValidator(-1000), django.core.validators.MaxValueValidator(1000)])),
                ('defecttype', models.CharField(choices=[('D', 'delamination'), ('P', 'porosity'), ('C', 'crack')], max_length=1)),
                ('comment', models.CharField(max_length=600)),
            ],
        ),
    ]
