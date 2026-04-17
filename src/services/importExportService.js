/* -----------------------------------------------------------------------
   Utilidades de importación / exportación  (JSON · CSV · XML)
   ----------------------------------------------------------------------- */

// ── EXPORT ──────────────────────────────────────────────────────────────

export function exportToJSON(dishes) {
  const data = dishes.map(({ id, ...rest }) => rest); // quitar id de Firestore
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  triggerDownload(blob, 'datos.json');
}

export function exportToCSV(dishes) {
  const headers = ['name', 'description', 'price', 'category', 'isPopular'];
  const rows = dishes.map((d) =>
    headers.map((h) => `"${String(d[h] ?? '').replace(/"/g, '""')}"`).join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, 'datos.csv');
}

export function exportToXML(dishes) {
  const items = dishes
    .map(
      (d) => `  <dish>
    <name>${escapeXML(d.name)}</name>
    <description>${escapeXML(d.description)}</description>
    <price>${escapeXML(d.price)}</price>
    <category>${escapeXML(d.category)}</category>
    <isPopular>${d.isPopular ? 'true' : 'false'}</isPopular>
  </dish>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<dishes>\n${items}\n</dishes>`;
  const blob = new Blob([xml], { type: 'application/xml;charset=utf-8;' });
  triggerDownload(blob, 'datos.xml');
}

// ── IMPORT ──────────────────────────────────────────────────────────────

export function parseJSON(text) {
  const raw = JSON.parse(text);
  const arr = Array.isArray(raw) ? raw : raw.dishes ?? [];
  return arr.map(normalizeDish);
}

export function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = splitCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] ?? '';
    });
    return normalizeDish(obj);
  });
}

export function parseXML(text) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, 'application/xml');
  const nodes = xmlDoc.querySelectorAll('dish');
  return Array.from(nodes).map((node) => {
    // Accept both <name> and <n> for compatibility
    const get = (tag) => node.querySelector(tag)?.textContent ?? '';
    return normalizeDish({
      name: get('name') || get('n'),
      description: get('description'),
      price: get('price'),
      category: get('category'),
      isPopular: get('isPopular'),
    });
  });
}

// ── HELPERS ─────────────────────────────────────────────────────────────

function normalizeDish(d) {
  return {
    name: String(d.name ?? '').trim(),
    description: String(d.description ?? '').trim(),
    price: String(d.price ?? '').trim(),
    category: String(d.category ?? '').trim(),
    isPopular:
      d.isPopular === true ||
      String(d.isPopular).toLowerCase() === 'true',
  };
}

function escapeXML(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Splits a CSV line respecting quoted fields
function splitCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
