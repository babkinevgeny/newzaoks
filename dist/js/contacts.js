/*Карты для contact.html*/
$(document).ready(function (){
  ymaps.ready(init);

  function init () {
    myMap = new ymaps.Map('map-move-msc', {
      center:[55.710004, 37.652705],
      zoom:16
    });

    myMap.controls
      .add('zoomControl', { left: 15, top: 15 });

    myPlacemark = new ymaps.Placemark([55.708354, 37.652705], {
    }, {
      iconImageHref: '../img/map-marker.png',
      iconImageSize: [201, 160],
      iconImageOffset: [-60, -160]
    });

    myMap.geoObjects.add(myPlacemark);
  };
});

$(document).ready(function (){
  ymaps.ready(init);

  function init () {
    myMap = new ymaps.Map('map-move-spb', {
      center:[59.924224, 30.441875],
      zoom:16
    });

    myMap.controls
      .add('zoomControl', { left: 15, top: 15 });

    myPlacemark = new ymaps.Placemark([59.922764, 30.442275], {
    }, {
      iconImageHref: '../img/map-marker.png',
      iconImageSize: [201, 160],
      iconImageOffset: [-60, -160]
    });

    myMap.geoObjects.add(myPlacemark);
  };

});

/* Заполнение адресов карт и выставление фоновой картинки для .form в contacts.html*/
$(document).ready(function() {
  if($('.contacts-move').hasClass('contacts-move-spb')) {
    $('.form').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("../img/spb.jpg")');
    $('#map-move-msc').css('display', 'none');
    $('#map-move-spb').css('display', 'block');
    $('.contacts-content').prepend('<p class="contacts-title"><b>Set Service Group <br>в Санкт-Петербурге  </b></p><p class="contacts-info contacts-info-office"><b>Адрес офиса:</b> г. Санкт-Петербург, <br>ул. Ворошилова, 2, Деловой Центр "ОХТА"</p><p class="contacts-info contacts-info-factory"><b>Адрес производства:</b> г. Санкт-Петербург, <br>Кингисепское ш., 53</p><p class="contacts-info contacts-info-telephone"><b>Телефон:</b> +7(812) 627-15-16</p><p class="contacts-info contacts-info-email"><b>E-mail:</b> info@zaoks.ru</p>');
  }
  if($('.contacts-move').hasClass('contacts-move-msc')) {
    $('.form').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("../img/msk.jpg")');
    $('#map-move-spb').css('display', 'none');
    $('#map-move-msc').css('display', 'block');
    $('.contacts-content').prepend('<p class="contacts-title"><b>Set Service Group <br>в Москве  </b></p><p class="contacts-info contacts-info-office"><b>Адрес офиса:</b> г. Москва, ул. Ленинская Слобода, д.19, БЦ "Омега Плаза"</p><p class="contacts-info contacts-info-telephone"><b>Телефон:</b> +7 (495) 205-60-07</p><p class="contacts-info contacts-info-email"><b>E-mail:</b> info@zaoks.ru</p>');
  }
});

/* Переключение карты в contacts.html*/
$('.contacts-btns-big .btn-contacts-spb').click(function(){
  if ($('.contacts-move').hasClass('contacts-move-spb')) {
    return;
  } else {
      $('.form').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("../img/spb.jpg")');
      $('#map-move-msc').css('display', 'none');
      $('#map-move-spb').fadeIn();
      $('#map-move-spb .ymaps-image-with-content').css('display','none');
      $('.map .contacts-move').addClass('contacts-move-spb').removeClass('contacts-move-msc');
      $('.contacts-move-spb').fadeIn();
      $('.contacts-content').empty().prepend('<p class="contacts-title"><b>Set Service Group <br>в Санкт-Петербурге  </b></p><p class="contacts-info contacts-info-office"><b>Адрес офиса:</b> г. Санкт-Петербург, <br>ул. Ворошилова, 2, Деловой Центр "ОХТА"</p><p class="contacts-info contacts-info-factory"><b>Адрес производства:</b> г. Санкт-Петербург, <br>Кингисепское ш., 53</p><p class="contacts-info contacts-info-telephone"><b>Телефон:</b> +7(812) 627-15-16</p><p class="contacts-info contacts-info-email"><b>E-mail:</b> info@zaoks.ru</p>');
  }
});
$('.contacts-btns-big .btn-contacts-msc').click(function(){
  if ($('.contacts-move').hasClass('contacts-move-msc')) {
    return;
  } else {
    $('.form').css('background-image', 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("../img/msk.jpg")');
    $('#map-move-spb').css('display', 'none');
    $('#map-move-msc').fadeIn();
    $('#map-move-msc .ymaps-image-with-content').css('display','none');
    $('.map .contacts-move').addClass('contacts-move-msc').removeClass('contacts-move-spb');
    $('.contacts-move-msc').fadeIn();
    $('.contacts-content').empty().prepend('<p class="contacts-title"><b>Set Service Group <br>в Москве  </b></p><p class="contacts-info contacts-info-office"><b>Адрес офиса:</b> г. Москва, ул. Ленинская Слобода, д.19, БЦ "Омега Плаза"</p><p class="contacts-info contacts-info-telephone"><b>Телефон:</b> +7 (495) 205-60-07</p><p class="contacts-info contacts-info-email"><b>E-mail:</b> info@zaoks.ru</p>');
  }
});

$('.contacts-move .btn-content-close').click( function () {
  $(this).parent().fadeOut();
  if($(this).parent().hasClass('contacts-move-spb')) {
    $('#map-move-spb .ymaps-image-with-content').fadeIn();
  }
  if($(this).parent().hasClass('contacts-move-msc')) {
    $('#map-move-msc .ymaps-image-with-content').fadeIn();
  }
});

$('#map-move-spb .ymaps-point-overlay').click(function () {
  $('.contacts-move-spb').css('display','block');
});
$('#map-move-msc .ymaps-point-overlay').click(function () {
  $('.contacts-move-msc').fadeIn();
});
