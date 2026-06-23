"use client";

import { useError } from "@/context/ErrorAndSuccessMsgContext";
import { CheckCircle2, XCircle } from "lucide-react";

const ErrorAndSuccessMessage = () => {
  const { messages } = useError();

  return (
    <div>
      {messages.length > 0 && (
        <div className="fixed top-4 left-1/2 z-50 w-full max-w-xl px-4 -translate-x-1/2">
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={`${msg.id}-${msg.timeStamp}`}
                className={`
                  flex items-center gap-3 
                  p-3.5 pr-5 
                  border rounded-xl 
                  shadow-lg
                  ${msg.success 
                    ? "bg-emerald-50 border-emerald-200" 
                    : "bg-rose-50 border-rose-200"
                  }
                `}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  {msg.success ? (
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-rose-600" />
                    </div>
                  )}
                </div>

                {/* Message */}
                <p className={`
                  flex-1 text-sm font-medium
                  ${msg.success ? "text-emerald-800" : "text-rose-800"}
                `}>
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorAndSuccessMessage;