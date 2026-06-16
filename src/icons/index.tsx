import PlusIconSrc from "./plus.svg";
import CloseIconSrc from "./close.svg";
import BoxIconSrc from "./box.svg";
import CheckCircleIconSrc from "./check-circle.svg";
import AlertIconSrc from "./alert.svg";
import InfoIconSrc from "./info.svg";
import ErrorIconSrc from "./info-hexa.svg";
import BoltIconSrc from "./bolt.svg";
import ArrowUpIconSrc from "./arrow-up.svg";
import ArrowDownIconSrc from "./arrow-down.svg";
import FolderIconSrc from "./folder.svg";
import VideoIconSrc from "./videos.svg";
import AudioIconSrc from "./audio.svg";
import GridIconSrc from "./grid.svg";
import FileIconSrc from "./file.svg";
import DownloadIconSrc from "./download.svg";
import ArrowRightIconSrc from "./arrow-right.svg";
import GroupIconSrc from "./group.svg";
import BoxIconLineSrc from "./box-line.svg";
import ShootingStarIconSrc from "./shooting-star.svg";
import DollarLineIconSrc from "./dollar-line.svg";
import TrashBinIconSrc from "./trash.svg";
import AngleUpIconSrc from "./angle-up.svg";
import AngleDownIconSrc from "./angle-down.svg";
import PencilIconSrc from "./pencil.svg";
import CheckLineIconSrc from "./check-line.svg";
import CloseLineIconSrc from "./close-line.svg";
import ChevronDownIconSrc from "./chevron-down.svg";
import ChevronUpIconSrc from "./chevron-up.svg";
import PaperPlaneIconSrc from "./paper-plane.svg";
import LockIconSrc from "./lock.svg";
import EnvelopeIconSrc from "./envelope.svg";
import UserIconSrc from "./user-line.svg";
import CalenderIconSrc from "./calender-line.svg";
import EyeIconSrc from "./eye.svg";
import EyeCloseIconSrc from "./eye-close.svg";
import TimeIconSrc from "./time.svg";
import CopyIconSrc from "./copy.svg";
import ChevronLeftIconSrc from "./chevron-left.svg";
import UserCircleIconSrc from "./user-circle.svg";
import TaskIconSrc from "./task-icon.svg";
import ListIconSrc from "./list.svg";
import TableIconSrc from "./table.svg";
import PageIconSrc from "./page.svg";
import PieChartIconSrc from "./pie-chart.svg";
import BoxCubeIconSrc from "./box-cube.svg";
import PlugInIconSrc from "./plug-in.svg";
import DocsIconSrc from "./docs.svg";
import MailIconSrc from "./mail-line.svg";
import HorizontaLDotsSrc from "./horizontal-dots.svg";
import ChatIconSrc from "./chat.svg";
import MoreDotIconSrc from "./more-dot.svg";
import BellIconSrc from "./bell.svg";

import React from "react";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  title?: string;
  // allow explicit aria-label if caller wants accessible label
  'aria-label'?: string;
};

const resolveSrc = (src: any) => {
  if (!src) return "";
  if (typeof src === "string") return src;
  // some bundlers export an object { src: '/_next/static/media/..', height, width }
  if (typeof src === "object") {
    return src.src || src.default || src.url || "";
  }
  return String(src);
};

const makeIcon = (srcAny: any, defaultAlt = "") => {
  const Icon = (props: ImgProps) => {
    const { alt, className, children, onError, style, ...rest } = props;
    // prefer explicit aria-label over alt, otherwise fall back to defaultAlt
    const ariaLabel = (rest as any)['aria-label'] as string | undefined;
    const finalAlt = ariaLabel ?? alt ?? defaultAlt ?? '';
    // If no accessible label provided, mark as decorative
    const ariaHidden = finalAlt === '';

    const src = resolveSrc(srcAny);

    // local handler to avoid broken img showing 404 — hide image if it fails to load
    const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
      // hide broken image
      (e.currentTarget as HTMLImageElement).style.display = 'none';
      if (typeof onError === 'function') onError(e as any);
    };

    return (
      <img
        src={src}
        alt={finalAlt}
        className={className}
        aria-hidden={ariaHidden}
        onError={handleError}
        style={style}
        {...rest}
      />
    );
  };
  Icon.displayName = `Icon`;
  return Icon;
};

