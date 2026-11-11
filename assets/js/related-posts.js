document.querySelectorAll("[data-related-posts]").forEach(function (section) {
  const tablist = section.querySelector('[role="tablist"]');
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = Array.from(section.querySelectorAll("[data-related-panel]"));

  function selectTab(index) {
    tabs.forEach(function (tab, tabIndex) {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[tabIndex].hidden = !selected;
    });
  }

  panels.forEach(function (panel, index) {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabs[index].id);
    panel.tabIndex = 0;
  });
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      selectTab(index);
    });
    tab.addEventListener("keydown", function (event) {
      let nextIndex = index;
      switch (event.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % tabs.length;
          break;
        case "ArrowLeft":
          nextIndex = (index + tabs.length - 1) % tabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }
      event.preventDefault();
      selectTab(nextIndex);
      tabs[nextIndex].focus();
    });
  });
  selectTab(0);
  tablist.hidden = tabs.length < 2;
});
