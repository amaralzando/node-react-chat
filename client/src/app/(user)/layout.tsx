import Header from "@/src/components/header";
import PageWrapper from "@/src/components/pagewrapper";
import { SideBar } from "@/src/components/sidebar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      <div className="flex flex-col h-full w-full">
        <Header />
        <PageWrapper children={children} />
      </div>
    </>
  );
}
