"use client";

import Heading from "@/components/ui/heading";

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
  className = "",
}: RecipeDirectionsProps) {
  return (
    <div className={className}>
      <Heading as="h2" size="2xl" font="heading" className="font-bold mb-[var(--spacing-xl)]">
        Directions
      </Heading>
      <ol className="space-y-[var(--spacing-xl)]" style={{ listStyle: "none" }}>
        {steps.map((step, index) => (
          <li key={index}>
            <div>
              <Heading as="h3" size="lg" font="heading" className="font-bold mb-[var(--spacing-sm)]">
                Step {step.stepNumber}
              </Heading>
              <p
                style={{
                  color: "var(--color-text-body)",
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-normal)",
                  fontFamily: "var(--font-family-body)",
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
