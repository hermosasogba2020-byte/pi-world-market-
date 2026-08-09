/**
 * Pi World Market — Design tokens centralisés.
 *
 * Toute couleur, typographie ou style d'identité visuelle DOIT venir d'ici
 * (ou des variables CSS/@theme dans index.css qui en dérivent), jamais
 * codé en dur page par page (ex: pas de "bg-blue-600" arbitraire).
 *
 * Charte graphique officielle Pi World Market.
 */

export const brandColors = {
  gold: "#F4AF0A",       // Pi World Market Gold — couleur d'accent, CTA, éléments premium
  deepBlue: "#0B3D91",   // Deep Blue — couleur principale, identité, header, liens actifs
  white: "#FFFFFF",      // Surfaces, contenu
  lightGray: "#F5F5F5",  // Arrière-plans secondaires
  dark: "#1A1A1A",       // Mode sombre, texte fort
} as const;

export const brandTypography = {
  heading: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
} as const;

export const brandName = "Pi World Market";
export const brandTagline = "Écosystème Numérique Mondial";

/**
 * Usage recommandé dans les composants :
 * - Actions principales / CTA : bg-primary (= Deep Blue)
 * - Accents premium / mise en avant : bg-accent ou text-accent (= Gold)
 * - Fond de page : bg-background (blanc / gris clair selon le thème)
 * - Fond secondaire (sections, cards alternées) : bg-secondary (= Light Gray)
 * - États d'erreur/destructifs : bg-destructive (reste rouge, fonctionnel, pas identité)
 * - États de succès/disponibilité : conserver le vert existant (fonctionnel)
 *
 * Ne jamais utiliser bg-blue-600, text-yellow-400, etc. — utiliser les
 * classes sémantiques (bg-primary, text-accent, bg-secondary...) qui sont
 * mappées vers ces couleurs officielles dans client/src/index.css (@theme).
 */
