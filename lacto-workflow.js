/* Animated interpretation of the Figure 1 LactoPRECISE analysis workflow. */
(function () {
  "use strict";

  var ns = "http://www.w3.org/2000/svg";
  var conditions = [
    ["Carbohydrates",45,48],["Gut metabolites",136,48],["Antibiotics",227,48],
    ["Iron",318,48],["Nucleotides",409,48],["pH",500,48],["Amino acids",591,48],
    ["Vitamins",91,111],["Temperature",182,111],["Food media",273,111],
    ["Bile salts",364,111],["Co-cultures",455,111],["Salts",546,111]
  ];

  function make(name, attrs, text) {
    var node = document.createElementNS(ns, name);
    Object.keys(attrs || {}).forEach(function (key) { node.setAttribute(key, attrs[key]); });
    if (text) node.textContent = text;
    return node;
  }

  function addText(parent, x, y, value, className) {
    parent.appendChild(make("text", {x:x,y:y,class:className}, value));
  }

  function linePair(parent, d, stage, markerId, delay) {
    parent.appendChild(make("path", {d:d,class:"lacto-path","marker-end":"url(#"+markerId+")"}));
    parent.appendChild(make("path", {d:d,class:"lacto-flow","data-stage":stage,style:"--flow-delay:-"+delay+"s"}));
  }

  function build(figure, instance) {
    var canvas=figure.querySelector(".lacto-workflow__canvas");
    var svg=make("svg", {viewBox:"0 0 640 472",role:"img","aria-labelledby":"lacto-title-"+instance+" lacto-desc-"+instance});
    svg.appendChild(make("title", {id:"lacto-title-"+instance}, "LactoPRECISE transcriptomic analysis workflow"));
    svg.appendChild(make("desc", {id:"lacto-desc-"+instance}, "Thirteen types of growth conditions produce 117 RNA-seq profiles. Independent component analysis separates those profiles into 35 iModulons whose activities reveal regulation, context-specific expression, secondary metabolism and strain-design opportunities."));

    var markerId="lacto-arrow-"+instance, defs=make("defs"), marker=make("marker", {id:markerId,viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto"});
    marker.appendChild(make("path", {d:"M 0 0 L 8 4 L 0 8 Z",class:"lacto-marker"}));
    defs.appendChild(marker); svg.appendChild(defs);

    addText(svg,320,14,"13 CONDITION TYPES · 50 UNIQUE CONDITIONS","lacto-kicker");
    var paths=make("g", {class:"lacto-paths","aria-hidden":"true"});
    conditions.forEach(function (condition,index) {
      var d="M "+condition[1]+" "+(condition[2]+18)+" Q "+condition[1]+" 148, 320 166";
      linePair(paths,d,"conditions",markerId,(index%7)*0.17);
    });
    linePair(paths,"M 320 210 L 320 238","profiles",markerId,0.2);
    linePair(paths,"M 320 286 L 320 306","ica",markerId,0.4);
    [[75,429],[235,429],[405,429],[565,429]].forEach(function (point,index) {
      linePair(paths,"M 320 374 Q 320 394, "+point[0]+" "+(point[1]-22),"outputs",markerId,index*0.24);
    });
    svg.appendChild(paths);

    var conditionLayer=make("g", {class:"lacto-conditions","data-stage-node":"conditions"});
    conditions.forEach(function (condition,index) {
      var group=make("g", {class:"lacto-condition",transform:"translate("+condition[1]+" "+condition[2]+")",style:"--condition-delay:"+(index*0.06)+"s"});
      group.appendChild(make("circle", {r:"16"}));
      group.appendChild(make("circle", {r:String(4+(index%3)),class:"lacto-condition__mark"}));
      addText(group,0,28,condition[0],"lacto-condition__label");
      conditionLayer.appendChild(group);
    });
    svg.appendChild(conditionLayer);

    var profiles=make("g", {class:"lacto-stage lacto-stage--profiles","data-stage-node":"profiles"});
    profiles.appendChild(make("rect", {x:"202",y:"166",width:"236",height:"44",rx:"4"}));
    addText(profiles,218,185,"LactoPRECISE","lacto-stage__name");
    addText(profiles,422,185,"117","lacto-stage__value");
    addText(profiles,218,200,"curated expression compendium","lacto-stage__detail");
    addText(profiles,422,200,"RNA-seq profiles","lacto-stage__detail lacto-stage__detail--end");
    svg.appendChild(profiles);

    var ica=make("g", {class:"lacto-stage lacto-stage--ica","data-stage-node":"ica"});
    ica.appendChild(make("rect", {x:"222",y:"238",width:"196",height:"48",rx:"4"}));
    addText(ica,320,258,"ICA","lacto-stage__name lacto-stage__name--center");
    addText(ica,320,274,"independent component analysis","lacto-stage__detail lacto-stage__detail--center");
    svg.appendChild(ica);

    var modules=make("g", {class:"lacto-modules","data-stage-node":"imodulons"});
    addText(modules,320,319,"35 iMODULONS","lacto-kicker");
    for(var i=0;i<35;i++) {
      modules.appendChild(make("circle", {cx:String(243+(i%7)*26),cy:String(335+Math.floor(i/7)*8),r:"3",style:"--module-delay:"+((i%9)*0.07)+"s"}));
    }
    svg.appendChild(modules);

    var outputs=make("g", {class:"lacto-outputs","data-stage-node":"outputs"});
    var outputData=[
      [75,"Media-specific","regulators"],
      [235,"Context-specific","gene expression"],
      [405,"Probiotic secondary","metabolites"],
      [565,"Strain-design","insights"]
    ];
    outputData.forEach(function (output,index) {
      var group=make("g", {class:"lacto-output",transform:"translate("+output[0]+" 429)",style:"--output-delay:"+(index*0.12)+"s"});
      group.appendChild(make("circle", {r:"13"}));
      group.appendChild(make("path", {d:"M -5 0 L -1 4 L 6 -5"}));
      addText(group,0,25,output[1],"lacto-output__label");
      addText(group,0,37,output[2],"lacto-output__label");
      outputs.appendChild(group);
    });
    svg.appendChild(outputs);
    canvas.appendChild(svg);

    var phases=[
      ["conditions","Diverse growth conditions"],
      ["profiles","117 RNA-seq profiles"],
      ["ica","Separating independent signals"],
      ["imodulons","35 interpretable iModulons"],
      ["outputs","From regulation to strain design"]
    ];
    var phaseIndex=0, paused=false, reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var state=figure.querySelector(".lacto-workflow__state"), toggle=figure.querySelector(".lacto-workflow__toggle");
    function showPhase(phase) {
      figure.dataset.phase=phase[0]; state.textContent=phase[1];
      figure.querySelectorAll("[data-stage-node]").forEach(function (node) { node.classList.toggle("is-active",node.dataset.stageNode===phase[0]); });
      figure.querySelectorAll(".lacto-flow").forEach(function (path) { path.classList.toggle("is-flowing",path.dataset.stage===phase[0]); });
    }
    showPhase(reduced?phases[4]:phases[0]);
    var timer=reduced?null:window.setInterval(function () { if(!paused){ phaseIndex=(phaseIndex+1)%phases.length; showPhase(phases[phaseIndex]); } },3500);
    if(reduced){ toggle.hidden=true; figure.classList.add("is-paused"); }
    toggle.addEventListener("click",function(){
      paused=!paused; figure.classList.toggle("is-paused",paused);
      toggle.textContent=paused?"Play":"Pause"; toggle.setAttribute("aria-pressed",String(paused));
      toggle.setAttribute("aria-label",paused?"Play workflow animation":"Pause workflow animation");
    });
    window.addEventListener("pagehide",function(){ if(timer) window.clearInterval(timer); },{once:true});
  }

  document.querySelectorAll("[data-lacto-workflow]").forEach(function (figure,index) { build(figure,index+1); });
})();
