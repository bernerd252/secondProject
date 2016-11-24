// materialize slider js for the home page
  $(document).ready(function(){
      $('.slider').slider({full_width: true});
    });
//ways to manipulate the slider
  // Pause slider
$('.slider').slider('pause');
// Start slider
$('.slider').slider('start');
// Next slide
$('.slider').slider('next');
// Previous slide
$('.slider').slider('prev');
      
//go to upload page from home
$( "#shareButton" ).click(function() {
  window.location.href="upload";
});

//go to create event page from home page
$( "#createButton" ).click(function() {
  window.location.href="create";
});

//go to find a cleanup event page from home page
$( "#findButton" ).click(function() {
  window.location.href="find";
});

//go to gallery page from home
$( "#galleryButton" ).click(function() {
  window.location.href="gallery";
});
//go to create an account page from home page
$( "#accountButton" ).click(function() {
  window.location.href="account";
});

//text input materialize code

  $(document).ready(function() {
    Materialize.updateTextFields();
  });

   $('#textarea1').val('New Text');
  $('#textarea1').trigger('autoresize');


//code for the modals used to sign in and sign out
  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
   $('#modal1').modal('open');
    $('#modal1').modal('close');