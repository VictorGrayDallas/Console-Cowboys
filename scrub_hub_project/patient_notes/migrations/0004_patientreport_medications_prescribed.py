# Generated by Django 5.0.4 on 2024-04-29 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient_notes', '0003_patientreport_risk_level'),
    ]

    operations = [
        migrations.AddField(
            model_name='patientreport',
            name='medications_prescribed',
            field=models.TextField(default='N/A'),
        ),
    ]