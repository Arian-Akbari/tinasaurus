import React, { useState, useEffect } from "react";

const VersionHeader = () => {
  const [currentVersion, setCurrentVersion] = useState("Latest");

  useEffect(() => {
    // Get version from localStorage
    const savedVersion = localStorage.getItem("selectedDocVersion");
    const version = savedVersion || "current";
    setCurrentVersion(version === "current" ? "Latest" : `v${version}`);

    // Listen for version changes
    const handleVersionChange = () => {
      const newVersion = localStorage.getItem("selectedDocVersion");
      setCurrentVersion(newVersion === "current" ? "Latest" : `v${newVersion}`);
    };

    // Custom event listener for version changes
    window.addEventListener("versionChanged", handleVersionChange);

    return () => {
      window.removeEventListener("versionChanged", handleVersionChange);
    };
  }, []);

  return (
    <div
      style={{
        padding: "20px 16px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        textAlign: "center",
        minHeight: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#10b981",
          backgroundColor: "#ecfdf5",
          padding: "12px 24px",
          borderRadius: "8px",
          border: "2px solid #d1fae5",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {currentVersion}
      </div>
    </div>
  );
};

export default VersionHeader;
