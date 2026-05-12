from django.shortcuts import get_object_or_404, redirect, render

from .forms import AnnouncementForm
from .models import Announcement


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
