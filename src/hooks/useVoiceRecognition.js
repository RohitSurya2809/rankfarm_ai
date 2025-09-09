"use client"

import { useState, useCallback, useRef } from "react"
import { useTranslation } from "react-i18next"

const useVoiceRecognition = () => {
  const { i18n, t } = useTranslation()
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)

  const isSupported = "webkitSpeechRecognition" in window || "SpeechRecognition" in window

  const startListening = useCallback(
    (onResult) => {
      if (!isSupported) {
        setError(t("voice.voiceNotSupported"))
        return
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      // Configure recognition based on current language
      const currentLang = i18n.language
      let recognitionLang = "en-US"

      if (currentLang === "hi") {
        recognitionLang = "hi-IN"
      } else if (currentLang === "bh") {
        // Bihari/Bhojpuri - fallback to Hindi recognition
        recognitionLang = "hi-IN"
      }

      recognitionRef.current.lang = recognitionLang
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.maxAlternatives = 1

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setError(null)
        setTranscript("")
      }

      recognitionRef.current.onresult = (event) => {
        const result = event.results[0][0].transcript
        setTranscript(result)
        setIsProcessing(true)

        // Call the callback with the result
        if (onResult) {
          onResult(result)
        }

        setTimeout(() => {
          setIsProcessing(false)
        }, 1000)
      }

      recognitionRef.current.onerror = (event) => {
        setIsListening(false)
        setIsProcessing(false)

        switch (event.error) {
          case "not-allowed":
            setError(t("voice.permissionDenied"))
            break
          case "no-speech":
            setError(t("voice.noSpeechDetected"))
            break
          default:
            setError(t("voice.speechError"))
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        if (!transcript && !error) {
          setError(t("voice.noSpeechDetected"))
        }
      }

      try {
        recognitionRef.current.start()
      } catch (err) {
        setError(t("voice.speechError"))
        setIsListening(false)
      }
    },
    [isSupported, i18n.language, t, transcript, error],
  )

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const clearTranscript = useCallback(() => {
    setTranscript("")
  }, [])

  return {
    isSupported,
    isListening,
    isProcessing,
    transcript,
    error,
    startListening,
    stopListening,
    clearError,
    clearTranscript,
  }
}

export default useVoiceRecognition
