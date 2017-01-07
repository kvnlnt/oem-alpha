(function(COMPONENTS, COMPONENT, PROTOTYPE, UTIL) {


    var Prototype = PROTOTYPE(COMPONENT, {
        type: "Slider"
    });


    Prototype.init = function(){
        this.slideIndex = 1;
        this.slides = this.getEl().querySelectorAll('.__slide');
        this.nextEl = this.getEl().querySelectorAll('.__next')[0];
        this.prevEl = this.getEl().querySelectorAll('.__prev')[0];
        this.showSlides(this.slideIndex);
        this.nextEl.addEventListener("click", this.handleNextElClick.bind(this));
        this.prevEl.addEventListener("click", this.handlePrevElClick.bind(this));
    };

    Prototype.getSlides = function(){
        return this.slides;
    };

    Prototype.getSlideIndex = function(){
        return this.slideIndex;
    };

    Prototype.handleNextElClick = function(){
        this.moveIndex(1);
        return this;
    };

    Prototype.moveIndex = function(n){
        this.setSlideIndex(this.getSlideIndex()+n);
        this.showSlides(this.getSlideIndex());
        return this;
    };

    Prototype.handlePrevElClick = function(){
        this.moveIndex(-1);
        return this;
    };

    Prototype.setSlideIndex = function(slideIndex){
        this.slideIndex = slideIndex;
        return this;
    };

    Prototype.showSlides = function(n) {
      var i;
      var slides = this.getSlides();
      if (n > slides.length) this.setSlideIndex(1);  
      if (n < 1) this.setSlideIndex(slides.length);

      // hide all
      UTIL.arrayFrom(slides).forEach(function(slide){
        slide.style.display = "none";
      });

      // show current
      slides[this.getSlideIndex()-1].style.display = "block";  
    }

    COMPONENTS.Slider.Prototype = Prototype;
    return COMPONENTS;

})(
    oem.Components,
    oem.Core.Component,
    oem.Core.Prototype,
    oem.Core.Util);