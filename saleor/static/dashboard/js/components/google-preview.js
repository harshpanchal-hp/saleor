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

function updatePlaceholderOnInput(field, seoField, previewField) {
  field.on(watchedEvents, (e) => {
    const $target = $(e.currentTarget);
    const $placeholderText = $target.val() || $target.text();
    seoField.attr('placeholder', $placeholderText);
    const $seoText = seoField.val();
    if (!$seoText) {
      previewField.text($placeholderText);
    }
  });
}

function updatePreviewOnInput(field, target) {
  field.on(watchedEvents, (e) => {
    $preview.show();
    $previewErrors.hide();
    const $target = $(e.currentTarget);
    const $currentText = $target.val();
    if ($currentText) {
      target.text($currentText);
    } else {
      const $placeholderValue = field.attr('placeholder');
      if ($placeholderValue) {
        target.text($placeholderValue);
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
