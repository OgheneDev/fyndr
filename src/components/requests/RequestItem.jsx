import { formatRelativeTime } from '@/utils/dateUtils';
import { ChevronRight, Wrench } from 'lucide-react';
import { CATEGORY_LABELS } from '@/data/data';

export const RequestItem = ({ request }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer max-w-full">
    <div className="flex items-center space-x-4 flex-1 min-w-0">
      <div className="flex-shrink-0">
        <div className="w-13 h-13 bg-gray-100 rounded-md flex items-center justify-center">
          <Wrench className="w-5 h-5 text-[#121417]" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm text-[#121417] truncate">
          {request.title}
        </h3>
        <p className="text-sm text-gray-500 mt-1 truncate">
          {CATEGORY_LABELS[request.category]} • {formatRelativeTime(request.createdAt)}
        </p>
      </div>
    </div>
    <div className="flex-shrink-0 ml-4">
      <ChevronRight className="w-7 h-7 text-[#121417]" />
    </div>
  </div>
);