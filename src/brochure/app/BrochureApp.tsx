import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/brochure/components/Navbar";
import { Hero } from "@/brochure/components/Hero";
import { QuickNav } from "@/brochure/components/QuickNav";
import { ProjectsSection } from "@/brochure/components/ProjectsSection";
import { FeaturesSection } from "@/brochure/components/FeaturesSection";
import { ValuesSection } from "@/brochure/components/ValuesSection";
import { GallerySection } from "@/brochure/components/GallerySection";
import { Footer } from "@/brochure/components/Footer";
import { useBrochureData } from "@/brochure/hook/useBrochureData";

const queryClient = new QueryClient();

export const BrochureApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrochureContent />
    </QueryClientProvider>
  );
};

function BrochureContent() {
  const { data, isLoading, isError } = useBrochureData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Cargando brochure...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-destructive">
        No fue posible cargar la información del brochure.
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar logoUrl={data.logoUrl} links={data.navLinks} />
      <Hero hero={data.hero} />
      <QuickNav links={data.quickNavLinks} />

      <main className="relative z-20 max-w-[1200px] mx-auto mt-12 px-6 max-sm:px-3">
        <ProjectsSection projects={data.projects} />
        <FeaturesSection
          eyebrow={data.featuresSection.eyebrow}
          title={data.featuresSection.title}
          cards={data.featuresSection.cards}
        />
        <ValuesSection values={data.values} />
        <GallerySection
          title={data.gallerySection.title}
          subtitle={data.gallerySection.subtitle}
          ctaLabel={data.gallerySection.ctaLabel}
          images={data.gallerySection.images}
        />
      </main>

      <Footer footer={data.footer} />
    </div>
  );
}
