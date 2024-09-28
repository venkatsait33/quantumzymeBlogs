import React, { useState } from "react";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]); // Combined sections
  const [reference, setReference] = useState("");

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        type: "section",
        file: null,
        imageTitle: "",
        content: "",
        timestamp: Date.now(),
      },
    ]);
  };

  const removeSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleImageChange = (index, key, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [key]: value } : section
    );
    setSections(updatedSections);
  };

  const handleFileChange = (index, file) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, file } : section
    );
    setSections(updatedSections);
  };

  const handleContentChange = (index, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, content: value } : section
    );
    setSections(updatedSections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverImageBase64 = "";
    if (coverImageFile) {
      coverImageBase64 = await fileToBase64(coverImageFile);
    }

    const imagePromises = sections.map(async (section) => {
      if (section.file) {
        const base64Image = await fileToBase64(section.file);
        return {
          imageUrl: base64Image,
          imageTitle: section.imageTitle,
        };
      }
      return null;
    });

    const imageBase64Array = await Promise.all(imagePromises);

    const blogData = {
      title,
      coverImage: coverImageBase64,
      author,
      publishedDate,
      description,
      images: imageBase64Array.filter(Boolean), // Filter out nulls
      content: sections.map((section) => section.content).filter(Boolean),
      reference,
    };

    try {
      await axios.post("http://localhost:3000/blogs", blogData);
      alert("Blog submitted successfully!");
      // Clear form after submission
      setTitle("");
      setCoverImageFile(null);
      setAuthor("");
      setPublishedDate("");
      setDescription("");
      setSections([]);
      setReference("");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="mx-auto shadow-2xl w-[80%] card bg-base-100 shrink-0">
      <form onSubmit={handleSubmit} className="gap-2 mt-10 card-body">
        <div className="form-control">
          <label className="label">Title:</label>
          <input
            type="text"
            className="w-full input input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Cover Image:</label>
          <input
            type="file"
            className="w-full file-input"
            accept="image/*"
            onChange={(e) => setCoverImageFile(e.target.files[0])}
          />
        </div>

        <div className="form-control">
          <label className="label">Author:</label>
          <input
            type="text"
            className="w-full input input-bordered"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">Published Date:</label>
          <input
            type="date"
            value={publishedDate}
            className="w-full input input-bordered"
            onChange={(e) => setPublishedDate(e.target.value)}
          />
        </div>

        <div className="">
          <label className="label">Description:</label>
          <div className="w-full overflow-scroll">
            <RichTextEditor
              defaultValue={description}
              onRichTextEditorChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="form-control">
          <h4 className="label">Sections</h4>
          {sections
            .slice()
            .sort((a, b) => a.timestamp - b.timestamp) // Sort by timestamp
            .map((section, index) => (
              <div key={index} className="gap-2 mb-4">
                <div className="form-control">
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full max-w-xs file-input"
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                  />
                </div>
                <div className="form-control">
                  <label className="label">Image Title:</label>
                  <input
                    type="text"
                    value={section.imageTitle}
                    className="w-full input input-bordered"
                    onChange={(e) =>
                      handleImageChange(index, "imageTitle", e.target.value)
                    }
                  />
                </div>
                <div className="mt-4 form-control">
                  <RichTextEditor
                    defaultValue={section.content}
                    onRichTextEditorChange={(e) =>
                      handleContentChange(index, e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  className="mt-2 btn btn-error btn-sm"
                  onClick={() => removeSection(index)}
                >
                  Remove Section
                </button>
              </div>
            ))}
          <button
            type="button"
            className="mt-2 btn btn-primary btn-sm"
            onClick={addSection}
          >
            Add Section
          </button>
        </div>

        <div>
          <label className="label">Reference:</label>
          <input
            type="text"
            value={reference}
            className="w-full input input-bordered"
            onChange={(e) => setReference(e.target.value)}
          />
        </div>

        <button type="submit" className="mt-2 btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
