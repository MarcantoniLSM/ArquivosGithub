// https://github.com/tetsufmbio/d3-force-3d-md v1.0.5 Copyright 2023 Tetsu Sakamoto
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-binarytree'), require('d3-quadtree'), require('d3-octree'), require('d3-dispatch'), require('d3-timer')) :
typeof define === 'function' && define.amd ? define(['exports', 'd3-binarytree', 'd3-quadtree', 'd3-octree', 'd3-dispatch', 'd3-timer'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3 = global.d3 || {}, global.d3, global.d3, global.d3, global.d3, global.d3));
})(this, (function (exports, d3Binarytree, d3Quadtree, d3Octree, d3Dispatch, d3Timer) { 'use strict';

function center(x, y, z) {
  var nodes, strength = 1;

  if (x == null) x = 0;
  if (y == null) y = 0;
  if (z == null) z = 0;

  function force() {
    var i,
        n = nodes.length,
        node,
        sx = 0,
        sy = 0,
        sz = 0;

    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x || 0, sy += node.y || 0, sz += node.z || 0;
    }

    for (sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, sz = (sz / n - z) * strength, i = 0; i < n; ++i) {
      node = nodes[i];
      if (sx) { node.x -= sx; }
      if (sy) { node.y -= sy; }
      if (sz) { node.z -= sz; }
    }
  }

  force.initialize = function(_) {
    nodes = _;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  force.z = function(_) {
    return arguments.length ? (z = +_, force) : z;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  return force;
}

function constant(x) {
  return function() {
    return x;
  };
}

function jiggle(random) {
  return (random() - 0.5) * 1e-6;
}

function x$2(d) {
  return d.x + d.vx;
}

function y$2(d) {
  return d.y + d.vy;
}

function z$2(d) {
  return d.z + d.vz;
}

function collide(radius) {
  var nodes,
      nDim,
      radii,
      random,
      strength = 1,
      iterations = 1;

  if (typeof radius !== "function") radius = constant(radius == null ? 1 : +radius);

  function force() {
    var i, n = nodes.length,
        tree,
        node,
        xi,
        yi,
        zi,
        ri,
        ri2;

    for (var k = 0; k < iterations; ++k) {
      tree =
          (nDim === 1 ? d3Binarytree.binarytree(nodes, x$2)
          :(nDim === 2 ? d3Quadtree.quadtree(nodes, x$2, y$2)
          :(nDim === 3 ? d3Octree.octree(nodes, x$2, y$2, z$2)
          :null
      ))).visitAfter(prepare);

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        if (nDim > 1) { yi = node.y + node.vy; }
        if (nDim > 2) { zi = node.z + node.vz; }
        tree.visit(apply);
      }
    }

    function apply(treeNode, arg1, arg2, arg3, arg4, arg5, arg6) {
      var args = [arg1, arg2, arg3, arg4, arg5, arg6];
      var x0 = args[0],
          y0 = args[1],
          z0 = args[2],
          x1 = args[nDim],
          y1 = args[nDim+1],
          z1 = args[nDim+2];

      var data = treeNode.data, rj = treeNode.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x = xi - data.x - data.vx,
              y = (nDim > 1 ? yi - data.y - data.vy : 0),
              z = (nDim > 2 ? zi - data.z - data.vz : 0),
              l = x * x + y * y + z * z;
          if (l < r * r) {
            if (x === 0) x = jiggle(random), l += x * x;
            if (nDim > 1 && y === 0) y = jiggle(random), l += y * y;
            if (nDim > 2 && z === 0) z = jiggle(random), l += z * z;
            l = (r - (l = Math.sqrt(l))) / l * strength;

            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            if (nDim > 1) { node.vy += (y *= l) * r; }
            if (nDim > 2) { node.vz += (z *= l) * r; }

            data.vx -= x * (r = 1 - r);
            if (nDim > 1) { data.vy -= y * r; }
            if (nDim > 2) { data.vz -= z * r; }
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r
          || (nDim > 1 && (y0 > yi + r || y1 < yi - r))
          || (nDim > 2 && (z0 > zi + r || z1 < zi - r));
    }
  }

  function prepare(treeNode) {
    if (treeNode.data) return treeNode.r = radii[treeNode.data.index];
    for (var i = treeNode.r = 0; i < Math.pow(2, nDim); ++i) {
      if (treeNode[i] && treeNode[i].r > treeNode.r) {
        treeNode.r = treeNode[i].r;
      }
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }

  force.initialize = function(_nodes, ...args) {
    nodes = _nodes;
    random = args.find(arg => typeof arg === 'function') || Math.random;
    nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
    initialize();
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), initialize(), force) : radius;
  };

  return force;
}

function index(d) {
  return d.index;
}

function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("node not found: " + nodeId);
  return node;
}

function link(links) {
  var id = index,
      strength = defaultStrength,
      strengths,
      distance = constant(30),
      distances,
      nodes,
      nDim,
      count,
      bias,
      random,
      iterations = 1;

  if (links == null) links = [];

  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }

  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x = 0, y = 0, z = 0, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x + target.vx - source.x - source.vx || jiggle(random);
        if (nDim > 1) { y = target.y + target.vy - source.y - source.vy || jiggle(random); }
        if (nDim > 2) { z = target.z + target.vz - source.z - source.vz || jiggle(random); }
        l = Math.sqrt(x * x + y * y + z * z);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x *= l, y *= l, z *= l;

        target.vx -= x * (b = bias[i]);
        if (nDim > 1) { target.vy -= y * b; }
        if (nDim > 2) { target.vz -= z * b; }

        source.vx += x * (b = 1 - b);
        if (nDim > 1) { source.vy += y * b; }
        if (nDim > 2) { source.vz += z * b; }
      }
    }
  }

  function initialize() {
    if (!nodes) return;

    var i,
        n = nodes.length,
        m = links.length,
        nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),
        link;

    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }

    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }

    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }

  function initializeStrength() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }

  function initializeDistance() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }

  force.initialize = function(_nodes, ...args) {
    nodes = _nodes;
    random = args.find(arg => typeof arg === 'function') || Math.random;
    nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
    initialize();
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initializeStrength(), force) : strength;
  };

  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant(+_), initializeDistance(), force) : distance;
  };

  return force;
}

// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

function lcg() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}

var MAX_DIMENSIONS = 3;

function x$1(d) {
  return d.x;
}

function y$1(d) {
  return d.y;
}

function z$1(d) {
  return d.z;
}

var initialRadius = 10,
    initialAngleRoll = Math.PI * (3 - Math.sqrt(5)), // Golden ratio angle
    initialAngleYaw = Math.PI * 20 / (9 + Math.sqrt(221)); // Markov irrational number

function simulation(nodes, numDimensions) {
  numDimensions = numDimensions || 2;

  var nDim = Math.min(MAX_DIMENSIONS, Math.max(1, Math.round(numDimensions))),
      simulation,
      dt = 1,
      alpha = 1,
      alphaMin = 0.001,
      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
      alphaTarget = 0,
      velocityDecay = 0.6,
      forces = new Map(),
      stepper = d3Timer.timer(step),
      event = d3Dispatch.dispatch("tick", "end"),
      random = lcg();

  if (nodes == null) nodes = [];

  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }

  function tick(iterations) {
    var i, n = nodes.length, node;

    if (iterations === undefined) iterations = 1;
    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;
      
      // update velocities (half-step)
      for (i = 0; i < n; ++i) {
        node = nodes[i];

        if (node.fx == null) node.vx += 0.5*node.force_x*dt/node.mass;
        else node.vx = 0, node.force_x = 0, node.x = node.fx;
        if (nDim > 1){
          if (node.fy == null) node.vy += 0.5*node.force_y*dt/node.mass;
          else node.vy = 0, node.force_y = 0, node.y = node.fy;
        }
        if (nDim > 2){
          if (node.fz == null) node.vz += 0.5*node.force_z*dt/node.mass;
          else node.vz = 0, node.force_z = 0, node.z = node.fz;
        }
      }
      
      // update positions
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        
        if (node.fx == null) node.x += dt*(node.vx *= velocityDecay);
        else node.x = node.fx;
        if (nDim > 1){
          if (node.fy == null) node.y += dt*(node.vy *= velocityDecay);
          else node.y = node.fy;
        }
        if (nDim > 2){
          if (node.fz == null) node.z += dt*(node.vz *= velocityDecay);
          else node.z = node.fz;
        }
		// restart force
		node.force_x = 0;
		node.force_y = 0;
		node.force_z = 0;
      }
	  
      
      forces.forEach(function (force) {
        force(alpha);
      });
	  
      // update velocities (full-step)
      for (i = 0; i < n; ++i) {
        node = nodes[i];
		
        if (node.fx == null) node.vx += 0.5*node.force_x*dt/node.mass;
        else node.vx = 0, node.force_x = 0, node.x = node.fx;
        if (nDim > 1){
          if (node.fy == null) node.vy += 0.5*node.force_y*dt/node.mass;
          else node.vy = 0, node.force_y = 0, node.y = node.fy;
        }
        if (nDim > 2){
          if (node.fz == null) node.vz += 0.5*node.force_z*dt/node.mass;
          else node.vz = 0, node.force_z = 0, node.z = node.fz;
        }
      }
	  
	  
    }

    return simulation;
  }

  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (node.fz != null) node.z = node.fz;
      if (isNaN(node.x) || (nDim > 1 && isNaN(node.y)) || (nDim > 2 && isNaN(node.z))) {
        var radius = initialRadius * (nDim > 2 ? Math.cbrt(0.5 + i) : (nDim > 1 ? Math.sqrt(0.5 + i) : i)),
          rollAngle = i * initialAngleRoll,
          yawAngle = i * initialAngleYaw;

        if (nDim === 1) {
          node.x = radius;
        } else if (nDim === 2) {
          node.x = radius * Math.cos(rollAngle);
          node.y = radius * Math.sin(rollAngle);
        } else { // 3 dimensions: use spherical distribution along 2 irrational number angles
          node.x = radius * Math.sin(rollAngle) * Math.cos(yawAngle);
          node.y = radius * Math.cos(rollAngle);
          node.z = radius * Math.sin(rollAngle) * Math.sin(yawAngle);
        }
      }
      if (isNaN(node.vx) || (nDim > 1 && isNaN(node.vy)) || (nDim > 2 && isNaN(node.vz))) {
        node.vx = 0;
        if (nDim > 1) { node.vy = 0; }
        if (nDim > 2) { node.vz = 0; }
      }

      if (isNaN(node.force_x) || (nDim > 1 && isNaN(node.force_y)) || (nDim > 2 && isNaN(node.force_z))) {
        node.force_x = 0;
        if (nDim > 1) { node.force_y = 0; }
        if (nDim > 2) { node.force_z = 0; }
      }

      if (isNaN(node.mass)) node.mass = 1;

    }
  }

  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes, random, nDim);
    return force;
  }

  initializeNodes();

  return simulation = {
    tick: tick,

    restart: function() {
      return stepper.restart(step), simulation;
    },

    stop: function() {
      return stepper.stop(), simulation;
    },

    numDimensions: function(_) {
      return arguments.length
          ? (nDim = Math.min(MAX_DIMENSIONS, Math.max(1, Math.round(_))), forces.forEach(initializeForce), simulation)
          : nDim;
    },

    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },

    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },

    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },

    dt: function(_) {
      return arguments.length ? (dt = +_, simulation) : dt;
    },
	
    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },

    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },

    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },

    randomSource: function(_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
    },

    force: function(name, _) {
      return arguments.length > 1 ? ((_ == null ? forces.delete(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
    },

    find: function() {
      var args = Array.prototype.slice.call(arguments);
      var x = args.shift() || 0,
          y = (nDim > 1 ? args.shift() : null) || 0,
          z = (nDim > 2 ? args.shift() : null) || 0,
          radius = args.shift() || Infinity;

      var i = 0,
          n = nodes.length,
          dx,
          dy,
          dz,
          d2,
          node,
          closest;

      radius *= radius;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - (node.y || 0);
        dz = z - (node.z ||0);
        d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < radius) closest = node, radius = d2;
      }

      return closest;
    },

    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}

