/**
 * Script principal - Créer un CV optimisé par IA (ÉSTIAM AI Advanced)
 * Périmètre : Améliorer un CV existant avec ChatGPT
 *
 * Responsabilités techniques :
 * 1. Activer l'amélioration progressive (.js-enabled).
 * 2. Gérer l'ouverture/fermeture accessible du menu principal sur mobile (#nav-toggle).
 * 3. Gérer le sommaire latéral repliable sur mobile/tablette (#sidebar-toggle) sans chevauchement.
 * 4. Gérer l'affichage/masquage des corrigés d'exercices pédagogiques ([data-toggle-correction]).
 * 5. Mettre à jour le compteur de la checklist de vérification du Module 3 ([data-checklist-item]).
 * 6. Déplacer explicitement le focus sur la zone principale via le lien d'évitement.
 */

(function () {
  "use strict";

  // 1. Signale au CSS que JavaScript est actif
  document.documentElement.classList.add("js-enabled");

  // 2. Menu de navigation principal sur mobile
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("navigation-principale");

  /**
   * Met à jour l'état d'ouverture du menu principal mobile et ses attributs ARIA.
   * @param {boolean} isOpen - true pour ouvrir, false pour fermer.
   */
  function setMenuState(isOpen) {
    if (!navToggle || !siteNav) {
      return;
    }
    navToggle.setAttribute("aria-expanded", String(isOpen));
    siteNav.classList.toggle("is-open", isOpen);
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isCurrentlyOpen = navToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!isCurrentlyOpen);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setMenuState(false);
        navToggle.focus();
      }
    });

    const tabletMediaQuery = window.matchMedia("(min-width: 48rem)");
    tabletMediaQuery.addEventListener("change", function (event) {
      if (event.matches) {
        setMenuState(false);
      }
    });
  }

  // 3. Navigation latérale (sommaire des modules et sections) repliable sur mobile/tablette
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarBody = document.getElementById("sidebar-body");
  const desktopSidebarQuery = window.matchMedia("(min-width: 62rem)");

  /**
   * Adapte l'état du sommaire latéral selon la taille d'écran ou l'action utilisateur.
   * @param {boolean} isExpanded - true si le panneau est déplié.
   */
  function setSidebarState(isExpanded) {
    if (!sidebarToggle || !sidebarBody) {
      return;
    }
    sidebarToggle.setAttribute("aria-expanded", String(isExpanded));
    sidebarBody.classList.toggle("is-collapsed", !isExpanded);
    const badge = sidebarToggle.querySelector(".sidebar-toggle-badge");
    if (badge) {
      badge.textContent = isExpanded ? "Masquer" : "Afficher";
    }
  }

  if (sidebarToggle && sidebarBody) {
    // Sur mobile/tablette (< 992px), le sommaire est replié par défaut pour éviter tout encombrement
    setSidebarState(desktopSidebarQuery.matches);

    sidebarToggle.addEventListener("click", function () {
      if (desktopSidebarQuery.matches) {
        return;
      }
      const isExpanded = sidebarToggle.getAttribute("aria-expanded") === "true";
      setSidebarState(!isExpanded);
    });

    desktopSidebarQuery.addEventListener("change", function (event) {
      setSidebarState(event.matches);
    });

    // Referme le sommaire mobile lorsqu'un lien d'ancrage interne est activé
    const sidebarLinks = sidebarBody.querySelectorAll('a[href^="#"]');
    sidebarLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (!desktopSidebarQuery.matches) {
          setSidebarState(false);
        }
      });
    });
  }

  // 4. Boutons de révélation des corrigés d'exercices pédagogiques
  const correctionButtons = document.querySelectorAll("[data-toggle-correction]");
  correctionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-toggle-correction");
      const panel = document.getElementById(targetId);
      if (!panel) {
        return;
      }
      const isHidden = panel.hasAttribute("hidden");
      if (isHidden) {
        panel.removeAttribute("hidden");
        button.setAttribute("aria-expanded", "true");
        button.textContent = "Masquer la correction";
      } else {
        panel.setAttribute("hidden", "");
        button.setAttribute("aria-expanded", "false");
        button.textContent = "Afficher la correction proposée";
      }
    });
  });

  // 5. Compteur de progression de la checklist de vérification (Module 3)
  const checklistItems = document.querySelectorAll("[data-checklist-item]");
  const checklistCounter = document.getElementById("checklist-counter");

  function updateChecklistCount() {
    if (!checklistCounter || checklistItems.length === 0) {
      return;
    }
    let checkedCount = 0;
    checklistItems.forEach(function (checkbox) {
      if (checkbox.checked) {
        checkedCount += 1;
      }
    });
    checklistCounter.textContent =
      "Points vérifiés : " + checkedCount + " sur " + checklistItems.length;
  }

  if (checklistItems.length > 0 && checklistCounter) {
    checklistItems.forEach(function (checkbox) {
      checkbox.addEventListener("change", updateChecklistCount);
    });
    updateChecklistCount();
  }

  // 6. Gestion du lien d'évitement : déplace explicitement le focus sur <main>
  const skipLink = document.querySelector(".skip-link");
  const mainContent = document.getElementById("contenu-principal");

  if (skipLink && mainContent) {
    skipLink.addEventListener("click", function () {
      mainContent.focus();
    });
  }
})();
