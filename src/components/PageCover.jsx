import React from "react";

const PageCover = ({ blog }) => {
  return (
    <div>
      <div
        style={{
          position: "relative",
        }}
        className="w-full sm:h-64 md:h-96 lg:h-128 xl:h-160"
      >
        {/* Image with opacity */}
        <div
          style={{
            backgroundImage: `url("${blog.coverImage}")`,
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.7, // Control image opacity here
          }}
          className="object-scale-down w-full h-full bg-no-repeat bg-cover"
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
          <h1 className="text-4xl font-bold sm:text-center">{blog.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default PageCover;
