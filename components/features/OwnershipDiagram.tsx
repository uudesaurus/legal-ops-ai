'use client';

import { motion } from 'framer-motion';

const PERSONS = [
  { x: 65, y: 470, name: 'Angela Trismitro', pct: '47.10%', role: 'UBO' as const },
  { x: 145, y: 470, name: 'Leliany Trismitro', pct: '22.73%', role: 'Near' as const },
  { x: 225, y: 470, name: 'Roswita Trismitro', pct: '18.48%', role: 'Near' as const },
  { x: 305, y: 470, name: 'Roy K.K.H.', pct: '0.54%', role: 'Minor' as const },
  { x: 430, y: 470, name: 'Ida Juda', pct: '6.13%', role: 'Near' as const },
  { x: 555, y: 470, name: 'Sofian Juda', pct: '5.02%', role: 'Near' as const },
];

export function OwnershipDiagram() {
  return (
    <svg
      viewBox="0 0 820 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 820, height: 'auto', display: 'block', overflow: 'visible' }}
    >
      {/* ── Edge Lines ── */}
      <motion.path d="M400 90 L400 155" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.2 }} />
      <motion.path d="M400 225 L400 290" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.4 }} />
      <motion.path d="M400 225 L250 290" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.45 }} />
      <motion.path d="M400 225 L550 290" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.45 }} />
      <motion.path d="M250 410 L120 470" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.7 }} />
      <motion.path d="M250 410 L185 470" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
      <motion.path d="M250 410 L250 470" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.9 }} />
      <motion.path d="M250 410 L315 470" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1.0 }} />
      <motion.path d="M250 410 L380 470" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1.1 }} />
      <motion.path d="M550 410 L480 470" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.9 }} />
      <motion.path d="M550 410 L620 470" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1.0 }} />

      {/* ── Target Company ── */}
      <motion.g initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}>
        <rect x="295" y="30" width="210" height="60" rx="8" fill="var(--surface-elevated)" stroke="var(--border-focus)" strokeWidth="1.5" />
        <circle cx="499" cy="60" r="4" fill="var(--text-secondary)" opacity="0.7" />
        <text x="400" y="53" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontFamily="Space Mono, monospace" fontWeight="600">PT EKACITTA DIAN PERTIWI</text>
        <text x="400" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="Space Mono, monospace" letterSpacing="0.05em">TARGET COMPANY</text>
      </motion.g>

      {/* ── Holding Companies ── */}
      <motion.g initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}>
        <rect x="140" y="290" width="220" height="55" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="250" y="313" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="Space Mono, monospace" fontWeight="500">PT LANIROS GEMALA SAKTI</text>
        <text x="250" y="330" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="Space Mono, monospace">Intermediate Holding · 30%</text>
        <text x="250" y="338" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="Space Mono, monospace">47% via PT EDP</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}>
        <rect x="400" y="290" width="220" height="55" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="510" y="313" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="Space Mono, monospace" fontWeight="500">PT EKACITTA DIAN PERSADA</text>
        <text x="510" y="330" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="Space Mono, monospace">Intermediate Holding · 70%</text>
        <text x="510" y="338" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="Space Mono, monospace">direct</text>
      </motion.g>

      <motion.g initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}>
        <rect x="440" y="410" width="220" height="55" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="550" y="433" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="Space Mono, monospace" fontWeight="500">PT JUDA UTAMA DHARMA ABADI</text>
        <text x="550" y="450" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontFamily="Space Mono, monospace">3.2% via PT EDP</text>
      </motion.g>

      {/* ── Individual UBO Boxes ── */}
      {PERSONS.map((person, i) => (
        <motion.g key={person.name}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.08 }}>
          <rect x={person.x} y={person.y} width="105" height="44" rx="4" fill="var(--bg-alt)" stroke="var(--border)" strokeWidth="1" />
          <text x={person.x + 52} y={person.y + 16} textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontFamily="Space Mono, monospace" fontWeight="500">{person.name}</text>
          <text x={person.x + 52} y={person.y + 30} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="Space Mono, monospace" fontWeight="600">{person.pct}</text>
          {person.role === 'UBO' && (
            <>
              <rect x={person.x + 3} y={person.y + 3} width="24" height="12" rx="2" fill="var(--surface-elevated)" stroke="var(--border-focus)" strokeWidth="1" />
              <text x={person.x + 15} y={person.y + 11} textAnchor="middle" fill="var(--text-primary)" fontSize="7" fontFamily="Space Mono, monospace" fontWeight="700" letterSpacing="0.05em">UBO</text>
            </>
          )}
        </motion.g>
      ))}

      {/* ── Legend ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ transform: 'translate(20px, 20px)' }}>
        <text x="0" y="0" fill="var(--text-muted)" fontSize="8" fontFamily="Space Mono, monospace" fontWeight="700" letterSpacing="0.08em">LEGEND</text>
        <rect x="0" y="8" width="8" height="8" rx="1.5" fill="var(--surface-elevated)" stroke="var(--border-focus)" strokeWidth="1.5" />
        <text x="14" y="15" fill="var(--text-muted)" fontSize="8" fontFamily="Space Mono, monospace">Target Company</text>
        <rect x="0" y="24" width="8" height="8" rx="1.5" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
        <text x="14" y="31" fill="var(--text-muted)" fontSize="8" fontFamily="Space Mono, monospace">Holding Co.</text>
        <rect x="0" y="40" width="8" height="8" rx="1.5" fill="var(--bg-alt)" stroke="var(--border)" strokeWidth="1" />
        <text x="14" y="47" fill="var(--text-muted)" fontSize="8" fontFamily="Space Mono, monospace">Individual</text>
        <rect x="0" y="56" width="8" height="8" rx="1.5" fill="var(--surface-elevated)" stroke="var(--border-focus)" strokeWidth="1" />
        <text x="14" y="63" fill="var(--text-muted)" fontSize="8" fontFamily="Space Mono, monospace">UBO Badge (&gt;25%)</text>
      </motion.g>

      {/* ── Percentage Labels on Lines ── */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <text x="405" y="125" fill="var(--text-muted)" fontSize="8" fontFamily="Space Mono, monospace" fillOpacity="0.6">100%</text>
        <text x="315" y="262" fill="var(--text-muted)" fontSize="8" fontFamily="Space Mono, monospace" fillOpacity="0.6">30%</text>
        <text x="465" y="262" fill="var(--text-muted)" fontSize="8" fontFamily="Space Mono, monospace" fillOpacity="0.6">70%</text>
      </motion.g>
    </svg>
  );
}
