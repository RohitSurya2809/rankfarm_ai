import { useTranslation } from "react-i18next"
import Header from "../../components/ui/Header"
import LanguageSelector from "./components/LanguageSelector"
import Icon from "../../components/AppIcon"

const Settings = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Settings" size={28} className="text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">{t("settings.title")}</h1>
            </div>
            <p className="text-gray-600">
              Customize your RankFarm AI experience with language preferences and other settings.
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Language Settings Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Globe" size={24} className="text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">{t("settings.language")}</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Choose your preferred language for the interface. Changes will be applied immediately.
              </p>

              <LanguageSelector />
            </div>

            {/* Additional Settings Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Bell" size={24} className="text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              </div>
              <p className="text-gray-600 mb-4">Manage your notification preferences and alerts.</p>
              <div className="text-sm text-gray-500 italic">
                Coming soon - notification settings will be available in the next update.
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Shield" size={24} className="text-primary" />
                <h2 className="text-xl font-semibold text-gray-900">Privacy & Security</h2>
              </div>
              <p className="text-gray-600 mb-4">Control your data privacy and account security settings.</p>
              <div className="text-sm text-gray-500 italic">
                Coming soon - privacy controls will be available in the next update.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings
