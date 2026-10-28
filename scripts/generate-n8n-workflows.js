const fs = require('fs');

function createHtml({ title, nodes, connections }) {
  const svgConnections = connections.map(c => `
    <path d="${c.path}" fill="none" stroke="${c.color || '#9a8af5'}" stroke-width="2.5" stroke-dasharray="${c.dashed ? '6,6' : 'none'}" filter="url(#glow)" />
    <circle cx="${c.startX}" cy="${c.startY}" r="4" fill="#ffffff" />
    <circle cx="${c.endX}" cy="${c.endY}" r="4" fill="#ffffff" />
  `).join('\n');

  const nodesHtml = nodes.map(n => `
    <div class="node" style="left: ${n.x}px; top: ${n.y}px;">
      <div class="node-header">
        <div class="node-icon" style="${n.iconStyle || ''}">
          ${n.iconSvg}
        </div>
        <div class="node-meta">
          <div class="node-title">${n.title}</div>
          <div class="node-subtitle">${n.subtitle}</div>
        </div>
      </div>
      <div class="node-footer">
        <span class="status-dot"></span>
        <span class="status-text">${n.status || 'Success 200 OK'}</span>
        <span class="status-time">${n.time || '18ms'}</span>
      </div>
    </div>
  `).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  body {
    width: 1600px;
    height: 900px;
    background-color: #0f121d;
    background-image: radial-gradient(#242a40 1.2px, transparent 1.2px);
    background-size: 24px 24px;
    color: #e2e8f0;
    overflow: hidden;
    position: relative;
  }
  .navbar {
    height: 64px;
    background: #151828;
    border-bottom: 1px solid #232842;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    position: relative;
    z-index: 100;
  }
  .nav-left { display: flex; align-items: center; gap: 20px; }
  .logo { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 22px; color: #ff5d73; }
  .logo svg { width: 28px; height: 28px; fill: #ff5d73; }
  .workflow-name {
    font-size: 16px;
    font-weight: 600;
    color: #f8fafc;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #1c2136;
    padding: 6px 14px;
    border-radius: 8px;
    border: 1px solid #2c3252;
  }
  .nav-right { display: flex; align-items: center; gap: 16px; }
  .status-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
    font-size: 13px;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }
  .status-badge::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: #10b981; }
  .execute-btn {
    background: linear-gradient(135deg, #ff5d73 0%, #ff385c 100%);
    color: white;
    font-weight: 700;
    font-size: 14px;
    padding: 9px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(255, 93, 115, 0.4);
  }

  .canvas { position: absolute; inset: 64px 0 0 0; width: 100%; height: calc(100% - 64px); }
  .connections { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5; }

  .node {
    position: absolute;
    width: 250px;
    background: #181c2e;
    border: 1px solid #2c3352;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
    z-index: 10;
  }
  .node-header { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
  .node-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .node-meta { flex: 1; min-width: 0; }
  .node-title { font-size: 14px; font-weight: 700; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .node-subtitle { font-size: 11px; color: #94a3b8; margin-top: 2px; }

  .node-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    border-top: 1px solid #252b45;
    font-size: 11px;
    color: #94a3b8;
  }
  .status-dot { width: 7px; height: 7px; border-radius: 50%; background: #10b981; margin-right: 6px; display: inline-block; }
  .status-text { color: #10b981; font-weight: 600; flex: 1; }
  .status-time { color: #64748b; font-family: monospace; font-size: 10px; }
</style>
</head>
<body>
  <div class="navbar">
    <div class="nav-left">
      <div class="logo">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
        n8n
      </div>
      <div class="workflow-name">${title}</div>
    </div>
    <div class="nav-right">
      <div class="status-badge">Active Workflow</div>
      <div class="execute-btn">Execute Workflow</div>
    </div>
  </div>

  <div class="canvas">
    <svg class="connections">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      ${svgConnections}
    </svg>

    ${nodesHtml}
  </div>
</body>
</html>`;
}

// 4. WhatsApp & Lead Automation Workflow
const whatsappHtml = createHtml({
  title: "WhatsApp Inbound Lead Automation & Auto-Booking",
  connections: [
    { startX: 330, startY: 340, endX: 430, endY: 340, path: "M 330 340 C 380 340, 380 340, 430 340", color: "#22c55e" },
    { startX: 680, startY: 340, endX: 780, endY: 340, path: "M 680 340 C 730 340, 730 340, 780 340", color: "#6366f1" },
    { startX: 1030, startY: 320, endX: 1150, endY: 220, path: "M 1030 320 C 1090 320, 1090 220, 1150 220", color: "#f59e0b" },
    { startX: 1030, startY: 360, endX: 1150, endY: 460, path: "M 1030 360 C 1090 360, 1090 460, 1150 460", color: "#10b981" },
  ],
  nodes: [
    {
      x: 80, y: 285,
      title: "WhatsApp Business API", subtitle: "Webhook Inbound Lead",
      iconStyle: "background: linear-gradient(135deg, #22c55e, #15803d);",
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
      status: "Triggered 200 OK", time: "14ms"
    },
    {
      x: 430, y: 285,
      title: "AI Lead Qualifier", subtitle: "Intent & Budget Scoring",
      iconStyle: "background: linear-gradient(135deg, #6366f1, #4f46e5);",
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
      status: "High Intent 94%", time: "310ms"
    },
    {
      x: 780, y: 285,
      title: "Lead Router & Tagging", subtitle: "Classify Opportunity",
      iconStyle: "background: linear-gradient(135deg, #8b5cf6, #7c3aed);",
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
      status: "Tagged #VIP-Prospect", time: "25ms"
    },
    {
      x: 1150, y: 165,
      title: "HubSpot CRM Pipeline", subtitle: "Create Deal & Assign Rep",
      iconStyle: "background: linear-gradient(135deg, #f59e0b, #d97706);",
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      status: "Deal Stage: Qualified", time: "180ms"
    },
    {
      x: 1150, y: 405,
      title: "Instant Auto-Reply", subtitle: "Booking Link & Catalog Sent",
      iconStyle: "background: linear-gradient(135deg, #10b981, #059669);",
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
      status: "Delivered in 1.8s", time: "42ms"
    }
  ]
});

// 5. Enterprise AI Consulting & Architecture Roadmap
const roadmapHtml = createHtml({
  title: "Enterprise AI Architecture & Multi-Agent Orchestration",
  connections: [
    { startX: 330, startY: 340, endX: 430, endY: 340, path: "M 330 340 C 380 340, 380 340, 430 340", color: "#3b82f6" },
    { startX: 680, startY: 340, endX: 780, endY: 340, path: "M 680 340 C 730 340, 730 340, 780 340", color: "#8b5cf6" },
    { startX: 1030, startY: 340, endX: 1150, endY: 340, path: "M 1030 340 C 1090 340, 1090 340, 1150 340", color: "#10b981" },
  ],
  nodes: [
    {
      x: 80, y: 285,
      title: "Enterprise Gateway", subtitle: "Multi-Model Router",
      iconStyle: "background: linear-gradient(135deg, #3b82f6, #1d4ed8);",
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
      status: "Load Balanced", time: "10ms"
    },
    {
      x: 430, y: 285,
      title: "Autonomous Agent Core", subtitle: "Multi-step Reasoning Loop",
      iconStyle: "background: linear-gradient(135deg, #8b5cf6, #7c3aed);",
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
      status: "Agent Consensus 100%", time: "420ms"
    },
    {
      x: 780, y: 285,
      title: "Enterprise Tool Execution", subtitle: "Secure Internal APIs",
      iconStyle: "background: linear-gradient(135deg, #f59e0b, #d97706);",
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      status: "Zero-Trust Verified", time: "95ms"
    },
    {
      x: 1150, y: 285,
      title: "Production ERP & Data Lake", subtitle: "Snowflake & PostgreSQL Sync",
      iconStyle: "background: linear-gradient(135deg, #10b981, #047857);",
      iconSvg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
      status: "100k Records/min", time: "32ms"
    }
  ]
});

fs.writeFileSync('temp_whatsapp.html', whatsappHtml);
fs.writeFileSync('temp_roadmap.html', roadmapHtml);

console.log('Templates for WhatsApp and Roadmap generated.');
