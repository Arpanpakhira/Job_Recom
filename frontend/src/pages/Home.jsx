import MainLayout from "../layouts/MainLayout";

import PageTransition from "../components/common/PageTransition";

import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorks from "../components/home/HowItWorks";
import CTASection from "../components/home/CTASection";

export default function Home() {
    return (
        <MainLayout>
            <PageTransition>
                <HeroSection />
                <FeaturesSection />
                <HowItWorks />
                <CTASection />
            </PageTransition>
        </MainLayout>
    );
}