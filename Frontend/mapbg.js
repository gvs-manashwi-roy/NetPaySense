(function () {
  const canvas = document.getElementById('map-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, pulseT = 0;

  // Google Maps style colors
  const C = {
    land:      '#f2efe9',
    park:      '#b8dba0',
    parkDark:  '#7cb87a',
    water:     '#aadaff',
    waterDark: '#7ec8f0',
    highway:   '#fdd835',
    highwayBorder: '#f9a825',
    majorRoad: '#ffffff',
    majorBorder: '#e0e0e0',
    minorRoad: '#ffffff',
    minorBorder: '#d0d0d0',
    building:  '#e8e0d8',
    buildingStroke: '#d4c8b8',
    roadLabel: '#5c5c5c',
  };

  // Heatmap zones [xRatio, yRatio, rxRatio, ryRatio, color, opacity]
  const zones = [
    [0.12, 0.28, 0.16, 0.18, '#ef4444', 0.60],
    [0.75, 0.15, 0.14, 0.16, '#f97316', 0.58],
    [0.48, 0.60, 0.18, 0.16, '#f97316', 0.55],
    [0.20, 0.70, 0.15, 0.16, '#eab308', 0.58],
    [0.70, 0.50, 0.16, 0.15, '#eab308', 0.55],
    [0.88, 0.78, 0.16, 0.17, '#22c55e', 0.75],
    [0.35, 0.85, 0.18, 0.16, '#22c55e', 0.72],
    [0.58, 0.08, 0.16, 0.16, '#22c55e', 0.70],
    [0.90, 0.40, 0.14, 0.15, '#16a34a', 0.68],
    [0.05, 0.55, 0.13, 0.14, '#22c55e', 0.65],
  ];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    W = canvas.width;
    H = canvas.height;
  }

  function x(r) { return r * W; }
  function y(r) { return r * H; }

  function drawMap() {
    ctx.clearRect(0, 0, W, H);

    // Land base
    ctx.fillStyle = C.land;
    ctx.fillRect(0, 0, W, H);

    // Parks (irregular polygons)
    drawPark([
      [0,0], [0.22,0], [0.22,0.04], [0.18,0.08], [0.20,0.14],
      [0.15,0.18], [0.10,0.16], [0,0.18]
    ]);
    drawPark([
      [0.76,0.70], [0.88,0.68], [0.95,0.72], [1.0,0.75],
      [1.0,1.0], [0.72,1.0], [0.70,0.88], [0.74,0.80]
    ]);
    drawPark([
      [0.36,0.80], [0.50,0.78], [0.54,0.84], [0.52,0.92],
      [0.44,0.96], [0.34,0.92], [0.32,0.86]
    ]);
    drawPark([
      [0,0.62], [0.14,0.60], [0.16,0.68], [0.10,0.74],
      [0,0.72]
    ]);

    // Water bodies (curved)
    drawWater();

    // Buildings (irregular clusters)
    drawBuildings();

    // Roads — draw borders first then fill
    drawRoads();

    // Heatmap zones
    drawHeatmap();

    // Light overlay
    ctx.fillStyle = 'rgba(219,234,254,0.08)';
    ctx.fillRect(0, 0, W, H);
  }

  function drawPark(pts) {
    ctx.beginPath();
    ctx.moveTo(x(pts[0][0]), y(pts[0][1]));
    for (let i = 1; i < pts.length; i++) ctx.lineTo(x(pts[i][0]), y(pts[i][1]));
    ctx.closePath();
    ctx.fillStyle = C.park;
    ctx.fill();
    // Tree dots
    ctx.fillStyle = C.parkDark;
    const cx = pts.reduce((s,p)=>s+p[0],0)/pts.length;
    const cy = pts.reduce((s,p)=>s+p[1],0)/pts.length;
    [[cx-0.03,cy-0.02],[cx+0.02,cy-0.01],[cx-0.01,cy+0.03],[cx+0.04,cy+0.02]].forEach(([tx,ty])=>{
      ctx.beginPath();
      ctx.arc(x(tx), y(ty), Math.min(W,H)*0.012, 0, Math.PI*2);
      ctx.fill();
    });
  }

  function drawWater() {
    // River-like shape
    ctx.beginPath();
    ctx.moveTo(x(0.82), y(0));
    ctx.bezierCurveTo(x(0.90),y(0.05), x(0.95),y(0.08), x(1.0),y(0.12));
    ctx.lineTo(x(1.0), y(0));
    ctx.closePath();
    ctx.fillStyle = C.water;
    ctx.fill();

    // Lake
    ctx.beginPath();
    ctx.ellipse(x(0.08), y(0.88), x(0.07), y(0.05), -0.3, 0, Math.PI*2);
    ctx.fillStyle = C.water;
    ctx.fill();
    ctx.strokeStyle = C.waterDark;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Small pond
    ctx.beginPath();
    ctx.ellipse(x(0.62), y(0.35), x(0.04), y(0.025), 0.4, 0, Math.PI*2);
    ctx.fillStyle = C.water;
    ctx.fill();
  }

  function drawBuildings() {
    const seed = [
      // [x, y, w, h, angle]
      [0.24,0.04,0.055,0.030,0], [0.31,0.04,0.048,0.028,0.1],
      [0.40,0.04,0.060,0.032,0], [0.50,0.04,0.052,0.028,0],
      [0.60,0.04,0.058,0.030,0.05], [0.68,0.04,0.050,0.028,0],

      [0.04,0.22,0.055,0.030,0], [0.12,0.22,0.048,0.028,0],
      [0.24,0.22,0.060,0.032,0.05], [0.32,0.22,0.052,0.028,0],
      [0.40,0.22,0.058,0.030,0], [0.52,0.22,0.050,0.028,0],
      [0.60,0.22,0.055,0.030,0], [0.68,0.22,0.048,0.028,0.08],
      [0.76,0.22,0.060,0.032,0],

      [0.04,0.38,0.055,0.030,0], [0.12,0.38,0.048,0.028,0],
      [0.24,0.38,0.060,0.032,0], [0.32,0.38,0.052,0.028,0.06],
      [0.40,0.38,0.058,0.030,0], [0.52,0.38,0.050,0.028,0],
      [0.60,0.38,0.055,0.030,0], [0.68,0.38,0.048,0.028,0],
      [0.76,0.38,0.060,0.032,0.04], [0.86,0.38,0.052,0.028,0],

      [0.04,0.54,0.055,0.030,0], [0.12,0.54,0.048,0.028,0.05],
      [0.24,0.54,0.060,0.032,0], [0.32,0.54,0.052,0.028,0],
      [0.40,0.54,0.058,0.030,0], [0.52,0.54,0.050,0.028,0],
      [0.60,0.54,0.055,0.030,0.07], [0.68,0.54,0.048,0.028,0],
      [0.76,0.54,0.060,0.032,0], [0.86,0.54,0.052,0.028,0],

      [0.04,0.70,0.055,0.030,0], [0.12,0.70,0.048,0.028,0],
      [0.24,0.70,0.060,0.032,0.04], [0.32,0.70,0.052,0.028,0],
      [0.40,0.70,0.058,0.030,0], [0.52,0.70,0.050,0.028,0],
      [0.60,0.70,0.055,0.030,0], [0.68,0.70,0.048,0.028,0.06],

      [0.04,0.86,0.055,0.030,0], [0.24,0.86,0.060,0.032,0],
      [0.32,0.86,0.052,0.028,0], [0.40,0.86,0.058,0.030,0],
      [0.52,0.86,0.050,0.028,0], [0.60,0.86,0.055,0.030,0],
    ];

    seed.forEach(([bx,by,bw,bh,angle], i) => {
      ctx.save();
      const cx = x(bx + bw/2), cy = y(by + bh/2);
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.fillStyle = i%3===0 ? C.building : i%3===1 ? '#e4dcd0' : '#ddd5c8';
      ctx.strokeStyle = C.buildingStroke;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.roundRect(-x(bw)/2, -y(bh)/2, x(bw), y(bh), 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });
  }

  function drawRoads() {
    // Highway border
    ctx.strokeStyle = C.highwayBorder;
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    // Horizontal highway
    ctx.beginPath();
    ctx.moveTo(0, y(0.50));
    ctx.bezierCurveTo(x(0.25),y(0.48), x(0.75),y(0.52), x(1.0),y(0.50));
    ctx.stroke();
    // Vertical highway
    ctx.beginPath();
    ctx.moveTo(x(0.50), 0);
    ctx.bezierCurveTo(x(0.48),y(0.25), x(0.52),y(0.75), x(0.50),y(1.0));
    ctx.stroke();
    // Diagonal highway
    ctx.beginPath();
    ctx.moveTo(0, y(0.20));
    ctx.bezierCurveTo(x(0.20),y(0.22), x(0.40),y(0.30), x(0.60),y(0.50));
    ctx.bezierCurveTo(x(0.72),y(0.62), x(0.85),y(0.72), x(1.0),y(0.78));
    ctx.stroke();

    // Highway fill
    ctx.strokeStyle = C.highway;
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(0, y(0.50));
    ctx.bezierCurveTo(x(0.25),y(0.48), x(0.75),y(0.52), x(1.0),y(0.50));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x(0.50), 0);
    ctx.bezierCurveTo(x(0.48),y(0.25), x(0.52),y(0.75), x(0.50),y(1.0));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, y(0.20));
    ctx.bezierCurveTo(x(0.20),y(0.22), x(0.40),y(0.30), x(0.60),y(0.50));
    ctx.bezierCurveTo(x(0.72),y(0.62), x(0.85),y(0.72), x(1.0),y(0.78));
    ctx.stroke();

    // Highway dashes
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 14]);
    ctx.beginPath();
    ctx.moveTo(0, y(0.50));
    ctx.bezierCurveTo(x(0.25),y(0.48), x(0.75),y(0.52), x(1.0),y(0.50));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x(0.50), 0);
    ctx.bezierCurveTo(x(0.48),y(0.25), x(0.52),y(0.75), x(0.50),y(1.0));
    ctx.stroke();
    ctx.setLineDash([]);

    // Major roads (border)
    const majorRoads = [
      [[0,0.16],[0.30,0.16],[0.50,0.18],[0.80,0.16],[1.0,0.16]],
      [[0,0.32],[0.25,0.33],[0.50,0.32],[0.75,0.33],[1.0,0.32]],
      [[0,0.66],[0.25,0.67],[0.50,0.66],[0.75,0.67],[1.0,0.66]],
      [[0,0.82],[0.30,0.82],[0.60,0.84],[1.0,0.82]],
      [[0.16,0],[0.17,0.25],[0.16,0.50],[0.17,0.75],[0.16,1.0]],
      [[0.33,0],[0.34,0.25],[0.33,0.50],[0.34,0.75],[0.33,1.0]],
      [[0.66,0],[0.67,0.25],[0.66,0.50],[0.67,0.75],[0.66,1.0]],
      [[0.83,0],[0.84,0.25],[0.83,0.50],[0.84,0.75],[0.83,1.0]],
    ];

    majorRoads.forEach(pts => {
      ctx.strokeStyle = C.majorBorder;
      ctx.lineWidth = 9;
      drawCurvedRoad(pts);
      ctx.strokeStyle = C.majorRoad;
      ctx.lineWidth = 6;
      drawCurvedRoad(pts);
    });

    // Minor roads
    const minorRoads = [
      [[0,0.08],[0.50,0.09],[1.0,0.08]],
      [[0,0.24],[0.50,0.25],[1.0,0.24]],
      [[0,0.40],[0.50,0.41],[1.0,0.40]],
      [[0,0.58],[0.50,0.57],[1.0,0.58]],
      [[0,0.74],[0.50,0.75],[1.0,0.74]],
      [[0,0.90],[0.50,0.91],[1.0,0.90]],
      [[0.08,0],[0.09,0.50],[0.08,1.0]],
      [[0.25,0],[0.26,0.50],[0.25,1.0]],
      [[0.42,0],[0.43,0.50],[0.42,1.0]],
      [[0.58,0],[0.59,0.50],[0.58,1.0]],
      [[0.75,0],[0.76,0.50],[0.75,1.0]],
      [[0.92,0],[0.93,0.50],[0.92,1.0]],
      // Diagonal minor
      [[0,0.42],[0.18,0.38],[0.35,0.32]],
      [[0.65,0.68],[0.80,0.62],[1.0,0.58]],
      [[0.20,0.60],[0.35,0.55],[0.48,0.50]],
    ];

    minorRoads.forEach(pts => {
      ctx.strokeStyle = C.minorBorder;
      ctx.lineWidth = 5;
      drawCurvedRoad(pts);
      ctx.strokeStyle = C.minorRoad;
      ctx.lineWidth = 3;
      drawCurvedRoad(pts);
    });
  }

  function drawCurvedRoad(pts) {
    ctx.beginPath();
    ctx.moveTo(x(pts[0][0]), y(pts[0][1]));
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i-1], curr = pts[i];
      const mx = (prev[0]+curr[0])/2, my = (prev[1]+curr[1])/2;
      ctx.quadraticCurveTo(x(prev[0]), y(prev[1]), x(mx), y(my));
    }
    const last = pts[pts.length-1];
    ctx.lineTo(x(last[0]), y(last[1]));
    ctx.stroke();
  }

  function drawHeatmap() {
    zones.forEach(([px, py, rx, ry, color, baseOp], i) => {
      const pulse = 1 + 0.05 * Math.sin(pulseT * 0.7 + i * 1.2);
      const cx = x(px), cy = y(py);
      const radX = x(rx) * pulse, radY = y(ry) * pulse;
      const maxR = Math.max(radX, radY);
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0,   hexRgba(color, baseOp));
      grad.addColorStop(0.4, hexRgba(color, baseOp * 0.6));
      grad.addColorStop(1,   hexRgba(color, 0));
      ctx.save();
      ctx.scale(1, radY / radX);
      ctx.beginPath();
      ctx.arc(cx, cy * (radX / radY), radX, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    });
  }

  function drawLabels() {
    ctx.font = `bold ${Math.max(9, W * 0.011)}px Inter, sans-serif`;
    ctx.fillStyle = C.roadLabel;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const labels = [
      [0.50, 0.495, 'MG ROAD'],
      [0.505, 0.30, 'MAIN ST'],
      [0.25, 0.50, 'RING ROAD'],
      [0.75, 0.50, 'OUTER RING'],
      [0.50, 0.16, 'HOSUR RD'],
      [0.50, 0.82, 'BANNERGHATTA RD'],
      [0.16, 0.50, 'TUMKUR RD'],
      [0.83, 0.50, 'OLD MADRAS RD'],
    ];

    labels.forEach(([lx, ly, text]) => {
      ctx.save();
      ctx.shadowColor = 'rgba(255,255,255,0.9)';
      ctx.shadowBlur = 4;
      ctx.fillText(text, x(lx), y(ly));
      ctx.restore();
    });
  }

  function hexRgba(hex, a) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function animate() {
    pulseT += 0.018;
    drawMap();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => { resize(); });
  resize();
  animate();
})();
