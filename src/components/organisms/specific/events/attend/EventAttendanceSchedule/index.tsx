import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Attendance, UserAttendance } from "@/lib/types/event/attendance";

interface EventAttendanceScheduleProps {
  eventStart: Date;
  eventEnd: Date;
  isEventAllDay: boolean;
  attendances: Attendance[];
  isForecast: boolean;
}

export const EventAttendanceSchedule = ({
  eventStart,
  eventEnd,
  isEventAllDay,
  attendances,
  isForecast,
}: EventAttendanceScheduleProps): React.JSX.Element => {
  const eventDuration = isEventAllDay ? 24 : eventEnd.getHours() + 1 - eventStart.getHours();
  const hours = Array.from({ length: eventDuration }, (_, i) => eventStart.getHours() + i);

  const getUserAttendanceStyle = (ua: UserAttendance) => {
    const attendHour = ua.attendedAt.getHours();
    const attendMinute = ua.attendedAt.getMinutes();
    const leaveHour = ua.leftAt.getHours();
    const leaveMinute = ua.leftAt.getMinutes();

    const top = (attendHour - eventStart.getHours()) * 60 + (attendMinute - eventStart.getMinutes());
    const height = (leaveHour - eventStart.getHours()) * 60 + (leaveMinute - eventStart.getMinutes()) - top;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  const getUserAttendanceClass = (ua: UserAttendance) => {
    // TODO: 色を動的に決める
    console.log(ua);
    return "bg-accent";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attendance {isForecast ? "Forecasts" : "History"}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="flex">
            <div className="relative w-16 flex-none border-r">
              {hours.map((hour) => (
                <div key={hour} className="h-[60px] border-b px-2 py-1 text-sm text-muted-foreground">
                  {hour}:00
                </div>
              ))}
            </div>
            <div className="flex flex-1">
              {attendances.map((attendance, index) => (
                <div
                  key={attendance.id}
                  className={cn("relative min-h-[60px] flex-1", index !== attendances.length - 1 && "border-r")}
                  style={{ height: `${eventDuration * 60}px` }}
                >
                  <div className="absolute left-0 right-0 top-0 flex h-8 items-center justify-center border-b bg-muted text-sm font-medium">
                    {attendance.userName}
                  </div>
                  <div className="pt-8">
                    <TooltipProvider>
                      {attendance.userAttendances.map((ua) => (
                        <Tooltip key={ua.userId}>
                          <TooltipTrigger asChild>
                            <div
                              style={getUserAttendanceStyle(ua)}
                              className={cn(
                                "absolute left-1 right-1 cursor-pointer rounded-md p-2",
                                getUserAttendanceClass(ua),
                              )}
                            >
                              <div className="truncate text-sm font-medium">{attendance.userName}</div>
                              <div className="text-xs opacity-90">
                                {ua.attendedAt.getHours()}:{ua.attendedAt.getMinutes().toString().padStart(2, "0")}
                                {" - "}
                                {ua.leftAt.getHours()}:{ua.leftAt.getMinutes().toString().padStart(2, "0")}
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{attendance.userName}</p>
                            <p>
                              {ua.attendedAt.getHours()}:{ua.attendedAt.getMinutes().toString().padStart(2, "0")}
                              {" - "}
                              {ua.leftAt.getHours()}:{ua.leftAt.getMinutes().toString().padStart(2, "0")}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
