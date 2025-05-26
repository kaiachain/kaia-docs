/**
 * Compare two version strings
 * @param {string} v1 - First version string (e.g. 'v2.0.0')
 * @param {string} v2 - Second version string (e.g. 'v2.0.0')
 * @returns {number} - Returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal
 */
const compareVersions = (v1, v2) => {
  const v1Parts = v1.replace('v', '').split('.').map(Number);
  const v2Parts = v2.replace('v', '').split('.').map(Number);
  
  for (let i = 0; i < 3; i++) {
    if (v1Parts[i] > v2Parts[i]) return 1;
    if (v1Parts[i] < v2Parts[i]) return -1;
  }
  return 0;
};

module.exports = { compareVersions }; 