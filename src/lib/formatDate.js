export function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // Handle invalid date input
    throw new Error('Invalid date string provided.');
  }

  return date.toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });
}
