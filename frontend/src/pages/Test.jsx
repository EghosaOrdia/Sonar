import { File, FileMusic, FolderOpen, MicIcon } from "lucide-react";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";

const Test = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Error reading file", {
        description: "Please select a file",
      });
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/spotify/fingerptint-upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      console.log(data);
      toast.success("Upload successful!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden min-h-screen bg-[#05060A] font-family-sans font-normal">
      <div className="relative beam-border rounded-2xl transition-colors border-white/10 px-6 pt-10 sm:pt-14 flex flex-col items-center text-center cursor-pointer group">
        <button className="app-iconbox w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center group hover:border-primary-green/50 transition-colors duration-300 cursor-pointer">
          <FileMusic className="size-12 text-dark-foreground group-hover:scale-125 group-hover:text-primary-green transition-all duration-300" />
        </button>

        <label
          htmlFor="musicfile"
          className="inline-flex items-center justify-center gap-4 whitespace-nowrap text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 shadow btn-primary hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full"
        >
          <FileMusic className="lucide-icon" />
          Select Audio File
        </label>
        <input
          type="file"
          name="musicfile"
          id="musicfile"
          accept="audio/*"
          onChange={handleFileChange}
          hidden
        />

        {file && <p className="text-white mt-4">Selected: {file.name}</p>}

        <button
          onClick={handleUpload}
          className="flex btn-primary hover:bg-[#1abc54] text-black font-bold px-8 py-3 h-auto rounded-full mt-8"
        >
          Upload
        </button>
      </div>
    </section>
  );
};

export default Test;
