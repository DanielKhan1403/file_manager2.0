"""
URL configuration for Exam_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.views import APIView
from django.http import FileResponse

schema_view = get_schema_view(
   openapi.Info(
      title="Your API",
      default_version='v1',
      description="API documentation",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@example.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

class Download(APIView):
   def get(self, request, *args, **kwargs):
      print('asd')
      path = self.kwargs['path']
      response = FileResponse(open(path, 'rb'))
      response['Content-Disposition'] = f'attachment; filename="{path.split('/')[-1]}"'
      return response

urlpatterns = [
   path('admin/', admin.site.urls),
   path('api/v1/auth/', include('Register.urls')),
   path('api/v1/app/', include('FileManagerApp.urls')),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
   path('download/<path:path>', Download.as_view(), name='download_file'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

