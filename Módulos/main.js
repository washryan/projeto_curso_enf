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
    var hasVisibleCards = false; // Para rastrear se pelo menos um cartão foi exibido

    $(".module-section").each(function () {
      var section = $(this);
      var sectionHasVisibleCards = false; // Para rastrear se uma seção tem cartões visíveis

      section.find(".module-card").each(function () {
        var cardText = $(this).text().toLowerCase();
        if (cardText.indexOf(searchTerm) > -1) {
          $(this).show(); // Exibe o cartão se o texto corresponder ao termo de busca
          sectionHasVisibleCards = true;
          hasVisibleCards = true;
        } else {
          $(this).hide(); // Esconde o cartão se não corresponder
        }
      });

      // Exibe ou esconde a seção com base nos cartões visíveis
      if (sectionHasVisibleCards) {
        section.show();
      } else {
        section.hide();
      }
    });

    // Se nenhum cartão for visível, exibe a mensagem "No modules found"
    if (!hasVisibleCards) {
      $("#no-results-message").show();
    } else {
      $("#no-results-message").hide();
    }
  }

  // Trigger search on input change and button click
  $("#search-input").on("input", performSearch);
  $("#search-button").on("click", performSearch);

  // Toggle dark mode
  function initializeDarkMode() {
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      $("body").addClass("dark-mode");
      $("#dark-mode-toggle")
        .text("Modo Claro")
        .css("background-color", "#f0f0f0")
        .css("color", "#1a1a1a");
    } else {
      $("body").removeClass("dark-mode");
      $("#dark-mode-toggle")
        .text("Modo Escuro")
        .css("background-color", "#333")
        .css("color", "#f4f4f4");
    }
  }

  initializeDarkMode();

  $("#dark-mode-toggle").click(function () {
    $("body").toggleClass("dark-mode");
    if ($("body").hasClass("dark-mode")) {
      $(this).text("Modo Claro");
      $(this).css("background-color", "#f0f0f0").css("color", "#1a1a1a");
      localStorage.setItem("theme", "dark"); // Salva a preferência como "dark"
    } else {
      $(this).text("Modo Escuro");
      $(this).css("background-color", "#333").css("color", "#f4f4f4");
      localStorage.setItem("theme", "light"); // Salva a preferência como "light"
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

  // Filter by category and search keyword
  function filterByCategory() {
    var selectedCategory = $("#category-filter").val().toLowerCase();

    $(".module-section").each(function () {
      var section = $(this);
      var hasVisibleCards = false;

      section.find(".module-card").each(function () {
        var cardCategory = $(this).data("category").toLowerCase();
        var searchTerm = $("#search-input").val().toLowerCase();
        var cardText = $(this).text().toLowerCase();

        var matchesCategory =
          selectedCategory === "all" || cardCategory === selectedCategory;
        var matchesSearch = cardText.indexOf(searchTerm) > -1;

        if (matchesCategory && matchesSearch) {
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

  // Trigger search and category filter on input change and category selection
  $("#search-input").on("input", filterByCategory);
  $("#category-filter").on("change", filterByCategory);

  // Show/Hide Back to Top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#back-to-top").fadeIn();
    } else {
      $("#back-to-top").fadeOut();
    }
  });

  // Back to Top button action
  $("#back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.onload = () => {
            lazyImage.classList.add("loaded");
          };
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    lazyImages.forEach(function (lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.onload = () => {
        lazyImage.classList.add("loaded");
      };
    });
  }
});
