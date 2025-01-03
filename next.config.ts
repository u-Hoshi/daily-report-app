import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@fullcalendar/common",
    "@fullcalendar/daygrid",
    "@fullcalendar/react",
    "@fullcalendar/resource",
    "@fullcalendar/resource-timeline",
  ],
};

export default nextConfig;
