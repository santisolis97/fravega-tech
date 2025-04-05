import React, { forwardRef } from 'react';
import { Button as PaperButton, ButtonProps as PaperButtonProps } from 'react-native-paper';

export interface ButtonProps extends Omit<PaperButtonProps, 'children'> {
  label: string;
}

export const Button = forwardRef<any, ButtonProps>(({ label, ...props }, ref) => {
  return (
    <PaperButton
      {...props}
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {label}
    </PaperButton>
  );
});
