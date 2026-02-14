import CoyoacanHero from './components/CoyoacanHero';
import LocalValueProps from './components/LocalValueProps';
import CoyoacanServices from './components/CoyoacanServices';
import LocalKnowledge from './components/LocalKnowledge';
import CoyoacanPortfolio from './components/CoyoacanPortfolio';
import CoyoacanContact from './components/CoyoacanContact';

export default function CoyoacanPage() {
  return (
    <main className="bg-black">
      <CoyoacanHero />
      <LocalValueProps />
      <CoyoacanServices />
      <LocalKnowledge />
      <CoyoacanPortfolio />
      <CoyoacanContact />
    </main>
  );
}
