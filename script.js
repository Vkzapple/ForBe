// Initialize stopwatch timer
const startDate = new Date("2023-11-20").getTime();

// Function to update the stopwatch display
function updateTimer() {
  const now = new Date().getTime();
  const difference = now - startDate;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  document.getElementById("timeDisplay").innerHTML =
    `${days.toString().padStart(3, "0")} hari : ` +
    `${hours.toString().padStart(2, "0")} jam : ` +
    `${minutes.toString().padStart(2, "0")} menit : ` +
    `${seconds.toString().padStart(2, "0")} detik`;
}

setInterval(updateTimer, 1000);
updateTimer();

// Scrapbook data with photos
const scrapbookData = [
  {
    photos: [
      { src: "../assets/tiara1.jpeg", caption: "Photo Cantik OF the Month" },
      { src: "../assets/tiara2.jpeg", caption: "Sweet" },
      { src: "../assets/taira7.jpeg", caption: "Coffee Date" },
      { src: "../assets/tiara8.jpeg", caption: "Movie Night" },
    ],
  },
  {
    photos: [
      { src: "/api/placeholder/400/500", caption: "Beach Day" },
      { src: "/api/placeholder/400/500", caption: "Adventure Time" },
      { src: "/api/placeholder/400/500", caption: "Dinner Date" },
      { src: "/api/placeholder/400/500", caption: "Park Walk" },
    ],
  },
  {
    photos: [
      { src: "/api/placeholder/400/500", caption: "Concert Night" },
      { src: "/api/placeholder/400/500", caption: "Birthday Party" },
      { src: "/api/placeholder/400/500", caption: "Weekend Trip" },
      { src: "/api/placeholder/400/500", caption: "Special Moment" },
    ],
  },
];

let currentPage = 0;

// Create and initialize scrapbook
function initScrapbook() {
  const scrapbook = document.getElementById("scrapbook");
  scrapbook.innerHTML = ""; // Clear existing content

  // Add navigation buttons
  const navButtons = document.createElement("div");
  navButtons.className = "nav-buttons";
  navButtons.innerHTML = `
    <button class="nav-btn prev-btn" onclick="prevPage()">Previous</button>
    <button class="nav-btn next-btn" onclick="nextPage()">Next</button>
  `;
  document.getElementById("scrapbookPage").appendChild(navButtons);

  // Create pages
  scrapbookData.forEach((pageData, index) => {
    const page = createPage(pageData, index);
    scrapbook.appendChild(page);
  });

  updatePages();
}

// Create a single page
function createPage(pageData, index) {
  const page = document.createElement("div");
  page.className = "scrapbook-page";

  const photoGrid = document.createElement("div");
  photoGrid.className = "photo-grid";

  pageData.photos.forEach((photo) => {
    const polaroid = document.createElement("div");
    polaroid.className = "polaroid";
    polaroid.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}">
      <div class="polaroid-caption">${photo.caption}</div>
    `;
    polaroid.onclick = () => showPhotoPopup(photo);
    photoGrid.appendChild(polaroid);
  });

  page.appendChild(photoGrid);
  page.innerHTML += `<div class="page-number">Page ${index + 1}</div>`;

  return page;
}

// Show photo popup
function showPhotoPopup(photo) {
  const popup = document.createElement("div");
  popup.className = "photo-popup";
  popup.innerHTML = `
    <img src="${photo.src}" alt="${photo.caption}">
    <span class="close-popup" onclick="this.parentElement.remove()">×</span>
  `;
  document.body.appendChild(popup);
  setTimeout(() => popup.classList.add("active"), 10);
}

// Navigation functions
function nextPage() {
  if (currentPage < scrapbookData.length - 1) {
    currentPage++;
    updatePages();
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    updatePages();
  }
}

// Update pages position
function updatePages() {
  const pages = document.querySelectorAll(".scrapbook-page");
  pages.forEach((page, index) => {
    const offset = index - currentPage;
    page.style.transform = `rotateY(${offset * -180}deg)`;
    page.style.zIndex = scrapbookData.length - Math.abs(offset);
  });

  // Update button states
  document.querySelector(".prev-btn").disabled = currentPage === 0;
  document.querySelector(".next-btn").disabled =
    currentPage === scrapbookData.length - 1;
}

// Add touch/drag functionality
let startX = 0;
let isDragging = false;

document.getElementById("scrapbook").addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
});

document.getElementById("scrapbook").addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const deltaX = e.pageX - startX;
  if (Math.abs(deltaX) > 100) {
    if (deltaX > 0 && currentPage > 0) {
      prevPage();
    } else if (deltaX < 0 && currentPage < scrapbookData.length - 1) {
      nextPage();
    }
    isDragging = false;
  }
});

document.getElementById("scrapbook").addEventListener("mouseup", () => {
  isDragging = false;
});

document.getElementById("scrapbook").addEventListener("mouseleave", () => {
  isDragging = false;
});

// Initialize scrapbook when page loads
window.addEventListener("load", initScrapbook);
// Music and lyrics functionality
function playMusic(songId) {
  // Stop all other songs
  stopAllMusic();

  const audio = document.getElementById(`audio${songId}`);
  const lyrics = document.getElementById(`lyrics${songId}`);

  if (audio && lyrics) {
    audio.play();
    lyrics.style.display = "block";

    // Update play button icon
    const playButton = event.currentTarget.querySelector(".play-button i");
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
  }
}

function stopMusic(songId) {
  const audio = document.getElementById(`audio${songId}`);
  const lyrics = document.getElementById(`lyrics${songId}`);

  if (audio && lyrics) {
    audio.pause();
    audio.currentTime = 0;
    lyrics.style.display = "none";

    // Reset play button icon
    const playButton = document.querySelector(
      `#musicPage .song-card:nth-child(${songId}) .play-button i`
    );
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
  }
}

