(function () {
  const DEFAULT_BATCH_SIZE = 3;

  function initializeProjectsSection(root = document) {
    const scope = root && typeof root.querySelector === "function" ? root : document;
    const grid = scope.querySelector(".problem-grid");

    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".card"));
    const tabs = Array.from(scope.querySelectorAll(".project-tab"));
    const button = scope.querySelector(".projects-show-more");
    const controls = scope.querySelector(".projects-load-more");

    if (!cards.length) return;

    const batchSize = Number.parseInt(grid.dataset.batchSize || DEFAULT_BATCH_SIZE, 10) || DEFAULT_BATCH_SIZE;
    const state = grid._projectsState || {
      activeCategory: grid.dataset.activeCategory || "all",
      visibleCounts: {}
    };

    grid._projectsState = state;

    function getCardCategories(card) {
      return (card.dataset.categories || "")
        .split(/\s+/)
        .map((category) => category.trim())
        .filter(Boolean);
    }

    function matchesCategory(card, category) {
      return category === "all" || getCardCategories(card).includes(category);
    }

    const availableCategories = new Set(["all"]);
    cards.forEach((card) => {
      getCardCategories(card).forEach((category) => availableCategories.add(category));
    });

    availableCategories.forEach((category) => {
      if (!state.visibleCounts[category]) {
        state.visibleCounts[category] = batchSize;
      }
    });

    if (!availableCategories.has(state.activeCategory)) {
      state.activeCategory = "all";
    }

    function renderTabs() {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.projectTab === state.activeCategory;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
      });
    }

    function renderCards() {
      const matchingCards = cards.filter((card) => matchesCategory(card, state.activeCategory));
      const visibleCount = Math.min(state.visibleCounts[state.activeCategory] || batchSize, matchingCards.length);

      let shownCards = 0;
      cards.forEach((card) => {
        if (!matchesCategory(card, state.activeCategory)) {
          card.style.display = "none";
          return;
        }

        shownCards += 1;
        card.style.display = shownCards <= visibleCount ? "" : "none";
      });

      grid.dataset.visibleCount = String(visibleCount);
      grid.dataset.activeCategory = state.activeCategory;

      if (button) {
        const hasMore = visibleCount < matchingCards.length;
        button.disabled = !hasMore;
      }

      if (controls) {
        controls.style.display = visibleCount < matchingCards.length ? "" : "none";
      }
    }

    if (button && button.dataset.projectsBound !== "true") {
      button.addEventListener("click", () => {
        const matchingCards = cards.filter((card) => matchesCategory(card, state.activeCategory));
        state.visibleCounts[state.activeCategory] = Math.min(
          (state.visibleCounts[state.activeCategory] || batchSize) + batchSize,
          matchingCards.length
        );
        renderCards();
      });
      button.dataset.projectsBound = "true";
    }

    tabs.forEach((tab) => {
      if (tab.dataset.projectsBound === "true") return;

      tab.addEventListener("click", () => {
        state.activeCategory = tab.dataset.projectTab || "all";
        if (!state.visibleCounts[state.activeCategory]) {
          state.visibleCounts[state.activeCategory] = batchSize;
        }
        renderTabs();
        renderCards();
      });

      tab.dataset.projectsBound = "true";
    });

    renderTabs();
    renderCards();
  }

  window.initializeProjectsSection = initializeProjectsSection;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initializeProjectsSection(document));
  } else {
    initializeProjectsSection(document);
  }
})();
