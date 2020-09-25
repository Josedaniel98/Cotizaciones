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
from api.models import historialProducto, Producto
from api.serializers import historialProductoSerializer, historialProductoRegistroSerializer
from copy import deepcopy

class historialProductoViewset(viewsets.ModelViewSet):
    queryset = historialProducto.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return historialProductoSerializer
        else:
            return historialProductoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "create" or self.action == "token":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def top_producto(self, request, *args, **kwargs):
        """Top 5 de productos mas cotizados"""
        data=[]  
        count=0
        newData=[]
        for p in Producto.objects.filter(activo=True):
            for h in historialProducto.objects.filter(activo=True):
                if p.id == h.id_producto:
                    count +=1
            data.append({
                'producto': p.nombre,
                'cantidad': count
            })
       
            count=0
 
        print("data ", data)
        print("data ", newData)
        return Response({'data': data})
