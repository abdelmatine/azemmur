
'use client';

export const getStorageName = (baseName: string, userId: string | null | undefined): string => {
  if (userId) {
    // Sanitize user ID to be safe for local storage key
    const sanitizedId = userId.replace(/[^a-zA-Z0-9_-]/g, '');
    return `${baseName}-${sanitizedId}`;
  }
  return `${baseName}-guest`;
};
