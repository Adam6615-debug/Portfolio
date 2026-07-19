// ---------- Topology diagram (SVG built at runtime, blueprint linework style) ----------
(function () {
  const svg = document.getElementById('topo-svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';

  const nodes = {
    edu:    { x: 90,  y: 280, label: 'Education',        sub: 'El Sewedy UT — Net & Cyber Sec', col: 'source' },
    efin:   { x: 330, y: 100, label: 'Efinance',          sub: 'IR workflows, AI red-teaming',   col: 'mid' },
    solera: { x: 330, y: 280, label: 'IT Solera',         sub: 'SOC · Wazuh · malware analysis', col: 'mid' },
    nbk:    { x: 330, y: 460, label: 'NBK',                sub: 'Banking network security',       col: 'mid' },
    proj:   { x: 620, y: 280, label: 'Projects',           sub: 'AWS · SIEM · crypto · ML',        col: 'mid' },
    target: { x: 890, y: 280, label: 'Cloud Security Role', sub: 'AWS SAA-C03 in progress',        col: 'target' },
  };

  const links = [
    ['edu', 'efin'], ['edu', 'solera'], ['edu', 'nbk'],
    ['efin', 'proj'], ['solera', 'proj'], ['nbk', 'proj'],
    ['proj', 'target'],
  ];

  const colors = {
    line: 'var(--line-dim)',
    node: 'var(--line)',
    source: '#4A7FC1',
    mid: '#4A7FC1',
    target: '#E8A33D',
    text: 'var(--paper)',
    textDim: 'var(--paper-dim)',
  };

  function el(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
    return e;
  }

  // links first (so nodes sit on top)
  links.forEach(([a, b]) => {
    const A = nodes[a], B = nodes[b];
    const midX = (A.x + B.x) / 2;
    const d = `M ${A.x} ${A.y} L ${midX} ${A.y} L ${midX} ${B.y} L ${B.x} ${B.y}`;
    const path = el('path', {
      d, fill: 'none', stroke: colors.line, 'stroke-width': 1.5,
      'stroke-dasharray': '5 4', opacity: '0',
    });
    svg.appendChild(path);
    requestAnimationFrame(() => {
      path.style.transition = 'opacity 0.6s ease';
      path.style.opacity = '1';
    });
  });

  // nodes
  Object.values(nodes).forEach((n) => {
    const g = el('g', { transform: `translate(${n.x}, ${n.y})` });

    const isTarget = n.col === 'target';
    const r = isTarget ? 34 : 26;

    const halo = el('circle', {
      r: r + 6, fill: 'none', stroke: colors.line, 'stroke-width': 1,
      opacity: isTarget ? '0.5' : '0',
    });
    if (isTarget) {
      halo.style.animation = 'pulse 2.4s ease-in-out infinite';
    }
    g.appendChild(halo);

    const circle = el('circle', {
      r, fill: 'var(--bg)', stroke: isTarget ? colors.target : colors.node,
      'stroke-width': isTarget ? 2.5 : 1.5,
    });
    g.appendChild(circle);

    const dot = el('circle', { r: 3, fill: isTarget ? colors.target : colors.node });
    g.appendChild(dot);

    const label = el('text', {
      x: 0, y: r + 24, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono, monospace',
      'font-size': '13', 'font-weight': isTarget ? '600' : '500',
      fill: isTarget ? colors.target : colors.text,
    });
    label.textContent = n.label;
    g.appendChild(label);

    const sub = el('text', {
      x: 0, y: r + 42, 'text-anchor': 'middle', 'font-family': 'IBM Plex Sans, sans-serif',
      'font-size': '10.5', fill: colors.textDim,
    });
    sub.textContent = n.sub;
    g.appendChild(sub);

    svg.appendChild(g);
  });

  // pulse keyframes injected once
  const style = document.createElement('style');
  style.textContent = `@keyframes pulse {
    0%, 100% { opacity: 0.5; r: 40; }
    50% { opacity: 0.15; r: 46; }
  }`;
  document.head.appendChild(style);
})();

// ---------- Scroll reveal (subtle, respects reduced motion) ----------
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const targets = document.querySelectorAll('.log__entry, .pcard, .cert, .spec-col');
  targets.forEach((t) => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(14px)';
    t.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((t) => io.observe(t));
})();
