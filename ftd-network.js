/* Animated explanation of network pharmacology for frontotemporal dementia. */
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

  function edge(parent, x1, y1, x2, y2, className, stage, delay) {
    parent.appendChild(make("line", {
      x1: x1, y1: y1, x2: x2, y2: y2,
      class: "ftd-edge " + className,
      "data-edge-stage": stage,
      style: "--edge-delay:" + delay + "s"
    }));
  }

  function node(parent, x, y, radius, value, className) {
    var group = make("g", { class: "ftd-node " + className, transform: "translate(" + x + " " + y + ")" });
    group.appendChild(make("circle", { r: radius }));
    label(group, 0, 3, value, "ftd-node-label");
    parent.appendChild(group);
    return group;
  }

  function build(figure, instance) {
    var canvas = figure.querySelector(".ftd-network__canvas");
    var svg = make("svg", { viewBox: "0 0 680 420", role: "img", "aria-labelledby": "ftd-title-" + instance + " ftd-desc-" + instance });
    svg.appendChild(make("title", { id: "ftd-title-" + instance }, "How network pharmacology connects FTD genes, drug targets and medication interactions"));
    svg.appendChild(make("desc", { id: "ftd-desc-" + instance }, "The analysis connects seven frontotemporal dementia susceptibility genes, eighty-seven drug targets and fifty-five medications. Network structure identifies APP as a biological bridge and memantine and quetiapine as major drug-target hubs. Tissue context and drug-drug connections then distinguish biological hypotheses from medication combinations that warrant caution."));

    label(svg, 340, 18, "CONNECT DISEASE BIOLOGY + MEDICATIONS TO REVEAL FTD PRIORITIES AND RISKS", "ftd-kicker");
    svg.appendChild(make("line", { x1: "208", y1: "43", x2: "208", y2: "338", class: "ftd-divider" }));
    svg.appendChild(make("line", { x1: "474", y1: "43", x2: "474", y2: "338", class: "ftd-divider" }));

    var inputs = make("g", { class: "ftd-inputs", "data-stage-node": "inputs" });
    label(inputs, 104, 54, "1 · CONNECT THE EVIDENCE", "ftd-section-label");
    label(inputs, 104, 76, "Three layers describe the same system", "ftd-note");
    inputs.appendChild(make("rect", { x: "30", y: "99", width: "148", height: "54", rx: "5", class: "ftd-input-box ftd-input-box--genes" }));
    label(inputs, 104, 120, "7 FTD genes", "ftd-input-value");
    label(inputs, 104, 138, "disease susceptibility", "ftd-note");
    inputs.appendChild(make("rect", { x: "30", y: "169", width: "148", height: "54", rx: "5", class: "ftd-input-box ftd-input-box--targets" }));
    label(inputs, 104, 190, "87 protein targets", "ftd-input-value");
    label(inputs, 104, 208, "where medications act", "ftd-note");
    inputs.appendChild(make("rect", { x: "30", y: "239", width: "148", height: "54", rx: "5", class: "ftd-input-box ftd-input-box--drugs" }));
    label(inputs, 104, 260, "55 medications", "ftd-input-value");
    label(inputs, 104, 278, "used or studied in FTD", "ftd-note");
    label(inputs, 104, 320, "Networks reveal how these layers overlap", "ftd-panel-result");
    svg.appendChild(inputs);

    var network = make("g", { class: "ftd-hub-network" });
    label(network, 341, 54, "2 · FIND THE IMPORTANT BRIDGES", "ftd-section-label");
    label(network, 341, 76, "More connected nodes influence more of the system", "ftd-note");

    var edges = make("g", { class: "ftd-edges", "aria-hidden": "true" });
    [[272,120,341,174],[254,184,341,174],[270,248,341,174],[409,120,341,174],[428,190,341,174],
      [341,174,300,282],[341,174,392,282],[272,120,409,120],[254,184,428,190],
      [300,282,392,282],[254,184,392,282],[428,190,300,282]].forEach(function (p, index) {
      edge(edges, p[0], p[1], p[2], p[3], index < 7 ? "ftd-edge--biological" : "ftd-edge--secondary", "hubs", index * 0.09);
    });
    network.appendChild(edges);
    var hubs = make("g", { "data-stage-node": "hubs" });
    node(hubs, 272, 120, 20, "MAPT", "ftd-node--gene");
    node(hubs, 254, 184, 18, "GRN", "ftd-node--gene");
    node(hubs, 270, 248, 23, "C9orf72", "ftd-node--gene");
    node(hubs, 409, 120, 19, "VCP", "ftd-node--gene");
    node(hubs, 428, 190, 18, "DRD2", "ftd-node--target");
    node(hubs, 341, 174, 34, "APP", "ftd-node--bridge");
    node(hubs, 300, 282, 28, "Memantine", "ftd-node--drug");
    node(hubs, 392, 282, 30, "Quetiapine", "ftd-node--drug");
    label(hubs, 341, 222, "most connected biological bridge", "ftd-bridge-label");
    network.appendChild(hubs);
    label(network, 341, 322, "APP 31 · memantine 29 · quetiapine 26 connections", "ftd-hub-counts");
    label(network, 341, 337, "404 observed interactions · 55 expected", "ftd-panel-result");
    svg.appendChild(network);

    var context = make("g", { class: "ftd-context" });
    label(context, 577, 54, "3 · INTERPRET THE CONNECTIONS", "ftd-section-label");
    label(context, 577, 76, "A connection can inform benefit or caution", "ftd-note");

    var tissue = make("g", { class: "ftd-context-lane ftd-context-lane--tissue", "data-stage-node": "tissue" });
    tissue.appendChild(make("rect", { x: "498", y: "99", width: "158", height: "89", rx: "5" }));
    label(tissue, 577, 122, "TISSUE CONTEXT", "ftd-context-title");
    tissue.appendChild(make("path", { d: "M 527 154 C 527 132, 557 132, 557 154 C 557 176, 527 176, 527 154 M 597 143 C 610 132, 628 143, 624 158 C 620 174, 596 173, 591 158 C 587 150, 591 146, 597 143", class: "ftd-tissue-icon" }));
    label(tissue, 577, 179, "Where are the targets active?", "ftd-context-note");
    context.appendChild(tissue);

    var interactions = make("g", { class: "ftd-context-lane ftd-context-lane--interactions", "data-stage-node": "interactions" });
    interactions.appendChild(make("rect", { x: "498", y: "207", width: "158", height: "86", rx: "5" }));
    label(interactions, 577, 230, "DRUG COMBINATIONS", "ftd-context-title");
    interactions.appendChild(make("circle", { cx: "544", cy: "258", r: "14", class: "ftd-drug-dot" }));
    interactions.appendChild(make("circle", { cx: "610", cy: "258", r: "14", class: "ftd-drug-dot ftd-drug-dot--caution" }));
    interactions.appendChild(make("path", { d: "M 559 258 L 595 258", class: "ftd-interaction-link" }));
    label(interactions, 544, 261, "A", "ftd-drug-label");
    label(interactions, 610, 261, "B", "ftd-drug-label");
    label(interactions, 577, 284, "Which pairs warrant caution?", "ftd-context-note");
    context.appendChild(interactions);
    label(context, 577, 320, "Context turns connectivity into testable priorities", "ftd-panel-result");
    svg.appendChild(context);

    var result = make("g", { class: "ftd-result", "data-stage-node": "result" });
    result.appendChild(make("rect", { x: "68", y: "357", width: "544", height: "40", rx: "4" }));
    label(result, 340, 382, "Prioritize biological targets · flag polypharmacy risks for closer evaluation", "ftd-result-label");
    svg.appendChild(result);
    canvas.appendChild(svg);

    var phases = [
      ["inputs", "Connect FTD genes, targets and medications"],
      ["hubs", "Find influential bridges in the network"],
      ["tissue", "Interpret targets in their tissue context"],
      ["interactions", "Examine drug combinations for caution"],
      ["result", "Prioritize hypotheses for follow-up"]
    ];
    var phaseIndex = 0;
    var paused = false;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var state = figure.querySelector(".ftd-network__state");
    var toggle = figure.querySelector(".ftd-network__toggle");

    function showPhase(phase) {
      figure.dataset.phase = phase[0];
      state.textContent = phase[1];
      figure.querySelectorAll("[data-stage-node]").forEach(function (item) {
        item.classList.toggle("is-active", item.dataset.stageNode === phase[0]);
      });
      figure.querySelectorAll("[data-edge-stage]").forEach(function (item) {
        item.classList.toggle("is-active", item.dataset.edgeStage === phase[0]);
      });
    }

    showPhase(reduced ? phases[4] : phases[0]);
    var timer = reduced ? null : window.setInterval(function () {
      if (!paused) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        showPhase(phases[phaseIndex]);
      }
    }, 3700);

    if (reduced) {
      toggle.hidden = true;
      figure.classList.add("is-paused");
    }

    toggle.addEventListener("click", function () {
      paused = !paused;
      figure.classList.toggle("is-paused", paused);
      toggle.textContent = paused ? "Play" : "Pause";
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.setAttribute("aria-label", paused ? "Play FTD network animation" : "Pause FTD network animation");
    });

    window.addEventListener("pagehide", function () {
      if (timer) window.clearInterval(timer);
    }, { once: true });
  }

  document.querySelectorAll("[data-ftd-network]").forEach(function (figure, index) {
    build(figure, index + 1);
  });
})();
