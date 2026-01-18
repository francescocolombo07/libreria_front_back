import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [libri, setLibri] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLibri = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:11000/api/libri')
        if (!response.ok) {
          throw new Error('Errore nel caricamento dei dati')
        }
        const data = await response.json()
        setLibri(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        setLibri([])
      } finally {
        setLoading(false)
      }
    }

    fetchLibri()
  }, [])

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1>Libreria</h1>
        {loading && <p className="loading">Caricamento...</p>}
        {error && <p className="error">Errore: {error}</p>}
        <div className="libri-list">
          {libri.map((libro) => (
            <div key={libro.id} className="libro-card">
              <div className="card-header">
                <h3 className="libro-titolo">{libro.titolo}</h3>
              </div>
              <div className="card-body">
                <p><strong>ID:</strong> {libro.id}</p>
                <p><strong>Autore:</strong> {libro.autore}</p>
                <p><strong>Anno:</strong> {libro.anno}</p>
                <p><strong>Genere:</strong> {libro.genere}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
