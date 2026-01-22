import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [libri, setLibri] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    titolo: '',
    autore: '',
    genere: '',
    anno: ''
  })

  const [filtri, setFiltri] = useState({
    autore: '',
    genere: ''
  })

  const [deleteId, setDeleteId] = useState('')

  const fetchLibri = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:11000/api/libri')
      if (!response.ok) throw new Error('Errore nel recupero dei libri')
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

  useEffect(() => {
    fetchLibri()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddBook = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:11000/api/libri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        setFormData({ titolo: '', autore: '', genere: '', anno: '' })
        fetchLibri()
      }
    } catch (err) {
      alert("Errore nell'aggiunta")
    }
  }

  const handleDeleteBook = async () => {
    if (!deleteId) return
    try {
      const response = await fetch(`http://localhost:11000/api/libri/${deleteId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setDeleteId('')
        fetchLibri()
      }
    } catch (err) {
      alert("Errore nella cancellazione")
    }
  }

  const handleDeleteAll = async () => {
    if (!confirm("Sei sicuro di voler eliminare tutti i libri?")) return
    try {
      const response = await fetch('http://localhost:11000/api/libri', {
        method: 'DELETE'
      })
      if (response.ok) fetchLibri()
    } catch (err) {
      alert("Errore")
    }
  }

  const libriFiltrati = libri.filter(libro => {
    return (libro.autore?.toLowerCase() || "").includes(filtri.autore.toLowerCase()) &&
           (libro.genere?.toLowerCase() || "").includes(filtri.genere.toLowerCase())
  })

  return (
    <div className="container">
      <header className="header">
        <h1>Libreria</h1>
      </header>

      <div className="main-layout">
        <div className="books-section">
          <div className="books-grid">
            {libriFiltrati.length > 0 ? (
              libriFiltrati.map((libro) => (
                <div key={libro.id} className="book-card">
                  <div className="book-card-header">
                    <h2 className="book-title" title={libro.titolo}>{libro.titolo}</h2>
                  </div>
                  <div className="book-card-body">
                    <p><strong>ID:</strong> {libro.id}</p>
                    <p><strong>Autore:</strong> {libro.autore}</p>
                    <p><strong>Genere:</strong> {libro.genere}</p>
                    <p><strong>Anno:</strong> {libro.anno}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">Nessun libro trovato.</p>
            )}
          </div>
        </div>

        <div className="controls-section">
          <div className="control-card">
            <h3>FILTRA LIBRI</h3>
            <div className="control-form">
              <div className="input-group">
                <label>Autore:</label>
                <input 
                  type="text" 
                  value={filtri.autore} 
                  onChange={(e) => setFiltri({...filtri, autore: e.target.value})} 
                  className="input-field" 
                />
              </div>
              <div className="input-group">
                <label>Genere:</label>
                <input 
                  type="text" 
                  value={filtri.genere} 
                  onChange={(e) => setFiltri({...filtri, genere: e.target.value})} 
                  className="input-field" 
                />
              </div>
              <div className="button-container">
                <button className="btn" onClick={() => setFiltri({autore: '', genere: ''})}>
                  RIMUOVI FILTRI
                </button>
              </div>
            </div>
          </div>

          <div className="control-card">
            <h3>AGGIUNGI LIBRO</h3>
            <form onSubmit={handleAddBook} className="control-form">
              <div className="input-group">
                <label>Titolo:</label>
                <input type="text" name="titolo" value={formData.titolo} onChange={handleInputChange} className="input-field" required />
              </div>
              <div className="input-group">
                <label>Autore:</label>
                <input type="text" name="autore" value={formData.autore} onChange={handleInputChange} className="input-field" required />
              </div>
              <div className="input-group">
                <label>Genere:</label>
                <input type="text" name="genere" value={formData.genere} onChange={handleInputChange} className="input-field" />
              </div>
              <div className="input-group">
                <label>Anno:</label>
                <input type="number" name="anno" value={formData.anno} onChange={handleInputChange} className="input-field" />
              </div>
              <div className="button-container">
                <button type="submit" className="btn">AGGIUNGI</button>
              </div>
            </form>
          </div>

          <div className="control-card">
            <h3>RIMUOVI LIBRO</h3>
            <div className="control-form">
              <div className="input-group">
                <label>ID:</label>
                <input type="number" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} className="input-field" />
              </div>
              <div className="button-container">
                <button onClick={handleDeleteBook} className="btn">RIMUOVI</button>
              </div>
            </div>
          </div>

          <button onClick={handleDeleteAll} className="btn full-width">ELIMINA TUTTO</button>
        </div>
      </div>
    </div>
  )
}

export default App