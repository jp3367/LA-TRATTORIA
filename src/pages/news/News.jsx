import { useState, useEffect } from 'react';
import RSSFeedItem from '../../components/rss-feed-item/RSSFeedItem';
import './News.css';

function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

const RSS_FEED_URL = '/rss.xml';

    useEffect(() => {
        fetchRSSFeed();
    }, []);

    const fetchRSSFeed = async () => {
        try {
            setLoading(true);

            const response = await fetch(RSS_FEED_URL);
            const text = await response.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');

            const items = xmlDoc.querySelectorAll('item');
            const newsData = Array.from(items).slice(0, 12).map((item, index) => ({
                id: index + 1,
                title: item.querySelector('title')?.textContent || 'Sin título',
                description: item.querySelector('description')?.textContent || 'Sin descripción',
                link: item.querySelector('link')?.textContent || '#',
                pubDate: item.querySelector('pubDate')?.textContent || '',
                category: item.querySelector('category')?.textContent || 'Gastronomía'
            }));

            setNews(newsData);
            setError(null);
        } catch (err) {
            console.error('Error al cargar RSS:', err);
            setError('No se pudo cargar el feed RSS. Mostrando noticias de ejemplo.');

            const mockNews = [
                {
                    id: 1,
                    title: 'Nuevas tendencias en cocina italiana contemporánea',
                    description: 'La cocina italiana evoluciona con técnicas modernas que respetan la tradición. Descubre las últimas innovaciones gastronómicas.',
                    link: '#',
                    pubDate: new Date().toISOString(),
                    category: 'Gastronomía'
                },
                {
                    id: 2,
                    title: 'Los mejores vinos italianos de 2024',
                    description: 'Una selección de los vinos más destacados de las regiones vinícolas de Italia este año.',
                    link: '#',
                    pubDate: new Date().toISOString(),
                    category: 'Vinos'
                },
                {
                    id: 3,
                    title: 'Receta tradicional: Risotto alla Milanese perfecto',
                    description: 'Aprende a preparar el clásico risotto milanés con azafrán siguiendo la receta auténtica.',
                    link: '#',
                    pubDate: new Date().toISOString(),
                    category: 'Recetas'
                },
                {
                    id: 4,
                    title: 'El arte de hacer pasta fresca en casa',
                    description: 'Guía completa para dominar la técnica de la pasta casera como los nonnas italianas.',
                    link: '#',
                    pubDate: new Date().toISOString(),
                    category: 'Técnicas'
                }
            ];

            setNews(mockNews);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="news-page">
                <div className="container">
                    <div className="news-loading">Cargando noticias...</div>
                </div>
            </main>
        );
    }

    return (
        <main className="news-page">
            <section className="news-hero">
                <div className="container">
                    <p className="section-subtitle">Actualidad gastronómica</p>
                    <h1 className="section-title">Noticias del Mundo Culinario</h1>
                    <p className="news-hero-text">
                        Las últimas novedades sobre gastronomía, vinos y cocina italiana
                    </p>
                </div>
            </section>

            <section className="news-content">
                <div className="container">
                    {error && (
                        <div className="news-notice">
                            {error}
                        </div>
                    )}

                    <div className="rss-info">
                        <p>
                            <strong>Feed RSS:</strong> Canarias7 - Gastronomía
                        </p>
                        <a
                            href={RSS_FEED_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rss-link"
                        >
                             Ver feed RSS completo
                        </a>
                    </div>

                    <div className="news-grid">
                        {news.map(item => (
                            <RSSFeedItem
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                link={item.link}
                                pubDate={item.pubDate}
                                category={item.category}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default News;