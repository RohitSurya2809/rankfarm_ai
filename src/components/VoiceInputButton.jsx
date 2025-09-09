"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import useVoiceRecognition from "../hooks/useVoiceRecognition"
import Icon from "./AppIcon"

const VoiceInputButton = ({ onVoiceResult, placeholder, className = "" }) => {
  const { t } = useTranslation()
  const [showFeedback, setShowFeedback] = useState(false)
  const {
    isSupported,
    isListening,
    isProcessing,
    transcript,
    error,
    startListening,
    stopListening,
    clearError,
    clearTranscript,
  } = useVoiceRecognition()

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening()
      return
    }

    clearError()
    clearTranscript()
    setShowFeedback(true)

    startListening((result) => {
      console.log("[v0] Voice recognition result:", result)
      if (onVoiceResult) {
        onVoiceResult(result)
      }

      setTimeout(() => {
        setShowFeedback(false)
      }, 2000)
    })
  }

  const handleCloseFeedback = () => {
    setShowFeedback(false)
    clearError()
    if (isListening) {
      stopListening()
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <div className="relative">
      {/* Voice Input Button */}
      <button
        onClick={handleVoiceInput}
        disabled={isProcessing}
        className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
          isListening
            ? "bg-red-500 text-white shadow-lg animate-pulse"
            : "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
        } ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
        title={isListening ? t("voice.stopListening") : t("voice.startListening")}
      >
        {isProcessing ? (
          <div className="animate-spin">
            <Icon name="Loader2" size={20} />
          </div>
        ) : isListening ? (
          <Icon name="MicOff" size={20} />
        ) : (
          <Icon name="Mic" size={20} />
        )}
      </button>

      {/* Voice Feedback Modal */}
      {showFeedback && (isListening || isProcessing || error || transcript) && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[280px] max-w-[320px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Mic" size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-900">{t("voice.startListening")}</span>
              </div>
              <button onClick={handleCloseFeedback} className="p-1 hover:bg-gray-100 rounded transition-colors">
                <Icon name="X" size={14} className="text-gray-400" />
              </button>
            </div>

            {/* Status Content */}
            <div className="space-y-3">
              {isListening && (
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-sm text-blue-700">{t("voice.listening")}</span>
                </div>
              )}

              {isProcessing && (
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={16} className="text-yellow-600" />
                  </div>
                  <span className="text-sm text-yellow-700">{t("voice.processing")}</span>
                </div>
              )}

              {transcript && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Check" size={14} className="text-green-600" />
                    <span className="text-xs font-medium text-green-700">Recognized:</span>
                  </div>
                  <p className="text-sm text-green-800 font-medium">"{transcript}"</p>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="AlertCircle" size={14} className="text-red-600" />
                    <span className="text-xs font-medium text-red-700">{t("common.error")}:</span>
                  </div>
                  <p className="text-sm text-red-800">{error}</p>
                  <button
                    onClick={handleVoiceInput}
                    className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    {t("common.retry")}
                  </button>
                </div>
              )}

              {/* Help Text */}
              {isListening && (
                <div className="text-xs text-gray-500 text-center">{placeholder || t("voice.speakLocation")}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {showFeedback && <div className="fixed inset-0 z-40" onClick={handleCloseFeedback} />}
    </div>
  )
}

export default VoiceInputButton
