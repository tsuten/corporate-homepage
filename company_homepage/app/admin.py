from django.contrib import admin
from .models import Announcement
from .models import Link
from .models import Gallery
from .models import Contact
from .models import CompanyInfo
# Register your models here.
admin.site.register(Announcement)
admin.site.register(Link)
admin.site.register(Gallery)
admin.site.register(Contact)
admin.site.register(CompanyInfo)