'use client';

import { create } from 'zustand';

interface BlogState {
  isBlogPost: boolean;
  setIsBlogPost: (value: boolean) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  isBlogPost: false,
  setIsBlogPost: (value: boolean) => set({ isBlogPost: value }),
}));