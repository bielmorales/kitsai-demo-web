import React from "react";

interface Item {
  id: string;
  status: string;
  createdAt: string;
  outputFileUrl?: string;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <ul className="space-y-2 mb-4 rounded-lg">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col py-4 rounded-lg bg-blue-200 shadow-sm  transition-shadow duration-300 ease-in-out"
        >
          <div className="flex justify-between items-center px-4 text-sm">
            <span>
              Status:{" "}
              <span
                className={`font-semibold ${
                  item.status === "success" ? "text-blue-500" : "text-blue-400"
                }`}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </span>
            <span className="text-sm text-blue-800">
              {/* Created:{" "} */}
              {new Date(item.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          {item.status === "success" && (
            <a
              href={item.outputFileUrl}
              className="mt-2 inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md text-sm mx-4 transition duration-150 ease-in-out"
              download
            >
              Download Link
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
