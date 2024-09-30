import React from "react";

const PageCover = ({ blogs }) => {
  return (
    <div>
      <div
        style={{
          position: "relative",
          height: "200px",
          width: "100%",
        }}
      >
        {/* Image with opacity */}
        <div
          style={{
            backgroundImage: `url(${blogs.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.7, // Control image opacity here
          }}
        />

        {/* Overlay to enhance text visibility */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 2,
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: "relative",
            zIndex: 3, // Ensures text is on top of image and overlay
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          <h1 className="text-4xl font-bold">{blogs.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default PageCover;
