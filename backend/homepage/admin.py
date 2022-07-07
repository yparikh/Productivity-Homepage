from django.contrib import admin
from .models import Homepage

class HomepageAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'progress')

# Register your models here.

admin.site.register(Homepage, HomepageAdmin)
