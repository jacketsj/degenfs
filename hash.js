async function hashText(text) {
  const textAsBuffer = new TextEncoder().encode(text);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
  return hashBuffer;
  //const hashArray = Array.from(new Uint8Array(hashBuffer))
  //return hashArray;
  //const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  //return digest;
}

async function hashTextToDigest(text) {
  const textAsBuffer = new TextEncoder().encode(text);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return digest;
}

async function hashBuffer(buffer) {
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
  return hashBuffer;
}

async function genBasicDataProofRequest(dataText) {
  // using the hash function just to turn it into the right format
  const salt = await hashTextToDigest(toString(Math.random()));
  const pre_result = await hashTextToDigest(salt + dataText);
  const result = await hashTextToDigest(pre_result);
}

async function storeData(dataText, amt) {
  // store dataText by paying amt
}
