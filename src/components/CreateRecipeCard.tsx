'use client';

import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Heading from '@/components/ui/heading';

interface CreateRecipeCardProps {
  title: string;
  ariaLabel: string;
  onClick?: () => void;
}

export default function CreateRecipeCard({ title, ariaLabel, onClick }: CreateRecipeCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Card 
      className="bg-[var(--color-background)] max-w-80 w-80 h-[286px] flex items-center justify-center p-0 rounded-lg shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] transition-shadow cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
    >
      <div className="flex flex-col gap-2 items-center justify-center p-[14px] w-full">
        <div className="flex flex-row gap-2 items-center justify-center w-full">
          <Heading as="h3" size="lg" font="body" className="font-semibold text-[var(--color-text-body)] text-nowrap">
            {title}
          </Heading>
          <div className="overflow-hidden size-12 flex items-center justify-center">
            <Plus 
              size={48} 
              color="var(--color-text-body)" 
              className="shrink-0"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}