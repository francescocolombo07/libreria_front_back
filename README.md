# Libreria Front-Back

Una semplice applicazione full-stack per la gestione di una libreria, con un backend Flask e un frontend React.

## 📁 Struttura del Progetto

```
libreria_front_back/
├── backend/          # API Flask con dati sui libri
├── frontend/         # Interfaccia React con Vite
└── README.md
```

## 🚀 Caratteristiche

- **Backend**: API REST in Flask per gestire una collezione di libri
- **Frontend**: Interfaccia moderna in React + Vite
- **CORS**: Configurato per la comunicazione front-back
- **Dati Mock**: 20 libri generati automaticamente con Faker

## 📋 Requisiti

- **Backend**: Python 3.12+
- **Frontend**: Node.js e npm

## 📋 Requisiti Funzionali
-Il sistema deve generare automaticamente 20 libri usando la libreria faker
-L'utente deve poter visualizzare l'elenco completo dei libri presenti nella libreria.
-L'utente deve poter aggiungere un nuovo libro tramite un form, inserendo titolo, autore, anno e genere.
-L'utente deve poter eliminare un libro inserendo il suo ID.
-L'utente deve poter eliminare tutta la libreria con un bottone.
-L'utente deve poter filtrare i libri per autore o per genere dall'interfaccia. 

## 📋 Requisiti Non funzionali
-Il sistema deve essere separato in frontend e backend
-Il sistema deve essere separato in frontend e backend
-Il backend deve essere sviluppato in Python utilizzando flask. 
-Il frontend deve essere sviluppata con React
-La comunicazione dei dati deve essere fatta tramite API REST in formato JSON.
-Il codice deve essere gestito e versionato tramite GitHub. 

## 📋 User Story
-Come utente, voglio poter visualizzare l'elenco completo dei libri presenti, così da poter consultare l'intero catalogo della libreria.
-Come utente, voglio poter filtrare i libri per autore o per genere, così da trovare rapidamente i libri che mi interessano.
-Come utente, voglio poter aggiungere un nuovo libro alla libreria, così da aggiornare la libreria con nuovi arrivi.
-Come utente, voglio poter eliminare un determinato libro, così da rimuovere i libri non più disponibili.
-Come utente, voglio poter eliminare l'intera libreria premendo un unico tasto, così da eliminare tutti i libri in caso di necessità.


## 🔧 Installazione e Avvio

### Backend

```bash
cd backend

# Installare le dipendenze
pip install -r pyproject.toml

# Avviare il server
flask run
```

Il backend sarà disponibile su: `http://localhost:5000`

### Frontend

```bash
cd frontend

# Installare le dipendenze
npm install

# Avviare il server di sviluppo
npm run dev
```

Il frontend sarà disponibile su: `http://localhost:5173`

## 🛠️ Comandi Principali

```bash
# Backend
flask run

# Frontend
npm run dev      # Sviluppo
npm run build    # Produzione
```

## 📚 API Endpoints

| Metodo | Endpoint | Descrizione |
|--------|----------|-------------|
| GET | `/api/libri` | Ottieni tutti i libri |
| POST | `/api/libri` | Aggiungi un nuovo libro |
| DELETE | `/api/libri/<id>` | Elimina un libro |

### Esempio Corpo POST
```json
{
  "titolo": "Il Nome della Rosa",
  "autore": "Umberto Eco",
  "anno": 1980,
  "genere": "Romanzo"
}
```

## 🎨 Frontend - Tecnologie e Struttura

Il frontend è un'applicazione React moderna costruita con Vite, progettata per offrire un'esperienza utente fluida e reattiva.

### Tecnologie Utilizzate

- **React 19.2.0** - Libreria UI basata su componenti con state management e lifecycle hooks
- **Vite 7.2.4** - Build tool ultra-veloce con hot module replacement (HMR) per sviluppo efficiente
- **ESLint** - Linter per mantenere la qualità e la consistenza del codice JavaScript

### Organizzazione del Frontend

```
frontend/
├── src/
│   ├── App.jsx       # Componente principale: gestisce stato dei libri, richieste API, rendering lista
│   ├── main.jsx      # Entry point: monta React all'elemento DOM root
│   ├── App.css       # Stili per il layout, tabelle, bottoni e responsive design
│   ├── index.css     # Reset CSS e stili globali
│   └── assets/       # Immagini, icone e risorse statiche
├── public/           # Favicon e file statici
├── package.json      # Dipendenze npm
├── vite.config.js    # Configurazione Vite, proxy API, chunking
└── eslint.config.js  # Regole ESLint per React e best practices
```

### Funzionalità Principali

**App.jsx** è il cuore dell'applicazione e implementa:

1. **Visualizzazione Lista Libri** - Fetches dati da `/api/libri` al mount e li visualizza in una tabella/lista ordinata
2. **Aggiunta Nuovo Libro** - Form per inserire titolo, autore, anno e genere, con POST request al backend
3. **Eliminazione Libro** - Bottone delete per rimuovere libri con DELETE request
4. **Gestione dello Stato** - Utilizza `useState` per mantenere la lista libri e form inputs, `useEffect` per API calls
5. **Handling Errori** - Try/catch per gestire errori di rete e API
6. **Styling Responsive** - CSS puro con design mobile-first per buona UX su tutti i dispositivi

### Flusso Dati Frontend-Backend

```
Frontend (React) <---> Backend (Flask API)
    ↓                        ↓
App.jsx fa fetch      Flask ritorna JSON
  GET /api/libri -----> 20 libri mock
  POST /api/libri ----> nuovo libro salvato
  DELETE /api/libri/1 -> libro eliminato
    ↓                        ↓
State aggiornato      API stateless
```

### Build e Deploy

- **Sviluppo**: `npm run dev` avvia Vite con HMR - modifiche istantanee senza reload
- **Produzione**: `npm run build` crea una cartella `dist/` con bundle minificato e ottimizzato
- **Preview**: `npm run preview` testa la build di produzione localmente

### Backend

Flask REST API con Flask-CORS (per permettere richieste cross-origin) e Faker (per generare libri mock di esempio)

## 📝 Note

- Il backend genera automaticamente 20 libri di esempio al primo avvio
- I dati vengono mantenuti in memoria durante la sessione
- CORS è abilitato per permettere richieste dal frontend
- Sviluppato con il supporto di GitHub Copilot e Google Gemini

## 🎯 Prossimi Passi

- Aggiungere persistenza dati (database)
- Implementare autenticazione utente
- Migliorare l'interfaccia utente
