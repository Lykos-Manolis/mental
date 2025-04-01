import { Grid2, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardNav from "./components/navigation/DashboardNav";
import DashboardInfo from "./components/information/DashboardInfo";
import Analytics from "./components/analytics/Analytics";
import { useGetConversationEmotionAnalytics } from "../../hooks/useGetConversationEmotionAnalytics";
import { useParams } from "react-router-dom";
import { useGetConversationInfo } from "../../hooks/useGetConversationInfo";

function Dashboard() {
  const { dashboardId } = useParams();
  const theme = useTheme();

  const { conversationInfo, isLoading: isLoadingConversationInfo } =
    useGetConversationInfo(dashboardId);

  const { emotionAnalytics, isLoading, error } =
    useGetConversationEmotionAnalytics(dashboardId);
  const [activeEmotion, setActiveEmotion] = useState(null);

  useEffect(() => {
    if (!isLoading && emotionAnalytics.length > 0) {
      setActiveEmotion(emotionAnalytics[0]);
    }
  }, [isLoading, emotionAnalytics]);

  const totalMessages =
    !isLoading && emotionAnalytics.length > 0
      ? emotionAnalytics.reduce(
          (sum, emotion) => sum + emotion.totalMessages,
          0,
        )
      : 0;

  const sortedEmotions =
    !isLoading && emotionAnalytics.length > 0
      ? [...emotionAnalytics].sort((a, b) => b.totalMessages - a.totalMessages)
      : [];

  const prevailingEmotion =
    !isLoading && sortedEmotions.length > 0
      ? {
          label: sortedEmotions[0].label,
          color: theme.palette.emotion[sortedEmotions[0].label],
        }
      : { label: "", color: "" };

  const underlyingEmotion =
    !isLoading && sortedEmotions.length > 0
      ? {
          label: sortedEmotions[sortedEmotions.length - 1].label,
          color:
            theme.palette.emotion[
              sortedEmotions[sortedEmotions.length - 1].label
            ],
        }
      : { label: "", color: "" };

  const monthlyData =
    !isLoading && emotionAnalytics.length > 0
      ? emotionAnalytics.map((emotion) => ({
          data: emotion.monthlyData,
          label: emotion.label,
          color: theme.palette.emotion[emotion.label],
        }))
      : [];

  return (
    <Grid2
      container
      direction="column"
      wrap="nowrap"
      sx={{
        width: "100vw",
        height: "100vh",
        p: 4,
        pt: 10,
      }}
    >
      {!isLoading && !error && activeEmotion && !isLoadingConversationInfo && (
        <>
          <DashboardNav conversationInfo={conversationInfo} />
          <DashboardInfo
            conversationInfo={conversationInfo}
            totalMessages={totalMessages}
          />
          <Analytics
            emotionAnalytics={emotionAnalytics}
            activeEmotion={activeEmotion}
            setActiveEmotion={setActiveEmotion}
            totalMessages={totalMessages}
            prevailingEmotion={prevailingEmotion}
            underlyingEmotion={underlyingEmotion}
            monthlyData={monthlyData}
          />
        </>
      )}
      <svg
        id="visual"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <defs>
          <filter id="blur1" x="-10%" y="-10%">
            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            ></feBlend>
            <feGaussianBlur
              stdDeviation="100"
              result="effect1_foregroundBlur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={
            theme.palette.emotion[activeEmotion?.label] ??
            theme.palette.background.default
          }
          opacity="0"
        ></rect>
        <g filter="url(#blur1)">
          <circle
            cx="65"
            cy="418"
            fill={theme.palette.background.default}
            r="310"
          ></circle>
          <circle
            cx="303"
            cy="245"
            fill={
              theme.palette.emotion[activeEmotion?.label] ??
              theme.palette.background.default
            }
            r="310"
          ></circle>
          <circle
            cx="170"
            cy="592"
            fill={theme.palette.background.default}
            r="310"
          ></circle>
          <circle
            cx="232"
            cy="751"
            fill={theme.palette.background.default}
            r="310"
          ></circle>
          <circle
            cx="260"
            cy="400"
            fill={
              theme.palette.emotion[activeEmotion?.label] ??
              theme.palette.background.default
            }
            r="310"
          ></circle>
          <circle
            cx="67"
            cy="204"
            fill={theme.palette.background.default}
            r="310"
          ></circle>
        </g>
      </svg>
    </Grid2>
  );
}

export default Dashboard;
