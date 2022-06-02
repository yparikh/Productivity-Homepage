from django.shortcuts import render
from rest_framework import viewsets
from .serializers import HomepageSerializer
from .models import Homepage

# Create your views here.

class HomepageView(viewsets.ModelViewSet):
    serializer_class = HomepageSerializer
    queryset = Homepage.objects.all()
