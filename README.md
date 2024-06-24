# Epicode-W7D5

## Panoramica

Questo progetto si concentra sullo sviluppo del front-end di uno shop online, in particolare della sezione back-office, dove gli amministratori possono gestire i prodotti. I compiti principali prevedono la connessione di un'interfaccia statica alle API per il recupero, la creazione, la modifica e la cancellazione dei prodotti.

## Endpoints

- **Endpoint principale**: [https://striveschool-api.herokuapp.com/api/product/](https://striveschool-api.herokuapp.com/api/product/)
- **Modello di un prodotto**: [Modello di un prodotto](https://cms.epicode.com/assets/98da0049-c603-4156-b197-caebd69bd796)
- **Autenticazione**: Autenticazione basata su Token

## Obiettivi

1. **Homepage**: Visualizza i prodotti disponibili.
2. **Pagina Back-Office**: Consente la creazione, modifica e cancellazione dei prodotti.
3. **Pagina di Dettaglio**: Mostra informazioni dettagliate su un prodotto.

## Task

### Nella Homepage

- **Modifica del Prodotto**: Premendo un bottone “modifica” su un prodotto si dovrà poterlo modificare.
- **Reindirizzamento alla pagina di Dettaglio**: Cliccando sulla carta si verrà reindirizzati ad una pagina con i dettagli dell'articolo selezionato.


### Nella Pagina Back-Office

- **Creazione di un nuovo prodotto**: Utilizza `POST` su `/product` con un payload per creare una nuova risorsa.
- **Modifica di un prodotto esistente**: Aggiungi un bottone per la modifica di un prodotto già creato in precedenza (usa `PUT` su `/product/[PRODUCT_ID]`).
- **Cancellazione di un prodotto esistente**: Aggiungi un bottone per la cancellazione di uno specifico prodotto già esistente (usa `DELETE` su `/product/[PRODUCT_ID]`).
- **Validazione del Form**: Aggiungi una validazione di base per la creazione/modifica del prodotto nel form.
- **Reset del Form**: Aggiungi un bottone “Reset” per resettare il form.


### Nella Pagina di Dettaglio

- **Dettagli del Prodotto**: A questa pagina ci si arriverà cliccando sulla card in homepage.

## Extra

### In Back-Office

- **Conferma per Reset e Delete**: I bottoni “reset” e “delete” dovranno chiedere conferma prima di procedere con l’operazione.

### In Homepage

- **Indicatore di Caricamento**: Aggiungi un indicatore di caricamento affianco al titolo principale della pagina durante il caricamento delle risorse.
- **Gestione degli Errori**: Crea un sistema di gestione degli errori. Mostra all’utente un messaggio di errore specifico per le varie tipologie di problema, quando qualcosa va storto, attraverso l’utilizzo di componenti di Bootstrap appropriati.
