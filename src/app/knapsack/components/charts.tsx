import { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import {
  TemperatureIteration,
  TemperatureIterationSeries,
  ValueIteration,
  ValueIterationSeries,
} from "../types";
import { ResizableBox as ReactResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

interface TemperatureChartProps {
  className?: string;
  data: TemperatureIterationSeries[];
}

export const TemperatureChart = ({
  className,
  data,
}: TemperatureChartProps) => {
  const primaryAxis = useMemo(
    (): AxisOptions<TemperatureIteration> => ({
      getValue: (datum) => datum.iteration,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<TemperatureIteration>[] => [
      {
        getValue: (datum) => datum.temperature,
      },
    ],
    []
  );

  return (
    <ResizableBox
      className={className}
      style={{
        background: "rgba(0, 27, 45, 0.9)",
        padding: ".5rem",
        borderRadius: "5px",
      }}
    >
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          dark: true,
        }}
      />
    </ResizableBox>
  );
};

interface ValueChartProps {
  className?: string;
  data: ValueIterationSeries[];
}

export const ValueChart = ({ className, data }: ValueChartProps) => {
  const primaryAxis = useMemo(
    (): AxisOptions<ValueIteration> => ({
      getValue: (datum) => datum.iteration,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<ValueIteration>[] => [
      {
        getValue: (datum) => datum.value,
      },
    ],
    []
  );

  return (
    <ResizableBox
      className={className}
      style={{
        background: "rgba(0, 27, 45, 0.9)",
        padding: ".5rem",
        borderRadius: "5px",
      }}
    >
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          dark: true,
        }}
      />
    </ResizableBox>
  );
};

export function ResizableBox({
  children,
  width = 600,
  height = 300,
  resizable = true,
  style = {},
  className = "",
}: any) {
  return (
    <div style={{ marginLeft: 20 }}>
      <div
        style={{
          display: "inline-block",
          width: "auto",
          background: "white",
          padding: ".5rem",
          borderRadius: "0.5rem",
          boxShadow: "0 30px 40px rgba(0,0,0,.1)",
          ...style,
        }}
      >
        {resizable ? (
          <ReactResizableBox width={width} height={height}>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
              className={className}
            >
              {children}
            </div>
          </ReactResizableBox>
        ) : (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            className={className}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
