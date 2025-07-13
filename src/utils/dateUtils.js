export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}m ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}h ago`;
  } else if (diffInSeconds < secondsInDay * 2) {
    return 'yesterday';
  } else {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days}d ago`;
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).replace(/,/, ''); // Remove comma after weekday
};