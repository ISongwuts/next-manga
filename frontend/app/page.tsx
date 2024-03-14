import Banner from "@/components/banner";
import SectionLabel from "@/components/header-label";
import MangaArea from "@/components/manga-area";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-12 px-96 py-12 max-[560px]:px-6 max-[560px]:py-6">
      <Banner />
      <SectionLabel label="Recently Update"/>
      <MangaArea />
    </main>
  );
}
