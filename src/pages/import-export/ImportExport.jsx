import { useState, useEffect } from 'react'
import { getDishes, importDishes, clearDishes } from '../../services/dishesService'
import {
  exportToJSON, exportToCSV, exportToXML,
  parseJSON, parseCSV, parseXML,
} from '../../services/importExportService'
import './ImportExport.css'

function ImportExport() {
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)   // { type: 'ok'|'error', msg }
  const [importing, setImporting] = useState(false)

  useEffect(() => {
    loadDishes()
  }, [])

  async function loadDishes() {
    setLoading(true)
    try {
      const data = await getDishes()
      setDishes(data)
    } catch {
      setStatus({ type: 'error', msg: 'Error al cargar datos de Firebase.' })
    } finally {
      setLoading(false)
    }
  }

  // ── Export ────────────────────────────────────────────────────────────
  function handleExport(format) {
    if (dishes.length === 0) {
      setStatus({ type: 'error', msg: 'No hay platos en Firebase para exportar.' })
      return
    }
    if (format === 'json') exportToJSON(dishes)
    else if (format === 'csv') exportToCSV(dishes)
    else if (format === 'xml') exportToXML(dishes)
    setStatus({ type: 'ok', msg: `Archivo datos.${format} descargado correctamente.` })
  }

  // ── Import ────────────────────────────────────────────────────────────
  async function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const ext = file.name.split('.').pop().toLowerCase()
    const validExts = ['json', 'csv', 'xml']
    if (!validExts.includes(ext)) {
      setStatus({ type: 'error', msg: 'Formato no soportado. Usa .json, .csv o .xml' })
      e.target.value = ''
      return
    }

    setImporting(true)
    setStatus(null)
    try {
      const text = await file.text()
      let parsed
      if (ext === 'json') parsed = parseJSON(text)
      else if (ext === 'csv') parsed = parseCSV(text)
      else parsed = parseXML(text)

      if (!parsed.length) throw new Error('El archivo no contiene platos válidos.')

      await clearDishes()
      await importDishes(parsed)
      await loadDishes()
      setStatus({ type: 'ok', msg: `${parsed.length} platos importados desde ${file.name}.` })
    } catch (err) {
      setStatus({ type: 'error', msg: `Error al importar: ${err.message}` })
    } finally {
      setImporting(false)
      e.target.value = ''
    }
  }

  return (
    <main className="ie-page">
      <section className="ie-hero">
        <div className="container">
          <p className="section-subtitle">Gestión de datos</p>
          <h1 className="section-title ie-hero-title">Importar / Exportar</h1>
          <p className="ie-hero-text">
            Importa el menú desde un archivo o exporta los datos actuales de Firebase.
          </p>
        </div>
      </section>

      <section className="ie-content">
        <div className="container ie-grid">

          {/* ── EXPORT ── */}
          <div className="ie-card">
            <div className="ie-card-icon">↓</div>
            <h2 className="ie-card-title">Exportar</h2>
            <p className="ie-card-desc">
              Descarga los platos actuales de Firebase en el formato que prefieras.
            </p>
            {loading ? (
              <p className="ie-loading">Cargando datos…</p>
            ) : (
              <p className="ie-count">{dishes.length} plato{dishes.length !== 1 ? 's' : ''} en Firebase</p>
            )}
            <div className="ie-btn-group">
              <button className="ie-btn ie-btn--json" onClick={() => handleExport('json')}>
                Exportar JSON
              </button>
              <button className="ie-btn ie-btn--csv" onClick={() => handleExport('csv')}>
                Exportar CSV
              </button>
              <button className="ie-btn ie-btn--xml" onClick={() => handleExport('xml')}>
                Exportar XML
              </button>
            </div>
          </div>

          {/* ── IMPORT ── */}
          <div className="ie-card">
            <div className="ie-card-icon">↑</div>
            <h2 className="ie-card-title">Importar</h2>
            <p className="ie-card-desc">
              Sube un archivo <strong>.json</strong>, <strong>.csv</strong> o <strong>.xml</strong>.
              Esto reemplazará todos los platos actuales en Firebase.
            </p>
            <label className={`ie-upload-label ${importing ? 'ie-upload-label--disabled' : ''}`}>
              {importing ? 'Importando…' : 'Seleccionar archivo'}
              <input
                type="file"
                accept=".json,.csv,.xml"
                onChange={handleImport}
                disabled={importing}
                className="ie-upload-input"
              />
            </label>
            <p className="ie-hint">Formatos aceptados: .json · .csv · .xml</p>
          </div>
        </div>

        {/* ── STATUS ── */}
        {status && (
          <div className={`ie-status ie-status--${status.type}`}>
            {status.type === 'ok' ? '✓' : '✕'} {status.msg}
          </div>
        )}

        {/* ── TABLE ── */}
        {!loading && dishes.length > 0 && (
          <div className="container ie-table-wrap">
            <h3 className="ie-table-title">Platos actuales en Firebase</h3>
            <div className="ie-table-scroll">
              <table className="ie-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Popular</th>
                  </tr>
                </thead>
                <tbody>
                  {dishes.map((d) => (
                    <tr key={d.id}>
                      <td>{d.name}</td>
                      <td><span className="ie-badge">{d.category}</span></td>
                      <td>{d.price}</td>
                      <td>{d.isPopular ? '⭐' : '–'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && dishes.length === 0 && (
          <div className="container ie-empty">
            <p>No hay platos en Firebase. Importa un archivo para empezar.</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default ImportExport
