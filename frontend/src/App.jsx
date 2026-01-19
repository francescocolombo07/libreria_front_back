import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [libri, setLibri] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLibri = async () => {
      try {
        const response = await fetch('http://localhost:11000/api/libri')
        if (!response.ok) {
          throw new Error('Errore nel recupero dei libri')
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
    <div className="container">
      <header className="header">
        <h1>Libreria</h1>
      </header>

      {loading && <div className="loading">Caricamento...</div>}
      {error && <div className="error">Errore: {error}</div>}

      <div className="books-grid">
        {libri.map((libro) => (
          <div key={libro.id} className="book-card">
            <div className="book-card-header">
              <h2 className="book-title">{libro.titolo}</h2>
            </div>
            <div className="book-card-body">
              <p className="book-id"><strong>ID:</strong> {libro.id}</p>
              <p className="book-author"><strong>Autore:</strong> {libro.autore}</p>
              <p className="book-genre"><strong>Genere:</strong> {libro.genere}</p>
              <p className="book-year"><strong>Anno:</strong> {libro.anno}</p>
            </div>
          </div>
        ))}
      </div>

      {!loading && libri.length === 0 && !error && (
        <div className="no-books">Nessun libro trovato</div>
      )}
    </div>
  )
}

export default App
