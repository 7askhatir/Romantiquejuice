/* =============================================================================
   ROMANTIC JUICE — FRONTEND LOGIC
   Reads window.RJ_CONFIG (data/site.js), renders menu + gallery and wires up
   navigation, lightbox and all WhatsApp / Maps / social links.
   ========================================================================== */

document.documentElement.classList.add("js");

(function () {
  "use strict";

  var CFG = window.RJ_CONFIG || {};
  var BRAND = CFG.brand || {};
  var CONTACT = CFG.contact || {};
  var IMAGES = CFG.images || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function resolveImage(key) { return key ? (IMAGES[key] || key) : ""; }

  function buildWhatsappUrl(phone, message) {
    var digits = String(phone || "").replace(/\D/g, "");
    var text = encodeURIComponent(message || "");
    // No phone configured: open WhatsApp with the message and let the customer
    // choose the contact. A number is never invented.
    return digits ? "https://wa.me/" + digits + "?text=" + text : "https://wa.me/?text=" + text;
  }

  /* --------------------------- BRAND + CONTACT --------------------------- */
  function applyBrand() {
    if (BRAND.heroTitle) $("#heroTagline").textContent = BRAND.heroTitle;
    if (BRAND.heroText) $("#heroText").textContent = BRAND.heroText;
    if (BRAND.slogan) $("#heroSlogan").textContent = BRAND.slogan;

    var hero = $("#heroImage");
    if (CFG.shopPhoto) {
      hero.src = CFG.shopPhoto;
      hero.alt = "Romantic Juice – Chez Hamza shop in " +
        (BRAND.city || "Essaouira") + ", " + (BRAND.country || "Morocco");
      $("#home").style.setProperty("--hero-photo", 'url("' + CFG.shopPhoto + '")');
    }
  }

  function applyContact() {
    var waUrl = buildWhatsappUrl(CONTACT.whatsappPhone, CONTACT.whatsappMessage);
    $$("[data-whatsapp]").forEach(function (el) { el.href = waUrl; });
    if (CONTACT.mapLink) $("#mapButton").href = CONTACT.mapLink;

    var address = [CONTACT.addressLine1, CONTACT.addressLine2].filter(Boolean).join(", ");
    if (address) $("#contactAddress").textContent = address;

    var hours = Array.isArray(CONTACT.hours) ? CONTACT.hours : [];
    var withTime = hours.filter(function (h) { return h && h.time; });
    $("#contactHours").textContent = withTime.length
      ? withTime.map(function (h) { return h.days + " · " + h.time; }).join("   ")
      : "To be confirmed";

    setSocial("instagramLink", "footerInstagram", CONTACT.instagram, "Instagram");
    setSocial("facebookLink", "footerFacebook", CONTACT.facebook, "Facebook");
  }

  function setSocial(mainId, footerId, url, label) {
    var targets = [$("#" + mainId), $("#" + footerId)].filter(Boolean);
    var valid = typeof url === "string" && /^https?:\/\//i.test(url.trim());
    targets.forEach(function (el) {
      if (valid) {
        el.href = url.trim();
        el.classList.remove("is-empty");
        el.removeAttribute("aria-disabled");
      } else {
        el.href = "#";
        el.classList.add("is-empty");
        el.setAttribute("aria-disabled", "true");
        el.setAttribute("aria-label", label + " — link to be added by the owner");
        el.addEventListener("click", function (e) { e.preventDefault(); });
      }
    });
  }

  /* -------------------------------- MENU --------------------------------- */
  function renderMenu() {
    var mount = $("#menuGrid");
    if (!mount) return;
    var categories = Array.isArray(CFG.menu) ? CFG.menu : [];

    if (!categories.length) {
      mount.innerHTML = '<p class="menu-empty">Menu coming soon.</p>';
      return;
    }

    mount.innerHTML = categories.map(function (cat) {
      var items = Array.isArray(cat.items) ? cat.items : [];
      var itemsHtml = items.map(function (item) {
        var img = resolveImage(item.image);
        var rawPrice = item.price;
        var hasPrice = rawPrice !== "" && rawPrice != null;
        var priceText = hasPrice
          ? esc(rawPrice) + (/^\d+(\.\d+)?$/.test(String(rawPrice).trim()) ? " DH" : "")
          : "XX DH";
        var priceClass = hasPrice ? "menu-price" : "menu-price menu-price--tbd";

        return '<div class="menu-item' + (img ? "" : " menu-item--plain") + '">' +
          (img ? '<img class="menu-item-img" src="' + esc(img) + '" alt="" loading="lazy" decoding="async">' : "") +
          '<div class="menu-item-body">' +
            '<div class="menu-item-head">' +
              '<h4 class="menu-item-name">' + esc(item.name) +
                (item.nameFr ? '<span class="menu-item-fr">' + esc(item.nameFr) + '</span>' : "") +
              '</h4>' +
              '<span class="menu-dots" aria-hidden="true"></span>' +
              '<span class="' + priceClass + '" aria-label="' + (hasPrice ? esc(priceText) : "Price to be confirmed") + '">' + priceText + '</span>' +
            '</div>' +
            (item.description ? '<p class="menu-item-desc">' + esc(item.description) + '</p>' : "") +
          '</div>' +
        '</div>';
      }).join("");

      return '<article class="menu-card" id="' + esc(cat.id || "") + '">' +
        '<div class="menu-card-head">' +
          (cat.number ? '<span class="menu-card-number">' + esc(cat.number) + '</span>' : "") +
          '<h3 class="menu-card-title">' + esc(cat.name) + '</h3>' +
          (cat.nameFr ? '<span class="menu-card-fr">' + esc(cat.nameFr) + '</span>' : "") +
          (cat.note ? '<p class="menu-card-note">' + esc(cat.note) + '</p>' : "") +
        '</div>' +
        '<div class="menu-items">' + itemsHtml + '</div>' +
      '</article>';
    }).join("");
  }

  /* ------------------------------- GALLERY ------------------------------- */
  var galleryData = [];

  function renderGallery() {
    var mount = $("#galleryGrid");
    if (!mount) return;
    var items = Array.isArray(CFG.gallery) ? CFG.gallery : [];

    if (!items.length) {
      mount.innerHTML = '<p class="gallery-empty">Photos coming soon.</p>';
      return;
    }

    galleryData = items.map(function (item) {
      return { src: resolveImage(item.image), title: item.title || "", tag: item.tag || "", size: item.size || "" };
    }).filter(function (item) { return !!item.src; });

    mount.innerHTML = galleryData.map(function (item, index) {
      return '<button class="gallery-item' + (item.size ? " gallery-item--" + esc(item.size) : "") +
        '" type="button" data-gallery-index="' + index + '" aria-label="Open photo: ' + esc(item.title) + '">' +
        '<img src="' + esc(item.src) + '" alt="' + esc(item.title) + '" loading="lazy" decoding="async">' +
        '<span class="gallery-zoom" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5M10.5 7.8v5.4M7.8 10.5h5.4"/></svg></span>' +
        '<span class="gallery-caption">' +
          (item.tag ? '<span class="gallery-tag">' + esc(item.tag) + '</span>' : "") +
          '<span class="gallery-title">' + esc(item.title) + '</span>' +
        '</span>' +
      '</button>';
    }).join("");

    $$(".gallery-item", mount).forEach(function (btn) {
      btn.addEventListener("click", function () {
        openLightbox(parseInt(btn.getAttribute("data-gallery-index"), 10));
      });
    });
  }

  /* ------------------------------ LIGHTBOX ------------------------------- */
  var lightbox = $("#lightbox");
  var lightboxImg = $("#lightboxImage");
  var lightboxCaption = $("#lightboxCaption");
  var lightboxCounter = $("#lightboxCounter");
  var currentIndex = 0;
  var lastFocused = null;

  function showSlide(index) {
    if (!galleryData.length) return;
    currentIndex = (index + galleryData.length) % galleryData.length;
    var item = galleryData[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxCaption.textContent = item.tag ? item.tag + " — " + item.title : item.title;
    lightboxCounter.textContent = (currentIndex + 1) + " / " + galleryData.length;
  }

  function openLightbox(index) {
    if (!lightbox || !galleryData.length) return;
    lastFocused = document.activeElement;
    showSlide(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    $(".lightbox-close", lightbox).focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function initLightbox() {
    if (!lightbox) return;
    $$("[data-lightbox-close]", lightbox).forEach(function (el) { el.addEventListener("click", closeLightbox); });
    $("#lightboxPrev").addEventListener("click", function () { showSlide(currentIndex - 1); });
    $("#lightboxNext").addEventListener("click", function () { showSlide(currentIndex + 1); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showSlide(currentIndex - 1);
      else if (e.key === "ArrowRight") showSlide(currentIndex + 1);
    });
  }

  /* ------------------------------- NAVIGATION ---------------------------- */
  function initNav() {
    var header = $(".site-header");
    var toggle = $("#menuToggle");
    var nav = $("#primaryNav");

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    $$(".nav-link", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });

    document.addEventListener("click", function (e) {
      if (!header.contains(e.target) && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 12); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var sections = ["home", "gallery", "menu", "contact"]
      .map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          $$(".nav-link").forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      }, { rootMargin: "-42% 0px -50% 0px", threshold: 0 });
      sections.forEach(function (section) { observer.observe(section); });
    }
  }

  /* ---------------------------- REVEAL ON SCROLL ------------------------- */
  function initReveal() {
    var targets = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { observer.observe(el); });
  }

  /* --------------------------------- BOOT -------------------------------- */
  function init() {
    applyBrand();
    applyContact();
    renderMenu();
    renderGallery();
    initLightbox();
    initNav();
    initReveal();

    $("#menuNote").textContent = CFG.menuNote || "A preview of our flavours — selection and prices confirmed at the counter.";
    $("#copyrightYear").textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
