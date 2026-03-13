import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';

function highlightCodeElement(el) {
    const raw = el.textContent || '';
    const langClass = Array.from(el.classList).find((cls) => cls.startsWith('language-'));
    const requestedLang = langClass ? langClass.replace('language-', '').toLowerCase() : '';

    const languageMap = {
        js: 'javascript',
        ts: 'typescript',
        py: 'python',
        csharp: 'cs',
        sh: 'bash',
        shell: 'bash',
        zsh: 'bash',
        plaintext: 'text',
        txt: 'text',
    };

    const normalizedLang = languageMap[requestedLang] || requestedLang;
    const result = normalizedLang && hljs.getLanguage(normalizedLang)
        ? hljs.highlight(raw, { language: normalizedLang })
        : hljs.highlightAuto(raw);

    el.innerHTML = result.value;
    el.classList.add('hljs');
    el.dataset.highlighted = 'yes';
}

export default function DevContent({ langData, activeLang }) {
    const contentRef = useRef(null);

    /* Re-highlight code blocks + scroll to top when content changes */
    useEffect(() => {
        if (!contentRef.current) return;
        contentRef.current.querySelectorAll('pre code').forEach((el) => {
            highlightCodeElement(el);
        });

        // Set up copy buttons
        contentRef.current.querySelectorAll('.copy-btn').forEach((btn) => {
            btn.addEventListener('click', handleCopy);
        });

        window.scrollTo({ top: 0, behavior: 'instant' });

        return () => {
            if (!contentRef.current) return;
            contentRef.current.querySelectorAll('.copy-btn').forEach((btn) => {
                btn.removeEventListener('click', handleCopy);
            });
        };
    }, [langData, activeLang]);

    /* Observe cards for scroll-in animations */
    useEffect(() => {
        if (!contentRef.current) return;
        const cards = contentRef.current.querySelectorAll('.content-card');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        cards.forEach((card) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(24px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
        return () => observer.disconnect();
    }, [langData, activeLang]);

    function handleCopy(e) {
        const btn = e.currentTarget;
        const wrapper = btn.closest('.code-wrapper');
        if (!wrapper) return;
        const codeEl = wrapper.querySelector('code');
        if (!codeEl) return;
        navigator.clipboard.writeText(codeEl.textContent).then(() => {
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
        });
    }

    if (!langData) {
        return (
            <div className="dev-content">
                <div style={{ padding: '80px 48px', color: '#333' }}>
                    Select a language from the sidebar.
                </div>
            </div>
        );
    }

    return (
        <div className="dev-content" ref={contentRef} data-lang={activeLang}>
            {/* Section hero */}
            <div className="section-hero">
                <h1>{langData.name}</h1>
                {langData.desc && <p>{langData.desc}</p>}
            </div>

            {langData.sections.map((sec) => (
                <div key={sec.id}>
                    <div className="section-divider" />
                    <div id={`section-${sec.id}`} className="section-block">
                        <h2 className="subsection-header">{sec.title}</h2>
                        {sec.desc && <p className="subsection-desc">{sec.desc}</p>}
                        {sec.cards.map((card, ci) => (
                            <div
                                key={ci}
                                className="content-card"
                            >
                                {card.title && <h3>{card.title}</h3>}
                                {/* Card body is trusted HTML from data files */}
                                <div dangerouslySetInnerHTML={{ __html: card.body }} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
