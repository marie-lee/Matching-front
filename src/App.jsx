import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import Router from '@/routes';

// ----------------------------------------------------------------------

function App() {
  useScrollToTop();

  return (
    <>
      <Router />
    </>
  );
}

export default App;
