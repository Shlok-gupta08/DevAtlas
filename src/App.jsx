import { useAppStore } from './store/useAppStore';
import LandingPage from './components/landing/LandingPage';
import SectionPicker from './components/landing/SectionPicker';
import DevView from './components/dev/DevView';
import DSACategoryGrid from './components/dsa/DSACategoryGrid';
import DSAQuestionView from './components/dsa/DSAQuestionView';
import DSAFilteredView from './components/dsa/DSAFilteredView';

/* Root component — switches views based on global navigation state */
export default function App() {
    const view = useAppStore((s) => s.view);

    switch (view) {
        case 'landing':
            return <LandingPage />;
        case 'picker':
            return <SectionPicker />;
        case 'dev':
            return <DevView />;
        case 'dsa-grid':
            return <DSACategoryGrid />;
        case 'dsa-question':
            return <DSAQuestionView />;
        case 'dsa-filtered':
            return <DSAFilteredView />;
        default:
            return <LandingPage />;
    }
}
