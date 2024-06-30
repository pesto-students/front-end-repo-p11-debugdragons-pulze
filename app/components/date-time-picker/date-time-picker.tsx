// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable import/no-extraneous-dependencies */
"use client";

// import { CalendarIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { DateValue } from "react-aria";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useButton, useDatePicker, useInteractOutside } from "react-aria";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import { useForwardedRef } from "../../utils/use-forward-ref";
import { cn } from "../../utils/utils";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/popover";
import { Calendar } from "./calendar";
import { DateField } from "./date-field";
import { TimeField } from "./time-field";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/tabs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CalendarIcon, Clock3 } from "lucide-react";

export type Granularity =
  | "day"
  | "month"
  | "year"
  | "hour"
  | "minute"
  | "second";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DateTimePickerProps extends DatePickerStateOptions<DateValue> {
  // granularity?: Granularity;
  onStateChange: (state: any) => void;
  setClickOnDialogTrigger: (state: any) => void;

  // setShowRespondByComponent: Dispatch<SetStateAction<boolean>>;
}

const DateTimePicker = React.forwardRef<HTMLDivElement, DateTimePickerProps>(
  (props, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const state = useDatePickerState(props);

    useEffect(() => {
      props.onStateChange(state);
      // props.setShowRespondByComponent(true);
    }, [state, props]);

    const {
      groupProps,
      fieldProps,
      buttonProps: _buttonProps,
      dialogProps,
      calendarProps,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    } = useDatePicker(props, state, ref);
    const { buttonProps } = useButton(_buttonProps, buttonRef);
    useInteractOutside({
      ref: contentRef,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onInteractOutside: (e) => {
        setOpen(false);
      },
    });

    const handleFYITabClick = () => {
      // Logic specific to FYI tab click

      props.setClickOnDialogTrigger(true); // Update the parent's state
    };

    const handleRespondByTabClick = () => {
      // Logic specific to FYI tab click

      props.setClickOnDialogTrigger(false); // Update the parent's state
    };

    return (
      <div
        {...groupProps}
        ref={ref}
        className={cn(
          groupProps.className,
          "flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        )}
      >
        <DateField {...fieldProps} />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              {...buttonProps}
              variant="outline"
              className="rounded-l-none"
              disabled={props.isDisabled}
              onClick={() => setOpen(true)}
            >
              {/* <CalendarIcon className="h-5 w-5" /> */}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            ref={contentRef}
            className="w-full pointer-events-auto"
          >
            <div {...dialogProps} className="space-y-3 ">
              <Tabs defaultValue="Respond by" className="w-[300px] z-auto">
                <TabsList className=" w-full rounded-[10px] bg-gray-100 flex flex-row px-2">
                  <div className="flex  w-full rounded-[10px] bg-gray-100 ">
                    <TabsTrigger
                      value="Respond by"
                      className="w-1/2 rounded-[10px] flex gap-1 data-[state=active]:bg-white data-[state=active]:text-violet-600"
                      onClick={handleRespondByTabClick}
                    >
                      <Clock3 size={16} color="#8645FF" />
                      <span>Respond by</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="FYI"
                      className="w-1/2 rounded-[10px] gap-1 data-[state=active]:bg-white data-[state=active]:text-violet-600"
                      onClick={handleFYITabClick}
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="-16.5 0 152 152"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g clip-path="url(#clip0)">
                            {" "}
                            <path
                              d="M117.12 101.303C116.904 99.2451 116.68 97.1186 116.509 95.0248C116.286 92.3102 115.892 89.5648 115.511 86.9099C114.642 80.8552 113.744 74.5944 114.838 68.3454C115.287 65.7857 115.843 63.2633 116.47 60.4647C116.995 58.1262 117.389 55.3682 116.332 52.6458C115.842 51.2358 115.045 49.9526 113.997 48.8891C112.95 47.8255 111.679 47.0082 110.277 46.4965C107.424 45.5304 104.182 46.0161 101.15 47.867C95.046 51.5937 90.8782 56.7394 88.7655 63.1597C88.6158 63.6132 88.4603 64.0648 88.2712 64.6155L88.1321 65.0217L87.9923 64.8307C87.7298 64.4691 87.5289 64.1987 87.3458 63.9184C85.9517 61.7906 84.5688 59.6553 83.1971 57.5126C80.1904 52.844 77.0813 48.0166 73.8462 43.3894C68.8128 36.1901 63.4563 29.1561 58.4006 22.5691C56.9238 20.6918 55.1764 19.0441 53.2156 17.6801C50.2621 15.5942 46.7357 15.4288 43.2782 17.2147C39.8869 18.9671 39.5448 22.3131 39.6571 25.3533C39.6768 25.8783 39.6726 26.4034 39.6674 27.0729C39.6674 27.233 39.6674 27.4011 39.6642 27.5803C39.4377 27.3834 39.2284 27.1904 39.0309 27.0106C38.4605 26.4346 37.8159 25.9376 37.1138 25.5325C36.5828 25.2614 36.0517 24.9779 35.5194 24.6931C33.6179 23.5654 31.5768 22.6918 29.4483 22.0946C28.032 21.7676 26.5582 21.7823 25.1488 22.1376C23.7393 22.4929 22.4345 23.1785 21.3424 24.1378C19.2861 26.0011 18.3765 28.7578 18.7828 31.899C18.9731 33.3803 19.1543 34.8637 19.3439 36.4179L19.5757 38.3075L19.294 38.2865C18.8864 38.2569 18.5412 38.232 18.1967 38.1992C16.7446 38.0047 15.2674 38.1361 13.8725 38.5839C12.4775 39.0316 11.1998 39.7845 10.1322 40.7877C9.16618 41.7902 8.43633 42.9956 7.99521 44.3159C7.55408 45.6363 7.41298 47.0385 7.58244 48.4203C7.85003 50.5358 8.34602 52.616 9.06176 54.6247C9.26785 55.2771 9.47394 55.9288 9.66362 56.5805C9.936 57.4456 10.2649 58.292 10.6481 59.114C10.7663 59.3837 10.883 59.6482 10.992 59.9075C10.9349 59.9646 10.8897 60.0118 10.851 60.0512C10.8199 60.0812 10.7913 60.1134 10.7651 60.1478C10.468 60.2673 10.1634 60.3678 9.85337 60.4484C5.53858 61.4828 2.82267 64.2308 1.55265 68.8494C0.688915 71.988 0.861647 75.2986 2.08112 78.9715C4.39869 85.8099 7.57679 92.326 11.5394 98.3617C20.0543 111.469 29.9355 123.635 41.0169 134.657C46.9351 140.619 52.5028 144.784 58.5339 147.761C63.4145 150.201 68.7964 151.471 74.2532 151.469C78.3376 151.442 82.3944 150.798 86.2865 149.56C98.1596 145.876 107.117 138.56 112.911 127.817C115.741 122.569 118.259 117.369 117.988 111.444C117.827 108.054 117.467 104.622 117.12 101.303ZM19.2305 73.0073C21.0604 75.6209 23.0288 78.1963 24.9328 80.6865C26.3164 82.4967 27.7463 84.3679 29.1102 86.2365C30.7701 88.5094 32.398 90.8669 33.9712 93.1464C34.984 94.614 35.9972 96.0815 37.0257 97.5379C38.404 99.4873 39.6939 100.553 41.5159 99.4243C42.0249 99.1014 42.4633 98.6793 42.8055 98.1831C43.1476 97.6869 43.3863 97.1271 43.507 96.5364C43.6302 95.9949 43.6412 95.4337 43.5397 94.8877C43.4381 94.3409 43.226 93.8218 42.9164 93.3604C38.9784 87.5846 35.6926 82.9568 32.5835 78.7897C31.4087 77.2145 30.1887 75.6392 29.0086 74.1113C24.8625 68.7484 20.5752 63.2036 17.5573 56.9599C16.4812 54.629 15.5243 52.245 14.69 49.817L14.2304 48.5515C13.7139 47.143 13.9403 46.0233 14.9019 45.2252C15.847 44.4376 16.9524 44.3366 18.3806 44.901C21.3804 46.0399 23.9343 48.113 25.6657 50.8146L27.0364 52.9248C31.2743 59.4507 35.6558 66.1992 40.0369 72.7901C42.0519 75.8217 44.2638 78.7884 46.4034 81.6572L46.5217 81.8167C47.4015 83.0073 48.3946 84.1106 49.4871 85.1095C50.1486 85.7396 50.9784 86.1643 51.8762 86.3323C52.7741 86.5003 53.7016 86.4045 54.5462 86.0566C55.8693 85.5729 56.7191 84.8096 57.0026 83.8435C57.1197 83.3131 57.1087 82.7625 56.9703 82.2374C56.8318 81.7123 56.5699 81.228 56.2066 80.8243C55.0599 79.3101 53.8221 77.8314 52.6243 76.4013C51.7664 75.3767 50.8792 74.3167 50.0352 73.2554C43.2578 64.7335 34.6648 53.3127 28.3154 40.537C26.9371 37.7706 26.1969 34.6083 25.4933 31.3411C25.2367 30.1459 25.3383 29.3117 25.7958 28.8601C26.2703 28.3928 27.199 28.3028 28.4795 28.5975C31.3914 29.2898 33.979 30.9575 35.8123 33.3232C36.7702 34.5046 37.7327 35.6821 38.7001 36.8556C42.1584 41.0792 45.7348 45.4457 48.985 49.9285C52.3979 54.6312 55.6702 59.5577 58.837 64.3214C60.2711 66.4781 61.7046 68.6341 63.1558 70.7791C63.6572 71.5201 64.1134 72.1521 64.5505 72.7094C64.7658 73.0073 65.0393 73.258 65.3543 73.4471C65.6693 73.6361 66.0191 73.7595 66.383 73.8094C66.6738 73.8383 66.9678 73.8068 67.2455 73.7162C67.5237 73.6263 67.7797 73.4792 67.9983 73.2843C68.7977 72.4783 69.3064 71.4282 69.4422 70.3006C69.5479 69.6022 69.072 68.8521 68.6546 68.1892L68.5056 67.9535C66.6974 65.0354 64.8818 62.1225 63.058 59.2145C59.5236 53.5614 55.8686 47.7167 52.3637 41.9147C50.1297 38.1677 48.1072 34.2988 46.3057 30.3257C45.5379 28.5001 45.0938 26.5548 44.993 24.5769C44.8847 23.2583 45.2352 22.2534 45.9775 21.7487C46.733 21.2361 47.8152 21.284 49.0314 21.8845C50.2764 22.5475 51.3726 23.4583 52.2522 24.5611C54.9215 27.7889 57.5145 30.9669 59.9023 34.3576C63.5089 39.477 67.1037 44.7363 70.5803 49.8209C72.2993 52.336 74.0208 54.8493 75.7463 57.3609C77.0045 59.1877 78.268 61.0108 79.5373 62.8302C81.0279 64.9742 82.5145 67.1213 83.9965 69.2715C84.5505 70.0788 85.0814 70.9025 85.6117 71.7262C86.2878 72.7763 86.9861 73.856 87.7238 74.8897C88.434 75.9293 89.2872 76.8633 90.2586 77.664C90.8355 78.1635 91.572 78.4405 92.3346 78.4444C93.0979 78.449 93.837 78.1799 94.4192 77.6864C95.5185 76.8226 95.8434 75.5316 95.3584 73.9518C95.2146 73.4838 95.046 73.0205 94.8773 72.5577C94.5695 71.7767 94.324 70.9727 94.1435 70.1529C92.8046 63.0901 98.1983 55.6735 102.606 53.035C104.409 51.9567 106.172 51.0909 107.923 52.3077C109.775 53.5948 109.413 55.5731 108.882 57.4889C107.811 61.3686 106.588 66.5063 106.651 71.8417C106.659 72.4816 106.657 73.1222 106.655 73.7634C106.612 75.7121 106.689 77.6614 106.885 79.6009C107.397 83.7864 108.015 88.0283 108.611 92.131C108.925 94.2924 109.24 96.4537 109.541 98.6163C109.691 99.696 109.816 100.782 109.94 101.863C110.071 102.991 110.202 104.156 110.365 105.3C111.466 113.068 109.145 120.304 102.837 128.765C96.2188 137.643 86.1723 143.43 75.9603 144.248H75.6531C63.333 144.248 56.137 140.155 49.1503 134.017C43.7946 129.311 37.0357 122.851 32.2714 114.602C31.3769 113.156 30.356 111.792 29.2211 110.526C28.7203 109.936 28.2027 109.321 27.7222 108.705C19.5679 98.2586 13.7922 87.9561 10.0668 77.2092C9.39944 75.2494 9.1398 73.1734 9.30408 71.1099C9.41303 69.8818 9.843 69.0096 10.5453 68.5797C10.9233 68.3598 11.355 68.2489 11.7923 68.26C12.4258 68.2797 13.0497 68.4208 13.6299 68.6762C15.8866 69.5287 17.8369 71.037 19.2292 73.0073H19.2305Z"
                              fill="#8645FF"
                            ></path>{" "}
                            <path
                              d="M61.6155 22.1569L61.9975 22.6066C62.7339 23.5388 63.6949 24.2684 64.7908 24.7271C65.7241 25.0553 67.3997 25.2082 68.1998 24.5355C68.9644 23.891 69.2027 22.1215 68.8561 21.179C68.3973 20.108 67.7909 19.1065 67.0545 18.2039C66.7998 17.8593 66.5458 17.5153 66.3076 17.1655C65.9466 16.6404 65.5678 16.1226 65.1353 15.5351C65.029 15.3901 64.918 15.2404 64.8071 15.0849C70.0769 14.4774 75.4156 14.948 80.4982 16.4679C93.5305 20.5476 101.895 26.7526 106.822 35.9952C106.868 36.0798 106.913 36.1697 106.958 36.2616C107.138 36.7705 107.485 37.2031 107.943 37.4877C108.433 37.6908 108.956 37.7995 109.485 37.808C109.78 37.8132 110.073 37.7622 110.349 37.6577C110.979 37.4044 111.366 36.3208 111.356 35.6887C111.322 34.8401 111.065 34.0155 110.611 33.2976C110.157 32.5756 109.714 31.8203 109.285 31.0871C108.213 29.0546 106.888 27.1658 105.341 25.4655C94.1665 14.2526 80.7214 9.03286 65.3702 9.95567C64.9107 9.98258 64.4357 9.97726 63.778 9.97004L63.3185 9.96486L65.8679 7.84226C66.1849 7.57973 66.5058 7.32113 66.8261 7.06318C67.548 6.48429 68.2897 5.8857 68.9749 5.23789C69.5413 4.70232 70.8691 3.44805 69.7625 1.86102C68.5988 0.189988 66.9541 1.2401 66.3351 1.63325L66.2301 1.69895C63.1 3.69224 59.8634 5.75309 56.7727 7.92293C54.0929 9.80596 53.681 11.8806 55.4767 14.4528C57.3565 17.1418 59.5218 19.6917 61.6155 22.1569Z"
                              fill="#8645FF"
                            ></path>{" "}
                          </g>{" "}
                          <defs>
                            {" "}
                            <clipPath id="clip0">
                              {" "}
                              <rect
                                width="117.484"
                                height="150.958"
                                fill="white"
                                transform="translate(0.882446 0.75708)"
                              ></rect>{" "}
                            </clipPath>{" "}
                          </defs>{" "}
                        </g>
                      </svg>
                      <span>FYI</span>
                    </TabsTrigger>
                  </div>
                </TabsList>

                <TabsContent
                  value="Respond by"
                  className=" w-full flex flex-col justify-center items-center "
                >
                  <Calendar {...calendarProps} />
                  {Boolean(state.hasTime) && (
                    <div className="flex  w-full pl-4 justify-start items-center">
                      <span>Time:</span>
                      <TimeField
                        value={state.timeValue}
                        // eslint-disable-next-line @typescript-eslint/unbound-method
                        onChange={state.setTimeValue}
                      />
                    </div>
                  )}
                </TabsContent>
                <TabsContent
                  value="FYI"
                  className=" w-full flex flex-col justify-center items-center cursor-not-allowed opacity-50"
                >
                  {/* <div className="cursor-not-allowed"> */}
                  <Calendar {...calendarProps} />
                  {Boolean(state.hasTime) && (
                    <div className="flex  w-full pl-4">
                      <span>Time:</span>
                      <TimeField
                        value={state.timeValue}
                        // eslint-disable-next-line @typescript-eslint/unbound-method
                        onChange={state.setTimeValue}
                      />
                    </div>
                  )}
                  {/* </div> */}
                </TabsContent>
              </Tabs>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
