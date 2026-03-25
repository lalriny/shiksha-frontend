import Navbar from './Navbar';
import StatsStrip from './StatsStrip';
import About from './About';
import HowItWorks from './HowItWorks';
import LandingHeader from './LandingHeader';
import Hero from './Hero';
import MainGrid from './MainGrid';
import LowerGrid from './LowerGrid';
import CoursePreview from './CoursePreview';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="page-content">
      <Navbar />
      <Hero />
      <StatsStrip />
      <About />
      <HowItWorks />
      <LandingHeader />
      <MainGrid />
      <LowerGrid />
      <CoursePreview />
      <Footer />
    </div>
  );
};

export default HomePage;
