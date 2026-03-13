import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

export default function SectionPicker() {
    const setView = useAppStore((s) => s.setView);

    return (
        <div className="section-picker-wrap">
            {/* Back to landing */}
            <button className="picker-back-btn" onClick={() => setView('landing')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                </svg>
                Back to Home
            </button>

            <motion.div
                className="section-pick-card"
                style={{
                    '--card-glow': 'rgba(250,204,21,0.06)',
                    '--card-border': 'rgba(250,204,21,0.25)',
                    '--card-shadow': 'rgba(250,204,21,0.06)',
                    '--card-accent': '#facc15',
                }}
                initial={{ opacity: 0, scale: 0.8, y: 40, x: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => setView('dev')}
            >
                <div className="pick-icon">💻</div>
                <div className="pick-title">Development</div>
                <div className="pick-desc">HTML, CSS, JavaScript, SQL &amp; Git — complete syntax references and guides</div>
                <div className="pick-arrow">Enter →</div>
            </motion.div>

            <motion.div
                className="section-pick-card"
                style={{
                    '--card-glow': 'rgba(139,92,246,0.06)',
                    '--card-border': 'rgba(139,92,246,0.25)',
                    '--card-shadow': 'rgba(139,92,246,0.06)',
                    '--card-accent': '#8b5cf6',
                }}
                initial={{ opacity: 0, scale: 0.8, y: 40, x: -60 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={() => setView('dsa-grid')}
            >
                <div className="pick-icon">🧠</div>
                <div className="pick-title">DSA</div>
                <div className="pick-desc">Data Structures &amp; Algorithms — 150+ problems with C++ solutions and complexity analysis</div>
                <div className="pick-arrow">Enter →</div>
            </motion.div>
        </div>
    );
}
