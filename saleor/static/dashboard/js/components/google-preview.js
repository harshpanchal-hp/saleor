const $seoTitle = $('#seo_title');
const $seoTitleMaxLength = $seoTitle.prop('maxLength');

const $nameId = $seoTitle.data('bind');
const $name = $(`#${$nameId}`);

const $seoDescription = $('#seo_description');
const $seoDescriptionMaxLength = $seoDescription.prop('maxLength');
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

function truncate(text, maxLength) {
  if (maxLength === -1) {
    console.log('Field maxlength is not defined');
    return text;
  }
  return text.substring(text, maxLength);
}

function updatePlaceholderOnInput(field, seoField, previewField, maxLength) {
  field.on(watchedEvents, (e) => {
    const $target = $(e.currentTarget);
    const $placeholderText = $target.val() || $target.text();
    seoField.attr('placeholder', truncate($placeholderText, maxLength));
    const $seoText = seoField.val();
    if (!$seoText) {
      previewField.text(truncate($placeholderText, maxLength));
    }
  });
}

function updatePreviewOnInput(seoField, previewField, maxLength) {
  seoField.on(watchedEvents, (e) => {
    $preview.show();
    $previewErrors.hide();
    const $target = $(e.currentTarget);
    const $currentText = $target.val();
    if ($currentText) {
      previewField.text(truncate($currentText, maxLength));
    } else {
      const $placeholderValue = seoField.attr('placeholder');
      if ($placeholderValue) {
        previewField.text(truncate($placeholderValue, maxLength));
      } else {
        $preview.hide();
        $previewErrors.show();
      }
    }
  });
}

updatePlaceholderOnInput($name, $seoTitle, $googleTitlePreview, $seoTitleMaxLength);
updatePlaceholderOnInput($description, $seoDescription, $googleDescriptionPreview, $seoDescriptionMaxLength);
updatePreviewOnInput($seoTitle, $googleTitlePreview, $seoTitleMaxLength);
updatePreviewOnInput($seoDescription, $googleDescriptionPreview, $seoDescriptionMaxLength);
