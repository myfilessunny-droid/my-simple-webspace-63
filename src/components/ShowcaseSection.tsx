import React, { useEffect, useState } from 'react';
import { ExternalLink, Camera, BookOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const ShowcaseSection = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data, error } = await supabase
          .from('stories')
          .select('title, excerpt, read_time_minutes')
          .eq('status', 'published')
          .limit(3)
          .order('published_at', { ascending: false });

        if (error) {
          console.error('Error fetching stories:', error);
        } else {
          setStories(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const images = [
    {
      icon: "🛕",
      gradient: "from-indigo/20 to-sandalwood/30",
      caption: "Kurnool Temple Revival",
      description: "Restoring ancient architecture with traditional techniques"
    },
    {
      icon: "🪡", 
      gradient: "from-clay-red/20 to-turmeric/30",
      caption: "Artisan Training Program",
      description: "Empowering women through traditional textile skills"
    },
    {
      icon: "📚",
      gradient: "from-sandalwood/20 to-ivory/40",
      caption: "Cultural Education",
      description: "Teaching children Sanskrit and traditional arts"
    },
    {
      icon: "🎨",
      gradient: "from-turmeric/20 to-clay-red/30",
      caption: "Heritage Art Revival",
      description: "Preserving ancient painting techniques"
    }
  ];

  return (
    <section 
      ref={elementRef} 
      id="stories" 
      className={`py-24 px-6 lg:px-20 max-w-7xl mx-auto transition-all duration-1000 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="text-center text-4xl font-semibold text-primary mb-16">
        Stories from the Ground
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column - Stories & Blogs */}
        <div>
          <h3 className="text-xl font-semibold text-accent mb-6">
            Voices of Change
          </h3>
          
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-muted-foreground">Loading inspiring stories...</p>
              </div>
            ) : stories.length > 0 ? (
              stories.map((story, index) => (
                <article
                  key={index}
                  className="bg-white border-l-4 border-sandalwood p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-lg font-medium text-primary mb-2 leading-snug">
                    {story.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {story.excerpt || "Read this inspiring story..."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {story.read_time_minutes} min read
                    </span>
                    <button className="story-link text-sm text-accent hover:text-accent/80 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-2 py-1 group flex items-center gap-1">
                      <BookOpen className="w-3 h-3 group-hover:scale-110 transition-transform" />
                      Read More
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No stories available yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Visual Grid */}
        <div>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden shadow-soft hover:shadow-warm transition-all duration-500 cursor-pointer hover-lift"
              >
                <div className={`aspect-square bg-gradient-to-br ${image.gradient} flex flex-col items-center justify-center p-6 border border-sandalwood/20`}>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {image.icon}
                  </div>
                  <h4 className="text-sm font-medium text-primary text-center mb-2">
                    {image.caption}
                  </h4>
                  <p className="text-xs text-muted-foreground text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.description}
                  </p>
                </div>
                
                {/* Interactive Border Effect */}
                <div className="absolute inset-0 border-2 border-turmeric opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl scale-105 group-hover:scale-100"></div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-8 text-center">
            <button 
              className="btn-primary group"
              onClick={() => window.open('#stories', '_self')}
            >
              <span className="group-hover:scale-105 transition-transform duration-300">
                See Our Stories
              </span>
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-8 px-8 py-4 bg-ivory border border-sandalwood rounded-2xl">
          <div>
            <div className="text-2xl font-bold text-accent">50+</div>
            <div className="text-sm text-muted-foreground">Impact Stories</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div>
            <div className="text-2xl font-bold text-accent">1000+</div>
            <div className="text-sm text-muted-foreground">Photos & Videos</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div>
            <div className="text-2xl font-bold text-accent">24/7</div>
            <div className="text-sm text-muted-foreground">Community Updates</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;