from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
  passport = models.ImageField(upload_to='passports/', blank=True, verbose_name="Passport (Photo)")
  address = models.TextField(blank=True, verbose_name="Address")
  type = models.TextField(choices=(("student", "Student"), ("instructor", "Instructor")), default="student")
  
  def __str__(self):
    return self.username
    
  class Meta:
    verbose_name = "User"
    verbose_name_plural = "Users"
    
class Lecture(models.Model): 
  start = models.DateTimeField(auto_now_add=True)
  hours = models.IntegerField(default=2)
  name = models.TextField()
  code = models.TextField()
  lecturer = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="lectures")
  
class Present(models.Model): 
  lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, related_name="present")
  student = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="present")
  time = models.DateTimeField(auto_now_add=True)
  
  class Meta:
    # Ensure that a student can only be marked present once per lecture
    unique_together = ('lecture', 'student')