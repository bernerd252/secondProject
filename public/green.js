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
  window.location.href="upload.html";
});

//go to create event page from home page
$( "#createButton" ).click(function() {
  window.location.href="create.html";
});

//go to find a cleanup event page from home page
$( "#findButton" ).click(function() {
  window.location.href="find.html";
});

//go to gallery page from home
$( "#galleryButton" ).click(function() {
  window.location.href="gallery.html";
});