import CuernavacaHero from './components/CuernavacaHero.tsx';
import LocalValueProps from './components/LocalValueProps.tsx';
import CuernavacaServices from './components/CuernavacaServices.tsx';
import LocalKnowledge from './components/LocalKnowledge.tsx';
import CuernavacaPortfolio from './components/CuernavacaPortfolio.tsx';
import CuernavacaContact from './components/CuernavacaContact.tsx';
import Navbar from '@/app/components/Navbar';

export default function CuernavacaPage() {
  return (
    <main className="bg-black">
      <Navbar />
      <CuernavacaHero />
      <LocalValueProps />
      <CuernavacaServices />
      <LocalKnowledge />
      <CuernavacaPortfolio />
      <CuernavacaContact />
    </main>
  );
}
