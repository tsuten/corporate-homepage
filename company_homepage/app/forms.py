from django import forms

from markdownx.fields import MarkdownxFormField
from markdownx.widgets import MarkdownxWidget

from .models import Announcement, CompanyInfo


class AnnouncementForm(forms.ModelForm):
    error_css_class = 'is-invalid'

    title = forms.CharField(
        label='タイトル',
        max_length=200,
        widget=forms.TextInput(
            attrs={
                'class': 'form-control',
                'maxlength': 200,
                'autocomplete': 'off',
            }
        ),
    )
    content = MarkdownxFormField(
        label='内容',
        widget=MarkdownxWidget(
            attrs={
                'class': 'form-control',
                'rows': 14,
            }
        ),
    )

    class Meta:
        model = Announcement
        fields = ['title', 'content']

    def clean_title(self):
        title = self.cleaned_data['title'].strip()
        if not title:
            raise forms.ValidationError('タイトルを入力してください。')
        return title

    def clean_content(self):
        content = self.cleaned_data.get('content') or ''
        if not content.strip():
            raise forms.ValidationError('内容を入力してください。')
        return content


class CompanyInfoForm(forms.ModelForm):
    error_css_class = 'is-invalid'

    class Meta:
        model = CompanyInfo
        fields = [
            'name',
            'description',
            'address',
            'phone',
            'email',
            'founded_at',
            'employee_count',
            'capital',
            'website',
        ]
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control', 'autocomplete': 'organization'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 5}),
            'address': forms.TextInput(attrs={'class': 'form-control', 'autocomplete': 'street-address'}),
            'phone': forms.TextInput(attrs={'class': 'form-control', 'autocomplete': 'tel'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'autocomplete': 'email'}),
            'founded_at': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'employee_count': forms.NumberInput(attrs={'class': 'form-control', 'min': 0}),
            'capital': forms.NumberInput(attrs={'class': 'form-control', 'min': 0}),
            'website': forms.URLInput(attrs={'class': 'form-control', 'autocomplete': 'url'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].label = '会社名'
        self.fields['description'].label = '説明'
        self.fields['address'].label = '住所'
        self.fields['phone'].label = '電話'
        self.fields['email'].label = 'メール'
        self.fields['founded_at'].label = '設立日'
        self.fields['employee_count'].label = '従業員数'
        self.fields['capital'].label = '資本金'
        self.fields['website'].label = 'ウェブサイト'