function manyBody() {
  var nodes,
      nDim,
      node,
      random,
      alpha,
      strength = constant(-30),
      strengths,
      distanceMin2 = 1,
      distanceMax2 = Infinity,
      theta2 = 0.81;

  function force(_) {
    var i,
        n = nodes.length,
        tree =
            (nDim === 1 ? d3Binarytree.binarytree(nodes, x$1)
            :(nDim === 2 ? d3Quadtree.quadtree(nodes, x$1, y$1)
            :(nDim === 3 ? d3Octree.octree(nodes, x$1, y$1, z$1)
            :null
        ))).visitAfter(accumulate);

    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
  }

  function accumulate(treeNode) {
    var strength = 0, q, c, weight = 0, x, y, z, i;
    var numChildren = treeNode.length;

    // For internal nodes, accumulate forces from children.
    if (numChildren) {
      for (x = y = z = i = 0; i < numChildren; ++i) {
        if ((q = treeNode[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * (q.x || 0), y += c * (q.y || 0), z += c * (q.z || 0);
        }
      }
      strength *= Math.sqrt(4 / numChildren); // scale accumulated strength according to number of dimensions

      treeNode.x = x / weight;
      if (nDim > 1) { treeNode.y = y / weight; }
      if (nDim > 2) { treeNode.z = z / weight; }
    }

    // For leaf nodes, accumulate forces from coincident nodes.
    else {
      q = treeNode;
      q.x = q.data.x;
      if (nDim > 1) { q.y = q.data.y; }
      if (nDim > 2) { q.z = q.data.z; }
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    treeNode.value = strength;
  }

  function apply(treeNode, x1, arg1, arg2, arg3) {
    if (!treeNode.value) return true;
    var x2 = [arg1, arg2, arg3][nDim-1];

    var x = treeNode.x - node.x,
        y = (nDim > 1 ? treeNode.y - node.y : 0),
        z = (nDim > 2 ? treeNode.z - node.z : 0),
        w = x2 - x1,
        l = x * x + y * y + z * z;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x === 0) x = jiggle(random), l += x * x;
        if (nDim > 1 && y === 0) y = jiggle(random), l += y * y;
        if (nDim > 2 && z === 0) z = jiggle(random), l += z * z;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x * treeNode.value * alpha / l;
        if (nDim > 1) { node.vy += y * treeNode.value * alpha / l; }
        if (nDim > 2) { node.vz += z * treeNode.value * alpha / l; }
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (treeNode.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    if (treeNode.data !== node || treeNode.next) {
      if (x === 0) x = jiggle(random), l += x * x;
      if (nDim > 1 && y === 0) y = jiggle(random), l += y * y;
      if (nDim > 2 && z === 0) z = jiggle(random), l += z * z;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }

    do if (treeNode.data !== node) {
      w = strengths[treeNode.data.index] * alpha / l;
      node.vx += x * w;
      if (nDim > 1) { node.vy += y * w; }
      if (nDim > 2) { node.vz += z * w; }
    } while (treeNode = treeNode.next);
  }

  force.initialize = function(_nodes, ...args) {
    nodes = _nodes;
    random = args.find(arg => typeof arg === 'function') || Math.random;
    nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };

  return force;
}

function radial(radius, x, y, z) {
  var nodes,
      nDim,
      strength = constant(0.1),
      strengths,
      radiuses;

  if (typeof radius !== "function") radius = constant(+radius);
  if (x == null) x = 0;
  if (y == null) y = 0;
  if (z == null) z = 0;

  function force(alpha) {
    for (var i = 0, n = nodes.length; i < n; ++i) {
      var node = nodes[i],
          dx = node.x - x || 1e-6,
          dy = (node.y || 0) - y || 1e-6,
          dz = (node.z || 0) - z || 1e-6,
          r = Math.sqrt(dx * dx + dy * dy + dz * dz),
          k = (radiuses[i] - r) * strengths[i] * alpha / r;
      node.vx += dx * k;
      if (nDim>1) { node.vy += dy * k; }
      if (nDim>2) { node.vz += dz * k; }
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    radiuses = new Array(n);
    for (i = 0; i < n; ++i) {
      radiuses[i] = +radius(nodes[i], i, nodes);
      strengths[i] = isNaN(radiuses[i]) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(initNodes, ...args) {
    nodes = initNodes;
    nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), initialize(), force) : radius;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  force.z = function(_) {
    return arguments.length ? (z = +_, force) : z;
  };

  return force;
}

function x(x) {
  var strength = constant(0.1),
      nodes,
      strengths,
      xz;

  if (typeof x !== "function") x = constant(x == null ? 0 : +x);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };

  force.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), initialize(), force) : x;
  };

  return force;
}

function y(y) {
  var strength = constant(0.1),
      nodes,
      strengths,
      yz;

  if (typeof y !== "function") y = constant(y == null ? 0 : +y);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };

  force.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), initialize(), force) : y;
  };

  return force;
}

