import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Hero } from '@/components/home/Hero';
import { RecentPosts } from '@/components/home/RecentPosts';
import { SkillsPreview } from '@/components/home/SkillsPreview';

function SectionDivider() {
  return (
    <div className="mx-auto max-w-xs" aria-hidden>
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SectionDivider />
      <SkillsPreview />
      <SectionDivider />
      <RecentPosts />
    </>
  );
}
