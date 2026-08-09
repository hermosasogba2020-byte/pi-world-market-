import { brandColors, brandName } from "@/branding/brand";

type LogoProps = {
  /** Taille du logo en pixels (carré). Par défaut 32. */
  size?: number;
  /** Affiche le nom "Pi World Market" à côté du symbole. */
  showWordmark?: boolean;
  className?: string;
};

/**
 * Logo centralisé Pi World Market.
 *
 * ⚠️ Placeholder officiel généré aux couleurs de la charte (Deep Blue + Gold)
 * en attendant le fichier logo réel (SVG/PNG fourni par l'équipe). Une fois
 * disponible, remplacer le <svg> ci-dessous par une balise <img src="/logo.svg" />
 * — c'est le SEUL endroit à modifier, tout le reste de l'app utilise déjà
 * ce composant.
 */
export default function Logo({ size = 32, showWordmark = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={brandName}
        role="img"
      >
        <rect width="32" height="32" rx="8" fill={brandColors.deepBlue} />
        <path
          d="M9 10.5H23M12.5 10.5V22M19.5 10.5V22M9 15.5H20"
          stroke={brandColors.gold}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span
          className="font-bold text-lg leading-none whitespace-nowrap"
          style={{ color: brandColors.deepBlue, fontFamily: "'Poppins', sans-serif" }}
        >
          Pi World Market
        </span>
      )}
    </span>
  );
}
