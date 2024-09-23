function checkAnswers() {
  let score = 0;
  const answers = {
    q1: "d",
    q2: "a",
  };

  for (let question in answers) {
    const selectedAnswer = document.querySelector(
      `input[name="${question}"]:checked`
    );
    if (selectedAnswer && selectedAnswer.value === answers[question]) {
      score++;
    }
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `Você acertou ${score} de 2 questões.`;

  if (score === 2) {
    resultDiv.innerHTML += " Excelente trabalho!";
  } else {
    resultDiv.innerHTML += " Continue estudando!";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Check for saved user preference
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  // Set initial mode
  setDarkMode(isDarkMode);

  // Toggle dark mode
  darkModeToggle.addEventListener("change", function () {
    setDarkMode(this.checked);
  });

  function setDarkMode(isDark) {
    body.classList.toggle("dark-mode", isDark);
    darkModeToggle.checked = isDark;
    localStorage.setItem("darkMode", isDark);
  }

  // Existing quiz functionality
  function checkAnswers() {
    let score = 0;
    const answers = {
      q1: "d",
      q2: "a",
    };

    for (let question in answers) {
      const selectedAnswer = document.querySelector(
        `input[name="${question}"]:checked`
      );
      if (selectedAnswer && selectedAnswer.value === answers[question]) {
        score++;
      }
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Você acertou ${score} de 2 questões.`;

    if (score === 2) {
      resultDiv.innerHTML += " Excelente trabalho!";
    } else {
      resultDiv.innerHTML += " Continue estudando!";
    }
  }

  // Make checkAnswers function globally accessible
  window.checkAnswers = checkAnswers;
});

// Existing dark mode functionality
document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Check for saved user preference
  const isDarkMode = localStorage.getItem("darkMode") === "true";

  // Set initial mode
  setDarkMode(isDarkMode);

  // Toggle dark mode
  darkModeToggle.addEventListener("change", function () {
    setDarkMode(this.checked);
  });

  function setDarkMode(isDark) {
    body.classList.toggle("dark-mode", isDark);
    darkModeToggle.checked = isDark;
    localStorage.setItem("darkMode", isDark);
  }

  // Existing dark mode and YouTube functionality remains unchanged

  $(document).ready(function () {
    let isHighlighterActive = false;
    const $highlighterToggle = $("#highlighterToggle");
    const $main = $("main");
    const $highlightsList = $("#highlightsList");
    let highlightedElements = [];

    // Load saved highlights
    loadHighlights();

    $highlighterToggle.on("click", function () {
      isHighlighterActive = !isHighlighterActive;
      $(this).toggleClass("active", isHighlighterActive);
      $main.toggleClass("highlighter-active", isHighlighterActive);

      if (isHighlighterActive) {
        $(this).attr("title", "Desativar Destaque");
      } else {
        $(this).attr("title", "Ativar Destaque");
      }
    });

    $main.on("mouseup", function () {
      if (!isHighlighterActive) return;

      const selection = window.getSelection();
      const selectedText = selection.toString().trim();

      if (selectedText) {
        const range = selection.getRangeAt(0);
        const span = document.createElement("span");
        span.className = "highlight";
        range.surroundContents(span);

        saveHighlight(selectedText, span);
        addHighlightToList(selectedText, highlightedElements.length - 1);

        selection.removeAllRanges();
      }
    });

    function saveHighlight(text, element) {
      let highlights = JSON.parse(localStorage.getItem("highlights") || "[]");
      highlights.push(text);
      localStorage.setItem("highlights", JSON.stringify(highlights));
      highlightedElements.push(element);
    }

    function loadHighlights() {
      let highlights = JSON.parse(localStorage.getItem("highlights") || "[]");
      highlights.forEach((text, index) => {
        addHighlightToList(text, index);
      });
    }

    function addHighlightToList(text, index) {
      const $li = $("<li>");
      $li.html(`
            <span class="highlight-text">${text}</span>
            <div class="highlight-actions">
                <button class="edit-highlight"><i class="fas fa-edit"></i></button>
                <button class="delete-highlight"><i class="fas fa-trash"></i></button>
            </div>
        `);
      $highlightsList.append($li);

      $li.find(".edit-highlight").on("click", function () {
        const newText = prompt("Editar destaque:", text);
        if (newText !== null && newText.trim() !== "") {
          updateHighlight(index, newText.trim());
          $li.find(".highlight-text").text(newText.trim());
        }
      });

      $li.find(".delete-highlight").on("click", function () {
        if (confirm("Tem certeza que deseja excluir este destaque?")) {
          deleteHighlight(index);
          $li.remove();
        }
      });
    }

    function updateHighlight(index, newText) {
      let highlights = JSON.parse(localStorage.getItem("highlights") || "[]");
      highlights[index] = newText;
      localStorage.setItem("highlights", JSON.stringify(highlights));
    }

    function deleteHighlight(index) {
      let highlights = JSON.parse(localStorage.getItem("highlights") || "[]");
      highlights.splice(index, 1);
      localStorage.setItem("highlights", JSON.stringify(highlights));

      // Remove the highlight from the text
      if (highlightedElements[index]) {
        $(highlightedElements[index]).contents().unwrap();
        highlightedElements.splice(index, 1);
      }

      // Update the indices for the remaining highlights
      $("#highlightsList li").each(function (i) {
        $(this).find(".edit-highlight, .delete-highlight").off("click");
        $(this)
          .find(".edit-highlight")
          .on("click", function () {
            const text = $(this).closest("li").find(".highlight-text").text();
            const newText = prompt("Editar destaque:", text);
            if (newText !== null && newText.trim() !== "") {
              updateHighlight(i, newText.trim());
              $(this)
                .closest("li")
                .find(".highlight-text")
                .text(newText.trim());
            }
          });
        $(this)
          .find(".delete-highlight")
          .on("click", function () {
            if (confirm("Tem certeza que deseja excluir este destaque?")) {
              deleteHighlight(i);
              $(this).closest("li").remove();
            }
          });
      });
    }
  });

  // Existing quiz functionality
  window.checkAnswers = function () {
    let score = 0;
    const answers = {
      q1: "a",
      q2: "b",
    };

    for (let question in answers) {
      const selectedAnswer = document.querySelector(
        `input[name="${question}"]:checked`
      );
      if (selectedAnswer && selectedAnswer.value === answers[question]) {
        score++;
      }
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `Você acertou ${score} de 2 questões.`;

    if (score === 2) {
      resultDiv.innerHTML += " Excelente trabalho!";
    } else {
      resultDiv.innerHTML += " Continue estudando!";
    }
  };
});

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "ojC86IR5Uak", // Replace with your actual YouTube video ID
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  // Video is ready to play
  $("#playPauseBtn").click(function () {
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
      player.pauseVideo();
      $(this).find("i").removeClass("fa-pause").addClass("fa-play");
    } else {
      player.playVideo();
      $(this).find("i").removeClass("fa-play").addClass("fa-pause");
    }
  });

  $("#muteBtn").click(function () {
    if (player.isMuted()) {
      player.unMute();
      $(this).find("i").removeClass("fa-volume-mute").addClass("fa-volume-up");
    } else {
      player.mute();
      $(this).find("i").removeClass("fa-volume-up").addClass("fa-volume-mute");
    }
  });
}
