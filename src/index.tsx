import { createRoot } from 'react-dom/client'
import './scss/index.scss'
import App from './App';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
