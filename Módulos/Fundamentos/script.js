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

  // Existing quiz functionality
  window.checkAnswers = function () {
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
  };
});

// YouTube API code
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "-abh3n5AxDE", // Replace with your actual YouTube video ID
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
