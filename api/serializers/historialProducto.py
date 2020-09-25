from rest_framework import serializers
from api.models import historialProducto

class historialProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = historialProducto
        fields = '__all__'

class historialProductoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = historialProducto
        fields = '__all__'      