"use client";
// dashboard.tsx

import React, { useEffect, useRef, useState } from "react";
// import RecordRTC from "recordrtc";
import dynamic from "next/dynamic";
const VideoScreenRecorder = dynamic(
  () => import("../VideoScreenRecorder/components/VideoScreenRecorderRest"),
  { ssr: false }
);

const VideoAndAudioRecorder = dynamic(
  () => import("../VideoScreenRecorder/components/VideoAndAudioRecorder"),
  { ssr: false }
);
const ScreenAndAudioRecorder = dynamic(
  () => import("../VideoScreenRecorder/components/ScreenAndAudioRecrding"),
  { ssr: false }
);

import { Button } from "../components/button";
import { Sidebar } from "../components/sidebar";
import { BorderLessInput } from "../components/borderlessinput";
import { Icons } from "../components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  X,
  DialogOverlay,
} from "../components/dialog";

import { MyContextProvider, useMyContext } from "../../context/MyContext";

// import { Popover } from "ui/components/popover";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown";
import ToggleButton from "./components/toggleButton";
import { Disc2, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { log } from "console";
import Dashboard from "./components/dashboard";
// import { VideoScreenRecorder } from "../VideoScreenRecorder/components/VideoScreenRecorderRest";
// import MyTabs from "./components/tabs";

const Page = () => {
  return (
    <div className="h-screen w-screen">
      <MyContextProvider>
        <Dashboard />
      </MyContextProvider>
    </div>
  );
};

export default Page;
