import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import ProgressRing from '../components/ProgressRing';

describe('ProgressRing', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correctly with 0%', () => {
    render(<ProgressRing value={0} label="Test" />);
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('animates to target value', () => {
    render(<ProgressRing value={0.5} label="Test" />);
    
    // Initial render might be 0
    expect(screen.getByText('0%')).toBeInTheDocument();

    // Fast forward animation
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Should reach 50%
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});