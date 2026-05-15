from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('announcement/', views.announcement, name='announcement'),
    path('announcement/create/', views.announcement_create, name='announcement_create'),
    path('announcement/update/<int:id>/', views.announcement_update, name='announcement_update'),
    path('announcement/delete/<int:id>/', views.announcement_delete, name='announcement_delete'),
    path('gallery/', views.gallery, name='gallery'),
    path('contact/', views.ContactListView.as_view(), name='contact_list'),
    path('contact/read/<int:id>/', views.contact_read, name='contact_read'),
    path('info/', views.corporate_info, name='corporate_info'),
    path('info/create/', views.corporate_info_create, name='corporate_info_create'),
]