'use client'

import React, { useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { MapPin, Calendar, Home, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const getYouTubeId = (url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/);
  return match ? match[1] : null;
};

function getVideoThumbnail(url) {
  const id = getYouTubeId(url);
  if (id) return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  return '/images/project-thumb-placeholder.jpg';
}

const YoutubeSVG = () => (
  <svg viewBox="0 0 68 48" width="60" height="44" style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    pointerEvents: 'none'
  }}>
    <path d="M66.52 7.16c-.71-2.68-2.82-4.79-5.5-5.5C56.88 0.19 34 0 34 0S11.12 0.19 7.98 1.66c-2.68.71-4.79 2.82-5.5 5.5C1.19 11.12 1 24 1 24s.19 12.88 1.48 16.84c.71 2.68 2.82 4.79 5.5 5.5C11.12 47.81 34 48 34 48s22.88-.19 26.02-1.66c2.68-.71 4.79-2.82 5.5-5.5C66.81 35.88 67 24 67 24s-.19-12.88-1.48-16.84z" fill="#f00"/>
    <path d="M45 24l-15 9V15z" fill="#fff"/>
  </svg>
);

const VideoModal = ({ videoUrl, title, onClose }) => {
  const youtubeId = getYouTubeId(videoUrl);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        style={{ cursor: 'pointer' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-all">
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="aspect-video">
            {youtubeId && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getProjects = () => [
    {
      id: 1,
      title: t('projectsPage.projects.1.title'),
      category: "residential",
      location: t('projectsPage.projects.1.location'),
      completedDate: t('projectsPage.projects.1.completedDate'),
      area: t('projectsPage.projects.1.area'),
      units: t('projectsPage.projects.1.units'),
      description: t('projectsPage.projects.1.description'),
      videoData: { src: "https://www.youtube.com/shorts/CGUIBRPU4xo" },
      features: [
        t('projectsPage.projects.1.features.0'),
        t('projectsPage.projects.1.features.1'),
        t('projectsPage.projects.1.features.2'),
        t('projectsPage.projects.1.features.3')
      ],
      cost: t('projectsPage.projects.1.cost'),
      timeline: t('projectsPage.projects.1.timeline')
    },
    {
      id: 2,
      title: t('projectsPage.projects.2.title'),
      category: "penthouse",
      location: t('projectsPage.projects.2.location'),
      completedDate: t('projectsPage.projects.2.completedDate'),
      area: t('projectsPage.projects.2.area'),
      units: t('projectsPage.projects.2.units'),
      description: t('projectsPage.projects.2.description'),
      videoData: { src: "https://www.youtube.com/watch?v=ccLvTbKCwgo" },
      features: [
        t('projectsPage.projects.2.features.0'),
        t('projectsPage.projects.2.features.1'),
        t('projectsPage.projects.2.features.2'),
        t('projectsPage.projects.2.features.3')
      ],
      cost: t('projectsPage.projects.2.cost'),
      timeline: t('projectsPage.projects.2.timeline')
    },
    {
      id: 3,
      title: t('projectsPage.projects.3.title'),
      category: "residential",
      location: t('projectsPage.projects.3.location'),
      completedDate: t('projectsPage.projects.3.completedDate'),
      area: t('projectsPage.projects.3.area'),
      units: t('projectsPage.projects.3.units'),
      description: t('projectsPage.projects.3.description'),
      videoData: { src: "https://www.youtube.com/watch?v=f5fmjEtlu_o" },
      features: [
        t('projectsPage.projects.3.features.0'),
        t('projectsPage.projects.3.features.1'),
        t('projectsPage.projects.3.features.2'),
        t('projectsPage.projects.3.features.3')
      ],
      cost: t('projectsPage.projects.3.cost'),
      timeline: t('projectsPage.projects.3.timeline')
    },
    {
      id: 4,
      title: t('projectsPage.projects.4.title'),
      category: "residential",
      location: t('projectsPage.projects.4.location'),
      completedDate: t('projectsPage.projects.4.completedDate'),
      area: t('projectsPage.projects.4.area'),
      units: t('projectsPage.projects.4.units'),
      description: t('projectsPage.projects.4.description'),
      videoData: { src: "https://www.youtube.com/watch?v=pbyELMLnb0s&t=2s" },
      features: [
        t('projectsPage.projects.4.features.0'),
        t('projectsPage.projects.4.features.1'),
        t('projectsPage.projects.4.features.2'),
        t('projectsPage.projects.4.features.3')
      ],
      cost: t('projectsPage.projects.4.cost'),
      timeline: t('projectsPage.projects.4.timeline')
    },
    {
      id: 5,
      title: t('projectsPage.projects.5.title'),
      category: "residential",
      location: t('projectsPage.projects.5.location'),
      completedDate: t('projectsPage.projects.5.completedDate'),
      area: t('projectsPage.projects.5.area'),
      units: t('projectsPage.projects.5.units'),
      description: t('projectsPage.projects.5.description'),
      videoData: { src: "https://www.youtube.com/watch?v=QIgcqmdYtqc" },
      features: [
        t('projectsPage.projects.5.features.0'),
        t('projectsPage.projects.5.features.1'),
        t('projectsPage.projects.5.features.2'),
        t('projectsPage.projects.5.features.3')
      ],
      cost: t('projectsPage.projects.5.cost'),
      timeline: t('projectsPage.projects.5.timeline')
    },
    {
      id: 6,
      title: t('projectsPage.projects.6.title'),
      category: "residential",
      location: t('projectsPage.projects.6.location'),
      completedDate: t('projectsPage.projects.6.completedDate'),
      area: t('projectsPage.projects.6.area'),
      units: t('projectsPage.projects.6.units'),
      description: t('projectsPage.projects.6.description'),
      videoData: { src: "https://www.youtube.com/watch?v=46vIdCZnz30" },
      features: [
        t('projectsPage.projects.6.features.0'),
        t('projectsPage.projects.6.features.1'),
        t('projectsPage.projects.6.features.2'),
        t('projectsPage.projects.6.features.3')
      ],
      cost: t('projectsPage.projects.6.cost'),
      timeline: t('projectsPage.projects.6.timeline')
    },
    {
      id: 7,
      title: t('projectsPage.projects.7.title'),
      category: "residential",
      location: t('projectsPage.projects.7.location'),
      completedDate: t('projectsPage.projects.7.completedDate'),
      area: t('projectsPage.projects.7.area'),
      units: t('projectsPage.projects.7.units'),
      description: t('projectsPage.projects.7.description'),
      videoData: { src: "https://www.youtube.com/watch?v=eiQmuluxmGY" },
      features: [
        t('projectsPage.projects.7.features.0'),
        t('projectsPage.projects.7.features.1'),
        t('projectsPage.projects.7.features.2'),
        t('projectsPage.projects.7.features.3')
      ],
      cost: t('projectsPage.projects.7.cost'),
      timeline: t('projectsPage.projects.7.timeline')
    },
    {
      id: 8,
      title: t('projectsPage.projects.8.title'),
      category: "penthouse",
      location: t('projectsPage.projects.8.location'),
      completedDate: t('projectsPage.projects.8.completedDate'),
      area: t('projectsPage.projects.8.area'),
      units: t('projectsPage.projects.8.units'),
      description: t('projectsPage.projects.8.description'),
      videoData: { src: "https://www.youtube.com/watch?v=ZSSKgIdVVug" },
      features: [
        t('projectsPage.projects.8.features.0'),
        t('projectsPage.projects.8.features.1'),
        t('projectsPage.projects.8.features.2'),
        t('projectsPage.projects.8.features.3')
      ],
      cost: t('projectsPage.projects.8.cost'),
      timeline: t('projectsPage.projects.8.timeline')
    },
    {
      id: 9,
      title: t('projectsPage.projects.9.title'),
      category: "residential",
      location: t('projectsPage.projects.9.location'),
      completedDate: t('projectsPage.projects.9.completedDate'),
      area: t('projectsPage.projects.9.area'),
      units: t('projectsPage.projects.9.units'),
      description: t('projectsPage.projects.9.description'),
      videoData: { src: "https://www.youtube.com/watch?v=KSSudQNPw8U" },
      features: [
        t('projectsPage.projects.9.features.0'),
        t('projectsPage.projects.9.features.1'),
        t('projectsPage.projects.9.features.2'),
        t('projectsPage.projects.9.features.3')
      ],
      cost: t('projectsPage.projects.9.cost'),
      timeline: t('projectsPage.projects.9.timeline')
    },
    {
      id: 10,
      title: t('projectsPage.projects.10.title'),
      category: "residential",
      location: t('projectsPage.projects.10.location'),
      completedDate: t('projectsPage.projects.10.completedDate'),
      area: t('projectsPage.projects.10.area'),
      units: t('projectsPage.projects.10.units'),
      description: t('projectsPage.projects.10.description'),
      videoData: { src: "https://www.youtube.com/watch?v=NauYcINA8DU" },
      features: [
        t('projectsPage.projects.10.features.0'),
        t('projectsPage.projects.10.features.1'),
        t('projectsPage.projects.10.features.2'),
        t('projectsPage.projects.10.features.3')
      ],
      cost: t('projectsPage.projects.10.cost'),
      timeline: t('projectsPage.projects.10.timeline')
    },
    {
      id: 11,
      title: t('projectsPage.projects.11.title'),
      category: "residential",
      location: t('projectsPage.projects.11.location'),
      completedDate: t('projectsPage.projects.11.completedDate'),
      area: t('projectsPage.projects.11.area'),
      units: t('projectsPage.projects.11.units'),
      description: t('projectsPage.projects.11.description'),
      videoData: { src: "https://www.youtube.com/watch?v=lK_Lhwhf9To&t=2s" },
      features: [
        t('projectsPage.projects.11.features.0'),
        t('projectsPage.projects.11.features.1'),
        t('projectsPage.projects.11.features.2'),
        t('projectsPage.projects.11.features.3')
      ],
      cost: t('projectsPage.projects.11.cost'),
      timeline: t('projectsPage.projects.11.timeline')
    },
    {
      id: 12,
      title: t('projectsPage.projects.12.title'),
      category: "residential",
      location: t('projectsPage.projects.12.location'),
      completedDate: t('projectsPage.projects.12.completedDate'),
      area: t('projectsPage.projects.12.area'),
      units: t('projectsPage.projects.12.units'),
      description: t('projectsPage.projects.12.description'),
      videoData: { src: "https://www.youtube.com/watch?v=hDr1pGeqmso" },
      features: [
        t('projectsPage.projects.12.features.0'),
        t('projectsPage.projects.12.features.1'),
        t('projectsPage.projects.12.features.2'),
        t('projectsPage.projects.12.features.3')
      ],
      cost: t('projectsPage.projects.12.cost'),
      timeline: t('projectsPage.projects.12.timeline')
    },
    {
      id: 13,
      title: t('projectsPage.projects.13.title'),
      category: "residential",
      location: t('projectsPage.projects.13.location'),
      completedDate: t('projectsPage.projects.13.completedDate'),
      area: t('projectsPage.projects.13.area'),
      units: t('projectsPage.projects.13.units'),
      description: t('projectsPage.projects.13.description'),
      videoData: { src: "https://www.youtube.com/watch?v=nwn6DSb9DQc" },
      features: [
        t('projectsPage.projects.13.features.0'),
        t('projectsPage.projects.13.features.1'),
        t('projectsPage.projects.13.features.2'),
        t('projectsPage.projects.13.features.3')
      ],
      cost: t('projectsPage.projects.13.cost'),
      timeline: t('projectsPage.projects.13.timeline')
    },
    {
      id: 14,
      title: t('projectsPage.projects.14.title'),
      category: "residential",
      location: t('projectsPage.projects.14.location'),
      completedDate: t('projectsPage.projects.14.completedDate'),
      area: t('projectsPage.projects.14.area'),
      units: t('projectsPage.projects.14.units'),
      description: t('projectsPage.projects.14.description'),
      videoData: { src: "https://www.youtube.com/watch?v=Fnyyu852mkE" },
      features: [
        t('projectsPage.projects.14.features.0'),
        t('projectsPage.projects.14.features.1'),
        t('projectsPage.projects.14.features.2'),
        t('projectsPage.projects.14.features.3')
      ],
      cost: t('projectsPage.projects.14.cost'),
      timeline: t('projectsPage.projects.14.timeline')
    },
    {
      id: 15,
      title: t('projectsPage.projects.15.title'),
      category: "farmhouse",
      location: t('projectsPage.projects.15.location'),
      completedDate: t('projectsPage.projects.15.completedDate'),
      area: t('projectsPage.projects.15.area'),
      units: t('projectsPage.projects.15.units'),
      description: t('projectsPage.projects.15.description'),
      videoData: { src: "https://www.youtube.com/watch?v=tyHaXdrqJKQ&t=4s" },
      features: [
        t('projectsPage.projects.15.features.0'),
        t('projectsPage.projects.15.features.1'),
        t('projectsPage.projects.15.features.2'),
        t('projectsPage.projects.15.features.3')
      ],
      cost: t('projectsPage.projects.15.cost'),
      timeline: t('projectsPage.projects.15.timeline')
    },
    {
      id: 16,
      title: t('projectsPage.projects.16.title'),
      category: "farmhouse",
      location: t('projectsPage.projects.16.location'),
      completedDate: t('projectsPage.projects.16.completedDate'),
      area: t('projectsPage.projects.16.area'),
      units: t('projectsPage.projects.16.units'),
      description: t('projectsPage.projects.16.description'),
      videoData: { src: "https://www.youtube.com/watch?v=zpZeSknZ4Z8" },
      features: [
        t('projectsPage.projects.16.features.0'),
        t('projectsPage.projects.16.features.1'),
        t('projectsPage.projects.16.features.2'),
        t('projectsPage.projects.16.features.3')
      ],
      cost: t('projectsPage.projects.16.cost'),
      timeline: t('projectsPage.projects.16.timeline')
    },
    {
      id: 17,
      title: t('projectsPage.projects.17.title'),
      category: "residential",
      location: t('projectsPage.projects.17.location'),
      completedDate: t('projectsPage.projects.17.completedDate'),
      area: t('projectsPage.projects.17.area'),
      units: t('projectsPage.projects.17.units'),
      description: t('projectsPage.projects.17.description'),
      videoData: { src: "https://www.youtube.com/watch?v=6MrDJuTRVUc" },
      features: [
        t('projectsPage.projects.17.features.0'),
        t('projectsPage.projects.17.features.1'),
        t('projectsPage.projects.17.features.2'),
        t('projectsPage.projects.17.features.3')
      ],
      cost: t('projectsPage.projects.17.cost'),
      timeline: t('projectsPage.projects.17.timeline')
    },
    {
      id: 18,
      title: t('projectsPage.projects.18.title'),
      category: "farmhouse",
      location: t('projectsPage.projects.18.location'),
      completedDate: t('projectsPage.projects.18.completedDate'),
      area: t('projectsPage.projects.18.area'),
      units: t('projectsPage.projects.18.units'),
      description: t('projectsPage.projects.18.description'),
      videoData: { src: "https://www.youtube.com/watch?v=ysHAvLFTRFc" },
      features: [
        t('projectsPage.projects.18.features.0'),
        t('projectsPage.projects.18.features.1'),
        t('projectsPage.projects.18.features.2'),
        t('projectsPage.projects.18.features.3')
      ],
      cost: t('projectsPage.projects.18.cost'),
      timeline: t('projectsPage.projects.18.timeline')
    },
    {
      id: 19,
      title: t('projectsPage.projects.19.title'),
      category: "farmhouse",
      location: t('projectsPage.projects.19.location'),
      completedDate: t('projectsPage.projects.19.completedDate'),
      area: t('projectsPage.projects.19.area'),
      units: t('projectsPage.projects.19.units'),
      description: t('projectsPage.projects.19.description'),
      videoData: { src: "https://www.youtube.com/watch?v=eLVldZDceDk" },
      features: [
        t('projectsPage.projects.19.features.0'),
        t('projectsPage.projects.19.features.1'),
        t('projectsPage.projects.19.features.2'),
        t('projectsPage.projects.19.features.3')
      ],
      cost: t('projectsPage.projects.19.cost'),
      timeline: t('projectsPage.projects.19.timeline')
    },
    {
      id: 20,
      title: t('projectsPage.projects.20.title'),
      category: "farmhouse",
      location: t('projectsPage.projects.20.location'),
      completedDate: t('projectsPage.projects.20.completedDate'),
      area: t('projectsPage.projects.20.area'),
      units: t('projectsPage.projects.20.units'),
      description: t('projectsPage.projects.20.description'),
      videoData: { src: "https://www.youtube.com/watch?v=xm5CsX7EgDA" },
      features: [
        t('projectsPage.projects.20.features.0'),
        t('projectsPage.projects.20.features.1'),
        t('projectsPage.projects.20.features.2'),
        t('projectsPage.projects.20.features.3')
      ],
      cost: t('projectsPage.projects.20.cost'),
      timeline: t('projectsPage.projects.20.timeline')
    },
    {
      id: 21,
      title: t('projectsPage.projects.21.title'),
      category: "commercial",
      location: t('projectsPage.projects.21.location'),
      completedDate: t('projectsPage.projects.21.completedDate'),
      area: t('projectsPage.projects.21.area'),
      units: t('projectsPage.projects.21.units'),
      description: t('projectsPage.projects.21.description'),
      videoData: { src: "https://www.youtube.com/watch?v=YrDERJDCdpc" },
      features: [
        t('projectsPage.projects.21.features.0'),
        t('projectsPage.projects.21.features.1'),
        t('projectsPage.projects.21.features.2'),
        t('projectsPage.projects.21.features.3')
      ],
      cost: t('projectsPage.projects.21.cost'),
      timeline: t('projectsPage.projects.21.timeline')
    },
    {
      id: 22,
      title: t('projectsPage.projects.22.title'),
      category: "commercial",
      location: t('projectsPage.projects.22.location'),
      completedDate: t('projectsPage.projects.22.completedDate'),
      area: t('projectsPage.projects.22.area'),
      units: t('projectsPage.projects.22.units'),
      description: t('projectsPage.projects.22.description'),
      videoData: { src: "https://www.youtube.com/watch?v=0qjKVE0YJBs" },
      features: [
        t('projectsPage.projects.22.features.0'),
        t('projectsPage.projects.22.features.1'),
        t('projectsPage.projects.22.features.2'),
        t('projectsPage.projects.22.features.3')
      ],
      cost: t('projectsPage.projects.22.cost'),
      timeline: t('projectsPage.projects.22.timeline')
    },
    {
      id: 23,
      title: t('projectsPage.projects.23.title'),
      category: "commercial",
      location: t('projectsPage.projects.23.location'),
      completedDate: t('projectsPage.projects.23.completedDate'),
      area: t('projectsPage.projects.23.area'),
      units: t('projectsPage.projects.23.units'),
      description: t('projectsPage.projects.23.description'),
      videoData: { src: "https://www.youtube.com/watch?v=NlKUQGn6fds" },
      features: [
        t('projectsPage.projects.23.features.0'),
        t('projectsPage.projects.23.features.1'),
        t('projectsPage.projects.23.features.2'),
        t('projectsPage.projects.23.features.3')
      ],
      cost: t('projectsPage.projects.23.cost'),
      timeline: t('projectsPage.projects.23.timeline')
    },
    {
      id: 24,
      title: t('projectsPage.projects.24.title'),
      category: "residential",
      location: t('projectsPage.projects.24.location'),
      completedDate: t('projectsPage.projects.24.completedDate'),
      area: t('projectsPage.projects.24.area'),
      units: t('projectsPage.projects.24.units'),
      description: t('projectsPage.projects.24.description'),
      videoData: { src: "https://www.youtube.com/watch?v=7fJTZgu7yP4" },
      features: [
        t('projectsPage.projects.24.features.0'),
        t('projectsPage.projects.24.features.1'),
        t('projectsPage.projects.24.features.2'),
        t('projectsPage.projects.24.features.3')
      ],
      cost: t('projectsPage.projects.24.cost'),
      timeline: t('projectsPage.projects.24.timeline')
    },
    {
      id: 25,
      title: t('projectsPage.projects.25.title'),
      category: "commercial",
      location: t('projectsPage.projects.25.location'),
      completedDate: t('projectsPage.projects.25.completedDate'),
      area: t('projectsPage.projects.25.area'),
      units: t('projectsPage.projects.25.units'),
      description: t('projectsPage.projects.25.description'),
      videoData: { src: "https://www.youtube.com/watch?v=NXhZM_dAQP4" },
      features: [
        t('projectsPage.projects.25.features.0'),
        t('projectsPage.projects.25.features.1'),
        t('projectsPage.projects.25.features.2'),
        t('projectsPage.projects.25.features.3')
      ],
      cost: t('projectsPage.projects.25.cost'),
      timeline: t('projectsPage.projects.25.timeline')
    },
    {
      id: 26,
      title: t('projectsPage.projects.26.title'),
      category: "commercial",
      location: t('projectsPage.projects.26.location'),
      completedDate: t('projectsPage.projects.26.completedDate'),
      area: t('projectsPage.projects.26.area'),
      units: t('projectsPage.projects.26.units'),
      description: t('projectsPage.projects.26.description'),
      videoData: { src: "https://www.youtube.com/watch?v=eiQmuluxmGY&t=54s" },
      features: [
        t('projectsPage.projects.26.features.0'),
        t('projectsPage.projects.26.features.1'),
        t('projectsPage.projects.26.features.2'),
        t('projectsPage.projects.26.features.3')
      ],
      cost: t('projectsPage.projects.26.cost'),
      timeline: t('projectsPage.projects.26.timeline')
    },
    {
      id: 27,
      title: t('projectsPage.projects.27.title'),
      category: "commercial",
      location: t('projectsPage.projects.27.location'),
      completedDate: t('projectsPage.projects.27.completedDate'),
      area: t('projectsPage.projects.27.area'),
      units: t('projectsPage.projects.27.units'),
      description: t('projectsPage.projects.27.description'),
      videoData: { src: "https://www.youtube.com/watch?v=DjZ3XLukge8&t=11s" },
      features: [
        t('projectsPage.projects.27.features.0'),
        t('projectsPage.projects.27.features.1'),
        t('projectsPage.projects.27.features.2'),
        t('projectsPage.projects.27.features.3')
      ],
      cost: t('projectsPage.projects.27.cost'),
      timeline: t('projectsPage.projects.27.timeline')
    },
    {
      id: 28,
      title: t('projectsPage.projects.28.title'),
      category: "commercial",
      location: t('projectsPage.projects.28.location'),
      completedDate: t('projectsPage.projects.28.completedDate'),
      area: t('projectsPage.projects.28.area'),
      units: t('projectsPage.projects.28.units'),
      description: t('projectsPage.projects.28.description'),
      videoData: { src: "https://www.youtube.com/watch?v=BYJd5vFC7e8" },
      features: [
        t('projectsPage.projects.28.features.0'),
        t('projectsPage.projects.28.features.1'),
        t('projectsPage.projects.28.features.2'),
        t('projectsPage.projects.28.features.3')
      ],
      cost: t('projectsPage.projects.28.cost'),
      timeline: t('projectsPage.projects.28.timeline')
    },
    {
      id: 29,
      title: t('projectsPage.projects.29.title'),
      category: "other",
      location: t('projectsPage.projects.29.location'),
      completedDate: t('projectsPage.projects.29.completedDate'),
      area: t('projectsPage.projects.29.area'),
      units: t('projectsPage.projects.29.units'),
      description: t('projectsPage.projects.29.description'),
      videoData: { src: "https://www.youtube.com/watch?v=hWeGHcPEoCg" },
      features: [
        t('projectsPage.projects.29.features.0'),
        t('projectsPage.projects.29.features.1'),
        t('projectsPage.projects.29.features.2'),
        t('projectsPage.projects.29.features.3')
      ],
      cost: t('projectsPage.projects.29.cost'),
      timeline: t('projectsPage.projects.29.timeline')
    },
    {
      id: 30,
      title: t('projectsPage.projects.30.title'),
      category: "other",
      location: t('projectsPage.projects.30.location'),
      completedDate: t('projectsPage.projects.30.completedDate'),
      area: t('projectsPage.projects.30.area'),
      units: t('projectsPage.projects.30.units'),
      description: t('projectsPage.projects.30.description'),
      videoData: { src: "https://www.youtube.com/watch?v=5lW6oLaa-XU" },
      features: [
        t('projectsPage.projects.30.features.0'),
        t('projectsPage.projects.30.features.1'),
        t('projectsPage.projects.30.features.2'),
        t('projectsPage.projects.30.features.3')
      ],
      cost: t('projectsPage.projects.30.cost'),
      timeline: t('projectsPage.projects.30.timeline')
    },
    {
      id: 31,
      title: t('projectsPage.projects.31.title'),
      category: "commercial",
      location: t('projectsPage.projects.31.location'),
      completedDate: t('projectsPage.projects.31.completedDate'),
      area: t('projectsPage.projects.31.area'),
      units: t('projectsPage.projects.31.units'),
      description: t('projectsPage.projects.31.description'),
      videoData: { src: "https://www.youtube.com/watch?v=b_YqqGCXYrE" },
      features: [
        t('projectsPage.projects.31.features.0'),
        t('projectsPage.projects.31.features.1'),
        t('projectsPage.projects.31.features.2'),
        t('projectsPage.projects.31.features.3')
      ],
      cost: t('projectsPage.projects.31.cost'),
      timeline: t('projectsPage.projects.31.timeline')
    },
    {
      id: 32,
      title: t('projectsPage.projects.32.title'),
      category: "commercial",
      location: t('projectsPage.projects.32.location'),
      completedDate: t('projectsPage.projects.32.completedDate'),
      area: t('projectsPage.projects.32.area'),
      units: t('projectsPage.projects.32.units'),
      description: t('projectsPage.projects.32.description'),
      videoData: { src: "https://www.youtube.com/watch?v=GurMPpXi9Js&t=42s" },
      features: [
        t('projectsPage.projects.32.features.0'),
        t('projectsPage.projects.32.features.1'),
        t('projectsPage.projects.32.features.2'),
        t('projectsPage.projects.32.features.3')
      ],
      cost: t('projectsPage.projects.32.cost'),
      timeline: t('projectsPage.projects.32.timeline')
    },
    {
      id: 33,
      title: t('projectsPage.projects.33.title'),
      category: "commercial",
      location: t('projectsPage.projects.33.location'),
      completedDate: t('projectsPage.projects.33.completedDate'),
      area: t('projectsPage.projects.33.area'),
      units: t('projectsPage.projects.33.units'),
      description: t('projectsPage.projects.33.description'),
      videoData: { src: "https://www.youtube.com/watch?v=GurMPpXi9Js" },
      features: [
        t('projectsPage.projects.33.features.0'),
        t('projectsPage.projects.33.features.1'),
        t('projectsPage.projects.33.features.2'),
        t('projectsPage.projects.33.features.3')
      ],
      cost: t('projectsPage.projects.33.cost'),
      timeline: t('projectsPage.projects.33.timeline')
    },
    {
      id: 34,
      title: t('projectsPage.projects.34.title'),
      category: "commercial",
      location: t('projectsPage.projects.34.location'),
      completedDate: t('projectsPage.projects.34.completedDate'),
      area: t('projectsPage.projects.34.area'),
      units: t('projectsPage.projects.34.units'),
      description: t('projectsPage.projects.34.description'),
      videoData: { src: "https://www.youtube.com/shorts/QYj_CndCGi4" },
      features: [
        t('projectsPage.projects.34.features.0'),
        t('projectsPage.projects.34.features.1'),
        t('projectsPage.projects.34.features.2'),
        t('projectsPage.projects.34.features.3')
      ],
      cost: t('projectsPage.projects.34.cost'),
      timeline: t('projectsPage.projects.34.timeline')
    },
    {
      id: 35,
      title: t('projectsPage.projects.35.title'),
      category: "commercial",
      location: t('projectsPage.projects.35.location'),
      completedDate: t('projectsPage.projects.35.completedDate'),
      area: t('projectsPage.projects.35.area'),
      units: t('projectsPage.projects.35.units'),
      description: t('projectsPage.projects.35.description'),
      videoData: { src: "https://www.youtube.com/shorts/I-jLpimEavU" },
      features: [
        t('projectsPage.projects.35.features.0'),
        t('projectsPage.projects.35.features.1'),
        t('projectsPage.projects.35.features.2'),
        t('projectsPage.projects.35.features.3')
      ],
      cost: t('projectsPage.projects.35.cost'),
      timeline: t('projectsPage.projects.35.timeline')
    },
    {
      id: 36,
      title: t('projectsPage.projects.36.title'),
      category: "commercial",
      location: t('projectsPage.projects.36.location'),
      completedDate: t('projectsPage.projects.36.completedDate'),
      area: t('projectsPage.projects.36.area'),
      units: t('projectsPage.projects.36.units'),
      description: t('projectsPage.projects.36.description'),
      videoData: { src: "https://www.youtube.com/shorts/99rlkPcoUnw" },
      features: [
        t('projectsPage.projects.36.features.0'),
        t('projectsPage.projects.36.features.1'),
        t('projectsPage.projects.36.features.2'),
        t('projectsPage.projects.36.features.3')
      ],
      cost: t('projectsPage.projects.36.cost'),
      timeline: t('projectsPage.projects.36.timeline')
    },
    {
      id: 37,
      title: t('projectsPage.projects.37.title'),
      category: "other",
      location: t('projectsPage.projects.37.location'),
      completedDate: t('projectsPage.projects.37.completedDate'),
      area: t('projectsPage.projects.37.area'),
      units: t('projectsPage.projects.37.units'),
      description: t('projectsPage.projects.37.description'),
      videoData: { src: "https://www.youtube.com/shorts/5KPNzKfOhtU" },
      features: [
        t('projectsPage.projects.37.features.0'),
        t('projectsPage.projects.37.features.1'),
        t('projectsPage.projects.37.features.2'),
        t('projectsPage.projects.37.features.3')
      ],
      cost: t('projectsPage.projects.37.cost'),
      timeline: t('projectsPage.projects.37.timeline')
    }
  ];

  const projects = getProjects();

  const categories = [
    { id: 'all', label: t('projectsPage.categories.all'), count: projects.length },
    { id: 'residential', label: t('projectsPage.categories.residential'), count: projects.filter(p => p.category === 'residential').length },
    { id: 'penthouse', label: t('projectsPage.categories.penthouse'), count: projects.filter(p => p.category === 'penthouse').length },
    { id: 'commercial', label: t('projectsPage.categories.commercial'), count: projects.filter(p => p.category === 'commercial').length },
    { id: 'farmhouse', label: t('projectsPage.categories.farmhouse'), count: projects.filter(p => p.category === 'farmhouse').length },
    { id: 'other', label: t('projectsPage.categories.other'), count: projects.filter(p => p.category === 'other').length }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  function handleThumbClick(project) {
    const isYouTube = !!getYouTubeId(project.videoData?.src || "");
    if (isYouTube) {
      setSelectedVideo({ url: project.videoData.src, title: project.title });
    } else if (project.videoData?.src) {
      window.open(project.videoData.src, "_blank", "noopener noreferrer");
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, rgba(245,222,179,0.3), white)' }}>
      <div className="w-full h-2" style={{ background: 'linear-gradient(to right, #FDB515, #654321)' }} />

      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 border-0" style={{ backgroundColor: '#FDB515', color: 'white' }}>
              {t('projectsPage.badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl mb-6 font-bold"
                style={{ background: 'linear-gradient(135deg, #FDB515 0%, #8B4513 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', paddingBottom: '1rem' }}>
              {t('projectsPage.heading')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#A0522D' }}>
              {t('projectsPage.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="font-semibold transition-all duration-300"
                style={{
                  backgroundColor: selectedCategory === category.id ? '#FDB515' : 'transparent',
                  color: selectedCategory === category.id ? 'white' : '#8B4513',
                  borderColor: selectedCategory === category.id ? '#FDB515' : '#8B4513'
                }}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0 rounded-xl bg-white"
                style={{ border: '1px solid #E5D5B7' }}
              >
                <div className="relative cursor-pointer" onClick={() => handleThumbClick(project)}>
                  <img
                    src={getVideoThumbnail(project.videoData?.src || "")}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ background: '#eee' }}
                  />
                  <YoutubeSVG />
                  <div className="absolute top-4 left-4">
                    <Badge className="capitalize border-0" style={{ backgroundColor: '#FDB515', color: 'white' }}>
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl mb-2 font-semibold" style={{ color: '#3C2414' }}>{project.title}</h3>
                  <p className="mb-4 text-sm" style={{ color: '#A0522D' }}>{project.description}</p>
                  <div className="space-y-2 mb-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2" style={{ color: '#FDB515' }} />
                      <span style={{ color: '#A0522D' }}>{project.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2" style={{ color: '#FDB515' }} />
                      <span style={{ color: '#A0522D' }}>{t('projectsPage.completedLabel')}: {project.completedDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Home className="w-4 h-4 mr-2" style={{ color: '#FDB515' }} />
                      <span style={{ color: '#A0522D' }}>{project.area} • {project.units}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2 mt-2">
                    {project.features?.slice(0,3).map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-0"
                        style={{ backgroundColor: '#FDF8E8', color: '#8B4513' }}>
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  {/* <div className="flex justify-between text-xs font-semibold mt-2" style={{ color: '#A0522D' }}>
                    <span>{t('projectsPage.costLabel')}: {project.cost}</span>
                    <span>{t('projectsPage.timelineLabel')}: {project.timeline}</span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      <section className="py-16 text-white"
        style={{ background: 'linear-gradient(135deg, #FDB515 0%, #8B4513 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 font-bold">{t('projectsPage.cta.title')}</h2>
          <p className="text-xl mb-8" style={{ color: 'rgba(255,255,255,0.9)' }}>
            {t('projectsPage.cta.description')}
          </p>
          <Button size="lg" className="font-semibold transition-all duration-300 border-2"
                  style={{ backgroundColor: 'white', color: '#3C2414', borderColor: 'white' }}>
            {t('projectsPage.cta.button')}
          </Button>
        </div>
      </section>
    </div>
  );
}
