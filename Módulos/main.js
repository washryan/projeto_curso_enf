$(document).ready(function () {
  // Smooth scrolling for navigation links
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 100,
          },
          1000
        );
    }
  });

  // Add active class to navigation items on scroll
  $(window)
    .scroll(function () {
      var scrollDistance = $(window).scrollTop();
      $(".module-section").each(function (i) {
        if ($(this).position().top <= scrollDistance + 200) {
          $("#main-nav ul li a.active").removeClass("active");
          $("#main-nav ul li a").eq(i).addClass("active");
        }
      });
    })
    .scroll();

  // Module card hover effect
  $(".module-card").hover(
    function () {
      $(this).find(".module-description").slideDown(300);
    },
    function () {
      $(this).find(".module-description").slideUp(300);
    }
  );

  // Improved search functionality
  function performSearch() {
    var searchTerm = $("#search-input").val().toLowerCase();
    $(".module-section").each(function () {
      var section = $(this);
      var hasVisibleCards = false;

      section.find(".module-card").each(function () {
        var cardText = $(this).text().toLowerCase();
        if (cardText.indexOf(searchTerm) > -1) {
          $(this).show();
          hasVisibleCards = true;
        } else {
          $(this).hide();
        }
      });

      if (hasVisibleCards) {
        section.show();
      } else {
        section.hide();
      }
    });
  }

  // Trigger search on input change and button click
  $("#search-input").on("input", performSearch);
  $("#search-button").on("click", performSearch);

  // Toggle dark mode
  $("#dark-mode-toggle").click(function () {
    $("body").toggleClass("dark-mode");
    if ($("body").hasClass("dark-mode")) {
      $(this).text("Light Mode");
      $(this).css("background-color", "#f0f0f0").css("color", "#1a1a1a");
    } else {
      $(this).text("Dark Mode");
      $(this).css("background-color", "#333").css("color", "#f4f4f4");
    }
  });

  // Lazy loading for module cards
  $(window).on("load scroll", function () {
    $(".module-card").each(function () {
      if ($(this).offset().top < window.innerHeight + $(window).scrollTop()) {
        $(this).addClass("visible");
      }
    });
  });
});
