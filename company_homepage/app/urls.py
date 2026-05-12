from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('announcement/', views.announcement, name='announcement'),
    path('announcement/create/', views.announcement_create, name='announcement_create'),
    path('announcement/update/<int:id>/', views.announcement_update, name='announcement_update'),
    path('announcement/delete/<int:id>/', views.announcement_delete, name='announcement_delete'),
]