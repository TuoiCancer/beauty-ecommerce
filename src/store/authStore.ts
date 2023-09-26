import { create } from 'zustand'

interface AuthStore {
	authToken: string | null
	xClientId: string | null
	XRtokenId: string | null
	setAuthToken: (token: string) => void
	clearAuthToken: () => void
	setXClientId: (clientId: string) => void
	clearXClientId: () => void
	setXRtokenId: (token: string) => void
}

export const useAuthStore = create<AuthStore>(set => ({
	authToken: null,
	xClientId: null,
	XRtokenId: null,
	setAuthToken: token => set({ authToken: token }),
	clearAuthToken: () => set({ authToken: null }),
	setXClientId: clientId => set({ xClientId: clientId }),
	clearXClientId: () => set({ xClientId: null }),
	setXRtokenId: token => set({ XRtokenId: token })
}))