function z(z) {
  var strength = constant(0.1),
      nodes,
      strengths,
      zz;

  if (typeof z !== "function") z = constant(z == null ? 0 : +z);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vz += (zz[i] - node.z) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    zz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(zz[i] = +z(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };

  force.z = function(_) {
    return arguments.length ? (z = typeof _ === "function" ? _ : constant(+_), initialize(), force) : z;
  };

  return force;
}

const atoms = {
    ['H']: {mass: 1.00797},
    ['He']: {mass: 4.00260},
    ['Li']: {mass: 6.941},
    ['Be']: {mass: 9.01218},
    ['B']: {mass: 10.81},
    ['C']: {
      mass: 12.011,
      ['DEFAULT']:{},
      ['A']:{},
      ['C']:{},
      ['D']:{},
      ['E1']:{},
      ['E2']:{},
      ['P1']:{},
      ['P2']:{},
      ['P3']:{},
      ['PH1']:{},
      ['PH2']:{},
      ['PT']:{},
      ['S']:{},
      ['T1']:{},
      ['T2']:{},
      ['T3']:{},
      ['Y']:{},
    },
    ['N']: {mass: 14.0067},
    ['O']: {mass: 15.9994},
    ['F']: {mass: 18.998403},
    ['Ne']: {mass: 20.179},
    ['Na']: {mass: 22.98977, ['DEFAULT']: {sigma: 2.950, epsilon: 0.331, charge: 1}},
    ['Mg']: {mass: 24.305},
    ['Al']: {mass: 26.98154},
    ['Si']: {mass: 28.0855},
    ['P']: {mass: 30.97376},
    ['S']: {mass: 32.06},
    ['Cl']: {mass: 35.453,  ['DEFAULT']: {sigma: 3.626, epsilon:  1.035, charge: (-1)}},
    ['K']: {mass: 39.0983},
    ['Ar']: {mass: 39.948, ['DEFAULT']: {sigma: 3.4, epsilon: 0.0103}},
    ['Ca']: {mass: 40.08},
    ['Sc']: {mass: 44.9559},
    ['Ti']: {mass: 47.90},
    ['V']: {mass: 50.9415},
    ['Cr']: {mass: 51.996},
    ['Mn']: {mass: 54.9380},
    ['Fe']: {mass: 55.847},
    ['Ni']: {mass: 58.70},
    ['Co']: {mass: 58.9332},
    ['Cu']: {mass: 63.546},
    ['Zn']: {mass: 65.38},
    ['Ga']: {mass: 69.72},
    ['Ge']: {mass: 72.59},
    ['As']: {mass: 74.9216},
    ['Se']: {mass: 78.96},
    ['Br']: {mass: 79.904},
    ['Kr']: {mass: 83.80},
    ['Rb']: {mass: 85.4678},
    ['Sr']: {mass: 87.62},
    ['Y']: {mass: 88.9059},
    ['Zr']: {mass: 91.22},
    ['Nb']: {mass: 92.9064},
    ['Mo']: {mass: 95.94},
    ['Tc']: {mass: (98)},
    ['Ru']: {mass: 101.07},
    ['Rh']: {mass: 102.9055},
    ['Pd']: {mass: 106.4},
    ['Ag']: {mass: 107.868},
    ['Cd']: {mass: 112.41},
    ['In']: {mass: 114.82},
    ['Sn']: {mass: 118.69},
    ['Sb']: {mass: 121.75},
    ['I']: {mass: 126.9045},
    ['Te']: {mass: 127.60},
    ['Xe']: {mass: 131.30},
    ['Cs']: {mass: 132.9054},
    ['Ba']: {mass: 137.33},
    ['La']: {mass: 138.9055},
    ['Ce']: {mass: 140.12},
    ['Pr']: {mass: 140.9077},
    ['Nd']: {mass: 144.24},
    ['Pm']: {mass: (145)},
    ['Sm']: {mass: 150.4},
    ['Eu']: {mass: 151.96},
    ['Gd']: {mass: 157.25},
    ['Tb']: {mass: 158.9254},
    ['Dy']: {mass: 162.50},
    ['Ho']: {mass: 164.9304},
    ['Er']: {mass: 167.26},
    ['Tm']: {mass: 168.9342},
    ['Yb']: {mass: 173.04},
    ['Lu']: {mass: 174.967},
    ['Hf']: {mass: 178.49},
    ['Ta']: {mass: 180.9479},
    ['W']: {mass: 183.85},
    ['Re']: {mass: 186.207},
    ['Os']: {mass: 190.2},
    ['Ir']: {mass: 192.22},
    ['Pt']: {mass: 195.09},
    ['Au']: {mass: 196.9665},
    ['Hg']: {mass: 200.59},
    ['Tl']: {mass: 204.37},
    ['Pb']: {mass: 207.2},
    ['Bi']: {mass: 208.9804},
    ['Po']: {mass: (209)},
    ['At']: {mass: (210)},
    ['Rn']: {mass: (222)},
    ['Fr']: {mass: (223)},
    ['Ra']: {mass: 226.0254},
    ['Ac']: {mass: 227.0278},
    ['Pa']: {mass: 231.0359},
    ['Th']: {mass: 232.0381},
    ['Np']: {mass: 237.0482},
    ['U']: {mass: 238.029},
    ['Pu']: {mass: (242)},
    ['Am']: {mass: (243)},
    ['Bk']: {mass: (247)},
    ['Cm']: {mass: (247)},
    ['No']: {mass: (250)},
    ['Cf']: {mass: (251)},
    ['Es']: {mass: (252)},
    ['Hs']: {mass: (255)},
    ['Mt']: {mass: (256)},
    ['Fm']: {mass: (257)},
    ['Md']: {mass: (258)},
    ['Lr']: {mass: (260)},
    ['Rf']: {mass: (261)},
    ['Bh']: {mass: (262)},
    ['Db']: {mass: (262)},
    ['Sg']: {mass: (263)},
    ['Uun']: {mass: (269)},
    ['Uuu']: {mass: (272)},
    ['Uub']: {mass: (277)}
  };

function lennardJonesPotential() {
  var nodes,
      nDim,
      node,
      random,
      alpha,
      strength = constant(1), // strength now serves as a counter
      strengths,
      distanceMin2 = 0.75,
      distanceMax2 = Infinity,
      theta2 = 0.0625, // lennard-jones type interactions mostly short-range
      N=12, M=6; // lennard-jones exponents

  function force(_) {
    var i, 
    n = nodes.length,
    tree = 
      (nDim === 1 ? d3Binarytree.binarytree(nodes, x$1)
      :(nDim === 2 ? d3Quadtree.quadtree(nodes, x$1, y$1)
      :(nDim === 3 ? d3Octree.octree(nodes, x$1, y$1, z$1)
      :null
    ))).visitAfter(accumulate);
		
    for (alpha = _, i = 0; i < n; ++i) {
      node = nodes[i];
      node.energy = -1; //self-energy
      tree.visit(apply);
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
    if (M==N) N += 1; //avoid dividing by zero
  }

  function accumulate(treeNode) {
	//console.log(treeNode);
    var strength = 0, q, c, weight = 0, x, y, z, i;
	var numChildren = treeNode.length;
	
    // For internal nodes, accumulate forces from child quadrants.
    if (numChildren) {
      for (x = y = z = i = 0; i < numChildren; ++i) { // original estah: for (x = y = i = 0; i < 4; ++i)
        if ((q = treeNode[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * (q.x || 0), y += c * (q.y || 0), z += c * (q.z || 0);
        }
      }
      strength *= Math.sqrt(4 / numChildren); // scale accumulated strength according to number of dimensions (d3-force-3d)

      treeNode.x = x / weight;
      if (nDim > 1) { treeNode.y = y / weight; }
      if (nDim > 2) { treeNode.z = z / weight; }
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = treeNode;
      q.x = q.data.x;
      if (nDim > 1) { q.y = q.data.y; }
      if (nDim > 2) { q.z = q.data.z; }
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    treeNode.value = strength;
  }

  //function apply(treeNode, x1, _, x2) {
  function apply(treeNode, x1, arg1, arg2, arg3) {
    treeNode.name = node.name;
    if (!treeNode.value) return true;
    var x2 = [arg1, arg2, arg3][nDim-1];
    var x = (treeNode.x - node.x)*(-1),
        y = (nDim > 1 ? (treeNode.y - node.y)*(-1) : 0),
        z = (nDim > 2 ? (treeNode.z - node.z)*(-1) : 0),
		w = x2 - x1,
        l = x * x + y * y + z * z,
        force_prefactor;
    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      console.log('menor')
      if (l < distanceMax2) {
        if (x === 0) x = jiggle(random), l += x * x;
        if (nDim > 1 && y === 0) y = jiggle(random), l += y * y;
        if (nDim > 2 && z === 0) z = jiggle(random), l += z * z;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);

        const atom_type = node.type || 'DEFAULT';
        const treeNode_atom_type = treeNode.type || 'DEFAULT';
        const distance = Math.sqrt(l);
        const sigma = (atoms[node.name][atom_type].sigma + atoms[treeNode.name][treeNode_atom_type].sigma)/2;
        const epsilon = Math.sqrt((atoms[node.name][atom_type].epsilon)*(atoms[treeNode.name][treeNode_atom_type].epsilon));
        const qi = atoms[node.name][atom_type].charge;
        const qj = atoms[treeNode.name][treeNode_atom_type].charge;
        
        const e = 1.60217663 * 10**(-19)
        const epsilon_0 = 8.85 * 10**(-12);
        const pi = 3.14;
        force_prefactor = /*lj*/ (4 * epsilon * (N * Math.pow(sigma/distance, N) - M * Math.pow(sigma/distance, M))/distance) - /*charged*/ (qi*qj*e** 2) / ( 4*pi*epsilon_0*(distance**2));

        node.energy += (N*Math.pow(l,-M/2)-M*Math.pow(l,-N/2))/(M-N)*treeNode.value;
        node.force_x += force_prefactor*x*(1/distance)*alpha;
		
        if (nDim > 1) { node.force_y += force_prefactor*y*(1/distance)*alpha; }
        if (nDim > 2) { node.force_z += force_prefactor*z*(1/distance)*alpha; }
		//console.log("id: " + node.id +", Barnes-Hut: "+node.force_x);
      }
	  
      return true;
    }

    // Otherwise, process points directly.
    else if (treeNode.length || l >= distanceMax2) return;
    console.log('maior')
    // Limit forces for very close nodes; randomize direction if coincident.
    if (treeNode.data !== node || treeNode.next) {
      if (x === 0) x = jiggle(random), l += x * x;
      if (nDim > 1 && y === 0) y = jiggle(random), l += y * y;
      if (nDim > 2 && z === 0) z = jiggle(random), l += z * z;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }

    // The type of the atom is assumed to be default if not specified.
    const atom_type = node.type || 'DEFAULT';
    const treeNode_atom_type = treeNode.type || 'DEFAULT';
    const qi = atoms[node.name][atom_type].charge;
    const qj = atoms[treeNode.name][treeNode_atom_type].charge;
    console.log(node.name + " " + qi + " " + treeNode.name + " " + qj)
    const e = 1.60217663 * 10**(-19)
    const epsilon_0 = 8.85 * 10**(-12);
    const pi = 3.14;
    const distance = Math.sqrt(l);
    const sigma = (atoms[node.name][atom_type].sigma + atoms[treeNode.name][treeNode_atom_type].sigma)/2;
    const epsilon = Math.sqrt((atoms[node.name][atom_type].epsilon)*(atoms[treeNode.name][treeNode_atom_type].epsilon));
    force_prefactor = (4*epsilon*(N*Math.pow(sigma/distance, N)-M*Math.pow(sigma/distance, M))/distance) - /*charged*/ (qi*qj*e** 2) / ( 4*pi*epsilon_0*(distance**2)) ;

    do if (treeNode.data !== node) {
      w = strengths[treeNode.data.index];
      node.energy += (N*Math.pow(l,-M/2)-M*Math.pow(l,-N/2))/(M-N)*w;
      node.force_x += force_prefactor*x*(1/distance)*alpha;
      if (nDim > 1) { node.force_y += force_prefactor*y*(1/distance)*alpha; }
      if (nDim > 2) { node.force_z += force_prefactor*z*(1/distance)*alpha; }
		//console.log("id: " + node.id + ", Point direct: "+node.force_x);
    } while (treeNode = treeNode.next);
  }

  force.initialize = function(_nodes, ...args) {
    nodes = _nodes;
    random = args.find(arg => typeof arg === 'function') || Math.random;
	nDim = args.find(arg => [1, 2, 3].includes(arg)) || 2;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };
  
  force.repulsivePower = function(_) {
    return arguments.length ? (N = _, force) : N;
  };

  force.attractivePower = function(_) {
    return arguments.length ? (M = _, force) : M;
  };

  return force;
}

exports.forceCenter = center;
exports.forceCollide = collide;
exports.forceLennardJones = lennardJonesPotential;
exports.forceLink = link;
exports.forceManyBody = manyBody;
exports.forceRadial = radial;
exports.forceSimulation = simulation;
exports.forceX = x;
exports.forceY = y;
exports.forceZ = z;

Object.defineProperty(exports, '__esModule', { value: true });

}));
