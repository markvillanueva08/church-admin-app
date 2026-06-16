declare module "@fullcalendar/react";
declare module "@fullcalendar/daygrid";
declare module "@fullcalendar/timegrid";
declare module "@fullcalendar/interaction";
declare module "@fullcalendar/core";
declare module "apexcharts";
declare module "react-apexcharts";
// provide a minimal ApexOptions type to satisfy usage in template files
type ApexOptions = any;
declare module "@react-jvectormap/world";
declare module "@react-jvectormap/core";
declare module "flatpickr";
declare namespace flatpickr {
  namespace Options {
    type Hook = any;
    type DateOption = any;
  }
}
declare module "react-dropzone";

// Allow importing SVG modules as React components if necessary
declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
