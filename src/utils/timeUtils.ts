export const convertTo24Hr = (time12h: string): string => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  
  return `${hours}:${minutes}`;
};

export const convertTo12Hr = (time24h: string): string => {
  const [hours, minutes] = time24h.split(':');
  const hour = parseInt(hours, 10);
  
  if (hour === 0) {
    return `12:${minutes} AM`;
  } else if (hour < 12) {
    return `${hour}:${minutes} AM`;
  } else if (hour === 12) {
    return `12:${minutes} PM`;
  } else {
    return `${hour - 12}:${minutes} PM`;
  }
};

export const parseDurationToMinutes = (duration: string): number => {
  const durationLower = duration.toLowerCase();
  
  if (durationLower.includes('hour')) {
    const hours = parseFloat(durationLower.match(/(\d+\.?\d*)/)?.[1] || '0');
    return hours * 60;
  } else if (durationLower.includes('min')) {
    const minutes = parseInt(durationLower.match(/(\d+)/)?.[1] || '0', 10);
    return minutes;
  }
  
  return 0;
};

export const getStatus = (date: string, time: string, duration: string): 'upcoming' | 'in-progress' | 'completed' => {
  const now = new Date();
  const appointmentStart = new Date(`${date}T${convertTo24Hr(time)}`);
  const durationMinutes = parseDurationToMinutes(duration);
  const appointmentEnd = new Date(appointmentStart.getTime() + durationMinutes * 60000);
  
  if (now < appointmentStart) {
    return 'upcoming';
  } else if (now >= appointmentStart && now <= appointmentEnd) {
    return 'in-progress';
  } else {
    return 'completed';
  }
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (time: string): string => {
  return convertTo12Hr(time);
};