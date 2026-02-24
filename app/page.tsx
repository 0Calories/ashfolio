import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { Hero } from '@/components/home/Hero';
import { RecentPosts } from '@/components/home/RecentPosts';
import { SkillsPreview } from '@/components/home/SkillsPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsPreview />
      <RecentPosts />
    </>
  );
}
