'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Heading from '@/components/ui/heading';
import Text from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import RecipePreviewModal from './RecipePreviewModal';

interface FormOption {
  value: string;
  label: string;
}

interface FormField {
  label: string;
  placeholder: string;
  options?: FormOption[];
  description?: string;
}

interface FormContent {
  title: string;
  description: string;
  form: {
    recipeName: FormField;
    shortDescription: FormField;
    foodCategory: FormField;
    cuisine: FormField;
    dietary: FormField;
    ingredients: FormField;
    directions: {
      label: string;
      description: string;
      stepLabel: string;
      addStepButton: string;
    };
    buttons: {
      cancel: string;
      preview: string;
    };
  };
}

interface CreateRecipeFormProps {
  formContent: FormContent;
}

export interface RecipeFormData {
  recipeName: string;
  shortDescription: string;
  foodCategory: string;
  cuisine: string;
  dietary: string;
  ingredients: string;
  directions: string[];
}

export default function CreateRecipeForm({ formContent }: CreateRecipeFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<RecipeFormData>({
    recipeName: '',
    shortDescription: '',
    foodCategory: '',
    cuisine: '',
    dietary: '',
    ingredients: '',
    directions: ['', '', '', '', '']
  });
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof RecipeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDirectionChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      directions: prev.directions.map((dir, i) => i === index ? value : dir)
    }));
  };

  const addDirectionStep = () => {
    setFormData(prev => ({
      ...prev,
      directions: [...prev.directions, '']
    }));
  };

  const removeDirectionStep = (index: number) => {
    if (index > 0 && formData.directions.length > 1) {
      setFormData(prev => ({
        ...prev,
        directions: prev.directions.filter((_, i) => i !== index)
      }));
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate required fields
    if (!formData.recipeName.trim()) {
      newErrors.recipeName = 'Recipe name is required';
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    }
    if (!formData.foodCategory) {
      newErrors.foodCategory = 'Food category is required';
    }
    if (!formData.cuisine) {
      newErrors.cuisine = 'Cuisine is required';
    }
    if (!formData.dietary) {
      newErrors.dietary = 'Dietary preference is required';
    }
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    }
    if (!formData.directions[0]?.trim()) {
      newErrors.directions = 'At least one direction step is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreview = () => {
    if (validateForm()) {
      setIsPreviewModalOpen(true);
    }
  };

  const handleClosePreview = () => {
    setIsPreviewModalOpen(false);
  };

  const handleSubmitRecipe = () => {
    // TODO: Implement recipe submission
    console.log('Submit recipe:', formData);
    setIsPreviewModalOpen(false);
    // TODO: Navigate to success page or show success message
  };

  return (
    <div 
      className="bg-[var(--color-background)] min-h-screen"
      style={{
        padding: "var(--spacing-3xl) var(--spacing-lg)",
      }}
    >
      {/* Main Content */}
      <div className="w-full">
        {/* Page Container */}
        <div
          className="w-full max-w-[1024px] mx-auto"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-3xl)",
          }}
        >
          {/* Page Title Container */}
          <div className="flex flex-col gap-4 items-start w-full">
            <Heading as="h1" size="5xl" font="heading" className="text-[var(--color-text-heading)] w-full">
              {formContent.title}
            </Heading>
            <Text 
              size="lg"
              color="body"
              className="w-full"
            >
              {formContent.description}
            </Text>
          </div>

          {/* Form Container */}
          <div className="w-full max-w-[776px] mx-auto">
            <div className="flex flex-col gap-8">
              {/* Form Fields */}
              <div className="flex flex-col gap-6">
                {/* Recipe Name */}
                <div className="flex flex-col gap-2">
                  <Label 
                    htmlFor="recipeName"
                    style={{ 
                      fontFamily: "var(--font-family-body)", 
                      fontSize: "var(--font-size-base)",
                      fontWeight: "600"
                    }}
                  >
                    {formContent.form.recipeName.label}
                  </Label>
                  <Input
                    id="recipeName"
                    type="text"
                    placeholder={formContent.form.recipeName.placeholder}
                    value={formData.recipeName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('recipeName', e.target.value)}
                    className={`h-10 bg-[var(--color-background)] border rounded-lg ${
                      errors.recipeName ? 'border-[var(--color-error)]' : 'border-[var(--color-gray)]'
                    }`}
                    required
                  />
                  {errors.recipeName && (
                    <Text size="sm" color="error" className="mt-1">
                      {errors.recipeName}
                    </Text>
                  )}
                </div>

                {/* Short Description */}
                <div className="flex flex-col gap-2">
                  <Label 
                    htmlFor="shortDescription"
                    style={{ 
                      fontFamily: "var(--font-family-body)", 
                      fontSize: "var(--font-size-base)",
                      fontWeight: "600"
                    }}
                  >
                    {formContent.form.shortDescription.label}
                  </Label>
                  <textarea
                    id="shortDescription"
                    placeholder={formContent.form.shortDescription.placeholder}
                    value={formData.shortDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('shortDescription', e.target.value)}
                    className={`h-[86px] bg-[var(--color-background)] border rounded-lg px-3 py-2 resize-none ${
                      errors.shortDescription ? 'border-[var(--color-error)]' : 'border-[var(--color-gray)]'
                    }`}
                    style={{ 
                      fontFamily: "var(--font-family-body)", 
                      fontSize: "var(--font-size-base)"
                    }}
                    required
                  />
                  {errors.shortDescription && (
                    <Text size="sm" color="error" className="mt-1">
                      {errors.shortDescription}
                    </Text>
                  )}
                </div>

                {/* Category Row */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Food Category */}
                  <div className="flex-1 flex flex-col gap-2">
                    <Label 
                      htmlFor="foodCategory"
                      style={{ 
                        fontFamily: "var(--font-family-body)", 
                        fontSize: "var(--font-size-base)",
                        fontWeight: "600"
                      }}
                    >
                      {formContent.form.foodCategory.label}
                    </Label>
                    <Select
                      options={formContent.form.foodCategory.options?.map(option => ({
                        id: option.value,
                        label: option.label,
                        value: option.value
                      })) || []}
                      value={formData.foodCategory}
                      onValueChange={(value) => handleInputChange('foodCategory', value)}
                      placeholder={formContent.form.foodCategory.placeholder}
                      className={`h-10 ${
                        errors.foodCategory ? 'border-[var(--color-error)]' : ''
                      }`}
                      required
                    />
                    {errors.foodCategory && (
                      <Text size="sm" color="error" className="mt-1">
                        {errors.foodCategory}
                      </Text>
                    )}
                  </div>

                  {/* Cuisine */}
                  <div className="flex-1 flex flex-col gap-2">
                    <Label 
                      htmlFor="cuisine"
                      style={{ 
                        fontFamily: "var(--font-family-body)", 
                        fontSize: "var(--font-size-base)",
                        fontWeight: "600"
                      }}
                    >
                      {formContent.form.cuisine.label}
                    </Label>
                    <Select
                      options={formContent.form.cuisine.options?.map(option => ({
                        id: option.value,
                        label: option.label,
                        value: option.value
                      })) || []}
                      value={formData.cuisine}
                      onValueChange={(value) => handleInputChange('cuisine', value)}
                      placeholder={formContent.form.cuisine.placeholder}
                      className={`h-10 ${
                        errors.cuisine ? 'border-[var(--color-error)]' : ''
                      }`}
                      required
                    />
                    {errors.cuisine && (
                      <Text size="sm" color="error" className="mt-1">
                        {errors.cuisine}
                      </Text>
                    )}
                  </div>

                  {/* Dietary */}
                  <div className="flex-1 flex flex-col gap-2">
                    <Label 
                      htmlFor="dietary"
                      style={{ 
                        fontFamily: "var(--font-family-body)", 
                        fontSize: "var(--font-size-base)",
                        fontWeight: "600"
                      }}
                    >
                      {formContent.form.dietary.label}
                    </Label>
                    <Select
                      options={formContent.form.dietary.options?.map(option => ({
                        id: option.value,
                        label: option.label,
                        value: option.value
                      })) || []}
                      value={formData.dietary}
                      onValueChange={(value) => handleInputChange('dietary', value)}
                      placeholder={formContent.form.dietary.placeholder}
                      className={`h-10 ${
                        errors.dietary ? 'border-[var(--color-error)]' : ''
                      }`}
                      required
                    />
                    {errors.dietary && (
                      <Text size="sm" color="error" className="mt-1">
                        {errors.dietary}
                      </Text>
                    )}
                  </div>
                </div>

                {/* Ingredients */}
                <div className="flex flex-col gap-2">
                  <Label 
                    htmlFor="ingredients"
                    style={{ 
                      fontFamily: "var(--font-family-body)", 
                      fontSize: "var(--font-size-base)",
                      fontWeight: "600"
                    }}
                  >
                    {formContent.form.ingredients.label}
                  </Label>
                  <Text size="base" color="body">
                    {formContent.form.ingredients.description}
                  </Text>
                  <textarea
                    id="ingredients"
                    placeholder={formContent.form.ingredients.placeholder}
                    value={formData.ingredients}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('ingredients', e.target.value)}
                    className={`h-[130px] bg-[var(--color-background)] border rounded-lg px-3 py-2 resize-none ${
                      errors.ingredients ? 'border-[var(--color-error)]' : 'border-[var(--color-gray)]'
                    }`}
                    style={{ 
                      fontFamily: "var(--font-family-body)", 
                      fontSize: "var(--font-size-base)"
                    }}
                    required
                  />
                  {errors.ingredients && (
                    <Text size="sm" color="error" className="mt-1">
                      {errors.ingredients}
                    </Text>
                  )}
                </div>

                {/* Directions */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label 
                      style={{ 
                        fontFamily: "var(--font-family-body)", 
                        fontSize: "var(--font-size-base)",
                        fontWeight: "600"
                      }}
                    >
                      {formContent.form.directions.label}
                    </Label>
                    <Text size="base" color="body">
                      {formContent.form.directions.description}
                    </Text>
                  </div>

                  {/* Direction Steps */}
                  <div className="flex flex-col gap-6">
                    {formData.directions.map((direction, index) => (
                      <div key={index} className="flex flex-row gap-4 items-center">
                        <div className="flex-1 flex flex-row items-center gap-4">
                          <Label 
                            className="text-nowrap font-semibold text-[var(--color-text-body)]"
                            style={{ 
                              fontFamily: "var(--font-family-body)", 
                              fontSize: "var(--font-size-base)"
                            }}
                          >
                            {formContent.form.directions.stepLabel} {index + 1}
                          </Label>
                          <Input
                            type="text"
                            placeholder={`Enter step ${index + 1}`}
                            value={direction}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDirectionChange(index, e.target.value)}
                            className={`h-10 bg-[var(--color-background)] border rounded-lg flex-1 ${
                              index === 0 && errors.directions ? 'border-[var(--color-error)]' : 'border-[var(--color-gray)]'
                            }`}
                            required={index === 0}
                          />
                        </div>
                        {index > 0 ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDirectionStep(index)}
                            className="p-2 text-[var(--color-text-body)] hover:text-[var(--color-primary)]"
                            aria-label={`Remove step ${index + 1}`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        ) : (
                          <div className="w-8 h-10" />
                        )}
                      </div>
                    ))}
                    {errors.directions && (
                      <Text size="sm" color="error" className="mt-1">
                        {errors.directions}
                      </Text>
                    )}
                  </div>

                  {/* Add Another Step Button */}
                  <Button
                    variant="outline"
                    onClick={addDirectionStep}
                    className="bg-[var(--color-background)] border-none rounded-lg h-9 w-fit font-semibold text-[var(--color-text-body)]"
                  >
                    <Plus className="w-5 h-5 text-[var(--color-text-body)]" />
                    {formContent.form.directions.addStepButton}
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row gap-4 items-center justify-end">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="bg-[var(--color-background)] border border-[var(--color-secondary)] rounded-lg h-9 font-semibold text-[var(--color-secondary)]"
                >
                  {formContent.form.buttons.cancel}
                </Button>
                <Button
                  onClick={handlePreview}
                  className="bg-[var(--color-primary)] rounded-lg h-9 font-semibold text-[var(--color-text-on-dark)]"
                >
                  {formContent.form.buttons.preview}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <RecipePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={handleClosePreview}
        onSubmit={handleSubmitRecipe}
        formData={formData}
      />
    </div>
  );
}