# 🗺️ UK Store Locator (Leaflet.js)

An interactive **store locator web app** built with **Leaflet.js**, allowing users to search UK locations or postcodes, find the nearest stores, view contact details, and get directions.
It supports both desktop and mobile layouts, includes geolocation, and dynamically sorts stores by proximity.

---

## 🚀 Features

* 🔍 **Search by UK postcode or town** – powered by [postcodes.io](https://postcodes.io) and [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/).
* 📍 **Use My Location** – automatically detects your position and sorts stores by distance.
* 🧭 **Interactive map** – click markers to see full store details.
* 🕓 **Live opening status** – shows if a store is open or closed, with next opening times.
* 🧾 **Sidebar list** – clickable list of all stores with thumbnails.
* 📱 **Mobile-friendly UI** – collapsible sidebar and simplified popups.
* 🔗 **Deep-link support** – open a specific store via `#StoreName` or `?open=StoreName`.

---

## 🧩 Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Mapping Library:** [Leaflet.js](https://leafletjs.com/)
* **Data Source:** Static `stores.js` file with store data
* **APIs Used:**

  * [Postcodes.io](https://postcodes.io) – UK postcode lookups
  * [Nominatim / OpenStreetMap](https://nominatim.openstreetmap.org) – location search

---

## 📂 Project Structure

```
/
├── index.html        # Main webpage (includes map and sidebar)
├── main.css          # Stylesheet for layout and mobile responsiveness
├── main.js           # Core JavaScript (Leaflet map logic and search)
├── stores.js         # Store database (list of UK locations)
└── Media/            # (optional) folder for store thumbnails/icons
```

---

## ⚙️ Setup & Usage

1. **Clone or Download** this repository:

   ```bash
   git clone https://github.com/<your-username>/uk-store-locator.git
   cd uk-store-locator
   ```

2. **Open `index.html`** in a browser (no server needed):

   ```bash
   open index.html
   ```

   or simply double-click it.

3. (Optional) If using geolocation or API calls locally, you may need to serve it via a local server (to avoid browser security restrictions):

   ```bash
   npx serve .
   ```

   Then open [http://localhost:3000](http://localhost:3000).

---

## 🧭 Deep Linking

You can link directly to a specific store using:

* `index.html#Leeds`
* `index.html?open=Manchester`

These will automatically open the map and popup for the given store.

---

## 🧠 Customisation

* Add or edit stores in `stores.js`
* Update map icons via the `Media/icons/` folder
* Adjust map starting zoom or centre in `main.js`:

  ```js
  const initialMapCenter = [54.5, -3];
  const initialMapZoom = 6;
  ```

---

## 🛠️ Credits

* [Leaflet.js](https://leafletjs.com/)
* [OpenStreetMap Contributors](https://www.openstreetmap.org/copyright)
* [Postcodes.io API](https://postcodes.io)

---

## 📜 License

MIT License – free for personal and commercial use.
Attribution is appreciated but not required.
