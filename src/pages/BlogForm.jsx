import { useState } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import Tables from "../components/Tables"; // Import Tables component
import { app } from "../firebaseConfig"; // Assuming firebase is initialized in firebaseConfig.js
import { useAuth } from "../context/AuthContext";

const db = getFirestore(app);
const storage = getStorage(app);

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverText, setCoverText] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [reference, setReference] = useState("");
  const [editorKey, setEditorKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to upload images
  const uploadImage = async (file) => {
    const imageRef = ref(storage, `images/${Date.now()}-${file.name}`);
    await uploadBytes(imageRef, file);
    return getDownloadURL(imageRef);
  };

  // Function to handle adding sections
  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      {
        type: "section",
        image: null,
        imageTitle: "",
        content: "",
        timestamp: Date.now(),
        tableData: [], // Ensure table data is part of each section
      },
    ]);
  };

  // Function to handle saving table data
  const handleSaveTable = (sectionIndex, tableData, tableTitle) => {
    // Update the table data and table title within the respective section
    const updatedSections = sections.map((section, index) =>
      index === sectionIndex
        ? { ...section, tableData: tableData, tableTitle: tableTitle }
        : section
    );
    setSections(updatedSections);
  };

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
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

  const transformTableData = (tables) => {
    if (!Array.isArray(tables)) {
      console.warn("Warning: tables is not an array, returning empty array");
      return []; // Return an empty array if tables is not an array
    }

    return tables.map((table, idx) => {
      //console.log(`Processing table ${idx}:`, table);
      return {
        headings: table.headings || [],
        // Flatten rows to avoid nested arrays
        rows: Array.isArray(table.rows)
          ? table.rows.map((row) => (Array.isArray(row) ? row.join(",") : row)) // Flatten arrays in rows to strings
          : [],
      };
    });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const coverImageUrl = coverImageFile
        ? await uploadImage(coverImageFile)
        : "";

      // Process the sections including the image upload and table data transformation
      const processedSections = await Promise.all(
        sections.map(async (section) => {
          const imageUrl = section.image
            ? await uploadImage(section.image)
            : "";
          {
            /*
            console.log(
              "Section tableData before transformation:",
              section.tableData
            ); // Debugging
          */
          }
          const tableData = transformTableData(
            section.tableData?.tableData || []
          );
          //console.log(tableData);

          return {
            image: imageUrl,
            imageTitle: section.imageTitle,
            content: section.content,
            tableData: tableData, // Use the table data from the section itself
            tableTitle: section.tableTitle || "",
          };
        })
      );

      const blogData = {
        title,
        coverText,
        coverImage: coverImageUrl,
        author,
        publishedDate,
        description,
        sections: processedSections, // Include processed sections
        createdAt: serverTimestamp(),
        reference,
        clicks: 0, // Initialize clicks to 0 when creating a new blog
      };

      // Save the blog data to Firestore
      const currentUser = user;

      if (!currentUser) {
        throw new Error("No user is logged in.");
      }
      // Get the current user's UID
      const userId = currentUser.uid;
      // Save the blog data in the 'blogs' collection
      const blogRef = doc(collection(db, "blogs")); // Auto-generated blog document ID
      await setDoc(blogRef, { ...blogData, userId }); // Store blog with userId to identify who created it
      // Reference to the user's document in the 'users' collection
      const userRef = doc(db, "users", userId);
      // Reference to the 'blogs' subcollection inside the user's document to save blog ID
      const userBlogsRef = doc(collection(userRef, "blogs"), blogRef.id); // Save the reference to this blog in the user's 'blogs' subcollection
      // Save a reference to the blog in the user's 'blogs' subcollection
      await setDoc(userBlogsRef, {
        blogId: blogRef.id, // Save the blog's ID in the user's subcollection
        title: blogData.title, // Optionally save some metadata like the title for easy reference
        createdAt: new Date(), // Optionally add a timestamp
      });

      alert("Blog submitted successfully!");
      setTitle("");
      setCoverImageFile(null);
      setAuthor("");
      setPublishedDate("");
      setDescription("");
      setSections([]);
      setReference("");
      setEditorKey((prevKey) => prevKey + 1);
      navigate("/blogPages");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="mx-auto  mt-14 lg:w-[80%] card shrink-0">
        <div className="mx-auto border mt-10 shadow-2xl w-[80%] card  shrink-0 mb-10">
          <form onSubmit={handleSubmit} className="gap-2 card-body">
            {/* Form Fields for Title, Cover Image, Author, Date, Description */}
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
              <label className="label">Cover page Summery:</label>
              <span className="m-2 text-xs text-center">
                This is displayed on the cover page of blog and write about your
                theses in 250 words
              </span>
              <span className="text-xs text-center text-orange-300">
                If the text is highlighted with any color, select all the text
                and click on the{" "}
                <span className="font-bold text-orange-500">Tx</span> to remove
                the color of text
              </span>
              <RichTextEditor
                keyProp={editorKey}
                defaultValue={coverText}
                onRichTextEditorChange={(e) => setCoverText(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">Description:</label>
              <span className="text-xs text-center text-orange-300">
                If the text is highlighted with any color, select all the text
                and click on the{" "}
                <span className="font-bold text-orange-500">Tx</span> to remove
                the color of text
              </span>
              <RichTextEditor
                keyProp={editorKey}
                defaultValue={description}
                onRichTextEditorChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Add Section Component */}
            <div className=" form-control">
              <h4 className="label">Sections</h4>
              {sections.map((section, index) => (
                <div key={index} className="gap-2 p-2 mb-4 border rounded">
                  <div className="form-control ">
                    <label className="label">Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full file-input"
                      onChange={(e) =>
                        handleFileChange(index, e.target.files[0])
                      }
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
                    <span className="text-xs text-center text-orange-300">
                      If the text is highlighted with any color, select all the
                      text and click on the{" "}
                      <span className="font-bold text-orange-500">Tx</span> to
                      remove the color of text
                    </span>
                    <RichTextEditor
                      defaultValue={section.content}
                      onRichTextEditorChange={(e) =>
                        handleContentChange(index, e.target.value)
                      }
                    />
                  </div>
                  <Tables sectionIndex={index} onSaveTable={handleSaveTable} />

                  <button
                    type="button"
                    className="w-full mt-2 btn btn-error btn-sm lg:btn"
                    onClick={() => removeSection(index)}
                  >
                    Remove Section
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="mt-2 text-base btn btn-primary max-sm:btn-sm"
                onClick={addSection}
              >
                Add Section
              </button>
            </div>

            <div className="form-control">
              <label className="label">Reference:</label>
              <span className="text-xs text-center text-orange-300">
                If the text is highlighted with any color, select all the text
                and click on the{" "}
                <span className="font-bold text-orange-500">Tx</span> to remove
                the color of text
              </span>
              <RichTextEditor
                keyProp={editorKey}
                defaultValue={reference}
                onRichTextEditorChange={(e) => setReference(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-2 text-base max-sm:btn-sm btn btn-secondary"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <span className="loading loading-infinity loading-md"></span>{" "}
                  {/* Spinner */}
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
