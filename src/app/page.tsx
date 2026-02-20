import HeaderComp from "@/components/shared/HeaderComp";
import Features from "@/containers/marketing/Features";
import HeroSection from "@/containers/marketing/HeroSection";

export default function MarketingPage() {
    return (
        <>
            <HeaderComp />
            <HeroSection />
            {/* Optional: Add a small "How it Works" section below the Hero */}
            <Features />
            
        </>
    );
}