
import { render, screen } from '@testing-library/react';
import { UpdatePasswordForm } from '../update-password-form';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      updateUser: vi.fn(),
    },
  }),
}));

describe('UpdatePasswordForm', () => {
  it('renders form elements', () => {
    render(<UpdatePasswordForm />);

    expect(screen.getByLabelText('New password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save new password' })).toBeInTheDocument();
  });
});
