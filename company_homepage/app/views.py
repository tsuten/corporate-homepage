from django.shortcuts import get_object_or_404, redirect, render

from .forms import AnnouncementForm, CompanyInfoForm
from .models import Announcement, CompanyInfo
from .models import Gallery
from .models import Contact
from django.views.generic import ListView, CreateView, UpdateView, DeleteView

def index(request):
    return render(request, 'index.html')


def announcement(request):
    announcements = Announcement.objects.all()
    return render(request, 'announcement.html', {'announcements': announcements})


def announcement_create(request):
    if request.method == 'POST':
        form = AnnouncementForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('announcement')
    else:
        form = AnnouncementForm()
    return render(request, 'announcement_create.html', {'form': form})


def announcement_update(request, id):
    announcement = get_object_or_404(Announcement, id=id)
    if request.method == 'POST':
        form = AnnouncementForm(request.POST, instance=announcement)
        if form.is_valid():
            form.save()
            return redirect('announcement')
    else:
        form = AnnouncementForm(instance=announcement)
    return render(request, 'announcement_update.html', {'form': form})


def announcement_delete(request, id):
    announcement = get_object_or_404(Announcement, id=id)
    announcement.delete()
    return redirect('announcement')

def gallery(request):
    galleries = Gallery.objects.all()
    return render(request, 'gallery.html', {'galleries': galleries})

class ContactListView(ListView):
    model = Contact
    template_name = 'contact_list.html'
    context_object_name = 'contacts'

def contact_read(request, id):
    contact = get_object_or_404(Contact, id=id)
    contact.is_read = True
    contact.save()
    return redirect('contact_list')

def corporate_info(request):
    corporate_info = CompanyInfo.objects.first()
    return render(request, 'corporate_info.html', {'corporate_info': corporate_info})


def corporate_info_create(request):
    if CompanyInfo.objects.exists():
        return redirect('corporate_info')
    if request.method == 'POST':
        form = CompanyInfoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('corporate_info')
    else:
        form = CompanyInfoForm()
    return render(request, 'corporate_info_create.html', {'form': form})