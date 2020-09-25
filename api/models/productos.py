from django.db import models
from django.contrib.auth.models import User


class Producto(models.Model):
    nombre = models.CharField(max_length=15)
    descripcion = models.CharField(max_length=100, null=False)     
    precio= models.IntegerField(null=False)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.nombre
        
    def delete(self, *args):        
        self.activo = False
        self.save()
        return True