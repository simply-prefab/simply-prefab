'use client'

import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();

  const isActive = (path: string) => pathname === path;

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.services'), href: '/products' },
    {
      label: t('nav.homeModels'),
      href: '/models',
      submenu: [
        { label: t('homeModels.ecoCompact1200.title'), href: '/models/TriLevel-Modern' },
        { label: t('homeModels.greenVilla1600.title'), href: '/models/SkyNest-Duplex-1600' },
        { label: t('homeModels.tinyEcoStudio.title'), href: '/models/CompactNest-600' },
        { label: t('homeModels.familyHaven2000.title'), href: '/models/ModernLoft-Terrace-Home-2200' },
        { label: t('homeModels.urbanModern1500.title'), href: '/models/RoofDeck-Modern-1500' },
        { label: t('common.viewAll') + ' Models', href: '/models' },
      ]
    },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.priceAnalysis'), href: '/price-analysis', highlight: true },
    {
      label: t('nav.more'),
      href: '#',
      submenu: [
        { label: t('nav.blog'), href: '/blog' },
        { label: t('nav.faqs'), href: '/faqs' },
        { label: t('nav.careers'), href: '/careers' },
        { label: t('nav.contact'), href: '/contact' },
      ]
    },
  ];

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1"
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      <nav
        className="fixed top-1 left-0 right-0 z-50 backdrop-blur-sm border-b"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#FFD0A0'
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation - CENTERED */}
            <div className="hidden lg:flex overflow-visible flex-1 justify-center">
              <div className="flex items-center space-x-0.5 xl:space-x-1">
                {menuItems.map((item) => (
                  item.submenu ? (
                    <div key={item.label} className="relative pl-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="flex items-center px-2 xl:px-3 py-2 rounded-md transition-all duration-200 font-medium outline-none focus:outline-none focus:ring-2 focus:ring-offset-1 text-nowrap text-sm xl:text-base"
                            style={{
                              color: '#1a1a1a',
                              '--tw-ring-color': '#FB921D'
                            } as React.CSSProperties}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#FFF5E6';
                              e.currentTarget.style.color = '#FB921D';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#1a1a1a';
                            }}
                          >
                            <span className="truncate max-w-[120px] xl:max-w-none">{item.label}</span>
                            <ChevronDown className="ml-1 h-4 w-4 flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-64 shadow-xl z-[9999] mt-1 border-0"
                          style={{
                            backgroundColor: 'white',
                            border: '1px solid #FFD0A0'
                          }}
                        >
                          <div className="py-2">
                            {item.submenu.map((subItem) => (
                              <DropdownMenuItem key={subItem.label} asChild>
                                <Link
                                  href={subItem.href}
                                  className={`w-full px-4 py-3 transition-colors duration-150 font-medium ${
                                    isActive(subItem.href) ? 'font-semibold' : ''
                                  }`}
                                  style={{
                                    backgroundColor: isActive(subItem.href) ? '#FFF5E6' : 'transparent',
                                    color: isActive(subItem.href) ? '#FB921D' : '#1a1a1a'
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isActive(subItem.href)) {
                                      e.currentTarget.style.backgroundColor = '#FFF5E6';
                                      e.currentTarget.style.color = '#FB921D';
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isActive(subItem.href)) {
                                      e.currentTarget.style.backgroundColor = 'transparent';
                                      e.currentTarget.style.color = '#1a1a1a';
                                    }
                                  }}
                                >
                                  <span className="block">{subItem.label}</span>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`px-2 xl:px-3 py-2 rounded-md transition-all duration-200 font-medium text-nowrap text-sm xl:text-base ${
                        isActive(item.href)
                          ? 'font-semibold'
                          : item.highlight
                          ? 'text-white shadow-sm hover:shadow-md'
                          : ''
                      }`}
                      style={{
                        backgroundColor: isActive(item.href)
                          ? '#FFF5E6'
                          : item.highlight
                          ? '#FB921D'
                          : 'transparent',
                        color: isActive(item.href)
                          ? '#FB921D'
                          : item.highlight
                          ? 'white'
                          : '#1a1a1a'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(item.href)) {
                          if (item.highlight) {
                            e.currentTarget.style.backgroundColor = '#E67E0F';
                          } else {
                            e.currentTarget.style.backgroundColor = '#FFF5E6';
                            e.currentTarget.style.color = '#FB921D';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(item.href)) {
                          if (item.highlight) {
                            e.currentTarget.style.backgroundColor = '#FB921D';
                          } else {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#1a1a1a';
                          }
                        }
                      }}
                    >
                      <span className="truncate max-w-[100px] xl:max-w-none inline-block">{item.label}</span>
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden lg:flex items-center space-x-2 overflow-visible flex-shrink-0">
              <div className="relative z-[9999]">
                <LanguageSwitcher />
              </div>
              <Button
                onClick={openPopup}
                className="font-medium px-4 xl:px-6 py-2 shadow-sm hover:shadow-md transition-all duration-200 text-nowrap text-sm xl:text-base"
                style={{
                  backgroundColor: '#FB921D',
                  color: 'white',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#E67E0F';
                  (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <span className="truncate max-w-[150px] xl:max-w-none inline-block">
                  {t('common.bookConsultation')}
                </span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <div className="relative z-[9999]">
                <LanguageSwitcher />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 transition-all duration-200"
                style={{
                  color: '#1a1a1a'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#FFF5E6';
                  (e.target as HTMLElement).style.color = '#FB921D';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLElement).style.color = '#1a1a1a';
                }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            style={{ top: '65px' }}
            onClick={() => setIsOpen(false)}
          />

          <div
            className="lg:hidden fixed left-0 right-0 bottom-0 z-50"
            style={{ top: '65px' }}
          >
            <div
              className="h-full overflow-y-auto border-t shadow-2xl"
              style={{
                backgroundColor: 'white',
                borderColor: '#FFD0A0'
              }}
            >
              <div className="px-2 py-4 space-y-1 sm:px-3">
                {menuItems.map((item) => (
                  <div key={item.label}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 rounded-md transition-colors duration-200 font-medium"
                      style={{
                        backgroundColor: isActive(item.href)
                          ? '#FFF5E6'
                          : item.highlight
                          ? '#FB921D'
                          : 'transparent',
                        color: isActive(item.href)
                          ? '#FB921D'
                          : item.highlight
                          ? 'white'
                          : '#1a1a1a',
                        fontWeight: isActive(item.href) ? '600' : '500'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(item.href) && !item.highlight) {
                          e.currentTarget.style.backgroundColor = '#FFF5E6';
                          e.currentTarget.style.color = '#FB921D';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(item.href) && !item.highlight) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#1a1a1a';
                        }
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <div
                        className="pl-4 mt-2 space-y-1 border-l-2"
                        style={{ borderColor: '#FFD0A0' }}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 rounded-md transition-colors duration-200 font-medium"
                            style={{
                              backgroundColor: isActive(subItem.href) ? '#FFF5E6' : 'transparent',
                              color: isActive(subItem.href) ? '#FB921D' : '#666',
                              fontWeight: isActive(subItem.href) ? '600' : '500'
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive(subItem.href)) {
                                e.currentTarget.style.backgroundColor = '#FFF5E6';
                                e.currentTarget.style.color = '#FB921D';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive(subItem.href)) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#666';
                              }
                            }}
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="text-sm">{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div
                  className="pt-6 border-t mt-6"
                  style={{ borderColor: '#FFD0A0' }}
                >
                  <div className="px-3 pb-6 space-y-3">
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        openPopup();
                      }}
                      className="w-full font-medium py-3 shadow-sm hover:shadow-md transition-all duration-200"
                      style={{
                        backgroundColor: '#FB921D',
                        color: 'white',
                        border: 'none'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = '#E67E0F';
                        (e.target as HTMLElement).style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                        (e.target as HTMLElement).style.transform = 'translateY(0)';
                      }}
                    >
                      {t('common.bookConsultation')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
