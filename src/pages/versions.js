import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useVersions } from "@docusaurus/plugin-content-docs/client";

export default function Versions() {
  const versions = useVersions();

  return (
    <Layout title="Documentation Versions">
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset--2">
            <h1>Documentation Versions</h1>
            <p>
              Here you can find all available versions of our documentation.
            </p>

            <div className="margin-vert--lg">
              {versions.map((version) => (
                <div key={version.name} className="margin-bottom--lg">
                  <h2>
                    <Link to={version.path}>{version.label}</Link>
                    {version.isLast && (
                      <span className="badge badge--primary margin-left--sm">
                        Latest
                      </span>
                    )}
                  </h2>
                  <p>
                    {version.name === "current"
                      ? "Current development version (unreleased)"
                      : `Version ${version.name} of the documentation`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
