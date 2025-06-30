"use client";

interface DirectionStep {
  stepNumber: number;
  instruction: string;
}

interface RecipeDirectionsProps {
  steps: DirectionStep[];
  className?: string;
}

export default function RecipeDirections({ 
  steps, 
  className = "" 
}: RecipeDirectionsProps) {
  return (
    <div className={className}>
      <h2 
        className="font-bold mb-[var(--spacing-xl)]" 
        style={{ 
          fontSize: 'var(--font-size-2xl)', 
          color: 'var(--color-text-heading)', 
          fontFamily: 'var(--font-family-heading)' 
        }}
      >
        Directions
      </h2>
      <ol className="space-y-[var(--spacing-xl)]" style={{ listStyle: 'none' }}>
        {steps.map((step, index) => (
          <li key={index}>
            <div>
              <h3 
                className="font-bold mb-[var(--spacing-sm)]" 
                style={{ 
                  fontSize: 'var(--font-size-lg)', 
                  color: 'var(--color-text-heading)', 
                  fontFamily: 'var(--font-family-heading)' 
                }}
              >
                Step {step.stepNumber}
              </h3>
              <p 
                style={{ 
                  color: 'var(--color-text-body)', 
                  fontSize: 'var(--font-size-base)', 
                  lineHeight: 'var(--line-height-normal)', 
                  fontFamily: 'var(--font-family-body)' 
                }}
              >
                {step.instruction}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
} 