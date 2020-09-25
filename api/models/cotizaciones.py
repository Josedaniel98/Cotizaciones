from django.db import models
from django.contrib.auth.models import User

class Cotizacion(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    productos = models.ManyToManyField('Producto', related_name='producto')     
    total= models.IntegerField(null=False)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.usuario
        
    def delete(self, *args):        
        self.activo = False
        self.save()
        return True