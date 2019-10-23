$(function() { 

    
    $('#inlineFormInputGroup').focus();
  
    
    var api = 'https://api.giphy.com/v1/gifs/search?q=';
    var query = 'Chicago';
    var apiKey = '&api_key=AkY7KgOwfyHMbNIqwlDTLDh6lIgZhWK7';
    var lang = '&lang=es';
    var apiPagination = 15; //Default Pagination
    var rating = '&rating=g'; //default
    var flag = 0; // for normal search
  
    $('#trending').click(function() {
      var url = 'https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';
      var flag = 1; 
    var fetchData = $.getJSON(url, gotData);
    });
  
    $("#submit").click(function() {
  
      query = $('#inlineFormInputGroup').val();
      rating = $( "#rating option:selected" ).val();
      
      if((query.length==0) && (flag == 0)) { 
        $(".form-inline").effect("shake");
        $("#inlineFormInputGroup").addClass("error");
      }
  
      else {
        $("#inlineFormInputGroup").removeClass("error");
        
        
        var url = api+query+apiKey+lang+'&limit='+apiPagination+rating;
        var fetchData = $.getJSON(url, gotData);
        
      }
    });
  
   
    $('#load-more').click(function(){ 
      apiPagination+=10;
      $("#submit").click();
    });
  
  });
  
  
  
  function gotData(data){
    
    if(data.meta.status){ 
      if(data.data.length > 0) {
  
        $(".gif-results").show();
        $('.no-result').hide();
  
        
        if($("div.gif-results img").length > 0) {
          $("div.gif-results img").remove();
        } 
  
        $('div.gif-results').addClass("well");
        $('.loading-gif').css("display", "block");
        
        

        for(var i=0; i<data.data.length; i++) {
  
          
          var gifURL = data.data[i].images.original.url;
         
  
         
          var img = $('<img class="gifs">'); 
          img.attr('src', gifURL);
          img.appendTo('.gif-results');
  
        }
  
        $('.loading-gif').css("display", "none");
  
        $("#load-more").show(); 
        $(".default-gif").hide();
  
      }
      else {
        $(".gif-results").hide();
        $("#load-more").hide();
        $('.no-result').show();
      }
    } 
   
  }
  

    $('#inlineFormInputGroup').blur(); 
   
  
  
  
  
