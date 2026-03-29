
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

// 3D Tilt Effect for About Portrait (for about.html direct access)
const aboutPortrait = document.querySelector('.about-portrait');
const aboutImage = document.querySelector('.about-image');

if (aboutPortrait && aboutImage) {
  // Add smooth transition
  aboutPortrait.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
  
  aboutPortrait.addEventListener('mousemove', (e) => {
    const rect = aboutImage.getBoundingClientRect();
    
    // Only apply effect if mouse is within image bounds
    if (e.clientX < rect.left || e.clientX > rect.right || 
        e.clientY < rect.top || e.clientY > rect.bottom) {
      return;
    }
    
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized to -1 to 1) and clamp
    let distX = (e.clientX - centerX) / (rect.width / 2);
    let distY = (e.clientY - centerY) / (rect.height / 2);
    
    // Clamp values to prevent extreme rotations
    distX = Math.max(-1, Math.min(1, distX));
    distY = Math.max(-1, Math.min(1, distY));
    
    // Calculate rotation angles (max 15 degrees)
    const rotateY = distX * 15;
    const rotateX = -distY * 15;
    
    // Add shadow depth based on tilt
    const shadowIntensity = 0.2 + (Math.abs(distX) + Math.abs(distY)) * 0.15;
    const shadowX = distX * 10;
    const shadowY = distY * 10;
    
    aboutPortrait.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    aboutPortrait.style.boxShadow = `${shadowX}px ${shadowY}px ${30 + Math.abs(shadowX) + Math.abs(shadowY)}px rgba(25, 35, 76, ${0.24 + shadowIntensity})`;
  });
  
  aboutPortrait.addEventListener('mouseleave', () => {
    aboutPortrait.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
    aboutPortrait.style.transform = 'rotateX(0deg) rotateY(0deg)';
    aboutPortrait.style.boxShadow = '0 20px 48px rgba(25, 35, 76, 0.24)';
  });

  aboutPortrait.addEventListener('mouseenter', () => {
    aboutPortrait.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out';
  });
}

