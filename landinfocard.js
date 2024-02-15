// File: land-info-card.js

class LandInfoCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
        }
        .card h3 {
          margin-top: 0;
        }
        .card p {
          margin: 5px 0;
        }
      </style>
      <div class="card">
        <h3>LOT ID:</h3><h3 id="id"></h3>
        <p><strong>Lot Location:</strong> <span id="location"></span></p>
        <p><strong>Location Details:</strong> <span id="detail-location"></span></p>
        <p><strong>Zoning Type:</strong> <span id="zoning"></span></p>
        <p><strong>Land Use:</strong> <span id="landUse"></span></p>
        <p><strong>Acres:</strong> <span id="acres"></span></p>
        <p><strong>Historic District:</strong> <span id="historic"></span></p>
      </div>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute('data')) {
      const data = JSON.parse(this.getAttribute('data'));
      this.shadowRoot.getElementById('id').textContent = data.LOT_ID || 'Land Information';
      this.shadowRoot.getElementById('location').textContent = data.LOT_LOCATION
      this.shadowRoot.getElementById('detail-location').textContent = `Lot Num:${data.LOT_NUM}, Block: ${data.BLOCK_NUM}, Sub-Area: ${data.SUB_AREA}`;
      this.shadowRoot.getElementById('zoning').textContent = data.ZONING_TYPE || 'N/A';
      this.shadowRoot.getElementById('landUse').textContent = data.EXISTING_LAND_USE || 'N/A';
      this.shadowRoot.getElementById('acres').textContent = data.AREA_MEAS_ACRES || 'N/A';
      this.shadowRoot.getElementById('historic').textContent = data.HISTORIC_DISTRICT || 'No';
    }
  }
}

customElements.define('land-info-card', LandInfoCard);
