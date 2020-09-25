
# Django REST framework
from rest_framework import serializers

# Model
from api.models import Producto
from api.models import Cotizacion

class ProductoReadSerializer( serializers.ModelSerializer ):
    class Meta:
        model = Producto
        fields = ('id','nombre','descripcion','precio')

class CotizacionReadSerializer( serializers.ModelSerializer ):
    usuario = serializers.SerializerMethodField("getUsuarios")

    productos = ProductoReadSerializer(many=True)
    class Meta:
        model = Cotizacion
        fields = '__all__'

    def getUsuarios(self, obj):
        return {'value': obj.usuario.id, 'label': obj.usuario.username}

class CotizacionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = ('usuario', 'productos', 'total')        