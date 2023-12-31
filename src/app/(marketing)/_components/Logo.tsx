import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/logo.png"
        height="40"
        width="40"
        alt="logo"
        className="w-8 h-8"
      />
      <p className={cn("font-semibold", poppins.className)}>Notion</p>
    </div>
  );
}
