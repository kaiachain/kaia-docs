export function formatDate(dateString, monthFormat = 'long') { // 'long' or 'short'
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: monthFormat,
      day: 'numeric',
    });
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString; // Fallback to original string if formatting fails
  }
}