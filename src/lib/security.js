/**
 * Security & Sanitization Utilities
 * Protects against XSS, malicious URL scheme injection (javascript:), and dangerous file uploads.
 */

const SAFE_URL_SCHEMES = ['https:', 'http:', 'mailto:'];

/**
 * Sanitizes an external or internal URL.
 * Only allows safe protocols (https:, http:, mailto:) and relative hashes.
 * Neutralizes javascript:, data:, vbscript:, etc.
 *
 * @param {string} url - Raw URL string
 * @param {string} fallback - Safe fallback URL (default: '#')
 * @returns {string} - Clean, sanitized URL
 */
export const sanitizeUrl = (url, fallback = '#') => {
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // Allow internal hash and relative anchor routes (#/, #projects, /)
  if (trimmed.startsWith('#') || (trimmed.startsWith('/') && !trimmed.startsWith('//'))) {
    return trimmed;
  }

  // Handle mailto:
  if (trimmed.toLowerCase().startsWith('mailto:')) {
    const email = trimmed.slice(7).trim();
    // Basic email character sanitization
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return `mailto:${email}`;
    }
    return fallback;
  }

  try {
    const parsed = new URL(trimmed);
    if (SAFE_URL_SCHEMES.includes(parsed.protocol)) {
      return trimmed;
    }
    return fallback;
  } catch {
    // If user provided a domain without protocol (e.g. github.com/user or linkedin.com/in/user)
    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(trimmed)) {
      return `https://${trimmed}`;
    }
    return fallback;
  }
};

/**
 * Validates an image file before upload.
 * Enforces a 5MB size limit (free-tier guardrail) and blocks SVGs/HTML/executables to prevent Stored XSS.
 *
 * @param {File} file - Browser File object
 * @param {number} maxBytes - Max allowed size in bytes (default: 5MB)
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateImageFile = (file, maxBytes = 5 * 1024 * 1024) => {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  // 1. File size limit
  if (file.size > maxBytes) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeMb} MB) exceeds the 5.0 MB limit. Please select a smaller image.`
    };
  }

  // 2. Strict MIME type & extension whitelist (Raster images only; SVGs/HTML explicitly blocked)
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

  const extension = file.name ? file.name.split('.').pop()?.toLowerCase() : '';

  if (!allowedMimeTypes.includes(file.type) || !allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: 'Invalid file format. Only safe image formats (JPG, PNG, WEBP, GIF) are permitted. SVG, HTML, and script files are blocked for security.'
    };
  }

  return { valid: true };
};
