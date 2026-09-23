    document.addEventListener("DOMContentLoaded", () => {
  // Splash Screen Timer
  const splashScreen = document.getElementById("splashScreen");
  setTimeout(() => {
    splashScreen.classList.add("fade-out");
  }, 2000);

  const foldersGrid = document.getElementById("foldersGrid");
  const galleryGrid = document.getElementById("galleryGrid");
  const backBtn = document.getElementById("backToFoldersBtn");
  const currentViewTitle = document.getElementById("currentViewTitle");
  const folderItems = document.querySelectorAll(".folder-item");
  const albumCards = document.querySelectorAll(".album-card");
  const photoCards = document.querySelectorAll(".card");
  const searchInput = document.getElementById("searchInput");

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDownload = document.getElementById("modalDownload");
  const closeModal = document.getElementById("closeModal");

  // Open Specific Folder Photos View
  function openFolder(category, folderName) {
    foldersGrid.style.display = "none";
    galleryGrid.style.display = "column";
    galleryGrid.style.display = "block"; 
    backBtn.style.display = "flex";
    currentViewTitle.textContent = folderName;

    photoCards.forEach(card => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Show All Folders Screen
  function showFoldersView() {
    foldersGrid.style.display = "grid";
    galleryGrid.style.display = "none";
    backBtn.style.display = "none";
    currentViewTitle.textContent = "Albums & Folders";
    searchInput.value = "";
    folderItems.forEach(i => i.classList.remove("active"));
    folderItems[0].classList.add("active");
  }

  // Album Card Click Events
  albumCards.forEach(card => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category");
      const title = card.querySelector("h3").textContent;
      openFolder(category, title);
    });
  });

  // Back Button Event
  backBtn.addEventListener("click", showFoldersView);

  // Sidebar Menu Events
  folderItems.forEach(item => {
    item.addEventListener("click", () => {
      folderItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const view = item.getAttribute("data-view");
      if (view === "folders") {
        showFoldersView();
      } else if (view === "all-photos") {
        openFolder("all", "All Photos");
      }
    });
  });

  // Search Filter
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length > 0) {
      foldersGrid.style.display = "none";
      galleryGrid.style.display = "block";
      backBtn.style.display = "flex";
      currentViewTitle.textContent = "Search Results";

      photoCards.forEach(card => {
        const title = card.getAttribute("data-title").toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
      });
    }
  });

  // Like Button
  document.querySelectorAll(".like-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("liked");
      const icon = btn.querySelector("i");
      icon.className = btn.classList.contains("liked") ? "fa-solid fa-heart" : "fa-regular fa-heart";
    });
  });

  // Modal Image Preview
  photoCards.forEach(card => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.querySelector("h3").textContent;

      modalImg.src = img.src;
      modalTitle.textContent = title;
      modalDownload.href = img.src;
      modal.classList.add("active");
    });
  });

  closeModal.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
});