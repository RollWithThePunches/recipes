'use client';

import Link from 'next/link';
import Heading from '@/components/ui/heading';
import Text from '@/components/ui/text';

export default function RecipeSubmissionSuccess() {
  return (
    <div className="bg-[var(--color-background)] min-h-screen flex items-center justify-center">
      <div 
        className="flex flex-col gap-6 items-center justify-start p-0 relative w-full max-w-[640px]"
        style={{
          padding: "var(--spacing-3xl) var(--spacing-lg)",
        }}
      >
        {/* Page title container */}
        <div className="flex flex-col gap-4 items-center justify-start p-0 relative shrink-0 w-full">
          <Heading 
            as="h1" 
            size="2xl" 
            font="heading" 
            className="text-[var(--color-text-heading)] text-center w-full"
          >
            Recipe submitted
          </Heading>
        </div>

        {/* Content container */}
        <div className="flex flex-col gap-4 items-center justify-start p-0 relative shrink-0 w-full text-center">
          <Text size="base" color="body" className="w-full">
            Your recipe has been submitted. It will be reviewed within a week. You will receive an email confirming that it has been submitted and another with its status.
          </Text>
          
          <Link 
            href="/your-recipes"
            className="text-[var(--color-secondary)] underline hover:text-[var(--color-primary)] transition-colors"
            style={{ 
              fontFamily: "var(--font-family-body)", 
              fontSize: "var(--font-size-base)" 
            }}
          >
            Return to Your Recipes
          </Link>
        </div>
      </div>
    </div>
  );
} 