const charMapping = buildCharMapping();

function buildCharMapping() {
  const mapping = {
    '&#039;': { value: "'", regex: null },
    '&amp;': { value: '&', regex: null },
    '&gt;': { value: '>', regex: null },
    '&lt;': { value: '<', regex: null },
    '&quot;': { value: '"', regex: null },
  };
  Object.keys(mapping).forEach((k) => {
    mapping[k].regex = new RegExp(k, 'g');
  });
  return mapping;
}

export function renderSpecialChars(input: string): string {
  return Object.keys(charMapping).reduce((acc, c) => {
    return acc.replace(charMapping[c].regex, charMapping[c].value);
  }, input);
}