function stopAllMusic() {
  for (let i = 1; i <= 3; i++) {
    stopMusic(i);
  }
}
// Menangani navigasi saat halaman pertama kali dimuat
window.addEventListener("load", () => {
  // Sembunyikan semua halaman kecuali riddle page
  hideAllPages();
  document.getElementById("riddlePage").classList.add("active");
});

// Menangani perubahan hash URL
window.addEventListener("hashchange", () => {
  handleNavigation();
});

// Fungsi untuk menangani navigasi
function handleNavigation() {
  // Sembunyikan semua halaman
  hideAllPages();

  // Ambil hash dari URL
  const hash = window.location.hash;

  // Tampilkan halaman yang sesuai
  switch (hash) {
    case "#countdown":
      document.getElementById("countdownPage").classList.add("active");
      break;
    case "#scrapbook":
      document.getElementById("scrapbookPage").classList.add("active");
      break;
    case "#music":
      document.getElementById("musicPage").classList.add("active");
      break;
    default:
      // Jika tidak ada hash atau hash tidak dikenali, tampilkan riddle page
      document.getElementById("riddlePage").classList.add("active");
  }
}

function checkRiddle() {
  const answerInput = document.getElementById("riddleAnswer");
  const answer = answerInput.value.toLowerCase().trim();
  const submitBtn = document.querySelector(".love-submit-btn");

  if (answer === "janu") {
    // Success animation
    submitBtn.classList.add("success");
    setTimeout(() => {
      window.location.href = "countdown.html"; // Changed to direct HTML navigation
      submitBtn.classList.remove("success");
    }, 500);
  } else {
    // Shake animation for incorrect answer
    answerInput.classList.add("shake");
    submitBtn.classList.add("error");

    setTimeout(() => {
      alert("Jawaban salah! Coba lagi ya sayang 💕");
      answerInput.classList.remove("shake");
      submitBtn.classList.remove("error");
    }, 300);
  }
}
// Daftar lagu dengan detail lengkap
const songs = [
  {
    id: 1,
    title: "Best Part - Daniel Caesar ft. H.E.R",
    artist: "Daniel Caesar",
    lyrics: `
      You're the coffee that I need in the morning
      You're my sunshine in the rain when it's pouring
      Kau adalah melody terindah dalam hidupku
      Setiap detik bersamamu adalah hadiah
    `,
    audioSrc: "../assets/best-part.mp3", // Pastikan file audio tersedia
  },
  {
    id: 2,
    title: "Toronto - Daniel Caesar",
    artist: "Daniel Caesar",
    lyrics: `
      So won't you let me know
      If I can make you smile
      Dan kau adalah alasanaku tersenyum
      Setiap momen bersamamu adalah musik
    `,
    audioSrc: "../assets/toronto.mp3", // Pastikan file audio tersedia
  },
  {
    id: 3,
    title: "Kiss Me - Sixpence None The Richer",
    artist: "Sixpence None The Richer",
    lyrics: `
      Kiss me beneath the milky twilight
      Lead me out on the moonlit floor
      Kau adalah puisi yang tak terucap
      Setiap sentuhan adalah melodi cinta
    `,
    audioSrc: "../assets/kiss-me.mp3", // Pastikan file audio tersedia
  },
];

// Fungsi untuk memainkan musik dan menampilkan lirik
function playMusic(songId) {
  // Hentikan semua musik yang sedang bermain
  stopAllMusic();

  const song = songs.find((s) => s.id === songId);
  const audio = document.getElementById(`audio${songId}`);
  const lyricsPopup = document.getElementById(`lyrics${songId}`);
  const songCard = document.querySelector(
    `#musicPage .song-card:nth-child(${songId})`
  );

  if (audio && lyricsPopup) {
    // Mainkan musik
    audio.play();

    // Tampilkan popup lirik
    lyricsPopup.style.display = "block";

    // Tandai kartu musik yang sedang aktif
    songCard.classList.add("active");
  }
}

// Fungsi untuk menghentikan musik
function stopMusic(songId) {
  const audio = document.getElementById(`audio${songId}`);
  const lyricsPopup = document.getElementById(`lyrics${songId}`);
  const songCard = document.querySelector(
    `#musicPage .song-card:nth-child(${songId})`
  );

  if (audio && lyricsPopup) {
    // Hentikan musik
    audio.pause();
    audio.currentTime = 0;

    // Sembunyikan popup lirik
    lyricsPopup.style.display = "none";

    // Hapus status aktif dari kartu musik
    songCard.classList.remove("active");
  }
}

// Fungsi untuk menghentikan semua musik
function stopAllMusic() {
  songs.forEach((song) => {
    stopMusic(song.id);
  });
}

// Tambahkan event listener untuk menutup popup lirik
document.addEventListener("DOMContentLoaded", () => {
  const closeBtns = document.querySelectorAll(".close-btn");
  closeBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => stopMusic(index + 1));
  });
});
