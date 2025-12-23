'use client'

import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { FaMapPin, FaPhone } from 'react-icons/fa';
import { SiFacebook, SiGmail, SiInstagram, SiLinkedin, SiX, SiYoutube } from 'react-icons/si';
import Logo from './Logo';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: <SiFacebook className="h-5 w-5" />, href: "https://www.facebook.com/profile.php?id=61555014011252", label: t('footer.social.facebook') },
    { icon: <SiX className="h-5 w-5" />, href: "https://x.com/i/flow/login?redirect_after_login=%2Fsimplyprefab", label: t('footer.social.twitter') },
    { icon: <SiInstagram className="h-5 w-5" />, href: "https://www.instagram.com/simplyprefab/", label: t('footer.social.instagram') },
    { icon: <SiLinkedin className="h-5 w-5" />, href: "https://www.linkedin.com/company/prefabulous-homez-llp/", label: t('footer.social.linkedin') },
    { icon: <SiYoutube className="h-5 w-5" />, href: "https://www.youtube.com/@simplyprefab/", label: t('footer.social.youtube') }
  ];

  const footerLinks = {
    [t('footer.company.title')]: [
      { label: t('footer.company.aboutUs'), href: "/about" },
      { label: t('footer.company.ourStory'), href: "/about" },
      { label: t('footer.company.careers'), href: "/careers" },
      { label: t('footer.company.press'), href: "/blog" }
    ],
    [t('footer.services.title')]: [
      { label: t('footer.services.prefabHomes'), href: "/models" },
      { label: t('footer.services.customDesign'), href: "/services/architecture-design" },
      { label: t('footer.services.consultation'), href: "/contact" },
      { label: t('footer.services.support'), href: "/faqs" }
    ],
    [t('footer.resources.title')]: [
      { label: t('footer.resources.blog'), href: "/blog" },
      { label: t('footer.resources.faqs'), href: "/faqs" },
      { label: t('footer.resources.calculator'), href: "/price-analysis" },
      { label: t('nav.projects'), href: "/projects" }
    ]
  };

  const offices = [
    {
      country: t('footer.offices.singapore.country'),
      company: t('footer.offices.singapore.company'),
      address: t('footer.offices.singapore.address')
    }
  ];

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: '#1a1a1a',
        color: 'white'
      }}
    >
      <div
        className="w-full h-1"
        style={{
          background: 'linear-gradient(to right, #FB921D, #E67E0F, #FB921D)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Left Column - Logo, Description, Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <Logo />
            </div>
            <p
              className="mb-6 leading-relaxed"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center">
                <SiGmail
                  className="h-4 w-4 mr-3 flex-shrink-0"
                  style={{ color: '#FB921D' }}
                />
                <a
                  href="mailto:projects@simplyprefab.com"
                  className="hover:underline"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {t('footer.contact.email')}
                </a>
              </div>
            </div>

            {/* Office Locations */}
            <div className="mt-8 space-y-6">
              {offices.map((office, index) => (
                <div key={index}>
                  <div className="flex items-start">
                    <FaMapPin
                      className="h-4 w-4 mr-3 mt-1 flex-shrink-0"
                      style={{ color: '#FB921D' }}
                    />
                    <div>
                      <h5
                        className="font-semibold mb-1"
                        style={{ color: '#FB921D' }}
                      >
                        {office.country} {office.country==='Singapore' && '(Registered Office)'}
                      </h5>
                      <p
                        className="text-sm mb-1"
                        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        {office.company}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {office.address}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4
                className="mb-4 font-semibold"
                style={{ color: 'white' }}
              >
                {t('footer.social.title')}
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(251, 146, 29, 0.2)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(251, 146, 29, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FB921D';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(251, 146, 29, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(251, 146, 29, 0.2)';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Columns - Quick Links */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4
                    className="mb-4 font-semibold"
                    style={{ color: '#FB921D' }}
                  >
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="transition-colors duration-200"
                          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.color = '#FB921D';
                            (e.target as HTMLElement).style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.color = 'rgba(255, 255, 255, 0.7)';
                            (e.target as HTMLElement).style.textDecoration = 'none';
                          }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div
          className="mt-12 pt-8 text-center border-t"
          style={{ borderColor: 'rgba(251, 146, 29, 0.3)' }}
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {t('footer.copyright').replace('© 2024', `© ${new Date().getFullYear()}`)}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
