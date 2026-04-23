'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import styles from './ArchitectureDiagram.module.css';

const DIAGRAM_CODE = `
flowchart LR
    A["👤 User<br/><span style='font-size:11px;font-family:Space Mono,monospace'>Browser</span>"] --> B["🔐 Clerk Auth<br/><span style='font-size:11px;font-family:Space Mono,monospace'>Authentication</span>"]
    B --> C["📊 Dashboard<br/><span style='font-size:11px;font-family:Space Mono,monospace'>KARNA Platform</span>"]
    C --> D["⚡ UBO Workflow<br/><span style='font-size:11px;font-family:Space Mono,monospace'>Analysis Engine</span>"]
    D --> E["📄 PDF Upload<br/><span style='font-size:11px;font-family:Space Mono,monospace'>AHU Documents</span>"]
    E --> F["🧠 AI Engine<br/><span style='font-size:11px;font-family:Space Mono,monospace'>GPT-4o</span>"]
    F --> G["🇮🇩 Ditjen AHU<br/><span style='font-size:11px;font-family:Space Mono,monospace'>Indonesian Registry</span>"]
    F --> H["📋 UBO Report<br/><span style='font-size:11px;font-family:Space Mono,monospace'>Analysis Results</span>"]
    H --> C
    H --> I["📤 Export<br/><span style='font-size:11px;font-family:Space Mono,monospace'>PDF / JSON</span>"]
    C --> J["👥 Admin Panel<br/><span style='font-size:11px;font-family:Space Mono,monospace'>Management</span>"]
    J --> K["User Mgmt<br/><span style='font-size:11px;font-family:Space Mono,monospace'>Team Control</span>"]
    J --> L["Audit Log<br/><span style='font-size:11px;font-family:Space Mono,monospace'>Activity Trail</span>"]

    style A fill:#141416,stroke:#27272a,color:#fafafa
    style B fill:#1a1a1d,stroke:#52525b,color:#fafafa
    style C fill:#1a1a1d,stroke:#52525b,color:#fef3c7
    style D fill:#141416,stroke:#27272a,color:#fafafa
    style E fill:#141416,stroke:#27272a,color:#fafafa
    style F fill:#1a1a1d,stroke:#fef3c7,color:#fef3c7
    style G fill:#141416,stroke:#27272a,color:#dbeafe
    style H fill:#141416,stroke:#27272a,color:#fafafa
    style I fill:#141416,stroke:#27272a,color:#fafafa
    style J fill:#1a1a1d,stroke:#52525b,color:#fafafa
    style K fill:#141416,stroke:#27272a,color:#a1a1aa
    style L fill:#141416,stroke:#27272a,color:#a1a1aa
`;

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#1a1a1d',
    primaryTextColor: '#fafafa',
    primaryBorderColor: '#27272a',
    lineColor: '#3f3f46',
    secondaryColor: '#141416',
    tertiaryColor: '#0f0f11',
    background: '#09090b',
    mainBkg: '#1a1a1d',
    nodeBorder: '#27272a',
    clusterBkg: '#141416',
    titleColor: '#fafafa',
    edgeLabelBackground: '#141416',
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis',
    nodeSpacing: 48,
    rankSpacing: 56,
    padding: 16,
  },
  fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
});

export function ArchitectureDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderDiagram = async () => {
      try {
        const id = `karna-architecture-${Date.now()}`;
        const { svg } = await mermaid.render(id, DIAGRAM_CODE);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid diagram render error:', err);
        if (containerRef.current) {
          containerRef.current.innerHTML =
            '<p style="color:var(--error);font-family:Space Mono,monospace;font-size:12px;">Failed to render diagram</p>';
        }
      }
    };

    renderDiagram();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>Platform Architecture</h3>
          <span className={styles.badge}>Live</span>
        </div>
        <p className={styles.subtitle}>
          KARNA Legal Ops AI — end-to-end data flow
        </p>
      </div>
      <div className={styles.diagramContainer} ref={containerRef} />
    </div>
  );
}
