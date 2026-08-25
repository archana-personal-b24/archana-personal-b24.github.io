/* An intuitive, animated explanation of how pangenomics distinguishes Kp strains. */
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

  function flowPair(parent, d, stage, markerId, delay) {
    parent.appendChild(make("path", { d: d, class: "kp-path", "marker-end": "url(#" + markerId + ")" }));
    parent.appendChild(make("path", { d: d, class: "kp-flow", "data-stage": stage, style: "--flow-delay:-" + delay + "s" }));
  }

  function bacterium(parent, x, y, variant) {
    var group = make("g", { class: "kp-bacterium", transform: "translate(" + x + " " + y + ")" });
    group.appendChild(make("rect", { x: "-24", y: "-13", width: "48", height: "26", rx: "13", class: "kp-bacterium__capsule" }));
    group.appendChild(make("rect", { x: "-19", y: "-9", width: "38", height: "18", rx: "9", class: "kp-bacterium__body" }));
    group.appendChild(make("path", { d: "M -11 1 C -6 -6, 1 -6, 5 0 C 9 5, 13 4, 14 -2", class: "kp-bacterium__dna" }));
    if (variant % 2 === 0) group.appendChild(make("path", { d: "M 21 -4 Q 31 -11 35 -3 M 21 5 Q 31 10 35 3", class: "kp-bacterium__surface" }));
    parent.appendChild(group);
  }

  function genomeStrip(parent, y, variant) {
    var group = make("g", { class: "kp-genome-strip", transform: "translate(0 " + y + ")" });
    group.appendChild(make("rect", { x: "76", y: "-10", width: "83", height: "20", rx: "4", class: "kp-strip__core" }));
    var patterns = [
      [[164, 22, "resistance"], [190, 17, "surface"], [211, 13, "mobile"]],
      [[164, 14, "surface"], [182, 28, "metabolism"], [214, 10, "mobile"]],
      [[164, 25, "metabolism"], [193, 12, "resistance"], [209, 16, "surface"]]
    ];
    patterns[variant].forEach(function (block) {
      group.appendChild(make("rect", { x: String(block[0]), y: "-10", width: String(block[1]), height: "20", rx: "3", class: "kp-strip__extra kp-strip__extra--" + block[2] }));
    });
    parent.appendChild(group);
  }

  function cluster(parent, x, y, name, selected) {
    var group = make("g", { class: "kp-cluster" + (selected ? " kp-cluster--selected" : ""), transform: "translate(" + x + " " + y + ")" });
    group.appendChild(make("circle", { r: "27", class: "kp-cluster__field" }));
    [[-10, -7], [7, -10], [-7, 9], [11, 7], [0, 0]].forEach(function (point) {
      group.appendChild(make("circle", { cx: String(point[0]), cy: String(point[1]), r: "3", class: "kp-cluster__genome" }));
    });
    label(group, 0, 42, name, "kp-cluster__label");
    parent.appendChild(group);
  }

  function build(figure, instance) {
    var canvas = figure.querySelector(".kp-factorization__canvas");
    var svg = make("svg", { viewBox: "0 0 720 400", role: "img", "aria-labelledby": "kpg-title-" + instance + " kpg-desc-" + instance });
    svg.appendChild(make("title", { id: "kpg-title-" + instance }, "How pangenomics distinguishes Klebsiella pneumoniae strains"));
    svg.appendChild(make("desc", { id: "kpg-desc-" + instance }, "Three Klebsiella strains contain the same core genes but different accessory genes. Separating these two parts confirms the species and reveals strain-specific traits. Recurring accessory-gene patterns across 7,100 genomes define 26 population groups."));

    var markerId = "kpg-arrow-" + instance;
    var defs = make("defs");
    var marker = make("marker", { id: markerId, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "5", markerHeight: "5", orient: "auto" });
    marker.appendChild(make("path", { d: "M 0 0 L 8 4 L 0 8 Z", class: "kp-marker" }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    label(svg, 360, 18, "USE THE PANGENOME TO EXPLAIN WHAT DISTINGUISHES Kp LINEAGES", "kp-genome-kicker");
    svg.appendChild(make("line", { x1: "248", y1: "43", x2: "248", y2: "338", class: "kp-panel-divider" }));
    svg.appendChild(make("line", { x1: "485", y1: "43", x2: "485", y2: "338", class: "kp-panel-divider" }));

    var paths = make("g", { "aria-hidden": "true" });
    flowPair(paths, "M 231 188 L 270 188", "core", markerId, 0.2);
    flowPair(paths, "M 466 188 L 505 188", "groups", markerId, 0.7);
    svg.appendChild(paths);

    var strains = make("g", { class: "kp-strain-comparison", "data-stage-node": "strains" });
    label(strains, 124, 52, "1 · COMPARE THREE STRAINS", "kp-genome-section-label");
    [94, 166, 238].forEach(function (y, index) {
      bacterium(strains, 38, y, index);
      label(strains, 38, y + 27, "Strain " + String.fromCharCode(65 + index), "kp-strain-name");
      genomeStrip(strains, y, index);
    });
    label(strains, 117, 292, "same", "kp-strip-key");
    label(strains, 194, 292, "different", "kp-strip-key");
    strains.appendChild(make("path", { d: "M 77 274 L 158 274", class: "kp-key-line kp-key-line--core" }));
    strains.appendChild(make("path", { d: "M 164 274 L 226 274", class: "kp-key-line kp-key-line--extra" }));
    label(strains, 151, 319, "Same core · different accessory genes", "kp-panel-note");
    svg.appendChild(strains);

    var split = make("g", { class: "kp-genome-split" });
    label(split, 367, 52, "2 · WHAT IS SHARED? WHAT VARIES?", "kp-genome-section-label");
    var core = make("g", { class: "kp-core-summary", "data-stage-node": "core" });
    core.appendChild(make("rect", { x: "285", y: "82", width: "166", height: "72", rx: "5", class: "kp-summary-box" }));
    core.appendChild(make("rect", { x: "302", y: "99", width: "132", height: "17", rx: "4", class: "kp-strip__core" }));
    label(core, 368, 133, "CORE GENES", "kp-summary-title");
    label(core, 368, 145, "shared by the strains · confirms Kp", "kp-summary-note");
    split.appendChild(core);

    var accessory = make("g", { class: "kp-accessory-summary", "data-stage-node": "accessory" });
    accessory.appendChild(make("rect", { x: "285", y: "177", width: "166", height: "125", rx: "5", class: "kp-summary-box" }));
    label(accessory, 368, 201, "ACCESSORY GENES", "kp-summary-title");
    [[302, 218, 43, "resistance", "AMR"], [351, 218, 39, "surface", "capsule"], [396, 218, 38, "mobile", "mobile DNA"], [318, 250, 49, "metabolism", "metabolism"], [373, 250, 45, "surface", "virulence"]].forEach(function (item) {
      accessory.appendChild(make("rect", { x: String(item[0]), y: String(item[1]), width: String(item[2]), height: "18", rx: "3", class: "kp-gene-tag kp-strip__extra--" + item[3] }));
      label(accessory, item[0] + item[2] / 2, item[1] + 12, item[4], "kp-gene-tag__label");
    });
    label(accessory, 368, 287, "their combinations distinguish strains", "kp-summary-note");
    split.appendChild(accessory);
    svg.appendChild(split);

    var groups = make("g", { class: "kp-population-groups", "data-stage-node": "groups" });
    label(groups, 603, 52, "3 · DEFINE POPULATION STRUCTURE", "kp-genome-section-label");
    label(groups, 603, 70, "7,100 genomes → 26 groups", "kp-panel-note");
    cluster(groups, 550, 126, "Group 03", false);
    cluster(groups, 655, 126, "Group 11", true);
    cluster(groups, 550, 222, "Group 18", false);
    cluster(groups, 655, 222, "Group 26", false);
    groups.appendChild(make("circle", { cx: "500", cy: "188", r: "6", class: "kp-strain-point" }));
    label(groups, 603, 286, "+ 22 additional groups", "kp-panel-note");
    label(groups, 603, 315, "Place each genome in a population group", "kp-group-result");
    label(groups, 603, 329, "and identify the genes that define it", "kp-summary-note");
    svg.appendChild(groups);

    var conclusion = make("g", { class: "kp-figure-conclusion", "data-stage-node": "result" });
    conclusion.appendChild(make("rect", { x: "76", y: "353", width: "568", height: "34", rx: "4" }));
    label(conclusion, 360, 375, "26 population groups with interpretable signatures of lineage, resistance and adaptation", "kp-conclusion-label");
    svg.appendChild(conclusion);
    canvas.appendChild(svg);

    var phases = [
      ["strains", "Compare Kp genomes"],
      ["core", "Shared genes confirm the species"],
      ["accessory", "Accessory genes distinguish strains"],
      ["groups", "Recurring patterns reveal 26 groups"],
      ["result", "Each strain gains an interpretable identity"]
    ];
    var phaseIndex = 0;
    var paused = false;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var state = figure.querySelector(".kp-factorization__state");
    var toggle = figure.querySelector(".kp-factorization__toggle");

    function showPhase(phase) {
      figure.dataset.phase = phase[0];
      state.textContent = phase[1];
      figure.querySelectorAll("[data-stage-node]").forEach(function (node) {
        node.classList.toggle("is-active", node.dataset.stageNode === phase[0]);
      });
      figure.querySelectorAll(".kp-flow").forEach(function (path) {
        path.classList.toggle("is-flowing", path.dataset.stage === phase[0]);
      });
    }

    showPhase(reduced ? phases[4] : phases[0]);
    var timer = reduced ? null : window.setInterval(function () {
      if (!paused) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        showPhase(phases[phaseIndex]);
      }
    }, 3500);

    if (reduced) {
      toggle.hidden = true;
      figure.classList.add("is-paused");
    }

    toggle.addEventListener("click", function () {
      paused = !paused;
      figure.classList.toggle("is-paused", paused);
      toggle.textContent = paused ? "Play" : "Pause";
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.setAttribute("aria-label", paused ? "Play genome comparison animation" : "Pause genome comparison animation");
    });

    window.addEventListener("pagehide", function () {
      if (timer) window.clearInterval(timer);
    }, { once: true });
  }

  document.querySelectorAll("[data-kp-factorization]").forEach(function (figure, index) {
    build(figure, index + 1);
  });
})();
