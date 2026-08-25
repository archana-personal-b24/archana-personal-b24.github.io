/* Animated, exact 22-node / 82-edge topology from Figure 1A of Hari et al. */
(function () {
  "use strict";

  var positions = {
    miR101:[92,108,"epi"], miR141:[58,171,"epi"], miR200a:[80,235,"epi"],
    miR200b:[78,300,"epi"], miR200c:[122,365,"epi"], miR34a:[172,406,"epi"],
    KLF8:[202,55,"peripheral"], CDH1:[238,190,"peripheral"], miR205:[160,145,"peripheral"],
    miR30c:[240,354,"peripheral"], miR9:[302,408,"peripheral"], TCF3:[327,55,"peripheral"],
    VIM:[390,208,"peripheral"], FOXC2:[460,58,"mes"], ZEB1:[467,130,"mes"],
    ZEB2:[540,170,"mes"], SNAI1:[438,244,"mes"], SNAI2:[532,285,"mes"],
    TWIST1:[433,350,"mes"], TWIST2:[526,390,"mes"], GSC:[584,92,"mes"],
    TGFbeta:[584,235,"mes"]
  };

  var edges = [
    ["FOXC2","ZEB1",1],["KLF8","CDH1",2],["miR101","KLF8",2],["miR101","ZEB1",2],
    ["miR101","ZEB2",2],["miR101","SNAI1",2],["miR141","ZEB1",2],["miR141","ZEB2",2],
    ["miR141","TGFbeta",2],["miR200a","ZEB1",2],["miR200a","ZEB2",2],["miR200a","TGFbeta",2],
    ["miR200b","ZEB1",2],["miR200b","ZEB2",2],["miR200b","TGFbeta",2],["miR200c","ZEB1",2],
    ["miR200c","ZEB2",2],["miR200c","TGFbeta",2],["miR205","ZEB1",2],["miR205","ZEB2",2],
    ["miR30c","SNAI1",2],["miR30c","SNAI2",2],["miR30c","ZEB2",2],["miR34a","SNAI1",2],
    ["miR34a","SNAI2",2],["miR34a","TWIST2",2],["miR34a","ZEB1",2],["miR9","CDH1",2],
    ["miR9","ZEB2",2],["SNAI1","CDH1",2],["SNAI1","VIM",1],["SNAI1","FOXC2",1],
    ["SNAI1","SNAI1",2],["SNAI1","SNAI2",1],["SNAI1","TWIST1",1],["SNAI1","ZEB1",1],
    ["SNAI1","ZEB2",1],["SNAI1","miR34a",2],["SNAI1","miR101",2],["SNAI2","CDH1",2],
    ["SNAI2","VIM",1],["SNAI2","SNAI2",1],["SNAI2","TWIST2",1],["SNAI2","miR101",2],
    ["SNAI2","miR200b",2],["TCF3","CDH1",2],["TWIST1","CDH1",2],["TWIST1","VIM",1],
    ["TWIST1","FOXC2",1],["TWIST1","SNAI1",1],["TWIST1","SNAI2",1],["TWIST1","TCF3",1],
    ["TWIST1","ZEB1",1],["TWIST1","ZEB2",1],["TWIST2","CDH1",2],["TWIST2","SNAI1",1],
    ["TWIST2","SNAI2",1],["TWIST2","TWIST1",1],["TWIST2","ZEB1",1],["TWIST2","ZEB2",1],
    ["ZEB1","CDH1",2],["ZEB1","VIM",1],["ZEB1","miR141",2],["ZEB1","miR200b",2],
    ["ZEB1","miR200c",2],["ZEB1","miR200a",2],["ZEB1","miR34a",2],["ZEB1","ZEB1",1],
    ["ZEB2","CDH1",2],["ZEB2","VIM",1],["ZEB2","miR200b",2],["ZEB2","miR200c",2],
    ["ZEB2","miR200a",2],["ZEB2","ZEB2",1],["GSC","SNAI1",1],["GSC","TWIST1",1],
    ["GSC","FOXC2",1],["GSC","ZEB1",1],["GSC","ZEB2",1],["TGFbeta","GSC",1],
    ["TGFbeta","SNAI1",1],["TGFbeta","SNAI2",1]
  ];

  var ns = "http://www.w3.org/2000/svg";
  function element(name, attrs, text) {
    var node = document.createElementNS(ns, name);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    if (text) node.textContent = text;
    return node;
  }

  function pathFor(source, target, index) {
    var s = positions[source], t = positions[target];
    if (source === target) {
      return "M "+(s[0]-9)+" "+(s[1]-13)+" C "+(s[0]-37)+" "+(s[1]-49)+", "+(s[0]+37)+" "+(s[1]-49)+", "+(s[0]+9)+" "+(s[1]-13);
    }
    var dx=t[0]-s[0], dy=t[1]-s[1], length=Math.sqrt(dx*dx+dy*dy), ux=dx/length, uy=dy/length;
    var x1=s[0]+ux*18, y1=s[1]+uy*18, x2=t[0]-ux*21, y2=t[1]-uy*21;
    var reverse=edges.some(function (edge) { return edge[0]===target && edge[1]===source; });
    var bend=reverse?(source<target?15:-15):((index%3)-1)*6;
    var cx=(x1+x2)/2-uy*bend, cy=(y1+y2)/2+ux*bend;
    return "M "+x1.toFixed(1)+" "+y1.toFixed(1)+" Q "+cx.toFixed(1)+" "+cy.toFixed(1)+" "+x2.toFixed(1)+" "+y2.toFixed(1);
  }

  function build(figure, instance) {
    var canvas=figure.querySelector(".emp-network__canvas");
    var svg=element("svg", {viewBox:"0 0 640 455", role:"img", "aria-labelledby":"emp-title-"+instance+" emp-desc-"+instance});
    svg.appendChild(element("title", {id:"emp-title-"+instance}, "Epithelial-mesenchymal plasticity regulatory network"));
    svg.appendChild(element("desc", {id:"emp-desc-"+instance}, "The exact 22-node and 82-edge topology from Figure 1A. Arrowheads indicate activation and bars indicate inhibition. Animated paths illustrate changing signal emphasis between epithelial, hybrid and mesenchymal states."));

    var defs=element("defs");
    var arrow=element("marker", {id:"emp-arrow-"+instance, viewBox:"0 0 8 8", refX:"7", refY:"4", markerWidth:"5", markerHeight:"5", orient:"auto"});
    arrow.appendChild(element("path", {d:"M 0 0 L 8 4 L 0 8 Z", class:"emp-marker emp-marker--activation"}));
    var bar=element("marker", {id:"emp-bar-"+instance, viewBox:"0 0 8 10", refX:"7", refY:"5", markerWidth:"6", markerHeight:"7", orient:"auto"});
    bar.appendChild(element("path", {d:"M 6 0 L 6 10", class:"emp-marker emp-marker--inhibition"}));
    defs.appendChild(arrow); defs.appendChild(bar); svg.appendChild(defs);

    var regions=element("g", {class:"emp-regions", "aria-hidden":"true"});
    regions.appendChild(element("ellipse", {cx:"118",cy:"253",rx:"105",ry:"194",class:"emp-region emp-region--epi"}));
    regions.appendChild(element("ellipse", {cx:"505",cy:"235",rx:"122",ry:"205",class:"emp-region emp-region--mes"}));
    regions.appendChild(element("text", {x:"36",y:"28",class:"emp-team-label"}, "EPITHELIAL TEAM"));
    regions.appendChild(element("text", {x:"466",y:"28",class:"emp-team-label"}, "MESENCHYMAL TEAM"));
    svg.appendChild(regions);

    var edgeLayer=element("g", {class:"emp-edges", "aria-hidden":"true"});
    edges.forEach(function (edge, index) {
      var d=pathFor(edge[0],edge[1],index), type=edge[2]===1?"activation":"inhibition";
      edgeLayer.appendChild(element("path", {d:d,class:"emp-edge emp-edge--"+type,"marker-end":"url(#emp-"+(edge[2]===1?"arrow":"bar")+"-"+instance+")"}));
      edgeLayer.appendChild(element("path", {d:d,class:"emp-edge__flow emp-edge__flow--"+type,"data-source-team":positions[edge[0]][2],"data-edge-index":index,style:"--edge-delay:-"+((index%11)*0.19)+"s"}));
    });
    svg.appendChild(edgeLayer);

    var nodeLayer=element("g", {class:"emp-nodes"});
    Object.keys(positions).forEach(function (name) {
      var pos=positions[name], group=element("g", {class:"emp-node emp-node--"+pos[2],"data-team":pos[2],transform:"translate("+pos[0]+" "+pos[1]+")"});
      group.appendChild(element("circle", {r:"15"}));
      group.appendChild(element("text", {y:"27"}, name.replace("TGFbeta","TGFβ")));
      nodeLayer.appendChild(group);
    });
    svg.appendChild(nodeLayer);

    var legend=element("g", {class:"emp-legend",transform:"translate(202 444)","aria-hidden":"true"});
    legend.appendChild(element("line", {x1:"0",y1:"0",x2:"28",y2:"0",class:"emp-edge emp-edge--activation","marker-end":"url(#emp-arrow-"+instance+")"}));
    legend.appendChild(element("text", {x:"35",y:"3"}, "activates"));
    legend.appendChild(element("line", {x1:"108",y1:"0",x2:"136",y2:"0",class:"emp-edge emp-edge--inhibition","marker-end":"url(#emp-bar-"+instance+")"}));
    legend.appendChild(element("text", {x:"144",y:"3"}, "inhibits"));
    svg.appendChild(legend);
    canvas.appendChild(svg);

    var phases=[
      {key:"epi",label:"Epithelial-dominant"},
      {key:"hybrid",label:"Hybrid balance"},
      {key:"mes",label:"Mesenchymal-dominant"},
      {key:"hybrid",label:"Hybrid balance"}
    ];
    var phaseIndex=1, paused=false, reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var state=figure.querySelector(".emp-network__state"), toggle=figure.querySelector(".emp-network__toggle");

    function showPhase(phase) {
      figure.dataset.phase=phase.key;
      state.textContent=phase.label;
      figure.querySelectorAll(".emp-node").forEach(function (node) {
        var team=node.dataset.team;
        node.classList.toggle("is-dominant", phase.key==="hybrid" ? team!=="peripheral" : team===phase.key);
      });
      figure.querySelectorAll(".emp-edge__flow").forEach(function (edge) {
        var team=edge.dataset.sourceTeam, index=Number(edge.dataset.edgeIndex);
        edge.classList.toggle("is-flowing", phase.key==="hybrid" ? (team==="peripheral" || index%4===0) : team===phase.key);
      });
    }
    showPhase(phases[phaseIndex]);
    var timer=reduced?null:window.setInterval(function () {
      if (!paused) { phaseIndex=(phaseIndex+1)%phases.length; showPhase(phases[phaseIndex]); }
    }, 4300);
    if (reduced) { toggle.hidden=true; figure.classList.add("is-paused"); }
    toggle.addEventListener("click", function () {
      paused=!paused; figure.classList.toggle("is-paused",paused);
      toggle.textContent=paused?"Play":"Pause";
      toggle.setAttribute("aria-pressed",String(paused));
      toggle.setAttribute("aria-label",paused?"Play network animation":"Pause network animation");
    });
    window.addEventListener("pagehide",function(){ if(timer) window.clearInterval(timer); },{once:true});
  }

  document.querySelectorAll("[data-emp-network]").forEach(function (figure,index) { build(figure,index+1); });
})();
