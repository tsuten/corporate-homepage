from typing import List

from app.models import Announcement
from ninja import ModelSchema, NinjaAPI
from app.models import Link
from app.models import Contact
from app.models import CompanyInfo
from django.forms.models import model_to_dict
api = NinjaAPI()


class AnnouncementOut(ModelSchema):
    class Meta:
        model = Announcement
        fields = "__all__"

class LinkOut(ModelSchema):
    class Meta:
        model = Link
        fields = "__all__"

class ContactOut(ModelSchema):
    class Meta:
        model = Contact
        fields = "__all__"

class CompanyInfoOut(ModelSchema):
    class Meta:
        model = CompanyInfo
        fields = "__all__"

class ContactIn(ModelSchema):
    class Meta:
        model = Contact
        fields = ["name", "email", "phone", "subject", "message"]

@api.get("/announcement", response=List[AnnouncementOut])
def list_announcements(request):
    return Announcement.objects.order_by('-created_at')

@api.get("/link", response=List[LinkOut])
def list_links(request):
    return Link.objects.all()

@api.post("/contact", response=ContactOut)
def create_contact(request, contact: ContactIn):
    return Contact.objects.create(**contact.model_dump())

@api.get("/company-info", response=CompanyInfoOut)
def get_company_info(request):
    return CompanyInfo.objects.first()