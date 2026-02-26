import HeaderComp from "@/components/HeaderComp";
import Features from "@/containers/Features";
import Footer from "@/containers/Footer";
import HeroSection from "@/containers/HeroSection";

export default function MarketingPage() {
    return (
        <>
            <HeaderComp />
            <HeroSection />
            {/* Optional: Add a small "How it Works" section below the Hero */}
            <Features />
            <Footer />
        </>
    );
}