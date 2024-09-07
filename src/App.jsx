import '@/global.css';

import Router from '@/routes';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';

// ----------------------------------------------------------------------

function App() {
  useScrollToTop();

  return <Router />;
}
export default App;
