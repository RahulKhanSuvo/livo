import { create } from 'zustand';

type AdminUISidebarStore = {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapsed: () => void;
  setMobileOpen: (open: boolean) => void;
  openMobile: () => void;
  closeMobile: () => void;
};

export const useAdminUISidebarStore = create<AdminUISidebarStore>((set) => ({
  collapsed: false,
  mobileOpen: false,

  toggleCollapsed: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),

  setMobileOpen: (open) =>
    set({
      mobileOpen: open,
    }),

  openMobile: () =>
    set({
      mobileOpen: true,
    }),

  closeMobile: () =>
    set({
      mobileOpen: false,
    }),
}));
