from django import forms
from django.utils.translation import pgettext_lazy

from ...core.utils.text import strip_html_and_truncate
from ...page.models import Page
from ..product.forms import RichTextField
from ..seo.utils import SEO_HELP_TEXTS, SEO_LABELS, prepare_seo_description


class PageForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Placeholder should be no longer than fields maximum size
        field_maxlength = self.fields['seo_description'].max_length
        # Page's content contains htm tags which should be stripped
        placeholder = strip_html_and_truncate(
            self.instance.content, field_maxlength)
        self.fields['seo_description'].widget.attrs.update({
            'id': 'seo_description',
            'data-bind': self['content'].auto_id,
            'data-materialize': self['content'].html_name,
            'placeholder': placeholder})
        self.fields['seo_title'].widget.attrs.update({
            'id': 'seo_title',
            'data-bind': self['title'].auto_id,
            'placeholder': self.instance.title})

    class Meta:
        model = Page
        exclude = []
        widgets = {
            'slug': forms.TextInput(attrs={'placeholder': 'example-slug'})}
        labels = {
            'is_visible': pgettext_lazy(
                'Visibility status indicator', 'Publish'),
            **SEO_LABELS}
        help_texts = {
            'slug': pgettext_lazy(
                'Form field help text',
                'Slug is being used to create page URL'),
            **SEO_HELP_TEXTS}

    content = RichTextField()

    def clean_slug(self):
        # Make sure slug is not being written to database with uppercase.
        slug = self.cleaned_data.get('slug')
        slug = slug.lower()
        return slug

    def clean_seo_description(self):
        seo_description = prepare_seo_description(
            seo_description=self.cleaned_data['seo_description'],
            html_description=self.data['content'],
            max_length=self.fields['seo_description'].max_length)
        return seo_description
