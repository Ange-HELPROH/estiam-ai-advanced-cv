/**
 * Script principal - Créer un CV optimisé par IA (ÉSTIAM AI Advanced)
 * Périmètre : Améliorer un CV existant avec ChatGPT
 *
 * Responsabilités techniques (AG-06) :
 * 1. Activer l'amélioration progressive (.js-enabled).
 * 2. Gérer l'ouverture/fermeture accessible du menu principal sur mobile (#nav-toggle).
 * 3. Gérer le bouton "Sommaire" repliable sur mobile, tablette et ordinateur (#sidebar-toggle)
 *    ainsi que l'indication de la section active dans la barre latérale.
 * 4. Gérer l'affichage/masquage des corrigés d'exercices pédagogiques ([data-toggle-correction]).
 * 5. Mettre à jour le compteur de la checklist de vérification du Module 3 ([data-checklist-item]).
 * 6. Gérer la copie fonctionnelle des modèles de prompts ([data-copy-prompt]).
 * 7. Gérer l'impression fonctionnelle des CV d'étude ([data-print-cv]).
 * 8. Gérer le quiz interactif véritable de 8 questions (#quiz-form, #quiz-progress, #quiz-result, #quiz-reset).
 * 9. Déplacer explicitement le focus sur la zone principale via le lien d'évitement.
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

  // 3. Navigation latérale ("Sommaire") repliable et suivi de la section active
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
      badge.textContent = isExpanded ? "Fermer" : "Ouvrir";
    }
  }

  if (sidebarToggle && sidebarBody) {
    setSidebarState(desktopSidebarQuery.matches);

    sidebarToggle.addEventListener("click", function () {
      const isExpanded = sidebarToggle.getAttribute("aria-expanded") === "true";
      setSidebarState(!isExpanded);
    });

    desktopSidebarQuery.addEventListener("change", function (event) {
      setSidebarState(event.matches);
    });

    const sidebarAnchorLinks = sidebarBody.querySelectorAll('a[href^="#"]');
    sidebarAnchorLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        sidebarAnchorLinks.forEach(function (item) {
          item.classList.remove("is-active");
        });
        link.classList.add("is-active");
        if (!desktopSidebarQuery.matches) {
          setSidebarState(false);
        }
      });
    });

    if ("IntersectionObserver" in window && sidebarAnchorLinks.length > 0) {
      const sectionMap = new Map();
      sidebarAnchorLinks.forEach(function (link) {
        const targetId = link.getAttribute("href").slice(1);
        const sectionEl = document.getElementById(targetId);
        if (sectionEl) {
          sectionMap.set(sectionEl, link);
        }
      });

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              const activeLink = sectionMap.get(entry.target);
              if (activeLink) {
                sidebarAnchorLinks.forEach(function (item) {
                  item.classList.remove("is-active");
                });
                activeLink.classList.add("is-active");
              }
            }
          });
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
      );

      sectionMap.forEach(function (_link, sectionEl) {
        observer.observe(sectionEl);
      });
    }
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
      const parentItem = checkbox.closest(".checklist-item");
      if (checkbox.checked) {
        checkedCount += 1;
        if (parentItem) {
          parentItem.classList.add("is-checked");
        }
      } else if (parentItem) {
        parentItem.classList.remove("is-checked");
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

  // 6. Boutons "Copier le prompt" de la bibliothèque de prompts réutilisables
  const copyPromptButtons = document.querySelectorAll("[data-copy-prompt]");

  function copyTextToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return fallbackCopyText(text);
        }
      );
    }
    return Promise.resolve(fallbackCopyText(text));
  }

  function fallbackCopyText(text) {
    try {
      const tempArea = document.createElement("textarea");
      tempArea.value = text;
      tempArea.setAttribute("readonly", "");
      tempArea.style.position = "fixed";
      tempArea.style.opacity = "0";
      document.body.appendChild(tempArea);
      tempArea.select();
      const succeeded = document.execCommand("copy");
      document.body.removeChild(tempArea);
      return Boolean(succeeded);
    } catch (_err) {
      return false;
    }
  }

  copyPromptButtons.forEach(function (button) {
    const defaultLabel = button.textContent.trim();
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-copy-prompt");
      const sourceEl = document.getElementById(targetId);
      if (!sourceEl) {
        return;
      }
      const promptText = sourceEl.textContent.trim();
      copyTextToClipboard(promptText).then(function (ok) {
        if (ok) {
          button.textContent = "Prompt copié";
          button.classList.add("is-copied");
          setTimeout(function () {
            button.textContent = defaultLabel;
            button.classList.remove("is-copied");
          }, 2200);
        }
      });
    });
  });

  // 7. Impression fonctionnelle des CV d'étude
  const printButtons = document.querySelectorAll("[data-print-cv]");
  printButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      if (typeof window.print === "function") {
        window.print();
      }
    });
  });

  // 8. Quiz interactif véritable de 8 questions (Module 3)
  const quizForm = document.getElementById("quiz-form");
  const quizProgress = document.getElementById("quiz-progress");
  const quizResult = document.getElementById("quiz-result");
  const quizResetBtn = document.getElementById("quiz-reset");

  if (quizForm) {
    const questionCards = quizForm.querySelectorAll(".quiz-question-card");
    const totalQuestions = questionCards.length;

    /**
     * Met à jour l'indicateur de progression du quiz.
     */
    function updateQuizProgress() {
      if (!quizProgress) {
        return;
      }
      let answeredCount = 0;
      questionCards.forEach(function (card) {
        const checkedInput = card.querySelector('input[type="radio"]:checked');
        if (checkedInput) {
          answeredCount += 1;
        }
      });
      quizProgress.textContent =
        "Progression : " + answeredCount + " sur " + totalQuestions + " questions renseignées";
    }

    const allRadios = quizForm.querySelectorAll('input[type="radio"]');
    allRadios.forEach(function (radio) {
      radio.addEventListener("change", updateQuizProgress);
    });

    quizForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Vérifie que les 8 questions ont reçu une réponse
      let unansweredCard = null;
      let answeredCount = 0;

      questionCards.forEach(function (card) {
        const checkedInput = card.querySelector('input[type="radio"]:checked');
        if (checkedInput) {
          answeredCount += 1;
        } else if (!unansweredCard) {
          unansweredCard = card;
        }
      });

      if (answeredCount < totalQuestions) {
        if (quizResult) {
          quizResult.removeAttribute("hidden");
          quizResult.classList.add("is-warning");
          quizResult.innerHTML =
            "<p><strong>Validation incomplète :</strong> vous avez répondu à " +
            answeredCount +
            " question(s) sur " +
            totalQuestions +
            ". Veuillez sélectionner une réponse pour chaque question avant de valider.</p>";
        }
        if (unansweredCard) {
          const firstRadio = unansweredCard.querySelector('input[type="radio"]');
          if (firstRadio) {
            firstRadio.focus();
          }
        }
        return;
      }

      // Calcul exact du score sur 8 et affichage des explications par question
      let correctCount = 0;

      questionCards.forEach(function (card) {
        const checkedInput = card.querySelector('input[type="radio"]:checked');
        const feedbackBox = card.querySelector(".quiz-feedback");
        const statusPrefix = card.querySelector(".quiz-feedback-status");
        const isCorrect = checkedInput && checkedInput.getAttribute("data-correct") === "true";

        card.classList.remove("is-correct", "is-incorrect");
        if (isCorrect) {
          correctCount += 1;
          card.classList.add("is-correct");
          if (statusPrefix) {
            statusPrefix.textContent = "Bonne réponse. ";
          }
        } else {
          card.classList.add("is-incorrect");
          if (statusPrefix) {
            statusPrefix.textContent = "Réponse à corriger. ";
          }
        }

        if (feedbackBox) {
          feedbackBox.removeAttribute("hidden");
        }
      });

      if (quizResult) {
        quizResult.removeAttribute("hidden");
        quizResult.classList.remove("is-warning");
        quizResult.innerHTML =
          "<p><strong>Résultat du quiz : " +
          correctCount +
          " sur " +
          totalQuestions +
          "</strong> - Consultez les explications affichées sous chaque question pour revoir les points clés de la méthode.</p>";
        quizResult.focus();
      }
    });

    if (quizResetBtn) {
      quizResetBtn.addEventListener("click", function () {
        quizForm.reset();
        questionCards.forEach(function (card) {
          card.classList.remove("is-correct", "is-incorrect");
          const feedbackBox = card.querySelector(".quiz-feedback");
          if (feedbackBox) {
            feedbackBox.setAttribute("hidden", "");
          }
        });
        if (quizResult) {
          quizResult.setAttribute("hidden", "");
          quizResult.classList.remove("is-warning");
          quizResult.innerHTML = "";
        }
        updateQuizProgress();
        const firstInput = quizForm.querySelector('input[type="radio"]');
        if (firstInput) {
          firstInput.focus();
        }
      });
    }

    updateQuizProgress();
  }

  // 9. Gestion du lien d'évitement : déplace explicitement le focus sur <main>
  const skipLink = document.querySelector(".skip-link");
  const mainContent = document.getElementById("contenu-principal");

  if (skipLink && mainContent) {
    skipLink.addEventListener("click", function () {
      mainContent.focus();
    });
  }
})();
