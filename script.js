// Add simple scroll highlight for nav links
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
  }
});



fetch("about.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("about").innerHTML = data;

    // Wait for DOM to insert about.html, then attach scroll logic
    const aboutCard = document.querySelector(".about-card");
    if (!aboutCard) return;

    function revealCard() {
      const rect = aboutCard.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight * 0.8) {
        aboutCard.classList.add("visible");
      } else {
        aboutCard.classList.remove("visible");
      }
    }

    window.addEventListener("scroll", revealCard);
    revealCard(); // Run once on page load
  })
  .catch((error) => console.error("Error loading about.html:", error));

  document.getElementById("downloadResume").addEventListener("click", function(e) {
    e.preventDefault(); // Prevent default link behavior
    
    const fileUrl = this.href;

    // Open in new tab
    window.open(fileUrl, '_blank');

    // Trigger download
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = "Amit_Kumar_Yadav_Resume.pdf"; // Optional custom filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});