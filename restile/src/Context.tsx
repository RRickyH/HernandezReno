import { createContext, useState, useEffect, ReactNode } from "react";
import { SiteConfig } from "src/services/config.ts";

const API_URL = import.meta.env.VITE_API_URL;

interface SiteProviderProps {
  children: ReactNode; // This fixes the 'any' error
}

interface SiteContextType {
  config: SiteConfig;
  loading: boolean;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
}
const defaultSiteContext: SiteContextType = {
  config: {
    titleText: "Your Kitchen,",
    accentText: "Reimagined.",
    tagLine:
      "Breathing new life into your spaces with hand-crafted custom carpentry and decades of expertise. Find out how we can transform your space today.",
    heroImageURL: "url(kitchen-fallback.jpg)",
    aboutDescription: "TBD",
    aboutImageURL: "https://hernandezreno.ca/home_kitchen.jpg",
  },
  loading: false,
  setConfig: () => {},
};
export const SiteContext = createContext<SiteContextType>(defaultSiteContext);

export function SiteProvider({ children }: SiteProviderProps) {
  const [config, setConfig] = useState(defaultSiteContext.config);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(`${API_URL}/settings`);
        const data = await response.json();
        console.log("fetched settings", data);
        setConfig(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        return;
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  return (
    <SiteContext.Provider value={{ config, loading, setConfig }}>
      {children}
    </SiteContext.Provider>
  );
}
