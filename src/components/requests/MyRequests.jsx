import { ChevronRight, Wrench } from 'lucide-react';

export default function ServiceRequests() {
  const requests = [
    {
      id: 1,
      title: "Plumbing issue",
      timePosted: "Posted 2 days ago",
      category: "new"
    },
    {
      id: 2,
      title: "Electrical repair", 
      timePosted: "Posted 3 days ago",
      category: "new"
    },
    {
      id: 3,
      title: "Appliance repair",
      timePosted: "Posted 1 week ago", 
      category: "old"
    },
    {
      id: 4,
      title: "Home cleaning",
      timePosted: "Posted 2 weeks ago",
      category: "old"
    }
  ];

  const newRequests = requests.filter(request => request.category === "new");
  const oldRequests = requests.filter(request => request.category === "old");

  const RequestItem = ({ request }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gray-100 rounded-sm flex items-center justify-center">
            <Wrench className="w-5 h-5 text-[#121417]" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-[#121417] truncate">
            {request.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {request.timePosted}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        <ChevronRight className="w-5 h-5 text-[#121417]" />
      </div>
    </div>
  );

  const RequestSection = ({ title, requests }) => (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-[#121417] mb-4 px-4 sm:px-0">
        {title}
      </h2>
      <div className=" overflow-hidden">
        {requests.map((request) => (
          <RequestItem key={request.id} request={request} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className=" px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#121417]">
            My requests
          </h1>
        </div>

        {/* Create Request Button */}
        <button className='text-white w-full mb-10 bg-[#57132A] text-center py-5 rounded-md'>
            Create New Request
        </button>

        {/* New Requests Section */}
        <RequestSection title="New" requests={newRequests} />

        {/* Old Requests Section */}
        <RequestSection title="Old" requests={oldRequests} />
      </div>
    </div>
  );
}