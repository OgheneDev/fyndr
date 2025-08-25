import { ArrowLeft } from "lucide-react";
import Avatar from "./Avatar";

export const ChatHeader = ({ chatInfo, userType, onBack }) => (
  <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
    <button
      onClick={onBack}
      className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
    >
      <ArrowLeft className="w-6 h-6 text-gray-600" />
    </button>
    <div className="flex-shrink-0">
      <Avatar party={chatInfo?.user || chatInfo?.merchant} /> 
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-gray-900 truncate">
        {chatInfo?.user?.name || chatInfo?.merchant?.name || <span className="inline-block h-4 w-24 bg-gray-200 rounded animate-pulse align-middle" />}
      </h3>
      <p className="text-sm text-gray-500 truncate">
        {chatInfo?.request?.title || <span className="inline-block h-3 w-20 bg-gray-100 rounded animate-pulse align-middle" />}
      </p>
    </div>
  </div>
);