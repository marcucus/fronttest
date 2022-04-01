import React, { useState } from "react";
import { FormattedMessage } from "../../FormattedMessage/FormattedMessage";

export const InputFile: React.FC<{
  onChange: (value: string) => void;
}> = (props) => {
  const [file, setFile] = useState<string | null>(null);

  return (
    <div className="relative">
      <label
        htmlFor="file-credentials"
        className="flex w-full mt-8 overflow-hidden text-lg font-normal text-gray-900 transition ease-in-out bg-white border border-gray-300 rounded-md cursor-pointer h-14"
      >
        <div className="flex items-center h-full px-4 transition-all duration-300 ease-in-out bg-gray-100 border-r border-gray-300 hover:bg-gray-200">
          <FormattedMessage id="update-credentials/input/button" />
        </div>
        <div className="flex items-center h-full pl-4 text-gray-400">
          {!file && (
            <FormattedMessage id="update-credentials/input/placeholder" />
          )}

          {file && file}
        </div>
      </label>

      <input
        id="file-credentials"
        className="hidden"
        type="file"
        onChange={(e) => {
          const files = e.target.files || [];
          const file = files[0];

          if (!file) return false;

          const reader = new FileReader();

          reader.addEventListener("load", (event) => {
            if (!event.target?.result) return false;
            setFile(file.name);
            props.onChange(event.target.result.toString());
          });

          reader.readAsText(file);
        }}
      />
    </div>
  );
};
