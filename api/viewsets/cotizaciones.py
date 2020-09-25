import json
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from api.models import Cotizacion
from api.serializers import CotizacionReadSerializer, CotizacionRegistroSerializer
from copy import deepcopy

class CotizacionViewset(viewsets.ModelViewSet):
    queryset = Cotizacion.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("usuario",)
    search_fields = ("usuario",)
    ordering_fields = ("usuario",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CotizacionReadSerializer
        else:
            return CotizacionRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def total_usuarios(self, request, *args, **kwargs):
        """Reporte promedio totales por usuario"""
        data=[]
        total=0
        count=0
        promedio=0
        for u in User.objects.filter(is_active=True):
            for c in Cotizacion.objects.filter(activo=True):
                if u.id == c.usuario.id:
                    total += c.total
                    count +=1
            promedio=round(total/count, 2)
            data.append({
                'usuario': u.username,
                'promedio': promedio
            })
            promedio=0
            count=0
            total=0
        print("data ", data)
        return Response({'data': data})

    @action(detail=False, methods=['get'])
    def total_numero(self, request, *args, **kwargs):
        """Reporte promedio numero de cotizaciones de los usuario"""
      
        count_cot=0
        count_user=0
        promedio=0
        for u in User.objects.filter(is_active=True):
            count_user += 1

        for c in Cotizacion.objects.filter(activo=True):
            
            count_cot += 1 
        promedio = count_cot / count_user
        
        print("data ", promedio)
        return Response({'data':promedio})
