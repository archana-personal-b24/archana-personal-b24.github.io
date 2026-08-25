/* Context-first explanation of single-cell and spatial transcriptomics integration. */
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

  function cell(parent, x, y, type, radius) {
    parent.appendChild(make("circle", { cx: x, cy: y, r: radius || 5, class: "lung-cell lung-cell--" + type }));
  }

  function spot(parent, x, y, type) {
    parent.appendChild(make("circle", { cx: x, cy: y, r: 5.5, class: "lung-spot" + (type ? " lung-spot--" + type : "") }));
  }

  function arrow(parent, d, markerId, stage, delay) {
    parent.appendChild(make("path", { d: d, class: "lung-arrow", "marker-end": "url(#" + markerId + ")" }));
    parent.appendChild(make("path", { d: d, class: "lung-arrow-flow", "data-flow-stage": stage, style: "--flow-delay:-" + delay + "s" }));
  }

  function build(figure, instance) {
    var canvas = figure.querySelector(".lung-spatial__canvas");
    var svg = make("svg", { viewBox: "0 0 760 440", role: "img", "aria-labelledby": "lung-title-" + instance + " lung-desc-" + instance });
    svg.appendChild(make("title", { id: "lung-title-" + instance }, "Why single-cell and spatial transcriptomics are integrated in squamous lung cancer"));
    svg.appendChild(make("desc", { id: "lung-desc-" + instance }, "Single-cell RNA sequencing identifies immune, epithelial and stromal populations but loses their tissue positions. Spatial transcriptomics preserves location but each spot can contain mixed cell signals. Matching 18,381 single-cell profiles to 3,858 Visium spots across 1,432 shared genes places predicted cell identities back into the tumor and enables analysis of neighborhoods, signaling and disease pathways."));

    var markerId = "lung-arrowhead-" + instance;
    var defs = make("defs");
    var marker = make("marker", { id: markerId, viewBox: "0 0 8 8", refX: "7", refY: "4", markerWidth: "5", markerHeight: "5", orient: "auto" });
    marker.appendChild(make("path", { d: "M 0 0 L 8 4 L 0 8 Z", class: "lung-arrowhead" }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    label(svg, 380, 18, "INTEGRATE CELL IDENTITY + LOCATION TO EXPLAIN TUMOR ORGANIZATION", "lung-kicker");
    svg.appendChild(make("line", { x1: "267", y1: "42", x2: "267", y2: "360", class: "lung-divider" }));
    svg.appendChild(make("line", { x1: "497", y1: "42", x2: "497", y2: "360", class: "lung-divider" }));

    var flows = make("g", { "aria-hidden": "true" });
    arrow(flows, "M 249 185 C 270 185, 277 160, 294 160", markerId, "integration", 0.15);
    arrow(flows, "M 249 245 C 270 245, 277 218, 294 218", markerId, "integration", 0.55);
    arrow(flows, "M 475 196 L 515 196", markerId, "mapping", 0.9);
    svg.appendChild(flows);

    var sources = make("g", { class: "lung-sources", "data-stage-node": "sources" });
    label(sources, 134, 54, "1 · WHY COMBINE THE DATA?", "lung-section-label");

    var singleCell = make("g", { class: "lung-source-view lung-source-view--single" });
    label(singleCell, 72, 82, "SINGLE-CELL RNA-SEQ", "lung-source-heading");
    label(singleCell, 72, 99, "CELLULAR IDENTITY", "lung-question-label");
    singleCell.appendChild(make("path", { d: "M 27 143 C 29 113, 59 111, 73 129 C 91 107, 119 120, 117 150 C 118 177, 87 187, 72 169 C 53 187, 25 171, 27 143 Z", class: "lung-umap-field" }));
    [[42,136,"immune"],[51,126,"immune"],[55,149,"immune"],[47,160,"immune"],
      [78,130,"epithelial"],[91,122,"epithelial"],[101,139,"epithelial"],[91,151,"epithelial"],
      [66,158,"stromal"],[78,171,"stromal"],[99,165,"stromal"]].forEach(function (p) { cell(singleCell, p[0], p[1], p[2], 4.5); });
    label(singleCell, 72, 203, "Cell identity retained", "lung-kept-label");
    label(singleCell, 72, 219, "Tissue location lost", "lung-lost-label");
    sources.appendChild(singleCell);

    var spatial = make("g", { class: "lung-source-view lung-source-view--spatial" });
    label(spatial, 196, 82, "SPATIAL RNA-SEQ", "lung-source-heading");
    label(spatial, 196, 99, "SPATIAL CONTEXT", "lung-question-label");
    spatial.appendChild(make("path", { d: "M 157 119 C 176 106, 207 110, 222 125 C 239 143, 237 169, 222 184 C 207 198, 173 193, 159 177 C 145 160, 144 135, 157 119 Z", class: "lung-mini-tissue" }));
    [[166,129],[184,124],[203,127],[220,139],[161,147],[181,145],[201,148],[222,159],[166,167],[187,165],[207,169],[214,184]].forEach(function (p) { spot(spatial, p[0], p[1], null); });
    label(spatial, 196, 203, "Tissue location retained", "lung-kept-label");
    label(spatial, 196, 219, "Nearby cell signals mixed", "lung-lost-label");
    sources.appendChild(spatial);

    label(sources, 134, 261, "Each dataset answers only half", "lung-panel-result");
    label(sources, 134, 277, "of the biological question", "lung-panel-result");
    var sourceLegend = [[54,"immune","immune"],[132,"epithelial","epithelial"],[213,"stromal","stromal"]];
    sourceLegend.forEach(function (item) {
      cell(sources, item[0] - 24, 311, item[1], 4);
      label(sources, item[0], 314, item[2], "lung-legend-label");
    });
    svg.appendChild(sources);

    var integration = make("g", { class: "lung-integration", "data-stage-node": "integration" });
    label(integration, 382, 54, "2 · CONNECT CELLS TO SPATIAL SPOTS", "lung-section-label");
    label(integration, 382, 78, "Align profiles across 1,432 shared genes", "lung-note");

    integration.appendChild(make("rect", { x: "301", y: "104", width: "162", height: "40", rx: "4", class: "lung-input-band lung-input-band--reference" }));
    label(integration, 382, 121, "18,381 single cells", "lung-band-value");
    label(integration, 382, 136, "cell-type reference", "lung-band-note");

    var matrix = make("g", { class: "lung-gene-matrix" });
    var strengths = [[.25,.82,.48,.18,.68],[.76,.22,.88,.42,.3],[.18,.54,.28,.91,.61]];
    strengths.forEach(function (row, r) {
      row.forEach(function (strength, c) {
        matrix.appendChild(make("rect", { x: String(327 + c * 22), y: String(158 + r * 22), width: "17", height: "17", rx: "2", class: "lung-gene-cell lung-gene-cell--" + (r + 1), style: "--gene-strength:" + strength }));
      });
    });
    integration.appendChild(matrix);
    label(integration, 382, 241, "1,432 shared genes", "lung-shared-label");

    integration.appendChild(make("rect", { x: "301", y: "260", width: "162", height: "40", rx: "4", class: "lung-input-band lung-input-band--query" }));
    label(integration, 382, 277, "3,858 Visium spots", "lung-band-value");
    label(integration, 382, 292, "spatial query", "lung-band-note");
    label(integration, 382, 326, "Label transfer estimates which cell types", "lung-panel-result");
    label(integration, 382, 342, "contribute to every spatial spot", "lung-panel-result");
    svg.appendChild(integration);

    var tissue = make("g", { class: "lung-tissue" });
    label(tissue, 628, 54, "3 · MAP IDENTITY TO LOCATION", "lung-section-label");
    label(tissue, 628, 78, "Cell identities return to tissue context", "lung-note");
    tissue.appendChild(make("path", { d: "M 545 107 C 576 88, 628 94, 658 109 C 693 127, 711 162, 697 203 C 688 232, 704 265, 675 294 C 642 326, 574 312, 548 284 C 519 254, 534 222, 523 190 C 512 155, 520 124, 545 107 Z", class: "lung-tissue-shape" }));
    var coordinates = [
      [554,128,"immune"],[579,117,"immune"],[605,119,"epithelial"],[633,125,"epithelial"],[663,140,"epithelial"],
      [542,153,"immune"],[570,148,"immune"],[599,150,"epithelial"],[629,155,"epithelial"],[674,168,"epithelial"],
      [543,183,"immune"],[573,178,"immune"],[603,183,"stromal"],[633,185,"stromal"],[678,198,"epithelial"],
      [553,214,"immune"],[583,209,"stromal"],[613,216,"stromal"],[644,220,"stromal"],[678,227,"stromal"],
      [561,245,"immune"],[590,246,"immune"],[621,252,"stromal"],[655,254,"stromal"],
      [577,277,"immune"],[607,282,"stromal"],[640,284,"stromal"]
    ];
    coordinates.forEach(function (p) { spot(tissue, p[0], p[1], null); });
    var mapped = make("g", { class: "lung-mapped-spots", "data-stage-node": "mapping" });
    coordinates.forEach(function (p) { spot(mapped, p[0], p[1], p[2]); });
    tissue.appendChild(mapped);

    var biology = make("g", { class: "lung-biology", "data-stage-node": "biology" });
    biology.appendChild(make("path", { d: "M 570 148 C 584 132, 613 134, 629 155", class: "lung-signal lung-signal--one" }));
    biology.appendChild(make("path", { d: "M 573 178 C 589 203, 600 204, 613 216", class: "lung-signal lung-signal--two" }));
    biology.appendChild(make("path", { d: "M 633 185 C 654 188, 669 203, 678 227", class: "lung-signal lung-signal--three" }));
    label(biology, 558, 334, "NEIGHBORHOODS", "lung-biology-label");
    label(biology, 628, 334, "SIGNALING", "lung-biology-label");
    label(biology, 697, 334, "PATHWAYS", "lung-biology-label");
    tissue.appendChild(biology);
    svg.appendChild(tissue);

    var result = make("g", { class: "lung-result", "data-stage-node": "result" });
    result.appendChild(make("rect", { x: "78", y: "377", width: "604", height: "42", rx: "4" }));
    label(result, 380, 394, "CELL IDENTITY IN TISSUE · SPATIALLY PLAUSIBLE INTERACTIONS", "lung-result-label");
    label(result, 380, 410, "Reveal how tumor cell states are organized, interact and change across progression", "lung-result-note");
    svg.appendChild(result);
    canvas.appendChild(svg);

    var phases = [
      ["sources", "Two datasets answer different questions"],
      ["integration", "Match profiles through 1,432 shared genes"],
      ["mapping", "Return predicted cell identities to tissue"],
      ["biology", "Study neighborhoods, signaling and pathways"],
      ["result", "Interpret the tumor as a spatial system"]
    ];
    var phaseIndex = 0;
    var paused = false;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var state = figure.querySelector(".lung-spatial__state");
    var toggle = figure.querySelector(".lung-spatial__toggle");

    function showPhase(phase) {
      figure.dataset.phase = phase[0];
      state.textContent = phase[1];
      figure.querySelectorAll("[data-stage-node]").forEach(function (item) {
        item.classList.toggle("is-active", item.dataset.stageNode === phase[0]);
      });
      figure.querySelectorAll("[data-flow-stage]").forEach(function (item) {
        item.classList.toggle("is-active", item.dataset.flowStage === phase[0]);
      });
    }

    showPhase(reduced ? phases[4] : phases[0]);
    var timer = reduced ? null : window.setInterval(function () {
      if (!paused) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        showPhase(phases[phaseIndex]);
      }
    }, 3800);

    if (reduced) {
      toggle.hidden = true;
      figure.classList.add("is-paused");
    }

    toggle.addEventListener("click", function () {
      paused = !paused;
      figure.classList.toggle("is-paused", paused);
      toggle.textContent = paused ? "Play" : "Pause";
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.setAttribute("aria-label", paused ? "Play spatial integration animation" : "Pause spatial integration animation");
    });

    window.addEventListener("pagehide", function () {
      if (timer) window.clearInterval(timer);
    }, { once: true });
  }

  document.querySelectorAll("[data-lung-spatial]").forEach(function (figure, index) {
    build(figure, index + 1);
  });
})();
