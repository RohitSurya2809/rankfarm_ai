"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import Icon from "../../../components/AppIcon"

const LanguageSelector = () => {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  const languages = [
    {
      code: "en",
      name: t("settings.english"),
      nativeName: "English",
      flag: "🇺🇸",
    },
    {
      code: "hi",
      name: t("settings.hindi"),
      nativeName: "हिन्दी",
      flag: "🇮🇳",
    },
    {
      code: "bh",
      name: t("settings.bihari"),
      nativeName: "भोजपुरी",
      flag: "🇮🇳",
    },
    {
      code: "ta",
      name: t("settings.tamil"),
      nativeName: "தமிழ்",
      flag: "🇮🇳",
    },
  ]

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = async (languageCode) => {
    if (languageCode === i18n.language) {
      setIsOpen(false)
      return
    }

    setIsChanging(true)

    try {
      await i18n.changeLanguage(languageCode)

      // Show success feedback
      setTimeout(() => {
        setIsChanging(false)
        setIsOpen(false)

        // Optional: Show toast notification
        console.log("[v0] Language changed to:", languageCode)
      }, 500)
    } catch (error) {
      console.error("[v0] Error changing language:", error)
      setIsChanging(false)
    }
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">{t("settings.selectLanguage")}</label>

      {/* Language Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isChanging}
        className={`w-full max-w-sm flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 ${
          isChanging ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{currentLanguage.flag}</span>
          <div className="text-left">
            <div className="font-medium text-gray-900">{currentLanguage.name}</div>
            <div className="text-sm text-gray-500">{currentLanguage.nativeName}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isChanging && (
            <div className="animate-spin">
              <Icon name="Loader2" size={16} className="text-primary" />
            </div>
          )}
          <Icon
            name="ChevronDown"
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 max-w-sm mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                disabled={isChanging}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  language.code === i18n.language
                    ? "bg-primary/5 text-primary border-r-2 border-primary"
                    : "text-gray-700"
                } ${isChanging ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span className="text-xl">{language.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{language.name}</div>
                  <div className="text-sm text-gray-500">{language.nativeName}</div>
                </div>
                {language.code === i18n.language && <Icon name="Check" size={16} className="text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}

      {/* Help Text */}
      <p className="mt-2 text-sm text-gray-500">Your language preference will be saved and applied across all pages.</p>
    </div>
  )
}

export default LanguageSelector
