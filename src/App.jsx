import { AppProvider } from './context/AppContext'
import Navbar from './component/Navbar'
import HeroSection from './component/HeroSection'
import FeaturedCategories from './component/FeaturedCategories'
import FeaturedProducts from './component/FeaturedProducts'
import WhyChooseUs from './component/WhyChooseUs'
import BestSellers from './component/BestSellers'
import Testimonials from './component/Testimonials'
import Newsletter from './component/Newsletter'
import Footer from './component/Footer'

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturedCategories />
          <FeaturedProducts />
          <WhyChooseUs />
          <BestSellers />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}
