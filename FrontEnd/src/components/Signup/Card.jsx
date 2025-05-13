import { Card } from "flowbite-react";

export default function CardComponent({ title, count, description }) {
  return (
    <Card className="max-w-sm m-4 p-4 border border-gray-200 shadow-md rounded-lg">
      <div className="p-2">
        <div className="flex items-baseline justify-between mb-3">
          <h5 className="text-xl font-bold text-gray-900">
            {title}
          </h5>
          <span className="text-2xl font-bold text-gray-800">
            {count}
          </span>
        </div>
        <div className="w-full h-1 bg-gray-200 rounded mb-3">
          <div 
            className="h-1 bg-blue-600 rounded"
            style={{ width: `${Math.min(count * 5, 100)}%` }}
          ></div>
        </div>
        <p className="font-normal text-gray-600 text-sm">
          {description}
        </p>
      </div>
    </Card>
  );
}
