import os
from rest_framework import status, viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly 
from rest_framework.authtoken.models import Token
from .models import CustomUser, Lecture, Present
from .serializers import UserSerializer, CustomTokenSerializer, LoginSerializer, LectureSerializer, PresentSerializer
from django.contrib.auth import authenticate
from django.conf import settings
from django.http import HttpResponse, Http404
from .bot import askAI 

def index(request):
  try:
    # Open the index.html file in the static/frontend folder
    with open(os.path.join(settings.BASE_DIR, 'static/frontend/index.html')) as f:
      return HttpResponse(f.read())
  except FileNotFoundError:
    raise Http404("index.html not found")
  
class SignUpView(APIView):
  def post(self, request):
    user_serializer = UserSerializer(data=request.data, context={"request": request})
    user_serializer.is_valid(raise_exception=True)
    if user_serializer.is_valid():
      user = user_serializer.save()
      token, created = Token.objects.get_or_create(user=user)
      serializer = CustomTokenSerializer(data={'token': token.key, 'user': UserSerializer(user, context={"request": request}).data})
      serializer.is_valid()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

class SignInView(APIView):
  permission_classes = [AllowAny]

  def post(self, request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
      user = authenticate(username=serializer.data['username'], password=serializer.data['password'])
      if user:
        token, created = Token.objects.get_or_create(user=user)
        serializer = CustomTokenSerializer(data={'token': token.key, 'user': UserSerializer(user, context={"request": request}).data})
        serializer.is_valid()
        return Response(serializer.data)
      else: 
        return Response("Wrong username or password", status=400)

class LectureViewSet(viewsets.ModelViewSet): 
  queryset = Lecture.objects.all()
  serializer_class = LectureSerializer
  permission_classes = [IsAuthenticatedOrReadOnly]
  
  def get_serializer_context(self):
    # Ensure that the request is passed to the serializer context
    return {'request': self.request}
  
class CheckStudentPresence(APIView):
  def get(self, request, lecture_id, student_id):
    try:
      # Check if the lecture exists
      lecture = Lecture.objects.get(id=lecture_id)
      # Check if the student exists
      user = CustomUser.objects.get(id=student_id)
      if lecture.lecturer == user: 
        is_present = True
      else:
        # Check if the student is marked present for the lecture
        is_present = Present.objects.filter(lecture=lecture, student=user).exists()

      return Response({"present": is_present}, status=status.HTTP_200_OK)

    except Lecture.DoesNotExist:
      return Response({"error": "Lecture not found"}, status=status.HTTP_404_NOT_FOUND)
    except CustomUser.DoesNotExist:
      return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

class GetAllPresentStudents(APIView):
  def get(self, request, lecture_id):
    try:
      # Check if the lecture exists
      lecture = Lecture.objects.get(id=lecture_id)
      # Get all students present for the lecture
      present_students = Present.objects.filter(lecture=lecture)

      # Serialize the present students
      serializer = PresentSerializer(present_students, many=True, context={'request': request})
      return Response(serializer.data, status=status.HTTP_200_OK)

    except Lecture.DoesNotExist:
      return Response({"error": "Lecture not found"}, status=status.HTTP_404_NOT_FOUND)
    
class MarkStudentPresentView(generics.CreateAPIView):
  queryset = Present.objects.all()
  serializer_class = PresentSerializer

  def create(self, request, *args, **kwargs):
    # Extract the lecture and student from the request data
    lecture_id = request.data.get('lecture')
    student_id = request.data.get('student')

    # Ensure that the student hasn't already been marked present for the lecture
    if Present.objects.filter(lecture_id=lecture_id, student_id=student_id).exists():
      return Response("Student already marked present for this lecture.", status=status.HTTP_400_BAD_REQUEST)

    # If everything is fine, proceed with the default create behavior
    return super().create(request, *args, **kwargs)
  
  def get_serializer_context(self):
    # Ensure that the request is passed to the serializer context
    return {'request': self.request}
  
  
class ChatView(APIView): 
  permission_classes = [AllowAny]

  def post(self, request): 
    question = request.data["question"]
    context = request.data.get("context", "")
    res = askAI(question, context)
    return Response(res.text)
