from django.contrib import admin
from .models import CustomUser, Lecture, Present

admin.site.register(CustomUser)
admin.site.register(Lecture)
admin.site.register(Present)