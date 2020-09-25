from rest_framework import serializers
from api.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class ProductoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ('nombre', 'descripcion', 'precio')        