export const DownloadIcon = makeIcon(DownloadIconSrc, "Download");
export const BellIcon = makeIcon(BellIconSrc, "Bell");
export const MoreDotIcon = makeIcon(MoreDotIconSrc, "More");
export const FileIcon = makeIcon(FileIconSrc, "File");
export const GridIcon = makeIcon(GridIconSrc, "Grid");
export const AudioIcon = makeIcon(AudioIconSrc, "Audio");
export const VideoIcon = makeIcon(VideoIconSrc, "Video");
export const BoltIcon = makeIcon(BoltIconSrc, "Bolt");
export const PlusIcon = makeIcon(PlusIconSrc, "Plus");
export const BoxIcon = makeIcon(BoxIconSrc, "Box");
export const CloseIcon = makeIcon(CloseIconSrc, "Close");
export const CheckCircleIcon = makeIcon(CheckCircleIconSrc, "Check");
export const AlertIcon = makeIcon(AlertIconSrc, "Alert");
export const InfoIcon = makeIcon(InfoIconSrc, "Info");
export const ErrorIcon = makeIcon(ErrorIconSrc, "Error");
export const ArrowUpIcon = makeIcon(ArrowUpIconSrc, "Up");
export const FolderIcon = makeIcon(FolderIconSrc, "Folder");
export const ArrowDownIcon = makeIcon(ArrowDownIconSrc, "Down");
export const ArrowRightIcon = makeIcon(ArrowRightIconSrc, "Right");
export const GroupIcon = makeIcon(GroupIconSrc, "Group");
export const BoxIconLine = makeIcon(BoxIconLineSrc, "BoxLine");
export const ShootingStarIcon = makeIcon(ShootingStarIconSrc, "Star");
export const DollarLineIcon = makeIcon(DollarLineIconSrc, "Dollar");
export const TrashBinIcon = makeIcon(TrashBinIconSrc, "Trash");
export const AngleUpIcon = makeIcon(AngleUpIconSrc, "AngleUp");
export const AngleDownIcon = makeIcon(AngleDownIconSrc, "AngleDown");
export const PencilIcon = makeIcon(PencilIconSrc, "Pencil");
export const CheckLineIcon = makeIcon(CheckLineIconSrc, "CheckLine");
export const CloseLineIcon = makeIcon(CloseLineIconSrc, "CloseLine");
export const ChevronDownIcon = makeIcon(ChevronDownIconSrc, "ChevronDown");
export const PaperPlaneIcon = makeIcon(PaperPlaneIconSrc, "PaperPlane");
export const EnvelopeIcon = makeIcon(EnvelopeIconSrc, "Envelope");
export const LockIcon = makeIcon(LockIconSrc, "Lock");
export const UserIcon = makeIcon(UserIconSrc, "User");
export const CalenderIcon = makeIcon(CalenderIconSrc, "Calendar");
export const EyeIcon = makeIcon(EyeIconSrc, "Eye");
export const EyeCloseIcon = makeIcon(EyeCloseIconSrc, "EyeClose");
export const TimeIcon = makeIcon(TimeIconSrc, "Time");
export const CopyIcon = makeIcon(CopyIconSrc, "Copy");
export const ChevronLeftIcon = makeIcon(ChevronLeftIconSrc, "ChevronLeft");
export const UserCircleIcon = makeIcon(UserCircleIconSrc, "UserCircle");
export const ListIcon = makeIcon(ListIconSrc, "List");
export const TableIcon = makeIcon(TableIconSrc, "Table");
export const PageIcon = makeIcon(PageIconSrc, "Page");
export const TaskIcon = makeIcon(TaskIconSrc, "Task");
export const PieChartIcon = makeIcon(PieChartIconSrc, "PieChart");
export const BoxCubeIcon = makeIcon(BoxCubeIconSrc, "BoxCube");
export const PlugInIcon = makeIcon(PlugInIconSrc, "PlugIn");
export const DocsIcon = makeIcon(DocsIconSrc, "Docs");
export const MailIcon = makeIcon(MailIconSrc, "Mail");
export const HorizontaLDots = makeIcon(HorizontaLDotsSrc, "Dots");
export const ChevronUpIcon = makeIcon(ChevronUpIconSrc, "ChevronUp");
export const ChatIcon = makeIcon(ChatIconSrc, "Chat");

export default {};
