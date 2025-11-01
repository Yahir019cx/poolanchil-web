// Home.jsx
import { lazy, Suspense } from 'react';
import { HeroSection } from '../components/layout/HeroSection';

// Lazy load components below the fold
const FeatureCard = lazy(() => import('../components/layout/FeatureCard').then(module => ({ default: module.FeatureCard })));
const CircleCard = lazy(() => import('../components/layout/CircleCard').then(module => ({ default: module.CircleCard })));
const TechCarousel = lazy(() => import('../components/layout/TechCarousel').then(module => ({ default: module.TechCarousel })));

export default function Home() {
  return (
    <div className="pt-8 md:pt-12 lg:pt-18">
      <HeroSection />
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <div className="-mt-3 md:-mt-20 lg:-mt-24">
          <FeatureCard />
        </div>
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-white animate-pulse" />}>
        <CircleCard />
      </Suspense>
      <Suspense fallback={<div className="mb-10 h-64 bg-gray-50 animate-pulse" />}>
        <div className="mb-10">
          <TechCarousel />
        </div>
      </Suspense>
    </div>
  );
}