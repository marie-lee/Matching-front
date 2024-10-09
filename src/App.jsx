import '@/global.css';
import { useEffect, useState } from 'react';
import Router from '@/routes';
import { useScrollToTop } from '@/hooks/use-scroll-to-top';
import GuidePopup from '@/pages/guide/GuidePopup';

// ----------------------------------------------------------------------

function App() {
  useScrollToTop();

  const [openGuidePopup, setOpenGuidePopup] = useState(false);

  useEffect(() => {
    const hideGuidePopup = localStorage.getItem('hideGuidePopup');
    if (!hideGuidePopup) {
      setOpenGuidePopup(true);
    }
  }, []);

  const handleCloseGuidePopup = () => {
    setOpenGuidePopup(false);
  };

  return (
    <>
      <Router />
      <GuidePopup open={openGuidePopup} onClose={handleCloseGuidePopup} />
    </>
  );
}

export default App;
