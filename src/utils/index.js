// Utility functions

/**
 * Creates a URL for a given page name
 * @param {string} pageName - The name of the page
 * @returns {string} - The URL path
 */
export function createPageUrl(pageName) {
  if (pageName === 'Home') {
    return '/';
  }
  return `/${pageName.toLowerCase()}`;
}
