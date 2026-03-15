// Utility functions for common operations

export const classNames = (...classes: Array<string | undefined | null | false>) => {
  return classes.filter(Boolean).join(' ');
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const formatDate = (date: string | Date): string => {
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString();
  }
  return date.toLocaleDateString();
};
