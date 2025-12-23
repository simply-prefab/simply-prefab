'use client'

import { ArrowRight, Calendar, Clock, Heart, MessageCircle, Search, Share2, User } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useExpertConsultation } from '@/contexts/ExpertConsultationContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BlogPage() {
  const { t } = useLanguage();
  const { openPopup } = useExpertConsultation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: t('blog.posts.sustainable.title'),
      excerpt: t('blog.posts.sustainable.excerpt'),
      content: t('blog.posts.sustainable.content'),
      author: t('blog.posts.sustainable.author'),
      date: '2024-03-15',
      readTime: t('blog.posts.sustainable.readTime'),
      category: 'sustainability',
      image: '/images/blog/img1.jpg',
      tags: ['sustainability', 'prefab', 'future', 'green building'],
      likes: 124,
      comments: 18,
      featured: true
    },
    {
      id: 2,
      title: t('blog.posts.costComparison.title'),
      excerpt: t('blog.posts.costComparison.excerpt'),
      content: t('blog.posts.costComparison.content'),
      author: t('blog.posts.costComparison.author'),
      date: '2024-03-10',
      readTime: t('blog.posts.costComparison.readTime'),
      category: 'cost-analysis',
      image: '/images/blog/img2.jpg',
      tags: ['cost', 'analysis', 'comparison', 'budget'],
      likes: 89,
      comments: 25,
      featured: false
    },
    {
      id: 3,
      title: t('blog.posts.smartHome.title'),
      excerpt: t('blog.posts.smartHome.excerpt'),
      content: t('blog.posts.smartHome.content'),
      author: t('blog.posts.smartHome.author'),
      date: '2024-03-05',
      readTime: t('blog.posts.smartHome.readTime'),
      category: 'technology',
      image: '/images/blog/img5.jpg',
      tags: ['smart home', 'technology', 'automation', 'IoT'],
      likes: 156,
      comments: 31,
      featured: true
    },
    {
      id: 4,
      title: t('blog.posts.designTrends.title'),
      excerpt: t('blog.posts.designTrends.excerpt'),
      content: t('blog.posts.designTrends.content'),
      author: t('blog.posts.designTrends.author'),
      date: '2024-02-28',
      readTime: t('blog.posts.designTrends.readTime'),
      category: 'design',
      image: '/images/blog/img4.jpg',
      tags: ['design', 'architecture', 'trends', 'modern'],
      likes: 203,
      comments: 42,
      featured: false
    },
    {
      id: 5,
      title: t('blog.posts.qualityControl.title'),
      excerpt: t('blog.posts.qualityControl.excerpt'),
      content: t('blog.posts.qualityControl.content'),
      author: t('blog.posts.qualityControl.author'),
      date: '2024-02-20',
      readTime: t('blog.posts.qualityControl.readTime'),
      category: 'manufacturing',
      image: '/images/blog/img5.jpg',
      tags: ['quality', 'manufacturing', 'process', 'standards'],
      likes: 78,
      comments: 15,
      featured: false
    },
    {
      id: 6,
      title: t('blog.posts.environmental.title'),
      excerpt: t('blog.posts.environmental.excerpt'),
      content: t('blog.posts.environmental.content'),
      author: t('blog.posts.environmental.author'),
      date: '2024-02-15',
      readTime: t('blog.posts.environmental.readTime'),
      category: 'sustainability',
      image: '/images/blog/img6.jpg',
      tags: ['environment', 'sustainability', 'climate', 'eco-friendly'],
      likes: 267,
      comments: 56,
      featured: true
    }
  ];

  const categories = [
    { id: 'all', label: t('blog.categories.all'), count: blogPosts.length },
    { id: 'sustainability', label: t('blog.categories.sustainability'), count: blogPosts.filter(p => p.category === 'sustainability').length },
    { id: 'cost-analysis', label: t('blog.categories.costAnalysis'), count: blogPosts.filter(p => p.category === 'cost-analysis').length },
    { id: 'technology', label: t('blog.categories.technology'), count: blogPosts.filter(p => p.category === 'technology').length },
    { id: 'design', label: t('blog.categories.design'), count: blogPosts.filter(p => p.category === 'design').length },
    { id: 'manufacturing', label: t('blog.categories.manufacturing'), count: blogPosts.filter(p => p.category === 'manufacturing').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 224, 192, 0.3), white)'
      }}
    >
      <div
        className="w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 border-0"
              style={{
                backgroundColor: '#FB921D',
                color: 'white'
              }}
            >
              {t('blog.badge')}
            </Badge>
            <h1
              className="text-4xl md:text-6xl mb-6 font-bold"
              style={{
                background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {t('blog.title')}
            </h1>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#666' }}
            >
              {t('blog.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: '#FB921D' }}
              />
              <Input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2"
                style={{
                  borderColor: '#FFD0A0',
                  color: '#1a1a1a'
                }}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.borderColor = '#FB921D';
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor = '#FFD0A0';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section
          className="py-8"
          style={{ backgroundColor: 'white' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              className="text-2xl mb-8 font-semibold"
              style={{ color: '#1a1a1a' }}
            >
              {t('blog.featuredArticles')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 3).map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #FFD0A0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FB921D';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#FFD0A0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge
                        className="border-0"
                        style={{
                          backgroundColor: '#FB921D',
                          color: 'white'
                        }}
                      >
                        {t('blog.featured')}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-sm mb-2">
                      <User
                        className="w-4 h-4 mr-1"
                        style={{ color: '#FB921D' }}
                      />
                      <span style={{ color: '#666' }}>{post.author}</span>
                      <Calendar
                        className="w-4 h-4 ml-4 mr-1"
                        style={{ color: '#FB921D' }}
                      />
                      <span style={{ color: '#666' }}>
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3
                      className="text-xl group-hover:transition-colors font-semibold"
                      style={{ color: '#1a1a1a' }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.color = '#FB921D';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.color = '#1a1a1a';
                      }}
                    >
                      {post.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="mb-4"
                      style={{ color: '#666' }}
                    >
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center">
                        <Clock
                          className="w-4 h-4 mr-1"
                          style={{ color: '#FB921D' }}
                        />
                        <span style={{ color: '#666' }}>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart
                            className="w-4 h-4 mr-1"
                            style={{ color: '#FB921D' }}
                          />
                          <span style={{ color: '#666' }}>{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle
                            className="w-4 h-4 mr-1"
                            style={{ color: '#FB921D' }}
                          />
                          <span style={{ color: '#666' }}>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full font-semibold transition-all duration-300"
                      style={{
                        backgroundColor: '#FB921D',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = '#E67E0F';
                        (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.backgroundColor = '#FB921D';
                        (e.target as HTMLElement).style.transform = 'translateY(0)';
                      }}
                    >
                      {t('blog.readMore')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="py-8"
        style={{ backgroundColor: '#FFF5E6' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="font-semibold transition-all duration-300"
                style={{
                  backgroundColor: selectedCategory === category.id ? '#FB921D' : 'transparent',
                  color: selectedCategory === category.id ? 'white' : '#C55A00',
                  borderColor: selectedCategory === category.id ? '#FB921D' : '#C55A00'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    (e.target as HTMLElement).style.backgroundColor = '#C55A00';
                    (e.target as HTMLElement).style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    (e.target as HTMLElement).style.color = '#C55A00';
                  }
                }}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-2xl font-semibold"
              style={{ color: '#1a1a1a' }}
            >
              {selectedCategory === 'all' ? t('blog.allArticles') : categories.find(c => c.id === selectedCategory)?.label}
            </h2>
            <div
              className="text-sm"
              style={{ color: '#666' }}
            >
              {filteredPosts.length} {t('blog.articlesFound')}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Search
                className="w-16 h-16 mx-auto mb-4"
                style={{ color: '#FFD0A0' }}
              />
              <h3
                className="text-xl mb-2"
                style={{ color: '#666' }}
              >
                {t('blog.noArticles')}
              </h3>
              <p style={{ color: '#C55A00' }}>
                {t('blog.adjustSearch')}
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #FFD0A0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FB921D';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#FFD0A0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center text-sm mb-2">
                        <User
                          className="w-4 h-4 mr-1"
                          style={{ color: '#FB921D' }}
                        />
                        <span style={{ color: '#666' }}>{post.author}</span>
                        <Calendar
                          className="w-4 h-4 ml-4 mr-1"
                          style={{ color: '#FB921D' }}
                        />
                        <span style={{ color: '#666' }}>
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>

                      <h3
                        className="text-xl mb-3 font-semibold group-hover:transition-colors cursor-pointer"
                        style={{ color: '#1a1a1a' }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.color = '#FB921D';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.color = '#1a1a1a';
                        }}
                      >
                        {post.title}
                      </h3>

                      <p
                        className="mb-4 text-sm"
                        style={{ color: '#666' }}
                      >
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs border-0"
                            style={{
                              backgroundColor: '#FFF5E6',
                              color: '#C55A00',
                              border: '1px solid #FFD0A0'
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Clock
                            className="w-4 h-4 mr-1"
                            style={{ color: '#FB921D' }}
                          />
                          <span style={{ color: '#666' }}>{post.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Heart
                              className="w-4 h-4 mr-1"
                              style={{ color: '#FB921D' }}
                            />
                            <span style={{ color: '#666' }}>{post.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle
                              className="w-4 h-4 mr-1"
                              style={{ color: '#FB921D' }}
                            />
                            <span style={{ color: '#666' }}>{post.comments}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-0 h-auto"
                            style={{ color: '#FB921D' }}
                            onMouseEnter={(e) => {
                              (e.target as HTMLElement).style.color = '#E67E0F';
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLElement).style.color = '#FB921D';
                            }}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        className="py-16 text-white"
        style={{
          background: 'linear-gradient(135deg, #FB921D 0%, #C55A00 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 font-bold">
            {t('blog.finalCta.title')}
          </h2>
          <p
            className="text-xl mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            {t('blog.finalCta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="font-semibold transition-all duration-300 border-2"
              style={{
                backgroundColor: 'white',
                color: '#1a1a1a',
                borderColor: 'white'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLElement).style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'white';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
                (e.target as HTMLElement).style.boxShadow = 'none';
              }}
              onClick={openPopup}
            >
              {t('blog.finalCta.consultation')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Link href={`/projects`}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 font-semibold transition-all duration-300"
                style={{
                  borderColor: 'white',
                  color: 'white',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'white';
                  (e.target as HTMLElement).style.color = '#1a1a1a';
                  (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLElement).style.color = 'white';
                  (e.target as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                {t('blog.finalCta.viewProjects')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
