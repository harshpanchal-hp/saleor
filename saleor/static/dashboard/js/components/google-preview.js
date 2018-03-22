const $seoTitle = $('#seo_title');

const $nameId = $seoTitle.data('bind');
const $name = $(`#${$nameId}`);

const $seoDescription = $('#seo_description');
const $descriptionMaterialize = $seoDescription.data('materialize');
if ($descriptionMaterialize) {
  var $description = $(`.materialize-textarea[name='${$descriptionMaterialize}']`);
} else {
  const $descriptionId = $seoDescription.data('bind');
  var $description = $(`#${$descriptionId}`);
}

const $googleTitlePreview = $('#google-preview-title');
const $googleDescriptionPreview = $('#google-preview-description');
const $preview = $('.preview');
const $previewErrors = $('.preview-error');

const watchedEvents = 'input propertychange cut paste copy change';

function truncate(text, seoField) {
  const $fieldMaxLength = seoField.prop('maxLength');
  if ($fieldMaxLength === -1) {
    console.log('Field maxlength is not defined');
    return text;
  }
  return text.substring(text, $fieldMaxLength);
}

function updatePlaceholderOnInput(field, seoField, previewField) {
  field.on(watchedEvents, (e) => {
    const $target = $(e.currentTarget);
    const $placeholderText = $target.val() || $target.text();
    seoField.attr('placeholder', truncate($placeholderText, seoField));
    const $seoText = seoField.val();
    if (!$seoText) {
      previewField.text(truncate($placeholderText, seoField));
    }
  });
}

function updatePreviewOnInput(seoField, previewField) {
  seoField.on(watchedEvents, (e) => {
    $preview.show();
    $previewErrors.hide();
    const $target = $(e.currentTarget);
    const $currentText = $target.val();
    if ($currentText) {
      previewField.text(truncate($currentText, seoField));
    } else {
      const $placeholderValue = seoField.attr('placeholder');
      if ($placeholderValue) {
        previewField.text(truncate($placeholderValue, seoField));
      } else {
        $preview.hide();
        $previewErrors.show();
      }
    }
  });
}

updatePlaceholderOnInput($name, $seoTitle, $googleTitlePreview);
updatePlaceholderOnInput($description, $seoDescription, $googleDescriptionPreview);
updatePreviewOnInput($seoTitle, $googleTitlePreview);
updatePreviewOnInput($seoDescription, $googleDescriptionPreview);
