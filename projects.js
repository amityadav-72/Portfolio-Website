(function () {
  const DEFAULT_BATCH_SIZE = 3;

  function initializeProjectsSection(root = document) {
    const scope = root && typeof root.querySelector === "function" ? root : document;
    const grid = scope.querySelector(".problem-grid");

    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".card"));
    const button = scope.querySelector(".projects-show-more");
    const controls = scope.querySelector(".projects-load-more");

    if (!cards.length) return;

    const batchSize = Number.parseInt(grid.dataset.batchSize || DEFAULT_BATCH_SIZE, 10) || DEFAULT_BATCH_SIZE;
    let visibleCount = Math.min(
      Number.parseInt(grid.dataset.visibleCount || batchSize, 10) || batchSize,
      cards.length
    );

    function renderCards() {
      cards.forEach((card, index) => {
        card.style.display = index >= visibleCount ? "none" : "";
      });

      grid.dataset.visibleCount = String(visibleCount);

      if (button) {
        const hasMore = visibleCount < cards.length;
        button.disabled = !hasMore;
      }

      if (controls) {
        controls.style.display = visibleCount >= cards.length ? "none" : "";
      }
    }

    if (button && button.dataset.projectsBound !== "true") {
      button.addEventListener("click", () => {
        visibleCount = Math.min(visibleCount + batchSize, cards.length);
        renderCards();
      });
      button.dataset.projectsBound = "true";
    }

    renderCards();
  }

  window.initializeProjectsSection = initializeProjectsSection;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initializeProjectsSection(document));
  } else {
    initializeProjectsSection(document);
  }
})();
