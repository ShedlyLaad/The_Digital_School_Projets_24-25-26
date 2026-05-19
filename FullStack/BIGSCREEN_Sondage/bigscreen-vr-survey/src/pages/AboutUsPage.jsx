import React from "react";
import HeroSection from "./_components/HeroSection";
import { NavBar } from "./_components/Navbar";
import { Home, User } from "lucide-react";
import { ROUTES } from "../lib/constants";

export function AboutUsPage() {
  const navItems = [
    { name: "Home", url: ROUTES.HOME, icon: Home },
    { name: "About Us", url: ROUTES.ABOUT_US, icon: User },
    { name: "Commencer le sondage", url: ROUTES.SURVEY, icon: null },
  ];

  return (
    <div className="min-h-screen w-full relative">
      <NavBar
        items={navItems}
        className="top-0 left-1/2 -translate-x-1/2 z-50 pt-10"
      />
      <HeroSection
        title1="À propos de Bigscreen"
        title2="Notre équipe & notre vision"
        badge="Founded in 2014, we are a global team of developers passionate about virtual reality."
      />
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <p className="mb-6 text-lg text-muted-foreground">
          Bigscreen is a virtual reality platform that people use to watch movies,
          play games, and use their computer in VR collaboratively with friends.
        </p>
        <p className="mb-6 text-lg text-muted-foreground">
          Since launching in 2016, Bigscreen has over 6 million users. Bigscreen
          supports headsets on Steam (Bigscreen Beyond, Valve Index, HTC Vive,
          Windows Mixed Reality headsets) and the Meta Quest platform. Bigscreen
          has also partnered with major movie studios such as Paramount Pictures.
        </p>
        <p className="mb-6 text-lg text-muted-foreground">
          In 2023, we launched Bigscreen Beyond, the world’s smallest VR headset.
          Beyond was developed to solve issues with comfort and ergonomics in VR,
          while simultaneously pushing the bounds of immersion and quality.
          Ultimately, to deliver the best software experience in Bigscreen, we
          also had to build the best hardware with Bigscreen Beyond.
        </p>
        <p className="mb-6 text-lg text-muted-foreground">
          Bigscreen was founded in 2014 by CEO Darshan Shankar, and is funded by
          venture capital firms True Ventures and Andreessen Horowitz. Bigscreen
          is a remote team distributed across 6 countries, with offices in Los
          Angeles, California.
        </p>
      </div>
    </div>
  );
}
