import  { useState } from "react";
import axios from "axios";
import RichTextEditor from "../components/RichTextEditor";
import { useNavigate } from "react-router-dom";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]); // Array to store sections with image, title, and content
  const [reference, setReference] = useState("");
  const [editorKey, setEditorKey] = useState(0);
  const navigate = useNavigate();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Add section with image, imageTitle, and content as a new object in the sections array
  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      {
        type: "section",
        image: null,
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

  const handleFileChange = (index, file) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, image: file } : section
    );
    setSections(updatedSections);
  };

  const handleImageTitleChange = (index, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, imageTitle: value } : section
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

    // Process all sections to convert files to base64 and build the final structure
    const processedSections = await Promise.all(
      sections.map(async (section) => {
        let imageBase64 = "";
        if (section.image) {
          imageBase64 = await fileToBase64(section.image);
        }
        return {
          image: imageBase64,
          imageTitle: section.imageTitle,
          content: section.content,
        };
      })
    );

    const blogData = {
      title,
      coverImage: coverImageBase64,
      author,
      publishedDate,
      description,
      sections: processedSections, // Store the processed sections
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
      setSections([]); // Reset sections array
      setReference("");
      setEditorKey((prevKey) => prevKey + 1); // Change key to reset RichTextEditor
      navigate("/blogs");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="mx-auto mb-10  mt-10 w-[100%] card bg-base-100 shrink-0">
      <div className="mx-auto  border mt-10 shadow-2xl w-[80%] card bg-base-100 shrink-0">
        <form onSubmit={handleSubmit} className="gap-2 card-body">
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

          <div className="form-control">
            <label className="label">Description:</label>
            <p className="mb-2 ml-2 text-xs text-gray-500">
              If the text is highlighted with color click on the Tx button to
              remove the highlighted color
            </p>
            <RichTextEditor
              keyProp={editorKey}
              defaultValue={description}
              onRichTextEditorChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-control">
            <h4 className="label">Sections</h4>
            {sections.map((section, index) => (
              <div key={index} className="gap-2 mb-4">
                <div className="form-control">
                  <label className="label">Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full file-input"
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
                      handleImageTitleChange(index, e.target.value)
                    }
                  />
                </div>
                <div className="form-control">
                  <label className="label">Content:</label>
                  <p className="mb-2 ml-2 text-xs text-gray-500">
                    If the text is highlighted with color click on the Tx button
                    to remove the highlighted color
                  </p>
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

          <div className="form-control">
            <label className="label">Reference:</label>
            <p className="mb-2 ml-2 text-xs text-gray-500">
              If the text is highlighted with color click on the Tx button to
              remove the highlighted color
            </p>
            <RichTextEditor
              keyProp={editorKey}
              defaultValue={reference}
              onRichTextEditorChange={(e) => setReference(e.target.value)}
            />
          </div>

          <button type="submit" className="mt-2 btn btn-secondary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
