// Home.jsx
import { HeroSection } from '../components/layout/HeroSection';
import { FeatureCard } from '../components/layout/FeatureCard';
import { CircleCard } from '../components/layout/CircleCard';
import { TechCarousel } from '../components/layout/TechCarousel';

export default function Home() {
  return (
    <div className="pt-8 md:pt-12 lg:pt-18">
      <HeroSection />
      <div className="-mt-3 md:-mt-20 lg:-mt-24">
        <FeatureCard />
      </div>
      <CircleCard />
      <div className="mb-10">
        <TechCarousel />
      </div>
    </div>
  );
}