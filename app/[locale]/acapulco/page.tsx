import AcapulcoHero from './components/AcapulcoHero.tsx';
import LocalValueProps from './components/LocalValueProps.tsx';
import AcapulcoServices from './components/AcapulcoServices.tsx';
import LocalKnowledge from './components/LocalKnowledge.tsx';
import AcapulcoPortfolio from './components/AcapulcoPortfolio.tsx';
import AcapulcoContact from './components/AcapulcoContact.tsx';
import Navbar from '@/app/components/Navbar';

export default function AcapulcoPage() {
  return (
    <main className="bg-black">
      <Navbar />
      <AcapulcoHero />
      <LocalValueProps />
      <AcapulcoServices />
      <LocalKnowledge />
      <AcapulcoPortfolio />
      <AcapulcoContact />
    </main>
  );
}
