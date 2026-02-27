import MexicoCityHero from './components/MexicoCityHero.tsx';
import LocalValueProps from './components/LocalValueProps.tsx';
import MexicoCityServices from './components/MexicoCityServices.tsx';
import LocalKnowledge from './components/LocalKnowledge.tsx';
import MexicoCityPortfolio from './components/MexicoCityPortfolio.tsx';
import MexicoCityContact from './components/MexicoCityContact.tsx';
import Navbar from '@/app/components/Navbar';

export default function MexicoCityPage() {
  return (
    <main className="bg-black">
      <Navbar />
      <MexicoCityHero />
      <LocalValueProps />
      <MexicoCityServices />
      <LocalKnowledge />
      <MexicoCityPortfolio />
      <MexicoCityContact />
    </main>
  );
}
