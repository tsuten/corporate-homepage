from typing import List

from app.models import Announcement
from ninja import ModelSchema, NinjaAPI
from app.models import Link
api = NinjaAPI()


class AnnouncementOut(ModelSchema):
    class Meta:
        model = Announcement
        fields = "__all__"

class LinkOut(ModelSchema):
    class Meta:
        model = Link
        fields = "__all__"


@api.get("/announcement", response=List[AnnouncementOut])
def list_announcements(request):
    return Announcement.objects.all()

@api.get("/link", response=List[LinkOut])
def list_links(request):
    return Link.objects.all()