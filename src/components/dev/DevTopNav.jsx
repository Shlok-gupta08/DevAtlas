import { useEffect, useRef, useState, useCallback } from 'react';

export default function DevTopNav({ langData, activeLang, sidebarCollapsed }) {
    const [activeSection, setActiveSection] = useState(null);
    const observerRef = useRef(null);

    const sections = langData?.sections || [];

    /* Scroll spy with IntersectionObserver */
    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id.replace('section-', ''));
                    }
                }
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
        );

        observerRef.current = observer;

        // Small delay so DOM is painted
        const timer = setTimeout(() => {
            sections.forEach((s) => {
                const el = document.getElementById('section-' + s.id);
                if (el) observer.observe(el);
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [sections, activeLang]);

    const scrollToSection = useCallback((sectionId) => {
        const el = document.getElementById('section-' + sectionId);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 64;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }, []);

    return (
        <div className={`dev-topnav ${sidebarCollapsed ? 'expanded' : ''}`}>
            {sections.map((s) => (
                <button
                    key={s.id}
                    className={`topnav-pill ${activeSection === s.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(s.id)}
                >
                    {s.title}
                </button>
            ))}
        </div>
    );
}
