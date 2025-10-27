const nameToMarker = new Map();
        const nameToDiv = new Map();
        const normaliseName = s => (s || '').trim().toLowerCase();

        function openStoreByName(name, opts = {}) {
            const key = normaliseName(name);
            const idx = stores.findIndex(s => normaliseName(s.name) === key);
            const store = stores[idx];
            const marker = nameToMarker.get(key);
            if (!store || !marker) return false;

            // highlight in list
            document.querySelectorAll('.store').forEach(s => s.classList.remove('active'));
            const div = nameToDiv.get(key);
            if (div) div.classList.add('active');

            // focus + popup
            const zoom = opts.zoom ?? 13;
            map.setView([store.location.lat, store.location.lng], zoom, { animate: true });
            marker.openPopup();
            return true;
        }

        // Safely read parent top-level hash only if same-origin
        function getParentHashSafely() {
            try {
                if (window.top && window.top.location && window.top.location.origin === window.location.origin) {
                    return window.top.location.hash || '';
                }
            } catch { /* cross-origin, ignore */ }
            return '';
        }

        // Allow hash OR ?open= fallback
        function getRequestedStoreName() {
            const candidate =
                getParentHashSafely() ||
                window.location.hash ||
                new URLSearchParams(window.location.search).get('open');

            if (!candidate) return null;
            return decodeURIComponent(String(candidate).replace(/^#/, '')).replace(/\+/g, ' ').trim();
        }

        function maybeOpenRequestedStore() {
            const name = getRequestedStoreName();
            return name ? openStoreByName(name) : false;
        }



        // Convert "HH:mm" → "h:mm AM/PM"
        function format12h(timeStr) {
            const [hour, minute] = timeStr.split(':').map(Number);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const h = hour % 12 || 12;
            return `${h}:${minute.toString().padStart(2, '0')} ${ampm}`;
        }

        // Utility – check if store open now
        function getStoreStatus(hours) {
            const now = new Date();
            const day = now.toLocaleString('en-GB', { weekday: 'long' });
            const [open, close] = hours[day];
            const [oh, om] = open.split(':').map(Number);
            const [ch, cm] = close.split(':').map(Number);
            const nowMins = now.getHours() * 60 + now.getMinutes();
            const openMins = oh * 60 + om;
            const closeMins = ch * 60 + cm;
            const isOpen = nowMins >= openMins && nowMins < closeMins;
            const days = Object.keys(hours);
            const nextDay = days[(days.indexOf(day) + 1) % 7];
            return {
                isOpen,
                today: day,
                closes: format12h(close),
                nextOpen: format12h(hours[nextDay][0])
            };
        }

        // Haversine formula
        function getDistance(lat1, lon1, lat2, lon2) {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
            return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        }
        function formatDistance(km) {
            return km < 1 ? `${(km * 1000).toFixed(0)} m` : `${km.toFixed(1)} km`;
        }

        const initialMapCenter = [54.5, -3];
        const initialMapZoom = 6;

        // Initialize map
        const map = L.map('map').setView(initialMapCenter, initialMapZoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const storesList = document.getElementById('stores-list');
        const searchBox = document.getElementById('search-box');
        const searchBtn = document.getElementById('search-icon-btn');
        const useLocationBtn = document.getElementById('use-location-btn');
        const searchStatus = document.getElementById('search-status');
        const toggleStoresBtn = document.getElementById('toggle-stores-btn');
        const toggleArrow = document.getElementById('toggle-arrow');
        const sidebar = document.getElementById('sidebar');

        let markers = [];
        let currentLocationMarker = null;

        // Mobile toggle functionality
        toggleStoresBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            toggleArrow.classList.toggle('open');

            if (sidebar.classList.contains('collapsed')) {
                toggleStoresBtn.querySelector('span').textContent = 'Show Store List';
            } else {
                toggleStoresBtn.querySelector('span').textContent = 'Hide Store List';
            }

            // Invalidate map size after toggle
            setTimeout(() => {
                map.invalidateSize();
            }, 300);
        });

        // Handle inline search icon click
        document.getElementById('search-icon-btn').addEventListener('click', searchLocation);

        // Handle reset map button
        document.getElementById('reset-map-btn').addEventListener('click', () => {
            map.setView(initialMapCenter, initialMapZoom);
            if (currentLocationMarker) {
                map.removeLayer(currentLocationMarker);
                currentLocationMarker = null;
            }
            searchStatus.textContent = '';
            initializeStores();
        });


        // Auto-expand store list on search/location found on mobile
        function autoExpandOnMobile() {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('collapsed');
                toggleArrow.classList.add('open');
                toggleStoresBtn.querySelector('span').textContent = 'Hide Store List';
                setTimeout(() => {
                    map.invalidateSize();
                }, 300);
            }
        }

        // Function to create store elements and markers
        function initializeStores() {
            storesList.innerHTML = '';
            markers.forEach(m => map.removeLayer(m));
            markers = [];

            stores.forEach((store, idx) => {
                const status = getStoreStatus(store.hours);
                const statusText = status.isOpen
                    ? `<span style="color: green;">● Open</span> – Closes ${status.closes}`
                    : `<span style="color: red;">● Closed</span> – Opens ${status.nextOpen}`;

                const storeDiv = document.createElement('div');
                storeDiv.className = 'store';
                storeDiv.innerHTML = `
      <img src="${store.thumbnail}" alt="${store.name}">
      <div class="store-details">
        <h3>${store.name}</h3>
        <small>${statusText}</small>
        <p>${store.address}</p>
      </div>
    `;

                const customIcon = L.icon({
                    iconUrl: store.icon || 'Media/icons/Map-stores-icon.png', // fallback if none
                    iconSize: [40, 40],  // adjust size
                    iconAnchor: [20, 40], // where it points on the map
                    popupAnchor: [0, -40] // popup position relative to icon
                });
                const marker = L.marker([store.location.lat, store.location.lng], { icon: customIcon }).addTo(map);


                const isMobile = window.innerWidth <= 768;

                let popupContent;

                if (!isMobile) {
                    // ===== Desktop: Larger popup (from V0.3.2.6) =====
                    const days = Object.keys(store.hours);
                    const today = new Date().toLocaleString('en-GB', { weekday: 'long' });
                    const todayIndex = days.indexOf(today);
                    const orderedDays = days.slice(todayIndex).concat(days.slice(0, todayIndex));
                    const hoursList = orderedDays.map(day => {
                        const [open, close] = store.hours[day];
                        return `<tr style="${day === today ? 'font-weight:bold;' : ''}">
      <td>${day}</td><td>${format12h(open)}</td><td>${format12h(close)}</td>
    </tr>`;
                    }).join('');

                    popupContent = `
    <div class="popup-content">
      <strong style="font-size: 1.1rem;">${store.name}</strong><br/>
      ${store.address}<br/>
      <a href="tel:${store.phone.replace(/\s/g, '')}">${store.phone}</a><br/>
      <a href="https://www.google.com/maps?q=${encodeURIComponent(store.address)}" target="_blank">
        Get Directions
      </a>
      <p style="font-weight:600;">${status.isOpen
                            ? `<span style='color:green;'>🟢 Open</span> • Closes at ${status.closes}`
                            : `<span style='color:red;'>🔴 Closed</span> • Opens at ${status.nextOpen}`}</p>
      <table style="margin-top:6px;font-size:0.85rem;">
        <thead><tr><th>Day</th><th>Open</th><th>Close</th></tr></thead>
        <tbody>${hoursList}</tbody>
      </table>
      <img src="${store.thumbnail}" alt="${store.name}">
    </div>
  `;
                } else {
                    // ===== Mobile: Smaller popup (with condensed hours) =====
                    const weekdayHours = store.hours['Monday'];
                    const saturdayHours = store.hours['Saturday'];
                    const sundayHours = store.hours['Sunday'];

                    popupContent = `
  <div class="popup-content">
    <strong style="font-size: 1.1rem;">${store.name}</strong><br/>
    <small style="color: ${status.isOpen ? 'green' : 'red'};">
      ${status.isOpen ? '● Open' : '● Closed'} – ${status.isOpen ? 'Closes' : 'Opens'} ${status.isOpen ? status.closes : status.nextOpen}
    </small><br/>
    <p style="margin: 0.25rem 0;">${store.address}</p>
    <div style="font-size:0.85rem; margin:4px 0; line-height:1.3;">
      <div><strong>Mon – Fri:</strong> ${format12h(weekdayHours[0])} – ${format12h(weekdayHours[1])}</div>
      <div><strong>Sat:</strong> ${format12h(saturdayHours[0])} – ${format12h(saturdayHours[1])}</div>
      <div><strong>Sun:</strong> ${format12h(sundayHours[0])} – ${format12h(sundayHours[1])}</div>
    </div>
    <img src="${store.thumbnail}" alt="${store.name}">
    <div class="popup-links">
      <a href="https://www.google.com/maps/dir/?api=1&destination=${store.location.lat},${store.location.lng}" target="_blank">Get Directions</a>
      <a href="tel:${store.phone.replace(/\s/g, '')}">${store.phone}</a>
    </div>
  </div>
`;

                }


                marker.bindPopup(popupContent);
                nameToMarker.set(normaliseName(store.name), marker);
                nameToDiv.set(normaliseName(store.name), storeDiv);


                storeDiv.addEventListener('click', () => {
                    document.querySelectorAll('.store').forEach(s => s.classList.remove('active'));
                    storeDiv.classList.add('active');
                    map.setView([store.location.lat, store.location.lng], 13);
                    marker.openPopup();
                    // Auto-hide sidebar on mobile when store selected
                    if (window.innerWidth <= 768) {
                        sidebar.classList.add('collapsed');
                        toggleArrow.classList.remove('open');
                        toggleStoresBtn.querySelector('span').textContent = 'Show Store List';
                        setTimeout(() => map.invalidateSize(), 300);
                    }
                });

                marker.on('click', () => {
                    document.querySelectorAll('.store').forEach(s => s.classList.remove('active'));
                    storeDiv.classList.add('active');
                });

                storesList.appendChild(storeDiv);
                markers.push(marker);
            });
        }

        // Update distances and sort stores
        function updateDistancesFromLocation(lat, lng, locationName) {
            // Remove previous location marker
            if (currentLocationMarker) {
                map.removeLayer(currentLocationMarker);
            }

            // Add new location marker with custom icon
            const locationIcon = L.divIcon({
                html: '<div style="background: #ff0000; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>',
                className: '',
                iconSize: [12, 12]
            });

            currentLocationMarker = L.marker([lat, lng], { icon: locationIcon }).addTo(map);
            currentLocationMarker.bindPopup(`<strong>${locationName}</strong>`).openPopup();

            // Calculate distances
            const storesWithDistance = stores.map(store => ({
                ...store,
                distance: getDistance(lat, lng, store.location.lat, store.location.lng)
            }));

            // Sort by distance
            storesWithDistance.sort((a, b) => a.distance - b.distance);

            // Clear and rebuild list
            storesList.innerHTML = '';
            markers.forEach(m => map.removeLayer(m));
            markers = [];

            storesWithDistance.forEach(store => {
                const status = getStoreStatus(store.hours);
                const statusText = status.isOpen
                    ? `<span style="color: green;">● Open</span> – Closes ${status.closes}`
                    : `<span style="color: red;">● Closed</span> – Opens ${status.nextOpen}`;

                const storeDiv = document.createElement('div');
                storeDiv.className = 'store';
                storeDiv.innerHTML = `
      <img src="${store.thumbnail}" alt="${store.name}">
      <div class="store-details">
        <h3>${store.name}</h3>
        <small>${statusText}</small>
        <small style="color: #0078ff; font-weight: 600;">${formatDistance(store.distance)} away</small>
        <p>${store.address}</p>
      </div>
    `;

                const customIcon = L.icon({
                    iconUrl: store.icon || 'Media/icons/Map-stores-icon.png', // fallback if none
                    iconSize: [40, 40],  // adjust size
                    iconAnchor: [20, 40], // where it points on the map
                    popupAnchor: [0, -40] // popup position relative to icon
                });
                const marker = L.marker([store.location.lat, store.location.lng], { icon: customIcon }).addTo(map);


                const isMobile = window.innerWidth <= 768;

                let popupContent;

                if (!isMobile) {
                    // ===== Desktop: Larger popup (from V0.3.2.6) =====
                    const days = Object.keys(store.hours);
                    const today = new Date().toLocaleString('en-GB', { weekday: 'long' });
                    const todayIndex = days.indexOf(today);
                    const orderedDays = days.slice(todayIndex).concat(days.slice(0, todayIndex));
                    const hoursList = orderedDays.map(day => {
                        const [open, close] = store.hours[day];
                        return `<tr style="${day === today ? 'font-weight:bold;' : ''}">
      <td>${day}</td><td>${format12h(open)}</td><td>${format12h(close)}</td>
    </tr>`;
                    }).join('');

                    popupContent = `
    <div class="popup-content">
      <strong style="font-size: 1.1rem;">${store.name}</strong><br/>
      ${store.address}<br/>
      <a href="tel:${store.phone.replace(/\s/g, '')}">${store.phone}</a><br/>
      <a href="https://www.google.com/maps?q=${encodeURIComponent(store.address)}" target="_blank">
        Get Directions
      </a>
      <p style="font-weight:600;">${status.isOpen
                            ? `<span style='color:green;'>🟢 Open</span> • Closes at ${status.closes}`
                            : `<span style='color:red;'>🔴 Closed</span> • Opens at ${status.nextOpen}`}</p>
      <table style="margin-top:6px;font-size:0.85rem;">
        <thead><tr><th>Day</th><th>Open</th><th>Close</th></tr></thead>
        <tbody>${hoursList}</tbody>
      </table>
      <img src="${store.thumbnail}" alt="${store.name}">
    </div>
  `;
                } else {
                    // ===== Mobile: Smaller popup (from V0.3.2.7) =====
                    // ===== Mobile: Smaller popup (with condensed hours) =====
                    const weekdayHours = store.hours['Monday'];
                    const saturdayHours = store.hours['Saturday'];
                    const sundayHours = store.hours['Sunday'];

                    popupContent = `
  <div class="popup-content">
    <strong style="font-size: 1.1rem;">${store.name}</strong><br/>
    <small style="color: ${status.isOpen ? 'green' : 'red'};">
      ${status.isOpen ? '● Open' : '● Closed'} – ${status.isOpen ? 'Closes' : 'Opens'} ${status.isOpen ? status.closes : status.nextOpen}
    </small><br/>
    <p style="margin: 0.25rem 0;">${store.address}</p>
    <div style="font-size:0.85rem; margin:4px 0; line-height:1.3;">
      <div><strong>Mon – Fri:</strong> ${format12h(weekdayHours[0])} – ${format12h(weekdayHours[1])}</div>
      <div><strong>Sat:</strong> ${format12h(saturdayHours[0])} – ${format12h(saturdayHours[1])}</div>
      <div><strong>Sun:</strong> ${format12h(sundayHours[0])} – ${format12h(sundayHours[1])}</div>
    </div>
    <img src="${store.thumbnail}" alt="${store.name}">
    <div class="popup-links">
      <a href="https://www.google.com/maps/dir/?api=1&destination=${store.location.lat},${store.location.lng}" target="_blank">Get Directions</a>
      <a href="tel:${store.phone.replace(/\s/g, '')}">${store.phone}</a>
    </div>
  </div>
`;

                }


                marker.bindPopup(popupContent);

                nameToMarker.set(normaliseName(store.name), marker);
                nameToDiv.set(normaliseName(store.name), storeDiv);


                storeDiv.addEventListener('click', () => {
                    document.querySelectorAll('.store').forEach(s => s.classList.remove('active'));
                    storeDiv.classList.add('active');
                    map.setView([store.location.lat, store.location.lng], 13);
                    marker.openPopup();
                    // Auto-hide sidebar on mobile when store selected
                    if (window.innerWidth <= 768) {
                        sidebar.classList.add('collapsed');
                        toggleArrow.classList.remove('open');
                        toggleStoresBtn.querySelector('span').textContent = 'Show Store List';
                        setTimeout(() => map.invalidateSize(), 300);
                    }
                });

                marker.on('click', () => {
                    document.querySelectorAll('.store').forEach(s => s.classList.remove('active'));
                    storeDiv.classList.add('active');
                });

                storesList.appendChild(storeDiv);
                markers.push(marker);
            });

            // Fit map to show location and stores
            const bounds = L.latLngBounds([[lat, lng]]);
            storesWithDistance.forEach(store => {
                bounds.extend([store.location.lat, store.location.lng]);
            });
            map.fitBounds(bounds, { padding: [50, 50] });

            // Auto-expand store list on mobile after search
        }

        // Check if string looks like UK postcode
        function isUKPostcode(str) {
            const cleaned = str.replace(/\s+/g, '').toUpperCase();
            const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
            const partialPattern = /^[A-Z]{1,2}[0-9][A-Z0-9]?$/i;
            return postcodePattern.test(cleaned) || partialPattern.test(cleaned);
        }

        function getPostcodeArea(postcode) {
            const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
            const match = cleaned.match(/^([A-Z]{1,2}[0-9][A-Z0-9]?)/i);
            return match ? match[1] : null;
        }

        // Clean location name for display
        function cleanLocationName(data, query) {
            // For postcodes.io results
            if (data.admin_district && data.admin_ward) {
                // Prefer ward name if it's different from district
                if (data.admin_ward !== data.admin_district) {
                    return `${data.admin_ward}, ${data.admin_district}`;
                }
                return data.admin_district;
            }

            // For Nominatim results (fallback for non-postcodes)
            if (typeof data === 'string') {
                const parts = data.split(',').map(p => p.trim());
                const filtered = parts.filter(part => {
                    const lower = part.toLowerCase();
                    return !['england', 'united kingdom', 'uk', 'gb', 'great britain'].includes(lower) &&
                        !lower.includes('royal mail') &&
                        !lower.includes('post office');
                });
                return filtered[0] || query;
            }

            return query;
        }

        // Lookup postcode using postcodes.io API
        async function lookupPostcode(postcode) {
            try {
                // Clean the postcode
                const cleaned = postcode.replace(/\s+/g, '').toUpperCase();

                // Try exact postcode lookup first
                const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`);

                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 200 && data.result) {
                        return {
                            success: true,
                            exact: true,
                            lat: data.result.latitude,
                            lng: data.result.longitude,
                            displayName: cleanLocationName(data.result, postcode),
                            fullData: data.result
                        };
                    }
                }

                // If exact postcode fails, try autocomplete/partial match
                const area = getPostcodeArea(postcode);
                if (area) {
                    const autocompleteResponse = await fetch(
                        `https://api.postcodes.io/postcodes/${encodeURIComponent(area)}/autocomplete`
                    );

                    if (autocompleteResponse.ok) {
                        const autocompleteData = await autocompleteResponse.json();
                        if (autocompleteData.status === 200 && autocompleteData.result && autocompleteData.result.length > 0) {
                            // Get details for the first matching postcode
                            const firstMatch = autocompleteData.result[0];
                            const detailResponse = await fetch(
                                `https://api.postcodes.io/postcodes/${encodeURIComponent(firstMatch)}`
                            );

                            if (detailResponse.ok) {
                                const detailData = await detailResponse.json();
                                if (detailData.status === 200 && detailData.result) {
                                    return {
                                        success: true,
                                        exact: false,
                                        lat: detailData.result.latitude,
                                        lng: detailData.result.longitude,
                                        displayName: cleanLocationName(detailData.result, area),
                                        fullData: detailData.result,
                                        searchedFor: area
                                    };
                                }
                            }
                        }
                    }

                    // Try outcode lookup as last resort for partial postcodes
                    const outcodeResponse = await fetch(
                        `https://api.postcodes.io/outcodes/${encodeURIComponent(area)}`
                    );

                    if (outcodeResponse.ok) {
                        const outcodeData = await outcodeResponse.json();
                        if (outcodeData.status === 200 && outcodeData.result) {
                            return {
                                success: true,
                                exact: false,
                                lat: outcodeData.result.latitude,
                                lng: outcodeData.result.longitude,
                                displayName: `${area} area, ${outcodeData.result.admin_district[0] || ''}`.trim(),
                                isOutcode: true,
                                searchedFor: area
                            };
                        }
                    }
                }

                return { success: false };
            } catch (error) {
                console.error('Postcode lookup error:', error);
                return { success: false, error: error.message };
            }
        }

        // Search for location using multiple services
        async function searchLocation() {
            const query = searchBox.value.trim();
            if (!query) {
                searchStatus.textContent = 'Please enter a location to search';
                return;
            }

            searchBtn.disabled = true;
            searchStatus.textContent = 'Searching...';

            try {
                let result = null;

                // Check if it looks like a UK postcode
                if (isUKPostcode(query)) {
                    // Use postcodes.io for postcode lookups
                    const postcodeResult = await lookupPostcode(query);

                    if (postcodeResult.success) {
                        const { lat, lng, displayName, exact, searchedFor, isOutcode } = postcodeResult;

                        // Set appropriate status message
                        if (exact) {
                            searchStatus.textContent = `Found: ${displayName}`;
                        } else if (isOutcode) {
                            searchStatus.textContent = `Showing ${searchedFor} postcode area`;
                        } else {
                            searchStatus.textContent = `Exact postcode not found. Showing ${searchedFor} area near ${displayName}`;
                        }

                        updateDistancesFromLocation(lat, lng, displayName);
                        return;
                    } else {
                        // Postcode not found
                        const area = getPostcodeArea(query);
                        searchStatus.textContent = area
                            ? `Postcode not recognized. Try "${area}" or search for a nearby town.`
                            : 'Invalid UK postcode format. Example: "KT12 4RJ" or "SW1A 1AA"';
                        return;
                    }
                }

                // For non-postcode searches, use Nominatim
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?` +
                    `format=json&` +
                    `q=${encodeURIComponent(query)}&` +
                    `countrycodes=gb&` +
                    `limit=5`
                );
                const data = await response.json();

                if (data && data.length > 0) {
                    // Filter for UK results
                    const ukResults = data.filter(item => {
                        const displayName = item.display_name.toLowerCase();
                        return displayName.includes('united kingdom') ||
                            displayName.includes('england') ||
                            displayName.includes('scotland') ||
                            displayName.includes('wales') ||
                            displayName.includes('northern ireland');
                    });

                    if (ukResults.length > 0) {
                        result = ukResults[0];
                        const lat = parseFloat(result.lat);
                        const lng = parseFloat(result.lon);

                        // Verify it's within UK bounds
                        if (lat < 49 || lat > 61 || lng < -8 || lng > 2) {
                            searchStatus.textContent = 'Location appears to be outside the UK. Please try a UK location.';
                            return;
                        }

                        const displayName = cleanLocationName(result.display_name, query);
                        searchStatus.textContent = `Found: ${displayName}`;
                        updateDistancesFromLocation(lat, lng, displayName);
                    } else {
                        searchStatus.textContent = 'Location not found in the UK. Try a UK city, town, or valid postcode.';
                    }
                } else {
                    searchStatus.textContent = 'Location not found. Try a different search term.';
                }
            } catch (error) {
                searchStatus.textContent = 'Error searching location. Please try again.';
                console.error('Search error:', error);
            } finally {
                searchBtn.disabled = false;
            }
        }

        // Handle search button click
        // searchBtn.addEventListener('click', searchLocation);

        // Handle Enter key in search box
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchLocation();
            }
        });

        // Handle use my location button
        useLocationBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                searchStatus.textContent = 'Getting your location...';
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const lat = pos.coords.latitude;
                        const lng = pos.coords.longitude;
                        searchStatus.textContent = 'Location found!';
                        updateDistancesFromLocation(lat, lng, 'Your location');
                    },
                    (error) => {
                        searchStatus.textContent = 'Unable to get your location. Please search manually.';
                        console.error('Geolocation error:', error);
                    }
                );
            } else {
                searchStatus.textContent = 'Geolocation is not supported by your browser.';
            }
        });

        // Initialize stores on load
        initializeStores();


        // Try to open from the parent page's #hash (or ?open=)
        // Run once now, then briefly poll in case hash appears a moment later.
        if (!maybeOpenRequestedStore()) {
            const t0 = Date.now();
            const poll = setInterval(() => {
                if (maybeOpenRequestedStore() || Date.now() - t0 > 3000) {
                    clearInterval(poll);
                }
            }, 400);
        }


        // Only auto-geolocate if there is NO deep link (hash or ?open=)
        const deepLinkAtLoad = getRequestedStoreName();
        if (navigator.geolocation && !deepLinkAtLoad) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;
                    updateDistancesFromLocation(lat, lng, 'Your location');
                    searchStatus.textContent = 'Showing distances from your location';
                },
                () => {
                    searchStatus.textContent = 'Search for a location or use your current location';
                }
            );
        } else if (!deepLinkAtLoad) {
            searchStatus.textContent = 'Search for a location to see distances';
        }


        // Handle window resize to adjust map
        window.addEventListener('resize', () => {
            map.invalidateSize();
        });