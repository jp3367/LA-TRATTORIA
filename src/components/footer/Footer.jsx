import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  const pageLinks = [
    { path: '/home', label: 'Inicio' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'Nosotros' },
    { path: '/contact', label: 'Contacto' },
  ]

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-name">La Trattoria</span>
          </div>
          <p className="footer-description">
            Cocina italiana autentica elaborada con ingredientes frescos y pasion por la tradicion.
          </p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">Twitter</a>
            <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">TripAdvisor</a>
          </div>
        </div>
        <div className="footer-links">
          <h4 className="footer-links-title">Navegacion</h4>
          {pageLinks.map((link) => (
            <Link key={link.path} to={link.path} className="footer-link">{link.label}</Link>
          ))}
        </div>
        <div className="footer-contact">
          <h4 className="footer-links-title">Contacto</h4>
          <p>Calle Rossini 14, Madrid</p>
          <p>+34 910 123 456</p>
          <p>info@latrattoria.es</p>
          <p>Lun-Dom: 13:00 - 23:30</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p>© {currentYear} La Trattoria. Todos los derechos reservados.</p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Politica de Privacidad</a>
            <span>|</span>
            <a href="#" className="footer-legal-link">Condiciones de Venta</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer