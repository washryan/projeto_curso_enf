$(document).ready(function () {
  // Mobile Menu Toggle
  $(".mobile-menu-btn").click(function () {
    $(".menu").toggleClass("active");
  });

  // Smooth Scroll for Menu Items
  $('a[href^="#"]').on("click", function (event) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 70,
          },
          1000
        );
    }
  });

  // Dark Mode Toggle
  $("#chk").change(function () {
    $("body").toggleClass("dark-mode");
  });

  // Back to Top Button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#backToTopBtn").fadeIn();
    } else {
      $("#backToTopBtn").fadeOut();
    }
  });

  $("#backToTopBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  // Form Validation
  $(".contact-form").submit(function (e) {
    var requiredInputs = $(this).find("input[required], textarea[required]");
    var errors = false;

    requiredInputs.each(function () {
      if ($(this).val().trim() === "") {
        $(this).addClass("error");
        errors = true;
      } else {
        $(this).removeClass("error");
      }
    });

    if (errors) {
      e.preventDefault();
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  });

  // Animate on Scroll
  $(window).scroll(function () {
    $(".fade-in").each(function () {
      var position = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > position - windowHeight + 100) {
        $(this).addClass("visible");
      }
    });
  });

  // Initialize animation on page load
  $(".fade-in").each(function () {
    $(this).addClass("visible");
  });
});
