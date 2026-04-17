import { useState, useEffect } from 'react'
import DishCard from '../../components/dish-card/DishCard'
import { getDishes } from '../../services/dishesService'
import './Menu.css'

function Menu() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('Todos')

  useEffect(() => {
    getDishes()
      .then((data) => setDishes(data))
      .catch(() => setError('No se pudieron cargar los platos. Comprueba la conexion.'))
      .finally(() => setLoading(false))
  }, [])

  const categories = ['Todos', ...new Set(dishes.map((item) => item.category))]
  const filteredItems =
    activeCategory === 'Todos'
      ? dishes
      : dishes.filter((item) => item.category === activeCategory)

  return (
    <main className="menu-page">
      <section className="menu-hero">
        <div className="container">
          <p className="section-subtitle">Nuestra propuesta</p>
          <h1 className="section-title menu-hero-title">La Carta</h1>
          <p className="menu-hero-text">
            Platos elaborados con ingredientes frescos y recetas tradicionales italianas.
          </p>
        </div>
      </section>
      <section className="menu-content">
        <div className="container">
          {loading && <p style={{ textAlign: 'center', color: '#888' }}>Cargando menu...</p>}
          {error   && <p style={{ textAlign: 'center', color: '#8b1a1a' }}>{error}</p>}
          {!loading && !error && (
            <>
              <div className="menu-filters">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`menu-filter-btn ${activeCategory === cat ? 'menu-filter-btn--active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {filteredItems.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888' }}>
                  No hay platos en Firebase. Importa datos en la seccion Datos.
                </p>
              ) : (
                <div className="menu-grid">
                  {filteredItems.map((dish) => (
                    <DishCard key={dish.id} dish={dish} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Menu
