from django import forms

from markdownx.fields import MarkdownxFormField
from markdownx.widgets import MarkdownxWidget

from .models import Announcement


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
