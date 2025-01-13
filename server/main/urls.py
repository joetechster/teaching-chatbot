from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.authtoken.views import obtain_auth_token
from .views import index, SignUpView, SignInView, ChatView, LectureViewSet, CheckStudentPresence, GetAllPresentStudents, MarkStudentPresentView
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'lecture', LectureViewSet, basename='lecture')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sign-up/', SignUpView.as_view(), name='Sign Up'),
    path('api/sign-in/', SignInView.as_view(), name='Sign In'),
    path('api/chat/', ChatView.as_view(), name='chat'), 
    path('api/mark-present/', MarkStudentPresentView.as_view(), name='mark-student-present'),
    path('api/lecture/<int:lecture_id>/present/', GetAllPresentStudents.as_view(), name='get-all-present-students'),
    path('api/lecture/<int:lecture_id>/student/<int:student_id>/presence/', CheckStudentPresence.as_view(), name='check-student-presence'),
    path('api/', include(router.urls)), 
]

# Serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all route should be last to prevent interference
urlpatterns += [
    re_path(r'^.*$', index, name='index'),
]