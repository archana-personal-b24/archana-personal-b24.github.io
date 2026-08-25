/* Animated explanation of conserved-target selection and siRNA-mediated ZIKV RNA silencing. */
(function () {
  "use strict";

  var ns = "http://www.w3.org/2000/svg";

  function make(name, attrs, value) {
    var node = document.createElementNS(ns, name);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    if (value) node.textContent = value;
    return node;
  }

  function label(parent, x, y, value, className) {
    parent.appendChild(make("text", { x: x, y: y, class: className }, value));
  }

  function flow(parent, d, stage, markerId, delay) {
    parent.appendChild(make("path", { d: d, class: "zikv-path", "marker-end": "url(#" + markerId + ")" }));
    parent.appendChild(make("path", { d: d, class: "zikv-flow", "data-stage": stage, style: "--flow-delay:-" + delay + "s" }));
  }

  function genome(parent, y, variation) {
    var group = make("g", { class: "zikv-genome-row", transform: "translate(0 " + y + ")" });
    var widths = [[29, 41, 31, 36], [36, 34, 37, 30], [32, 44, 26, 35], [39, 29, 40, 29]][variation];
    var x = 45;
    widths.forEach(function (width, index) {
      group.appendChild(make("rect", { x: String(x), y: "-7", width: String(width), height: "14", rx: "3", class: "zikv-genome-segment zikv-genome-segment--" + (index + 1) }));
      x += width + 4;
      if (index === 1) {
        group.appendChild(make("rect", { x: String(x), y: "-7", width: "34", height: "14", rx: "3", class: "zikv-conserved" }));
        x += 38;
      }
    });
    parent.appendChild(group);
  }

  function candidate(parent, x, y, selected) {
    var group = make("g", { class: "zikv-candidate" + (selected ? " zikv-candidate--selected" : ""), transform: "translate(" + x + " " + y + ")" });
    group.appendChild(make("path", { d: "M -38 0 C -25 -7, -12 7, 0 0 C 12 -7, 25 7, 38 0", class: "zikv-sirna-strand" }));
    [-28, -14, 0, 14, 28].forEach(function (px) {
      group.appendChild(make("circle", { cx: String(px), cy: String(Math.sin(px / 9) * 4), r: "2", class: "zikv-sirna-base" }));
    });
    parent.appendChild(group);
    return group;
  }

  function build(figure, instance) {
    var canvas = figure.querySelector(".zikv-sirna__canvas");
    var svg = make("svg", { viewBox: "0 0 680 420", role: "img", "aria-labelledby": "zikv-title-" + instance + " zikv-desc-" + instance });
    svg.appendChild(make("title", { id: "zikv-title-" + instance }, "From a conserved Zika virus sequence to a candidate siRNA"));
    svg.appendChild(make("desc", { id: "zikv-desc-" + instance }, "Zika virus genomes are aligned to find a conserved sequence. Candidate small interfering RNAs are designed and screened against that target. A selected candidate pairs with complementary viral RNA inside the RNA-induced silencing complex and directs cleavage, producing a computational candidate for experimental validation."));

    var markerId = "zikv-arrow-" + instance;
    var defs = make("defs");
    var marker = make("marker", { id: markerId, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "5", markerHeight: "5", orient: "auto" });
    marker.appendChild(make("path", { d: "M 0 0 L 8 4 L 0 8 Z", class: "zikv-marker" }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    label(svg, 340, 18, "TARGET WHAT ZIKV CONSERVES TO DESIGN A STRAIN-RESILIENT siRNA", "zikv-kicker");
    svg.appendChild(make("line", { x1: "235", y1: "43", x2: "235", y2: "342", class: "zikv-divider" }));
    svg.appendChild(make("line", { x1: "442", y1: "43", x2: "442", y2: "342", class: "zikv-divider" }));

    var routes = make("g", { "aria-hidden": "true" });
    flow(routes, "M 216 188 L 256 188", "design", markerId, 0.1);
    flow(routes, "M 421 188 L 461 188", "bind", markerId, 0.6);
    svg.appendChild(routes);

    var alignment = make("g", { class: "zikv-alignment", "data-stage-node": "conserved" });
    label(alignment, 126, 54, "1 · FIND A CONSERVED TARGET", "zikv-section-label");
    label(alignment, 126, 75, "ZIKV genomes from different strains", "zikv-note");
    [108, 145, 182, 219].forEach(function (y, index) {
      label(alignment, 25, y + 3, "Z" + (index + 1), "zikv-row-label");
      genome(alignment, y, index);
    });
    alignment.appendChild(make("path", { d: "M 116 88 L 116 238 M 109 88 L 123 88 M 109 238 L 123 238", class: "zikv-conserved-bracket" }));
    label(alignment, 126, 260, "same sequence across strains", "zikv-conserved-label");
    label(alignment, 126, 292, "A stable target is less likely to be lost", "zikv-panel-result");
    label(alignment, 126, 307, "as viral sequences vary", "zikv-note");
    svg.appendChild(alignment);

    var design = make("g", { class: "zikv-design", "data-stage-node": "design" });
    label(design, 339, 54, "2 · DESIGN AND SCREEN", "zikv-section-label");
    label(design, 339, 75, "Complementary siRNA candidates", "zikv-note");
    candidate(design, 339, 116, false);
    candidate(design, 339, 158, false);
    candidate(design, 339, 204, true);
    design.appendChild(make("path", { d: "M 282 226 L 396 226", class: "zikv-selected-line" }));
    label(design, 339, 247, "selected candidate", "zikv-selected-label");
    design.appendChild(make("rect", { x: "272", y: "267", width: "61", height: "21", rx: "3", class: "zikv-screen-tag" }));
    design.appendChild(make("rect", { x: "340", y: "267", width: "66", height: "21", rx: "3", class: "zikv-screen-tag" }));
    label(design, 302.5, 281, "activity", "zikv-screen-label");
    label(design, 373, 281, "specificity", "zikv-screen-label");
    label(design, 339, 307, "Computational screening narrows the candidates", "zikv-note");
    svg.appendChild(design);

    var silencing = make("g", { class: "zikv-silencing" });
    label(silencing, 561, 54, "3 · SILENCE THE VIRAL RNA", "zikv-section-label");
    label(silencing, 561, 75, "RNA-induced silencing complex (RISC)", "zikv-note");
    var bind = make("g", { class: "zikv-binding", "data-stage-node": "bind" });
    bind.appendChild(make("circle", { cx: "561", cy: "181", r: "64", class: "zikv-risc" }));
    label(bind, 561, 126, "RISC", "zikv-risc-label");
    bind.appendChild(make("path", { d: "M 476 181 C 500 174, 522 188, 546 181", class: "zikv-viral-rna zikv-viral-rna--left" }));
    bind.appendChild(make("path", { d: "M 576 181 C 600 174, 622 188, 646 181", class: "zikv-viral-rna zikv-viral-rna--right" }));
    bind.appendChild(make("path", { d: "M 536 195 C 545 188, 554 202, 562 195 C 571 188, 580 202, 589 195", class: "zikv-bound-sirna" }));
    [-18, -9, 0, 9, 18].forEach(function (offset) {
      bind.appendChild(make("line", { x1: String(562 + offset), y1: "187", x2: String(562 + offset), y2: "194", class: "zikv-base-pair" }));
    });
    label(bind, 561, 226, "siRNA pairs with its matching target", "zikv-binding-label");
    silencing.appendChild(bind);

    var cleave = make("g", { class: "zikv-cleavage", "data-stage-node": "cleave" });
    cleave.appendChild(make("path", { d: "M 552 174 L 570 190 M 570 174 L 552 190", class: "zikv-cleavage-mark" }));
    label(cleave, 561, 262, "viral RNA is directed for cleavage", "zikv-cleavage-label");
    label(cleave, 561, 292, "Less intact RNA remains available", "zikv-panel-result");
    label(cleave, 561, 307, "for viral protein production", "zikv-note");
    silencing.appendChild(cleave);
    svg.appendChild(silencing);

    var result = make("g", { class: "zikv-result", "data-stage-node": "result" });
    result.appendChild(make("rect", { x: "80", y: "358", width: "520", height: "40", rx: "4" }));
    label(result, 340, 383, "A reproducible route from viral genomes to siRNA candidates for laboratory validation", "zikv-result-label");
    svg.appendChild(result);
    canvas.appendChild(svg);

    var phases = [
      ["conserved", "Find a conserved ZIKV target"],
      ["design", "Design and screen candidate siRNAs"],
      ["bind", "Pair the siRNA with viral RNA"],
      ["cleave", "Direct the matching RNA for cleavage"],
      ["result", "Prioritize a candidate for validation"]
    ];
    var phaseIndex = 0;
    var paused = false;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var state = figure.querySelector(".zikv-sirna__state");
    var toggle = figure.querySelector(".zikv-sirna__toggle");

    function showPhase(phase) {
      figure.dataset.phase = phase[0];
      state.textContent = phase[1];
      figure.querySelectorAll("[data-stage-node]").forEach(function (node) {
        node.classList.toggle("is-active", node.dataset.stageNode === phase[0]);
      });
      figure.querySelectorAll(".zikv-flow").forEach(function (path) {
        path.classList.toggle("is-flowing", path.dataset.stage === phase[0]);
      });
    }

    showPhase(reduced ? phases[4] : phases[0]);
    var timer = reduced ? null : window.setInterval(function () {
      if (!paused) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        showPhase(phases[phaseIndex]);
      }
    }, 3600);

    if (reduced) {
      toggle.hidden = true;
      figure.classList.add("is-paused");
    }

    toggle.addEventListener("click", function () {
      paused = !paused;
      figure.classList.toggle("is-paused", paused);
      toggle.textContent = paused ? "Play" : "Pause";
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.setAttribute("aria-label", paused ? "Play siRNA design animation" : "Pause siRNA design animation");
    });

    window.addEventListener("pagehide", function () {
      if (timer) window.clearInterval(timer);
    }, { once: true });
  }

  document.querySelectorAll("[data-zikv-sirna]").forEach(function (figure, index) {
    build(figure, index + 1);
  });
})();
