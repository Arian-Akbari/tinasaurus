import React, { useState, useEffect } from "react";

const VersionSelector = () => {
  const [selectedVersion, setSelectedVersion] = useState("");
  const [availableVersions, setAvailableVersions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Export the current version for use in other components
  useEffect(() => {
    window.currentDocVersion = selectedVersion;
  }, [selectedVersion]);

  useEffect(() => {
    // Get versions from versions.json
    fetch("/versions.json")
      .then((response) => response.json())
      .then((versions) => {
        const allVersions = ["current", ...versions];
        setAvailableVersions(allVersions);

        // Get version from localStorage or default to 'current'
        const savedVersion = localStorage.getItem("selectedDocVersion");
        let currentVersion = savedVersion || "current";

        setSelectedVersion(currentVersion);
      })
      .catch((error) => {
        console.log("Loading default versions due to error:", error);
        const defaultVersions = ["current", "2.0", "1.5"];
        setAvailableVersions(defaultVersions);
        setSelectedVersion("current");
      });
  }, []);

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
    setIsOpen(false);

    // Store selected version in localStorage for persistence
    localStorage.setItem("selectedDocVersion", version);

    // Dispatch custom event for version change
    window.dispatchEvent(
      new CustomEvent("versionChanged", { detail: version })
    );

    // Navigate to docs collection
    window.location.hash = "#/collections/doc";

    // Small delay to ensure hash change is processed
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const getVersionLabel = (version) => {
    return version === "current" ? "Latest" : `v${version}`;
  };

  const getDisplayLabel = (version) => {
    return version === "current" ? "Latest" : `v${version}`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".version-dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      className="version-dropdown"
      style={{
        position: "relative",
        marginBottom: "16px",
        marginTop: "-8px",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "8px 12px",
          backgroundColor: "#1f2937",
          border: "1px solid #374151",
          borderRadius: "6px",
          color: "#10b981",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#374151";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#1f2937";
        }}
      >
        <span>{getDisplayLabel(selectedVersion)}</span>
        <span
          style={{
            fontSize: "12px",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
            marginTop: "2px",
          }}
        >
          {availableVersions.map((version) => (
            <button
              key={version}
              onClick={() => handleVersionSelect(version)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "transparent",
                border: "none",
                color: selectedVersion === version ? "#10b981" : "#d1d5db",
                fontSize: "14px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                borderBottom:
                  version === availableVersions[availableVersions.length - 1]
                    ? "none"
                    : "1px solid #374151",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#374151";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              {getVersionLabel(version)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VersionSelector;
