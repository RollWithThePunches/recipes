"use client";

interface RecipeStat {
  label: string;
  value: string;
}

interface RecipeStatsProps {
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  className?: string;
}

export default function RecipeStats({
  prepTime,
  cookTime,
  totalTime,
  servings,
  className = "",
}: RecipeStatsProps) {
  const stats: RecipeStat[] = [
    { label: "Prep time", value: prepTime },
    { label: "Cook time", value: cookTime },
    { label: "Total time", value: totalTime },
    { label: "Servings", value: servings },
  ];

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-[var(--spacing-lg)] ${className}`}
    >
      {stats.map((stat, index) => (
        <div key={index} className="text-left">
          <div
            className="font-semibold"
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-body)",
            }}
          >
            {stat.label}
          </div>
          <div
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--color-text-body)",
            }}
          >
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
