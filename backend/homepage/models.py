from django.db import models

# Create your models here.

class Homepage(models.Model):
    NOT_STARTED = 0
    INPROGRESS = 1
    COMPLETED = 2
    PROGRESS_CHOICES = [
        (NOT_STARTED, 'Not Started'),
        (INPROGRESS, 'In Progress'),
        (COMPLETED, 'Completed'),
    ]
    title = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    progress = models.IntegerField(choices=PROGRESS_CHOICES, default=NOT_STARTED)

    def _str_(self):
        return self.title