import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './Gallery.css';

function Gallery() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);

  const categories = ['Todos', 'Eventos', 'Noticias', 'Especiales', 'Chef'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setEvents(eventsData);
        setFilteredEvents(eventsData);
      } catch (err) {
        console.error('Error al cargar eventos:', err);
        setEvents([]); // Vacío si falla
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => event.category === selectedCategory);
      setFilteredEvents(filtered);
    }
  }, [selectedCategory, events]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-loading">Cargando eventos...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section">
      <div className="container">
        <p className="section-subtitle">Lo último</p>
        <h2 className="section-title">Eventos y Noticias</h2>
        <p className="gallery-intro">
          Descubre las últimas novedades, eventos especiales y noticias de nuestro restaurante.
        </p>

        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`gallery-filter-btn ${selectedCategory === category ? 'gallery-filter-btn--active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <article key={event.id} className="gallery-card">
                <div className="gallery-card-image">
                  <img src={event.image} alt={event.title} />
                  <span className="gallery-card-category">{event.category}</span>
                </div>
                <div className="gallery-card-content">
                  <h3 className="gallery-card-title">{event.title}</h3>
                  <p className="gallery-card-description">{event.description}</p>
                  <time className="gallery-card-date">
                    {new Date(event.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </time>
                </div>
              </article>
            ))
          ) : (
            <p className="gallery-empty">No hay eventos disponibles en esta categoría.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Gallery;