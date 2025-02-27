import { vi, expect, it, beforeEach, describe } from "vitest";
import en from "./en.json";
import de from "./de.json";
import { i18n, initI18n } from "./i18n"; // Import i18n and initI18n explicitly

describe("i18n Initialization", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("window", {
      location: { hash: "#lang=en" },
    });
  });

  it("should default to English when no language is specified in the URL hash", async () => {
    vi.stubGlobal("window", {
      location: { hash: "" },
    });

    initI18n(); // Call i18n.init() explicitly

    expect(i18n.language).toBe("en");
    expect(i18n.getResourceBundle("en", "translation")).toEqual(en);
  });

  it('should use German when the hash specifies "de"', async () => {
    vi.stubGlobal("window", {
      location: { hash: "#lang=de" },
    });

    initI18n(); // Call i18n.init() explicitly

    expect(i18n.language).toBe("de");
    expect(i18n.getResourceBundle("de", "translation")).toEqual(de);
  });

  it("should use English when the hash specifies an unsupported language", async () => {
    vi.stubGlobal("window", {
      location: { hash: "#lang=fr" },
    });

    initI18n(); // Call i18n.init() explicitly

    expect(i18n.language).toBe("en");
    expect(i18n.getResourceBundle("en", "translation")).toEqual(en);
  });

  it('should initialize i18n with the correct resources for "de"', async () => {
    vi.stubGlobal("window", {
      location: { hash: "#lang=de" },
    });

    initI18n(); // Call i18n.init() explicitly

    expect(i18n.getResourceBundle("de", "translation")).toEqual(de);
  });
});
